'use client';

import AppSidebar from '@/components/AppSidebar';
import DataSourcesIndicator from '@/components/DataSourcesIndicator';
import DataSourcesModal from '@/components/DataSourcesModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  DatabaseIcon,
  FileText,
  Save,
  Send,
  Table,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import StatsCards from '@/components/data-vissualizations/DataCard';
import DataChart from '@/components/data-vissualizations/DataChart';
import DataTable from '@/components/data-vissualizations/DataTable';
import SavequeryModal from '@/components/SavequeryModal';

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

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  responseType?: 'table' | 'chart' | 'card';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const dummyTableData = [
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

export const dummyChartData = [
  { name: 'Jan', revenue: 4000, users: 240 },
  { name: 'Feb', revenue: 3000, users: 139 },
  { name: 'Mar', revenue: 2000, users: 980 },
  { name: 'Apr', revenue: 2780, users: 390 },
  { name: 'May', revenue: 1890, users: 480 },
  { name: 'Jun', revenue: 2390, users: 380 },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content:
        "Hello! I'm ready to help you query your database. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showDataSourcesModal, setShowDataSourcesModal] = useState(false);
  const [dataSources, setDataSources] =
    useState<DataSource[]>(initialDataSources);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      } else {
        // Redirect to signin page
        window.location.href = '/auth/signin';
      }
      setIsLoadingAuth(false);
    };

    checkAuth();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = () => {
    const responses = [
      {
        type: 'table' as const,
        content: 'Here are the users from your database:',
        data: dummyTableData,
      },
      {
        type: 'chart' as const,
        content: "Here's your revenue and user growth over the last 6 months:",
        data: dummyChartData,
      },
      {
        type: 'card' as const,
        content: 'Here are your key metrics:',
        data: {
          totalRevenue: '$45,230',
          totalUsers: 1247,
          activeUsers: 892,
          conversionRate: '3.2%',
        },
      },
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const response = getRandomResponse();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        responseType: response.type,
        data: response.data,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSave = (message: Message) => {
    setSelectedMessage(message);
    setSaveModalOpen(true);
  };

  const handleSaveQuery = (data: {
    title: string;
    pagePath: string;
    featureOnHomepage: boolean;
  }) => {
    console.log('Saving query:', data);
    setSaveModalOpen(false);
  };

  const handleSaveDataSources = (newDataSources: DataSource[]) => {
    setDataSources(newDataSources);
    console.log('Updated data sources:', newDataSources);
  };

  const renderTable = (data: any[]) => <DataTable data={data} />;

  const renderChart = (data: any[]) => (
    <DataChart
      data={data}
      title="Revenue & User Analytics"
      description="Monthly performance metrics over the last 6 months"
    />
  );

  const renderCard = (data: any) => <StatsCards data={data} />;

  const getResponseIcon = (type: string) => {
    switch (type) {
      case 'table':
        return <Table className="h-4 w-4" />;
      case 'chart':
        return <BarChart3 className="h-4 w-4" />;
      case 'card':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-6 w-6 text-green-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
            <div className="flex-1 overflow-y-auto p-6 pb-16 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-4xl w-full ${
                      message.type === 'user'
                        ? 'bg-[#19874d] text-white rounded-lg p-4'
                        : 'space-y-4'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <p>{message.content}</p>
                    ) : (
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-gray-900 dark:text-gray-100">
                            {message.content}
                          </p>
                          {message.responseType && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSave(message)}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <Save className="h-4 w-4" />
                              <span>Save</span>
                              {getResponseIcon(message.responseType)}
                            </Button>
                          )}
                        </div>

                        {message.responseType === 'table' &&
                          message.data &&
                          renderTable(message.data)}
                        {message.responseType === 'chart' &&
                          message.data &&
                          renderChart(message.data)}
                        {message.responseType === 'card' &&
                          message.data &&
                          renderCard(message.data)}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 max-w-4xl w-full">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Analyzing your query...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-gray-200 bg-white p-4 absolute bottom-0 w-full right-0">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your database..."
                  className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500  focus:ring-green-500 ring-offset-2"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon"
                  className="bg-[#19874d] hover:bg-[#19874d]/80 cursor-pointer"
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
        <SavequeryModal
          isOpen={saveModalOpen}
          onClose={() => setSaveModalOpen(false)}
          onSave={handleSaveQuery}
        />
      </SidebarProvider>
    </div>
  );
}
