import {
  RiBardLine,
  RiCodeSSlashLine,
  RiLayoutLeftLine,
  RiLeafLine,
  RiLoginCircleLine,
  RiLogoutBoxLine,
  RiScanLine,
  RiSettings3Line,
  RiUserFollowLine,
} from '@remixicon/react';
import type * as React from 'react';
import { SearchForm } from '@/components/search-form';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  teams: [
    {
      name: 'InnovaCraft',
      logo: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png',
    },
    {
      name: 'Acme Corp.',
      logo: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png',
    },
    {
      name: 'Evil Corp.',
      logo: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png',
    },
  ],
  navMain: [
    {
      title: 'Sections',
      url: '#',
      items: [
        {
          title: 'Dashboard',
          url: '#',
          icon: RiScanLine,
        },
        {
          title: 'Insights',
          url: '#',
          icon: RiBardLine,
        },
        {
          title: 'Contacts',
          url: '#',
          icon: RiUserFollowLine,
          isActive: true,
        },
        {
          title: 'Tools',
          url: '#',
          icon: RiCodeSSlashLine,
        },
        {
          title: 'Integration',
          url: '#',
          icon: RiLoginCircleLine,
        },
        {
          title: 'Layouts',
          url: '#',
          icon: RiLayoutLeftLine,
        },
        {
          title: 'Reports',
          url: '#',
          icon: RiLeafLine,
        },
      ],
    },
    {
      title: 'Other',
      url: '#',
      items: [
        {
          title: 'Settings',
          url: '#',
          icon: RiSettings3Line,
        },
        {
          title: 'Help Center',
          url: '#',
          icon: RiLeafLine,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <hr className="-mt-px mx-2 border-border border-t" />
        <SearchForm className="mt-3" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-muted-foreground/60 uppercase">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button h-9 gap-3 rounded-md bg-gradient-to-r font-medium hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                      isActive={item.isActive}
                    >
                      <a href={item.url}>
                        {item.icon && (
                          <item.icon
                            aria-hidden="true"
                            className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                            size={22}
                          />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <hr className="-mt-px mx-2 border-border border-t" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-9 gap-3 rounded-md bg-gradient-to-r font-medium hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
              <RiLogoutBoxLine
                aria-hidden="true"
                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                size={22}
              />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
