
import React from 'react';
import { DollarSign, TrendingUp, CreditCard, Users } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BillingOverview: React.FC = () => {
  const revenueData = [
    { month: 'Jan', revenue: 15420, subscriptions: 280 },
    { month: 'Feb', revenue: 18750, subscriptions: 310 },
    { month: 'Mar', revenue: 22380, subscriptions: 342 },
    { month: 'Apr', revenue: 26940, subscriptions: 385 },
    { month: 'May', revenue: 31200, subscriptions: 420 },
    { month: 'Jun', revenue: 34680, subscriptions: 456 },
  ];

  const topCustomers = [
    { name: 'TechCorp Inc.', plan: 'Enterprise', revenue: '$2,999', growth: '+15%' },
    { name: 'StartupX', plan: 'Pro', revenue: '$299', growth: '+8%' },
    { name: 'DevStudio', plan: 'Enterprise', revenue: '$2,999', growth: '+22%' },
    { name: 'WebAgency', plan: 'Pro', revenue: '$299', growth: '+5%' },
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">Monthly Revenue</h3>
              <p className="text-2xl font-bold text-white mt-2">$34,680</p>
              <p className="text-success text-sm mt-1">+11% from last month</p>
            </div>
            <DollarSign className="w-8 h-8 text-success" />
          </div>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">Active Subscriptions</h3>
              <p className="text-2xl font-bold text-white mt-2">456</p>
              <p className="text-success text-sm mt-1">+8% new this month</p>
            </div>
            <Users className="w-8 h-8 text-electric" />
          </div>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">Average Revenue per User</h3>
              <p className="text-2xl font-bold text-white mt-2">$76</p>
              <p className="text-success text-sm mt-1">+3% improvement</p>
            </div>
            <TrendingUp className="w-8 h-8 text-warning" />
          </div>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-400 text-sm font-medium">Churn Rate</h3>
              <p className="text-2xl font-bold text-white mt-2">2.3%</p>
              <p className="text-error text-sm mt-1">-0.5% from last month</p>
            </div>
            <CreditCard className="w-8 h-8 text-error" />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <h3 className="text-white font-bold text-lg mb-4">Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={revenueData}>
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
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10B981" 
              fill="#10B981" 
              fillOpacity={0.3}
              name="Revenue ($)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Customers and Payment Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white font-bold text-lg mb-4">Top Revenue Customers</h3>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-charcoal rounded-lg">
                <div>
                  <p className="text-white font-medium">{customer.name}</p>
                  <p className="text-gray-400 text-sm">{customer.plan} Plan</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{customer.revenue}</p>
                  <p className="text-success text-sm">{customer.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white font-bold text-lg mb-4">Payment Issues</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Failed Payments</p>
                  <p className="text-gray-400 text-sm">Last 24 hours</p>
                </div>
                <span className="text-error font-bold text-xl">7</span>
              </div>
            </div>
            <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Pending Renewals</p>
                  <p className="text-gray-400 text-sm">Due this week</p>
                </div>
                <span className="text-warning font-bold text-xl">23</span>
              </div>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Subscription Upgrades</p>
                  <p className="text-gray-400 text-sm">This month</p>
                </div>
                <span className="text-electric font-bold text-xl">34</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingOverview;
