import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import SettingsSection from '../components/SettingsSection';
import NotificationSettings from '../components/settings/NotificationSettings';
import SecuritySettings from '../components/settings/SecuritySettings';

const Settings: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'billing', label: 'Billing' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' }
  ];

  const handleCreateNew = () => {
    console.log('Create new settings');
  };

  return (
    <div className="flex h-screen bg-charcoal">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="Settings"
          subtitle="Manage your account and preferences"
          onCreateNew={handleCreateNew}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
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
              {activeTab === 'account' && (
                <>
                  <SettingsSection
                    title="Profile Information"
                    description="Update your account profile information"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                        />
                      </div>
                    </div>
                  </SettingsSection>

                  <SettingsSection
                    title="Account Preferences"
                    description="Customize your account settings"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Dark Mode</h4>
                          <p className="text-gray-400 text-sm">Use dark theme across the application</p>
                        </div>
                        <button className="bg-electric w-12 h-6 rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Auto-deploy</h4>
                          <p className="text-gray-400 text-sm">Automatically deploy when pushing to main branch</p>
                        </div>
                        <button className="bg-gray-600 w-12 h-6 rounded-full relative">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </button>
                      </div>
                    </div>
                  </SettingsSection>
                </>
              )}

              {activeTab === 'billing' && (
                <SettingsSection
                  title="Billing Information"
                  description="Manage your subscription and billing details"
                >
                  <div className="bg-charcoal-light rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-white font-bold text-lg">Pro Plan</h4>
                        <p className="text-gray-400">$29/month</p>
                      </div>
                      <span className="status-badge bg-success text-white">Active</span>
                    </div>
                    <p className="text-gray-400 mb-4">Next billing date: January 15, 2024</p>
                    <div className="flex space-x-3">
                      <button className="btn-primary">Manage Subscription</button>
                      <button className="btn-secondary">View Invoices</button>
                    </div>
                  </div>
                </SettingsSection>
              )}

              {activeTab === 'integrations' && (
                <SettingsSection
                  title="Connected Services"
                  description="Manage your third-party integrations"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-charcoal-light rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">GH</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">GitHub</h4>
                          <p className="text-gray-400 text-sm">Connected as @johndoe</p>
                        </div>
                      </div>
                      <button className="btn-secondary text-sm">Disconnect</button>
                    </div>
                    <div className="flex items-center justify-between bg-charcoal-light rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">V</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Vercel</h4>
                          <p className="text-gray-400 text-sm">Not connected</p>
                        </div>
                      </div>
                      <button className="btn-primary text-sm">Connect</button>
                    </div>
                  </div>
                </SettingsSection>
              )}

              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'security' && <SecuritySettings />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
