'use server';

import { auth } from '@/lib/auth';

export async function addMember(userId: string, organizationId: string) {
  await auth.api.addMember({
    body: {
      userId,
      role: 'member',
      organizationId,
    },
  });
}
