import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import AnalyticsCard from '../components/AnalyticsCard';
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  // Mock analytics data
  const visitorsData = [
    { name: 'Mon', visitors: 120, pageviews: 340 },
    { name: 'Tue', visitors: 190, pageviews: 450 },
    { name: 'Wed', visitors: 250, pageviews: 520 },
    { name: 'Thu', visitors: 180, pageviews: 380 },
    { name: 'Fri', visitors: 300, pageviews: 650 },
    { name: 'Sat', visitors: 220, pageviews: 420 },
    { name: 'Sun', visitors: 280, pageviews: 580 }
  ];

  const deploymentsData = [
    { name: 'Week 1', deployments: 12, success: 11 },
    { name: 'Week 2', deployments: 15, success: 14 },
    { name: 'Week 3', deployments: 8, success: 8 },
    { name: 'Week 4', deployments: 20, success: 18 }
  ];

  const stats = [
    { title: 'Total Visitors', value: '12.4K', change: '+12%', trend: 'up' as const },
    { title: 'Page Views', value: '38.2K', change: '+8%', trend: 'up' as const },
    { title: 'Bounce Rate', value: '24.5%', change: '-3%', trend: 'down' as const },
    { title: 'Avg. Session', value: '3m 24s', change: '+15%', trend: 'up' as const }
  ];

  const handleCreateNew = () => {
    console.log('Create new analytics report');
  };

  return (
    <div className="flex h-screen bg-charcoal">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Analytics"
          subtitle="Track your website performance and deployment metrics"
          onCreateNew={handleCreateNew}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Time Range Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '7d' ? 'bg-electric text-white' : 'bg-charcoal-light text-gray-300 hover:bg-gray-600'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '30d' ? 'bg-electric text-white' : 'bg-charcoal-light text-gray-300 hover:bg-gray-600'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange('90d')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === '90d' ? 'bg-electric text-white' : 'bg-charcoal-light text-gray-300 hover:bg-gray-600'
                }`}
              >
                90 Days
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <AnalyticsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visitors Chart */}
            <div className="bg-charcoal-light rounded-lg p-6">
              <h3 className="text-white font-bold text-h2 mb-6">Website Traffic</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2d2d2d', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Line type="monotone" dataKey="visitors" stroke="#2F80ED" strokeWidth={3} />
                  <Line type="monotone" dataKey="pageviews" stroke="#27AE60" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Deployments Chart */}
            <div className="bg-charcoal-light rounded-lg p-6">
              <h3 className="text-white font-bold text-h2 mb-6">Deployment Success Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deploymentsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#2d2d2d', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#FFFFFF'
                    }} 
                  />
                  <Bar dataKey="deployments" fill="#2F80ED" />
                  <Bar dataKey="success" fill="#27AE60" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
