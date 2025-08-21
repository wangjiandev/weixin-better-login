'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Member } from '@/db/schema';
import { authClient } from '@/lib/auth-client';

interface MembersTableProps {
  members: Member[];
  organizationId: string;
}

export function MembersTable({ members, organizationId }: MembersTableProps) {
  const handleRemoveMember = async (memberId: string) => {
    await authClient.organization.removeMember({
      memberIdOrEmail: memberId,
      organizationId,
      fetchOptions: {
        onSuccess: () => {
          toast.success('Member removed');
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      },
    });
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.user.name}</TableCell>
            <TableCell>{member.user.email}</TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => handleRemoveMember(member.id)}>
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
