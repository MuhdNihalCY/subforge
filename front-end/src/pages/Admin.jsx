
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import UserManagement from '../components/admin/UserManagement';
import SystemAnalytics from '../components/admin/SystemAnalytics';
import BillingOverview from '../components/admin/BillingOverview';
import PlatformSettings from '../components/admin/PlatformSettings';

const Admin = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'User Management' },
    { id: 'analytics', label: 'System Analytics' },
    { id: 'billing', label: 'Billing Overview' },
    { id: 'settings', label: 'Platform Settings' }
  ];

  const handleCreateNew = () => {
    console.log('Admin create new action');
  };

  return (
    <div className="flex h-screen bg-charcoal">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Super Admin Dashboard"
          subtitle="Manage users, analytics, and platform settings"
          onCreateNew={handleCreateNew}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-charcoal-light rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-electric text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'users' && <UserManagement />}
              {activeTab === 'analytics' && <SystemAnalytics />}
              {activeTab === 'billing' && <BillingOverview />}
              {activeTab === 'settings' && <PlatformSettings />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
