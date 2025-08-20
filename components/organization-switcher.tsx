'use client';

import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import type { Organization } from '@/db/schema';
import { authClient } from '@/lib/auth-client';

interface OrganizationSwitcherProps {
  organizations: Organization[];
}

export function OrganizationSwitcher({
  organizations,
}: OrganizationSwitcherProps) {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const handleChangeOrganization = async (organizationId: string) => {
    await authClient.organization.setActive({ organizationId });
    toast.success('Organization changed successfully');
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Select
          onValueChange={handleChangeOrganization}
          value={activeOrganization?.id ?? ''}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Organization" />
          </SelectTrigger>
          <SelectContent>
            {organizations.map((organization) => (
              <SelectItem key={organization.id} value={organization.id}>
                {organization.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
