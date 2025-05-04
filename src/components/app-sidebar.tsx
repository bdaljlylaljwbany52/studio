'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Home, Calendar, DollarSign, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const AppSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/appointments', label: 'Appointments', icon: Calendar },
    { href: '/finances', label: 'Finances', icon: DollarSign },
  ];

  return (
    <Sidebar>
        <SidebarHeader className="flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-primary flex items-center gap-2">
                 {/* Placeholder for Logo if needed */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M12 11V17M12 21A9 9 0 0 1 3 12A9 9 0 0 1 12 3A9 9 0 0 1 21 12A9 9 0 0 1 12 21Z"></path><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>BizFlow</span>
            </Link>
            <SidebarTrigger className="md:hidden"/>
        </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className={cn(
                    'flex items-center gap-3',
                    pathname === item.href && 'bg-accent text-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
       <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/settings" legacyBehavior passHref>
                <SidebarMenuButton
                    isActive={pathname === '/settings'}
                    tooltip="Settings"
                    className={cn(
                    'flex items-center gap-3',
                     pathname === '/settings' && 'bg-accent text-accent-foreground'
                     )}
                 >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
       </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
