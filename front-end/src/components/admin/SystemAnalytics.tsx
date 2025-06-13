
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SystemAnalytics: React.FC = () => {
  const usageData = [
    { month: 'Jan', users: 850, deployments: 1200, storage: 450 },
    { month: 'Feb', users: 920, deployments: 1350, storage: 520 },
    { month: 'Mar', users: 1100, deployments: 1580, storage: 680 },
    { month: 'Apr', users: 1247, deployments: 1750, storage: 790 },
  ];

  const performanceData = [
    { time: '00:00', avgResponseTime: 120, errorRate: 0.1 },
    { time: '04:00', avgResponseTime: 95, errorRate: 0.05 },
    { time: '08:00', avgResponseTime: 180, errorRate: 0.2 },
    { time: '12:00', avgResponseTime: 220, errorRate: 0.15 },
    { time: '16:00', avgResponseTime: 160, errorRate: 0.1 },
    { time: '20:00', avgResponseTime: 140, errorRate: 0.08 },
  ];

  const planDistribution = [
    { name: 'Free', value: 816, color: '#6B7280' },
    { name: 'Pro', value: 342, color: '#3B82F6' },
    { name: 'Enterprise', value: 89, color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">System Uptime</h3>
          <p className="text-2xl font-bold text-success mt-2">99.97%</p>
          <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Avg Response Time</h3>
          <p className="text-2xl font-bold text-white mt-2">142ms</p>
          <p className="text-success text-sm mt-1">-8ms from last week</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Total Deployments</h3>
          <p className="text-2xl font-bold text-white mt-2">15,472</p>
          <p className="text-success text-sm mt-1">+23% this month</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Storage Used</h3>
          <p className="text-2xl font-bold text-white mt-2">2.1TB</p>
          <p className="text-gray-400 text-sm mt-1">68% of capacity</p>
        </div>
      </div>

      {/* Usage Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white font-bold text-lg mb-4">Platform Usage Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="users" fill="#3B82F6" name="Users" />
              <Bar dataKey="deployments" fill="#10B981" name="Deployments" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white font-bold text-lg mb-4">Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {planDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <h3 className="text-white font-bold text-lg mb-4">System Performance (24h)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="avgResponseTime" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Avg Response Time (ms)"
            />
            <Line 
              type="monotone" 
              dataKey="errorRate" 
              stroke="#EF4444" 
              strokeWidth={2}
              name="Error Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SystemAnalytics;
