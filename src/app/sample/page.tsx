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
import { dummyChartData, dummyTableData } from '../page';
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
