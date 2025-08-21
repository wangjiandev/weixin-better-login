'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { User } from '@/db/schema';
import { addMember } from '@/server/members';

interface AllUsersProps {
  users: User[];
  organizationId: string;
}

export function AllUsers({ users, organizationId }: AllUsersProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddMember = async (userId: string) => {
    try {
      setIsLoading(true);
      await addMember(userId, organizationId);
      setIsLoading(false);
      toast.success('Member added');
      router.refresh();
    } catch (_) {
      toast.error('Failed to add member');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {users.map((user) => (
        <div className="flex items-center justify-between" key={user.id}>
          <span>{user.name}</span>
          <Button
            disabled={isLoading}
            onClick={() => handleAddMember(user.id)}
            size="sm"
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              'Add to organization'
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
