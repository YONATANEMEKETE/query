'use client';

import AppSidebar from '@/Components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/Components/ui/sidebar';
import { DatabaseIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col bg-white">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="text-gray-600 hover:text-gray-900" />
                <h1 className="text-lg font-semibold text-gray-900">
                  Analytics Chat
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={() => setShowDataSourcesModal(true)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <DatabaseIcon className="h-4 w-4 mr-1" />
                  Data Sources
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={() => setShowSaveModal(true)}
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Query
                </Button>
              </div>
            </header>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
