import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Ban, CheckCircle, Mail, Crown, Trash2, RotateCcw, Calendar, DollarSign, Globe } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [filterRevenue, setFilterRevenue] = useState('all');
  const [showDeleted, setShowDeleted] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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
      totalRevenue: '$29',
      deletedAt: null
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
      totalRevenue: '$299',
      deletedAt: null
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
      totalRevenue: '$0',
      deletedAt: null
    },
    {
      id: '4',
      name: 'Sarah Connor',
      email: 'sarah@example.com',
      plan: 'Pro',
      status: 'active',
      subdomains: 8,
      lastActive: '3 days ago',
      joinedDate: '2023-11-20',
      totalRevenue: '$58',
      deletedAt: '2024-01-20'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'suspended': return 'bg-error';
      case 'pending': return 'bg-warning';
      default: return 'bg-gray-500';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-500';
      case 'Pro': return 'bg-electric';
      case 'Free': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;
    const matchesDeletedFilter = showDeleted ? user.deletedAt !== null : user.deletedAt === null;
    
    // Date range filter
    let matchesDateRange = true;
    if (filterDateRange !== 'all') {
      const joinedDate = new Date(user.joinedDate);
      const now = new Date();
      const daysDiff = Math.floor((now - joinedDate) / (1000 * 60 * 60 * 24));
      
      switch (filterDateRange) {
        case 'week':
          matchesDateRange = daysDiff <= 7;
          break;
        case 'month':
          matchesDateRange = daysDiff <= 30;
          break;
        case 'quarter':
          matchesDateRange = daysDiff <= 90;
          break;
        case 'year':
          matchesDateRange = daysDiff <= 365;
          break;
      }
    }
    
    // Revenue filter
    let matchesRevenue = true;
    if (filterRevenue !== 'all') {
      const revenue = parseInt(user.totalRevenue.replace('$', ''));
      switch (filterRevenue) {
        case 'free':
          matchesRevenue = revenue === 0;
          break;
        case 'low':
          matchesRevenue = revenue > 0 && revenue < 50;
          break;
        case 'medium':
          matchesRevenue = revenue >= 50 && revenue < 200;
          break;
        case 'high':
          matchesRevenue = revenue >= 200;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPlan && matchesDeletedFilter && matchesDateRange && matchesRevenue;
  });

  const handleSoftDelete = (userId) => {
    console.log('Soft deleting user:', userId);
    // In a real app, this would make an API call to mark the user as deleted
  };

  const handleRestore = (userId) => {
    console.log('Restoring user:', userId);
    // In a real app, this would make an API call to restore the user
  };

  const activeUsersCount = users.filter(user => user.deletedAt === null).length;
  const deletedUsersCount = users.filter(user => user.deletedAt !== null).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Total Users</h3>
          <p className="text-2xl font-bold text-white mt-2">{users.length}</p>
          <p className="text-success text-sm mt-1">+12% from last month</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Active Users</h3>
          <p className="text-2xl font-bold text-white mt-2">{activeUsersCount}</p>
          <p className="text-success text-sm mt-1">88.5% active rate</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Pro Users</h3>
          <p className="text-2xl font-bold text-white mt-2">342</p>
          <p className="text-success text-sm mt-1">27.4% conversion</p>
        </div>
        <div className="bg-charcoal-light rounded-lg p-6">
          <h3 className="text-gray-400 text-sm font-medium">Deleted Users</h3>
          <p className="text-2xl font-bold text-white mt-2">{deletedUsersCount}</p>
          <p className="text-error text-sm mt-1">Soft deleted</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex flex-col gap-4 mb-6">
          {/* Main filter row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
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
            <button
              onClick={() => setShowDeleted(!showDeleted)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showDeleted 
                  ? 'bg-error text-white' 
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {showDeleted ? 'Hide Deleted' : 'Show Deleted'}
            </button>
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>{showAdvancedFilters ? 'Hide Filters' : 'More Filters'}</span>
            </button>
          </div>

          {/* Advanced filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-charcoal rounded-lg border border-gray-600">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Plan Type
                </label>
                <select
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                  className="w-full bg-charcoal-light border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                >
                  <option value="all">All Plans</option>
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Joined Date
                </label>
                <select
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value)}
                  className="w-full bg-charcoal-light border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Revenue Range
                </label>
                <select
                  value={filterRevenue}
                  onChange={(e) => setFilterRevenue(e.target.value)}
                  className="w-full bg-charcoal-light border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                >
                  <option value="all">All Revenue</option>
                  <option value="free">Free ($0)</option>
                  <option value="low">Low ($1-$49)</option>
                  <option value="medium">Medium ($50-$199)</option>
                  <option value="high">High ($200+)</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Filter summary */}
          <div className="text-sm text-gray-400">
            Showing {filteredUsers.length} of {users.length} users
            {(filterStatus !== 'all' || filterPlan !== 'all' || filterDateRange !== 'all' || filterRevenue !== 'all' || searchTerm) && (
              <span className="ml-2 text-electric">
                (filtered)
              </span>
            )}
          </div>
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
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className={`border-b border-gray-700 hover:bg-gray-800 transition-colors ${
                    user.deletedAt ? 'opacity-60' : ''
                  }`}
                >
                  <td className="py-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          user.deletedAt ? 'bg-gray-600' : 'bg-electric'
                        }`}>
                          <span className="text-white text-sm font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className={`font-medium ${user.deletedAt ? 'text-gray-400' : 'text-white'}`}>
                              {user.name}
                            </p>
                            {user.deletedAt && (
                              <span className="px-2 py-1 bg-red-900 text-red-200 text-xs rounded-full">
                                DELETED
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                          {user.deletedAt && (
                            <p className="text-gray-500 text-xs">
                              Deleted: {new Date(user.deletedAt).toLocaleDateString()}
                            </p>
                          )}
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
                      {user.deletedAt ? (
                        <>
                          <button 
                            onClick={() => handleRestore(user.id)}
                            className="p-1 hover:bg-gray-700 rounded" 
                            title="Restore User"
                          >
                            <RotateCcw className="w-4 h-4 text-green-400" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="p-1 hover:bg-gray-700 rounded" title="Send Email">
                            <Mail className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-700 rounded" title="Make Admin">
                            <Crown className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-700 rounded" title="Suspend User">
                            <Ban className="w-4 h-4 text-gray-400" />
                          </button>
                          <button 
                            onClick={() => handleSoftDelete(user.id)}
                            className="p-1 hover:bg-gray-700 rounded" 
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </>
                      )}
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

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">
              {showDeleted ? 'No deleted users found' : 'No users found matching your filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
