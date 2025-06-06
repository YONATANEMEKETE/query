'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Database,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Minus,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface Column {
  name: string;
  dataType: string;
  description: string;
  included: boolean;
}

interface Table {
  name: string;
  included: boolean;
  expanded: boolean;
  columns: Column[];
}

interface DatabaseSchema {
  tables: Table[];
}

// Mock response from backend after successful connection
const mockDatabaseSchema: DatabaseSchema = {
  tables: [
    {
      name: 'transactions',
      included: true,
      expanded: false,
      columns: [
        {
          name: 'id',
          dataType: 'INT (Primary Key, Auto Increment)',
          description: '',
          included: true,
        },
        { name: 'sender_id', dataType: 'INT', description: '', included: true },
        {
          name: 'receiver_id',
          dataType: 'INT',
          description: '',
          included: true,
        },
        {
          name: 'amount',
          dataType: 'DECIMAL(10, 2)',
          description: '',
          included: true,
        },
        {
          name: 'currency',
          dataType: 'VARCHAR(10)',
          description: '',
          included: true,
        },
        {
          name: 'transaction_date',
          dataType: 'DATETIME',
          description: '',
          included: true,
        },
        {
          name: 'status',
          dataType: 'VARCHAR(20)',
          description: '',
          included: true,
        },
        {
          name: 'reference',
          dataType: 'VARCHAR(100)',
          description: '',
          included: true,
        },
        { name: 'note', dataType: 'TEXT', description: '', included: true },
      ],
    },
    {
      name: 'users',
      included: true,
      expanded: false,
      columns: [
        {
          name: 'id',
          dataType: 'INT (Primary Key, Auto Increment)',
          description: '',
          included: true,
        },
        {
          name: 'username',
          dataType: 'VARCHAR(50)',
          description: '',
          included: true,
        },
        {
          name: 'email',
          dataType: 'VARCHAR(100)',
          description: '',
          included: true,
        },
        {
          name: 'password_hash',
          dataType: 'VARCHAR(255)',
          description: '',
          included: false,
        },
        {
          name: 'first_name',
          dataType: 'VARCHAR(50)',
          description: '',
          included: true,
        },
        {
          name: 'last_name',
          dataType: 'VARCHAR(50)',
          description: '',
          included: true,
        },
        {
          name: 'created_at',
          dataType: 'DATETIME',
          description: '',
          included: true,
        },
        {
          name: 'last_login',
          dataType: 'DATETIME',
          description: '',
          included: true,
        },
        {
          name: 'is_active',
          dataType: 'BOOLEAN',
          description: '',
          included: true,
        },
      ],
    },
    {
      name: 'accounts',
      included: true,
      expanded: false,
      columns: [
        {
          name: 'id',
          dataType: 'INT (Primary Key, Auto Increment)',
          description: '',
          included: true,
        },
        { name: 'user_id', dataType: 'INT', description: '', included: true },
        {
          name: 'account_number',
          dataType: 'VARCHAR(20)',
          description: '',
          included: true,
        },
        {
          name: 'balance',
          dataType: 'DECIMAL(15, 2)',
          description: '',
          included: true,
        },
        {
          name: 'account_type',
          dataType: 'VARCHAR(20)',
          description: '',
          included: true,
        },
        {
          name: 'created_at',
          dataType: 'DATETIME',
          description: '',
          included: true,
        },
      ],
    },
    {
      name: 'audit_logs',
      included: false,
      expanded: false,
      columns: [
        {
          name: 'id',
          dataType: 'INT (Primary Key, Auto Increment)',
          description: '',
          included: true,
        },
        { name: 'user_id', dataType: 'INT', description: '', included: true },
        {
          name: 'action',
          dataType: 'VARCHAR(100)',
          description: '',
          included: true,
        },
        {
          name: 'timestamp',
          dataType: 'DATETIME',
          description: '',
          included: true,
        },
        {
          name: 'ip_address',
          dataType: 'VARCHAR(45)',
          description: '',
          included: true,
        },
      ],
    },
  ],
};

export default function ConnectDatabasePage() {
  const [dbType, setDbType] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'checking' | 'success' | 'error'
  >('idle');
  const [schema, setSchema] = useState<DatabaseSchema | null>(null);
  const [currentStep, setCurrentStep] = useState<'connection' | 'schema'>(
    'connection'
  );

  const handleCheckConnection = async () => {
    setConnectionStatus('checking');
    // Simulate connection check and schema discovery
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      if (success) {
        setConnectionStatus('success');
        setSchema(mockDatabaseSchema);
        setCurrentStep('schema');
      } else {
        setConnectionStatus('error');
      }
    }, 2000);
  };

  const handleSaveConnection = () => {
    // Handle save logic here - send schema with descriptions to backend
    console.log('Saving connection with schema:', schema);
    // Redirect to main chat or show success message
  };

  const toggleTable = (tableIndex: number) => {
    if (!schema) return;
    setSchema({
      ...schema,
      tables: schema.tables.map((table, index) =>
        index === tableIndex ? { ...table, included: !table.included } : table
      ),
    });
  };

  const toggleTableExpansion = (tableIndex: number) => {
    if (!schema) return;
    setSchema({
      ...schema,
      tables: schema.tables.map((table, index) =>
        index === tableIndex ? { ...table, expanded: !table.expanded } : table
      ),
    });
  };

  const toggleColumn = (tableIndex: number, columnIndex: number) => {
    if (!schema) return;
    setSchema({
      ...schema,
      tables: schema.tables.map((table, tIndex) =>
        tIndex === tableIndex
          ? {
              ...table,
              columns: table.columns.map((column, cIndex) =>
                cIndex === columnIndex
                  ? { ...column, included: !column.included }
                  : column
              ),
            }
          : table
      ),
    });
  };

  const updateColumnDescription = (
    tableIndex: number,
    columnIndex: number,
    description: string
  ) => {
    if (!schema) return;
    setSchema({
      ...schema,
      tables: schema.tables.map((table, tIndex) =>
        tIndex === tableIndex
          ? {
              ...table,
              columns: table.columns.map((column, cIndex) =>
                cIndex === columnIndex ? { ...column, description } : column
              ),
            }
          : table
      ),
    });
  };

  const getIncludedCounts = () => {
    if (!schema) return { tables: 0, columns: 0 };
    const includedTables = schema.tables.filter(
      (table) => table.included
    ).length;
    const includedColumns = schema.tables.reduce(
      (count, table) =>
        count +
        (table.included
          ? table.columns.filter((col) => col.included).length
          : 0),
      0
    );
    return { tables: includedTables, columns: includedColumns };
  };

  if (currentStep === 'schema' && schema) {
    const counts = getIncludedCounts();

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep('connection')}
              className="mb-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Connection
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <Database className="h-8 w-8" style={{ color: '#19874d' }} />
              <h1 className="text-2xl font-bold text-gray-900">
                Configure Database Schema
              </h1>
            </div>
            <p className="text-gray-600">
              Select tables and columns to include, and add descriptions to help
              AI understand your data better.
            </p>
            <div className="flex gap-2 mt-3">
              <Badge
                variant="secondary"
                style={{ backgroundColor: '#f0fdf4', color: '#166534' }}
              >
                {counts.tables} tables selected
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {counts.columns} columns included
              </Badge>
            </div>
          </div>

          {/* Schema Configuration */}
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-900">
                Database Tables & Columns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4">
                  {schema.tables.map((table, tableIndex) => (
                    <div
                      key={table.name}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      {/* Table Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTableExpansion(tableIndex)}
                          className="h-6 w-6 p-0 hover:bg-gray-100"
                        >
                          {table.expanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                        <Checkbox
                          checked={table.included}
                          onCheckedChange={() => toggleTable(tableIndex)}
                          className="border-gray-300"
                          style={
                            {
                              '--checkbox-checked-bg': '#19874d',
                              '--checkbox-checked-border': '#19874d',
                            } as React.CSSProperties
                          }
                        />
                        <Database
                          className="h-5 w-5"
                          style={{ color: '#19874d' }}
                        />
                        <span className="font-semibold text-gray-900">
                          {table.name}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          {table.columns.filter((col) => col.included).length}/
                          {table.columns.length} columns
                        </Badge>
                      </div>

                      {/* Columns Table */}
                      {table.expanded && (
                        <div className="ml-8 mt-4">
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 w-8"></th>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">
                                    Column Name
                                  </th>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500">
                                    Data Type
                                  </th>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 w-1/3">
                                    Description (Optional)
                                  </th>
                                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 w-8"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {table.columns.map((column, columnIndex) => (
                                  <tr
                                    key={column.name}
                                    className="border-t border-gray-100"
                                  >
                                    <td className="py-2 px-3">
                                      <Checkbox
                                        checked={
                                          column.included && table.included
                                        }
                                        disabled={!table.included}
                                        onCheckedChange={() =>
                                          toggleColumn(tableIndex, columnIndex)
                                        }
                                        className="border-gray-300"
                                        style={
                                          {
                                            '--checkbox-checked-bg': '#19874d',
                                            '--checkbox-checked-border':
                                              '#19874d',
                                          } as React.CSSProperties
                                        }
                                      />
                                    </td>
                                    <td className="py-2 px-3">
                                      <code className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                                        {column.name}
                                      </code>
                                    </td>
                                    <td className="py-2 px-3">
                                      <span className="text-sm text-gray-600">
                                        {column.dataType}
                                      </span>
                                    </td>
                                    <td className="py-2 px-3">
                                      <Textarea
                                        placeholder="e.g., Unique identifier for each transaction"
                                        value={column.description}
                                        onChange={(
                                          e: React.ChangeEvent<HTMLTextAreaElement>
                                        ) =>
                                          updateColumnDescription(
                                            tableIndex,
                                            columnIndex,
                                            e.target.value
                                          )
                                        }
                                        disabled={
                                          !table.included || !column.included
                                        }
                                        className="min-h-[60px] text-sm bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 resize-none"
                                        onFocus={(
                                          e: React.FocusEvent<HTMLTextAreaElement>
                                        ) => {
                                          e.target.style.borderColor =
                                            '#19874d';
                                          e.target.style.boxShadow = `0 0 0 1px #19874d`;
                                        }}
                                        onBlur={(
                                          e: React.FocusEvent<HTMLTextAreaElement>
                                        ) => {
                                          e.target.style.borderColor =
                                            '#d1d5db';
                                          e.target.style.boxShadow = 'none';
                                        }}
                                      />
                                    </td>
                                    <td className="py-2 px-3">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          toggleColumn(tableIndex, columnIndex)
                                        }
                                        disabled={!table.included}
                                        className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                                      >
                                        {column.included ? (
                                          <Minus className="h-3 w-3" />
                                        ) : (
                                          <Plus className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-200 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('connection')}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Back to Connection
                </Button>
                <Button
                  onClick={handleSaveConnection}
                  className="flex-1 text-white"
                  style={{ backgroundColor: '#19874d' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#166a3f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#19874d';
                  }}
                >
                  Save Database Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Chat
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Database className="h-8 w-8" style={{ color: '#19874d' }} />
            <h1 className="text-2xl font-bold text-gray-900">
              Connect Your Database
            </h1>
          </div>
          <p className="text-gray-600">
            Connect your database to start querying your data with AI.
          </p>
        </div>

        {/* Connection Form */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">
              Database Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Database Type */}
            <div className="space-y-2">
              <Label htmlFor="db-type" className="text-gray-700">
                Database Type
              </Label>
              <Select value={dbType} onValueChange={setDbType}>
                <SelectTrigger className="bg-white border-gray-300 text-gray-900 w-full">
                  <SelectValue placeholder="Select database type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 min-w-[300px]">
                  <SelectItem
                    value="postgresql"
                    className="text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/postgres.svg"
                        alt="PostgreSQL"
                        width={20}
                        height={20}
                      />
                      <span>PostgreSQL</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="mysql"
                    className="text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/mysql.svg"
                        alt="MySQL"
                        width={24}
                        height={24}
                      />
                      <span>MySQL</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="mongodb"
                    className="text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icons/mongo.svg"
                        alt="MongoDB"
                        width={20}
                        height={20}
                      />
                      <span>MongoDB</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Host */}
            <div className="space-y-2">
              <Label htmlFor="host" className="text-gray-700">
                Host
              </Label>
              <Input
                id="host"
                type="text"
                placeholder="localhost"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                onFocus={(e) => {
                  e.target.style.borderColor = '#19874d';
                  e.target.style.boxShadow = `0 0 0 1px #19874d`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Port */}
            <div className="space-y-2">
              <Label htmlFor="port" className="text-gray-700">
                Port
              </Label>
              <Input
                id="port"
                type="text"
                placeholder="5432"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                onFocus={(e) => {
                  e.target.style.borderColor = '#19874d';
                  e.target.style.boxShadow = `0 0 0 1px #19874d`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                onFocus={(e) => {
                  e.target.style.borderColor = '#19874d';
                  e.target.style.boxShadow = `0 0 0 1px #19874d`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="your_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                onFocus={(e) => {
                  e.target.style.borderColor = '#19874d';
                  e.target.style.boxShadow = `0 0 0 1px #19874d`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Connection Status */}
            {connectionStatus === 'success' && (
              <Alert
                className="border-green-200"
                style={{ backgroundColor: '#f0fdf4' }}
              >
                <CheckCircle className="h-4 w-4" style={{ color: '#19874d' }} />
                <AlertDescription style={{ color: '#166534' }}>
                  Connection successful! Click "Configure Schema" to select
                  tables and columns.
                </AlertDescription>
              </Alert>
            )}

            {connectionStatus === 'error' && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Connection failed. Please check your credentials and try
                  again.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleCheckConnection}
                disabled={
                  connectionStatus === 'checking' ||
                  !dbType ||
                  !host ||
                  !username
                }
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {connectionStatus === 'checking'
                  ? 'Checking...'
                  : 'Check Connection'}
              </Button>
              {connectionStatus === 'success' && (
                <Button
                  onClick={() => setCurrentStep('schema')}
                  className="flex-1 text-white"
                  style={{ backgroundColor: '#19874d' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#166a3f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#19874d';
                  }}
                >
                  Configure Schema
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
