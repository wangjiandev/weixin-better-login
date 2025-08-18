'use client';

import { LogOutIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { alert } from '@/store/use-global-store';

export default function PersonalInformation() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Not logged in</div>;
  }

  const logout = () => {
    alert({
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      confirmLabel: 'Logout',
      onConfirm: async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success('Logged out successfully');
              router.push('/login');
            },
          },
        });
      },
    });
  };

  const deleteAccount = () => {
    alert({
      title: 'Delete Account',
      description: 'Are you sure you want to delete your account?',
      confirmLabel: 'Delete',
      onConfirm: async () => {
        await authClient.deleteUser({
          fetchOptions: {
            onSuccess: () => {
              toast.success('Account deleted successfully');
              router.push('/login');
            },
          },
        });
      },
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md md:max-w-3xl">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Use this page to manage your personal information.
        </CardDescription>
        <CardAction>
          <div className="flex gap-2">
            <Button
              className="size-8"
              onClick={logout}
              size="icon"
              variant="secondary"
            >
              <LogOutIcon />
            </Button>
            <Button
              className="size-8"
              onClick={deleteAccount}
              size="icon"
              variant="destructive"
            >
              <TrashIcon />
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </CardContent>
    </Card>
  );
}
