
import React from 'react';
import { DollarSign, TrendingUp, CreditCard, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const BillingOverview = () => {
  // Mock revenue data
  const revenueData = [
    { month: 'Jan', revenue: 12400, users: 145 },
    { month: 'Feb', revenue: 14200, users: 167 },
    { month: 'Mar', revenue: 16800, users: 189 },
    { month: 'Apr', revenue: 15600, users: 178 },
    { month: 'May', revenue: 18900, users: 234 },
    { month: 'Jun', revenue: 22100, users: 267 },
  ];

  const planDistribution = [
    { plan: 'Free', users: 1200, revenue: 0 },
    { plan: 'Basic', users: 450, revenue: 4500 },
    { plan: 'Pro', users: 180, revenue: 9000 },
    { plan: 'Enterprise', users: 25, revenue: 12500 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl font-bold">Billing Overview</h2>
        <p className="text-gray-400">Monitor revenue, subscriptions, and billing metrics</p>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 text-sm">Monthly Revenue</div>
              <div className="text-white text-2xl font-bold">$22,100</div>
              <div className="text-success text-sm">↗ 17% from last month</div>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 text-sm">Annual Recurring Revenue</div>
              <div className="text-white text-2xl font-bold">$265K</div>
              <div className="text-success text-sm">↗ 23% YoY</div>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 text-sm">Paying Customers</div>
              <div className="text-white text-2xl font-bold">655</div>
              <div className="text-success text-sm">↗ 12% this month</div>
            </div>
            <Users className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-charcoal-light rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gray-400 text-sm">Avg Revenue Per User</div>
              <div className="text-white text-2xl font-bold">$33.74</div>
              <div className="text-success text-sm">↗ 5% this month</div>
            </div>
            <CreditCard className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Subscription Plans</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="plan" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="users" fill="#3b82f6" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-white text-lg font-semibold mb-4">Plan Details</h3>
          <div className="space-y-4">
            {planDistribution.map((plan) => (
              <div key={plan.plan} className="flex items-center justify-between p-4 bg-charcoal rounded-lg">
                <div>
                  <div className="text-white font-medium">{plan.plan}</div>
                  <div className="text-gray-400 text-sm">{plan.users} users</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">
                    ${plan.revenue.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">monthly</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 text-gray-400">Customer</th>
                <th className="text-left py-2 text-gray-400">Plan</th>
                <th className="text-left py-2 text-gray-400">Amount</th>
                <th className="text-left py-2 text-gray-400">Status</th>
                <th className="text-left py-2 text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-white">john@example.com</td>
                <td className="py-3 text-gray-300">Pro</td>
                <td className="py-3 text-white">$50.00</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Paid</span>
                </td>
                <td className="py-3 text-gray-400">2024-01-15</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-white">jane@company.com</td>
                <td className="py-3 text-gray-300">Enterprise</td>
                <td className="py-3 text-white">$500.00</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Paid</span>
                </td>
                <td className="py-3 text-gray-400">2024-01-14</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-white">mike@startup.io</td>
                <td className="py-3 text-gray-300">Basic</td>
                <td className="py-3 text-white">$10.00</td>
                <td className="py-3">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                </td>
                <td className="py-3 text-gray-400">2024-01-13</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingOverview;
