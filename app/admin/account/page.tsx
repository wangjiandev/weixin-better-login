import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import PersonalInformation from '@/components/personal-information';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 font-sans">
      <h1>Admin</h1>
      <p>Session: {session?.user?.email}</p>
      <PersonalInformation />
    </div>
  );
}
