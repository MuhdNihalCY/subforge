import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getMongoStatus, getSystemMetrics } from '@/services/mongoDbService';
import { AlertCircle, CheckCircle2, Database, HardDrive, Activity } from 'lucide-react';

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const MongoDBStatus = () => {
  const [status, setStatus] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const fetchData = async () => {
    try {
      const [statusData, metricsData] = await Promise.all([
        getMongoStatus(),
        getSystemMetrics()
      ]);
      setStatus(statusData.data);
      setMetrics(metricsData.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <Card className="p-4 bg-red-50">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700">Error: {error}</span>
        </div>
      </Card>
    );
  }

  if (!status || !metrics) {
    return (
      <Card className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </Card>
    );
  }

  const connectionStatus = status.isConnected ? (
    <div className="flex items-center text-green-600">
      <CheckCircle2 className="h-5 w-5 mr-2" />
      Connected
    </div>
  ) : (
    <div className="flex items-center text-red-600">
      <AlertCircle className="h-5 w-5 mr-2" />
      Disconnected
    </div>
  );

  const poolUsage = metrics.mongoConnection
    ? (metrics.mongoConnection.active / status.poolInfo.maxPoolSize) * 100
    : 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Database className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold">MongoDB Status</h3>
        </div>
        {connectionStatus}
      </div>

      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Connection Pool</span>
              <span>{Math.round(poolUsage)}% used</span>
            </div>
            <Progress value={poolUsage} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Host:</span>
              <p className="font-medium">{status.host}</p>
            </div>
            <div>
              <span className="text-gray-500">Database:</span>
              <p className="font-medium">{status.database}</p>
            </div>
            <div>
              <span className="text-gray-500">Collections:</span>
              <p className="font-medium">{status.dbStats?.collections || 0}</p>
            </div>
            <div>
              <span className="text-gray-500">Total Objects:</span>
              <p className="font-medium">{status.dbStats?.objects?.toLocaleString() || 0}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Active Connections:</span>
              <p className="font-medium">{metrics.connectionPool?.total || 0}</p>
            </div>
            <div>
              <span className="text-gray-500">Available:</span>
              <p className="font-medium">{metrics.connectionPool?.available || 0}</p>
            </div>
            <div>
              <span className="text-gray-500">Waiting:</span>
              <p className="font-medium">{metrics.connectionPool?.waiting || 0}</p>
            </div>
            <div>
              <span className="text-gray-500">Pool Size:</span>
              <p className="font-medium">
                {status.poolInfo.minPoolSize} - {status.poolInfo.maxPoolSize}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Data Size:</span>
              <p className="font-medium">{formatBytes(status.dbStats?.dataSize || 0)}</p>
            </div>
            <div>
              <span className="text-gray-500">Storage Size:</span>
              <p className="font-medium">{formatBytes(status.dbStats?.storageSize || 0)}</p>
            </div>
            <div>
              <span className="text-gray-500">Indexes:</span>
              <p className="font-medium">{status.dbStats?.indexes || 0}</p>
            </div>
            <div>
              <span className="text-gray-500">Index Size:</span>
              <p className="font-medium">{formatBytes(status.dbStats?.indexSize || 0)}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MongoDBStatus;
