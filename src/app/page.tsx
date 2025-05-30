'use client';

import AppSidebar from '@/Components/AppSidebar';
import DataSourcesIndicator from '@/Components/DataSourcesIndicator';
import DataSourcesModal from '@/Components/DataSourcesModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/Components/ui/sidebar';
import { DatabaseIcon, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
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
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
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

            {/* Input Bar */}
            <div className="border-t border-gray-200 bg-white p-4 absolute bottom-0 w-full right-0">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about your data..."
                  className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
                  // onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button
                  // onClick={handleSend}
                  size="icon"
                  className="bg-green-600 hover:bg-green-700 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SidebarInset>
        </div>

        {/* Modals */}
        <DataSourcesModal
          isOpen={showDataSourcesModal}
          onClose={() => setShowDataSourcesModal(false)}
          onSave={handleSaveDataSources}
          initialDatabases={dataSources}
        />
      </SidebarProvider>
    </div>
  );
}
