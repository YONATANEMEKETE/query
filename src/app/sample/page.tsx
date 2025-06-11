'use client';

import AppSidebar from '@/components/AppSidebar';
import StatsCards from '@/components/data-vissualizations/DataCard';
import DataChart from '@/components/data-vissualizations/DataChart';
import DataTable from '@/components/data-vissualizations/DataTable';
import DataSourcesIndicator from '@/components/DataSourcesIndicator';
import DataSourcesModal from '@/components/DataSourcesModal';
import { Button } from '@/components/ui/button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { DatabaseIcon, GripHorizontal } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { createSwapy, Swapy } from 'swapy';

interface Table {
  name: string;
  selected: boolean;
}

interface DataSource {
  name: string;
  selected: boolean;
  expanded: boolean;
  tables: Table[];
}

const dummyTableData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2023-03-22',
    lastLogin: '2024-01-19',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
    joinDate: '2023-02-10',
    lastLogin: '2023-12-15',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Moderator',
    status: 'Active',
    joinDate: '2023-04-05',
    lastLogin: '2024-01-18',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2023-05-12',
    lastLogin: '2024-01-17',
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-01-08',
    lastLogin: '2024-01-20',
  },
  {
    id: 7,
    name: 'Edward Norton',
    email: 'edward@example.com',
    role: 'User',
    status: 'Inactive',
    joinDate: '2023-06-20',
    lastLogin: '2023-11-30',
  },
  {
    id: 8,
    name: 'Fiona Green',
    email: 'fiona@example.com',
    role: 'Moderator',
    status: 'Active',
    joinDate: '2023-07-14',
    lastLogin: '2024-01-16',
  },
  {
    id: 9,
    name: 'George Miller',
    email: 'george@example.com',
    role: 'User',
    status: 'Active',
    joinDate: '2023-08-03',
    lastLogin: '2024-01-15',
  },
  {
    id: 10,
    name: 'Helen Davis',
    email: 'helen@example.com',
    role: 'User',
    status: 'Inactive',
    joinDate: '2023-09-18',
    lastLogin: '2023-12-20',
  },
];

const dummyChartData = [
  { name: 'Jan', revenue: 4000, users: 240 },
  { name: 'Feb', revenue: 3000, users: 139 },
  { name: 'Mar', revenue: 2000, users: 980 },
  { name: 'Apr', revenue: 2780, users: 390 },
  { name: 'May', revenue: 1890, users: 480 },
  { name: 'Jun', revenue: 2390, users: 380 },
];

// Mock database structure
const initialDataSources: DataSource[] = [
  {
    name: 'production_db',
    selected: true,
    expanded: true,
    tables: [
      { name: 'users', selected: true },
      { name: 'orders', selected: true },
      { name: 'products', selected: false },
      { name: 'payments', selected: true },
    ],
  },
  {
    name: 'analytics_db',
    selected: false,
    expanded: false,
    tables: [
      { name: 'page_views', selected: false },
      { name: 'user_sessions', selected: false },
      { name: 'conversion_events', selected: false },
    ],
  },
  {
    name: 'warehouse_db',
    selected: false,
    expanded: false,
    tables: [
      { name: 'inventory', selected: false },
      { name: 'suppliers', selected: false },
      { name: 'shipments', selected: false },
    ],
  },
];

const SampleDetailPage = () => {
  const [showDataSourcesModal, setShowDataSourcesModal] = useState(false);
  const [dataSources, setDataSources] =
    useState<DataSource[]>(initialDataSources);
  const swapy = useRef<Swapy | null>(null);
  const container = useRef(null);

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current);

      // Your event listeners
      swapy.current.onSwap((event) => {
        console.log('swap', event);
      });
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy();
    };
  }, []);

  const handleSaveDataSources = (newDataSources: DataSource[]) => {
    setDataSources(newDataSources);
    console.log('Updated data sources:', newDataSources);
  };

  return (
    <div className="bg-white min-h-screen">
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col bg-white relative">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="text-gray-600 hover:text-gray-900 cursor-pointer" />
                <h1 className="text-lg font-semibold text-gray-900">
                  Analytics Chat
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/connect-database">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-600 hover:bg-[#19874d] hover:text-white cursor-pointer"
                  >
                    <DatabaseIcon className="h-4 w-4 mr-1" />
                    Connect Database
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('isAuthenticated');
                    window.location.href = '/auth/signin';
                  }}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Sign Out
                </Button>
              </div>
            </header>
            {/* Data Sources Indicator */}
            <div className="px-4 py-3 border-b border-gray-200">
              <DataSourcesIndicator
                databases={dataSources}
                onOpenDataSources={() => setShowDataSourcesModal(true)}
              />
            </div>
            {/* Messages */}
            <div
              ref={container}
              className="px-10 py-10 flex flex-col gap-y-12 swapy-container"
            >
              {/* card */}
              <div data-swapy-slot="card" className="">
                <div
                  data-swapy-item="card"
                  className="p-6 pt-10 cursor-grabbing  border border-green-200 border-dashed rounded-lg bg-white relative"
                >
                  <div data-swapy-handle className="absolute top-0 left-0 p-2">
                    <GripHorizontal className="size-6 cursor-grabbing text-green-600" />
                  </div>
                  <StatsCards
                    data={{
                      totalRevenue: '$45,230',
                      totalUsers: 1247,
                      activeUsers: 892,
                      conversionRate: '3.2%',
                    }}
                  />
                </div>
              </div>
              {/* Chart */}
              <div data-swapy-slot="chart" className="">
                <div
                  data-swapy-item="chart"
                  className="p-6 pt-10 cursor-grabbing border border-green-200 border-dashed rounded-lg bg-white relative"
                >
                  <div data-swapy-handle className="absolute top-0 left-0 p-2">
                    <GripHorizontal className="size-6 cursor-grabbing text-green-600" />
                  </div>
                  <DataChart
                    data={dummyChartData}
                    title="Revenue & User Analytics"
                    description="Monthly performance metrics over the last 6 months"
                  />
                </div>
              </div>
              {/* table */}
              <div data-swapy-slot="table" className="">
                <div
                  data-swapy-item="table"
                  className="p-6 pt-10 cursor-grabbing border border-green-200 border-dashed rounded-lg bg-white relative"
                >
                  <div data-swapy-handle className="absolute top-0 left-0 p-2">
                    <GripHorizontal className="size-6 cursor-grabbing text-green-600" />
                  </div>
                  <DataTable data={dummyTableData} />
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Modals */}
      <DataSourcesModal
        isOpen={showDataSourcesModal}
        onClose={() => setShowDataSourcesModal(false)}
        onSave={handleSaveDataSources}
        initialDatabases={dataSources}
      />
    </div>
  );
};

export default SampleDetailPage;
