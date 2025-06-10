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
import { DatabaseIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { dummyChartData, dummyTableData } from '../page';

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
            <div className="px-10 py-10 flex flex-col gap-y-12">
              <div className="size-full flex gap-x-4 ">
                <div className="basis-1/3">
                  <div className="">
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
                <div className="basis-2/3">
                  <div>
                    <DataChart
                      data={dummyChartData}
                      title="Revenue & User Analytics"
                      description="Monthly performance metrics over the last 6 months"
                    />
                  </div>
                </div>
              </div>
              <div className="basis-full">
                <div>
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
