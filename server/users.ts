'use server';

import { eq, inArray, not } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { member, user } from '@/db/schema';
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

export async function getUsers(organizationId: string) {
  const members = await db.query.member.findMany({
    where: eq(member.organizationId, organizationId),
  });

  const users = await db.query.user.findMany({
    where: not(
      inArray(
        user.id,
        members.map((m) => m.userId)
      )
    ),
  });

  return users;
}
