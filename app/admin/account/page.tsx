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
    <div className="flex flex-1 flex-col gap-4 py-4 lg:gap-6 lg:py-6">
      <h1>Admin</h1>
      <p>Session: {session?.user?.email}</p>
      <PersonalInformation />
    </div>
  );
}
