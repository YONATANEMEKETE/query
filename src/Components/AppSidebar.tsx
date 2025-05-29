import React, { useEffect, useState } from 'react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar,
} from './ui/sidebar';
import {
  BarChart3,
  DatabaseIcon,
  DollarSign,
  Link,
  MessageSquare,
  Users,
} from 'lucide-react';

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
          <span className="text-xl font-bold text-gray-900">Que.ry</span>
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
                <SidebarMenuButton className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900">
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
            {/* <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Link href="/connect-database">
                    <DatabaseIcon className="h-4 w-4" />
                    <span>Connect Database</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Link href="/saved/users">
                    <Users className="h-4 w-4" />
                    <span>View Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Link href="/saved/sales">
                    <DollarSign className="h-4 w-4" />
                    <span>View Sales</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu> */}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
