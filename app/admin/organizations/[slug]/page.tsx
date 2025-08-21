import { getActiveOrganizationBySlug } from '@/server/organizations';
import { getUsers } from '@/server/users';
import { AllUsers } from './_components/all-users';
import { MembersTable } from './_components/members-table';

interface OrganizationPageProps {
  params: {
    slug: string;
  };
}

export default async function OrganizationPage({
  params,
}: OrganizationPageProps) {
  const { slug } = await params;
  const organization = await getActiveOrganizationBySlug(slug);
  const users = await getUsers(organization?.id ?? '');

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 pt-6">
      <h1 className="font-semibold text-2xl">{organization?.name}</h1>
      <MembersTable
        members={organization?.members ?? []}
        organizationId={organization?.id ?? ''}
      />
      <h1 className="font-semibold text-xl">All Users</h1>
      <AllUsers organizationId={organization?.id ?? ''} users={users} />
    </div>
  );
}
