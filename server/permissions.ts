'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export const isAdmin = async () => {
  const { success, error } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ['create', 'update', 'delete'],
      },
    },
  });

  if (error) {
    return {
      success: false,
      error: error || 'Failed to check permissions',
    };
  }

  return success;
};
