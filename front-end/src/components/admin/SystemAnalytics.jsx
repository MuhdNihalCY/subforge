
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SystemAnalytics = () => {
  // Mock data for charts
  const deploymentData = [
    { name: 'Jan', deployments: 145, successful: 130, failed: 15 },
    { name: 'Feb', deployments: 189, successful: 170, failed: 19 },
    { name: 'Mar', deployments: 234, successful: 220, failed: 14 },
    { name: 'Apr', deployments: 198, successful: 185, failed: 13 },
    { name: 'May', deployments: 267, successful: 250, failed: 17 },
    { name: 'Jun', deployments: 298, successful: 285, failed: 13 },
  ];

  const trafficData = [
    { name: 'Mon', traffic: 2400 },
    { name: 'Tue', traffic: 1398 },
    { name: 'Wed', traffic: 9800 },
    { name: 'Thu', traffic: 3908 },
    { name: 'Fri', traffic: 4800 },
    { name: 'Sat', traffic: 3800 },
    { name: 'Sun', traffic: 4300 },
  ];

  const resourceUsage = [
    { name: 'CPU', value: 65, color: '#3b82f6' },
    { name: 'Memory', value: 78, color: '#ef4444' },
    { name: 'Storage', value: 45, color: '#10b981' },
    { name: 'Bandwidth', value: 82, color: '#f59e0b' },
  ];

  const pieData = [
    { name: 'React', value: 400, color: '#61dafb' },
    { name: 'Vue', value: 300, color: '#4fc08d' },
    { name: 'Angular', value: 200, color: '#dd1b16' },
    { name: 'Static', value: 100, color: '#6b7280' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl font-bold">System Analytics</h2>
        <p className="text-gray-400">Monitor platform performance and usage metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="text-gray-400 text-sm">Total Deployments</div>
          <div className="text-white text-2xl font-bold">12,456</div>
          <div className="text-success text-sm">↗ 12% from last month</div>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="text-gray-400 text-sm">Success Rate</div>
          <div className="text-white text-2xl font-bold">98.2%</div>
          <div className="text-success text-sm">↗ 0.5% from last month</div>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="text-gray-400 text-sm">Avg Response Time</div>
          <div className="text-white text-2xl font-bold">145ms</div>
          <div className="text-error text-sm">↘ 2% from last month</div>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="text-gray-400 text-sm">Total Traffic</div>
          <div className="text-white text-2xl font-bold">2.4M</div>
          <div className="text-success text-sm">↗ 18% from last month</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployment Trends */}
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Deployment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deploymentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="successful" fill="#10b981" name="Successful" />
              <Bar dataKey="failed" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Overview */}
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Weekly Traffic</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Usage */}
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Resource Usage</h3>
          <div className="space-y-4">
            {resourceUsage.map((resource) => (
              <div key={resource.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{resource.name}</span>
                  <span className="text-white">{resource.value}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${resource.value}%`,
                      backgroundColor: resource.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Framework Distribution */}
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Framework Usage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex justify-center space-x-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-300 text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
