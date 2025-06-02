'use client';

import { useState } from 'react';
import { Database, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
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
import Link from 'next/link';
import Image from 'next/image';

export default function ConnectDatabasePage() {
  const [dbType, setDbType] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<
    'idle' | 'checking' | 'success' | 'error'
  >('idle');

  const handleCheckConnection = async () => {
    setConnectionStatus('checking');
    // Simulate connection check
    setTimeout(() => {
      setConnectionStatus(Math.random() > 0.3 ? 'success' : 'error');
    }, 2000);
  };

  const handleSaveConnection = () => {
    // Handle save logic here
    console.log('Saving connection...');
  };

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
            <Database className="h-8 w-8 text-green-600" />
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
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
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
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
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
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
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
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            {/* Connection Status */}
            {connectionStatus === 'success' && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Connection successful! Your database is ready to use.
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
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                {connectionStatus === 'checking'
                  ? 'Checking...'
                  : 'Check Connection'}
              </Button>
              <Button
                onClick={handleSaveConnection}
                disabled={connectionStatus !== 'success'}
                className="flex-1 bg-[#19874d] hover:bg-[#19874d]/80 cursor-pointer"
              >
                Save Connection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
