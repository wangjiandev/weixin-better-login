'use client';

import { RiLogoutBoxLine, RiSettingsLine, RiTeamLine } from '@remixicon/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';
import { alert } from '@/store/use-global-store';
import { Skeleton } from './ui/skeleton';

export default function UserDropdown() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  if (isPending) {
    return <Skeleton className="h-8 w-8" />;
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-auto p-0 hover:bg-transparent" variant="ghost">
          <Avatar className="size-8">
            <AvatarImage
              alt="Profile image"
              height={32}
              src={data?.user?.image || ''}
              width={32}
            />
            <AvatarFallback>
              {data?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-w-64"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate font-medium text-foreground text-sm">
            {data?.user?.name}
          </span>
          <span className="truncate font-normal text-muted-foreground text-xs">
            {data?.user?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link className="flex items-center gap-2" href="/admin/account">
              <RiSettingsLine
                aria-hidden="true"
                className="opacity-60"
                size={16}
              />
              <span>Account settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RiTeamLine aria-hidden="true" className="opacity-60" size={16} />
            <span>Affiliate area</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <RiLogoutBoxLine
            aria-hidden="true"
            className="opacity-60"
            size={16}
          />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
