import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { StateCreator } from 'zustand/vanilla';

type ConfigType<T> = {
  name?: string;
  storage?: Storage;
  skipPersist?: boolean;
  excludeFromPersist?: Array<keyof T>;
};

export const createStore = <T extends object>(
  stateCreator: StateCreator<T, [['zustand/immer', never]], [], T>,
  config?: ConfigType<T>
) => {
  const { name, storage, skipPersist, excludeFromPersist } = config ?? {};

  if (skipPersist) {
    return create<T>()(immer(stateCreator));
  }

  return create<T>()(
    persist(immer(stateCreator), {
      name: name || 'zustand-store',
      storage: createJSONStorage(() => storage || localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !excludeFromPersist?.includes(key as keyof T)
          )
        ),
    })
  );
};
