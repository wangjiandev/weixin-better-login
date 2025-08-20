'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { user } from '@/db/schema';
import { auth } from '@/lib/auth';

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!currentUser) {
    redirect('/login');
  }

  return {
    ...session,
    currentUser,
  };
}
