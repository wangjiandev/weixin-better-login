import { createStore } from '@/store/create-store';

type AlertConfig = {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type State = {
  alertOpen: boolean;
  alertConfig?: AlertConfig;
};

type Actions = {
  updateAlertOpen: (isOpen: State['alertOpen']) => void;
  showAlert: (config: AlertConfig) => void;
};

type Store = State & Actions;

export const useGlobalStore = createStore<Store>(
  (set) => ({
    alertOpen: false,
    alertConfig: undefined,
    updateAlertOpen: (isOpen) =>
      set((state) => {
        state.alertOpen = isOpen;
        if (!isOpen) {
          state.alertConfig = undefined;
        }
      }),
    showAlert: (config) =>
      set((state) => {
        state.alertOpen = true;
        state.alertConfig = config;
      }),
  }),
  {
    name: 'global-store',
    excludeFromPersist: ['alertOpen'],
  }
);

export const alert = (config: AlertConfig) => {
  useGlobalStore.getState().showAlert(config);
};
