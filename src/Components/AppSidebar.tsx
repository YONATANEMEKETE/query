import React, { useEffect, useState } from 'react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar,
} from './ui/sidebar';
import { BarChart3, DatabaseIcon, MessageSquare, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const recentChats = [
  'Daily Active Users',
  'Revenue Breakdown',
  'Top Customers',
  'Conversion Rates',
  'Monthly Growth',
  'User Retention',
  'Product Analytics',
];

const AppSidebar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder or null on the server
    return null;
  }

  return (
    <Sidebar className="bg-gray-50 border-gray-200 ">
      <SidebarHeader className="border-b border-gray-200">
        <div className="flex items-center gap-2 px-4 py-2">
          <BarChart3 className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold text-gray-900">Query</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-gray-50">
        <div className="px-4 py-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Recent Chats
          </h3>
          <SidebarMenu>
            {recentChats.map((chat, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                  <MessageSquare className="h-4 w-4" />
                  <span className="truncate">{chat}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link href="/connect-database">
                <Button className="w-full flex items-center gap-x-2 justify-start text-gray-700 bg-transparent border-none shadow-none hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                  <DatabaseIcon className="h-4 w-4" />
                  <span>Connect Database</span>
                </Button>
              </Link>
              <Link href="/sample">
                <Button className="w-full flex items-center gap-x-2 justify-start text-gray-700 bg-transparent border-none shadow-none hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                  <Users className="h-4 w-4" />
                  <span>Sample</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
