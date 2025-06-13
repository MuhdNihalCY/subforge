
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Ban, CheckCircle, Mail, Crown } from 'lucide-react';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'Pro',
      status: 'active',
      subdomains: 5,
      lastActive: '2 hours ago',
      joinedDate: '2024-01-15',
      totalRevenue: '$29'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      plan: 'Enterprise',
      status: 'active',
      subdomains: 12,
      lastActive: '1 day ago',
      joinedDate: '2023-12-01',
      totalRevenue: '$299'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      plan: 'Free',
      status: 'suspended',
      subdomains: 1,
      lastActive: '1 week ago',
      joinedDate: '2024-02-10',
      totalRevenue: '$0'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'suspended': return 'bg-error';
      case 'pending': return 'bg-warning';
      default: return 'bg-gray-500';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-500';
      case 'Pro': return 'bg-electric';
      case 'Free': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
          <p className="text-2xl font-bold text-white mt-2">1,247</p>
          <p className="text-success text-sm mt-1">+12% from last month</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Active Users</h3>
          <p className="text-2xl font-bold text-white mt-2">1,103</p>
          <p className="text-success text-sm mt-1">88.5% active rate</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Pro Users</h3>
          <p className="text-2xl font-bold text-white mt-2">342</p>
          <p className="text-success text-sm mt-1">27.4% conversion</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Enterprise</h3>
          <p className="text-2xl font-bold text-white mt-2">89</p>
          <p className="text-success text-sm mt-1">7.1% of total</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-charcoal border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-electric transition-colors"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
          <button className="btn-secondary flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left text-gray-400 font-medium py-3">User</th>
                <th className="text-left text-gray-400 font-medium py-3">Plan</th>
                <th className="text-left text-gray-400 font-medium py-3">Status</th>
                <th className="text-left text-gray-400 font-medium py-3">Subdomains</th>
                <th className="text-left text-gray-400 font-medium py-3">Revenue</th>
                <th className="text-left text-gray-400 font-medium py-3">Last Active</th>
                <th className="text-left text-gray-400 font-medium py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
                  <td className="py-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-electric rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getPlanColor(user.plan)}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-white">{user.subdomains}</td>
                  <td className="py-4 text-white font-medium">{user.totalRevenue}</td>
                  <td className="py-4 text-gray-400">{user.lastActive}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-700 rounded" title="Send Email">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded" title="Make Admin">
                        <Crown className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded" title="Suspend User">
                        <Ban className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-1 hover:bg-gray-700 rounded" title="More Actions">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
