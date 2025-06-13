
import React, { useState } from 'react';
import { Save, AlertTriangle, Shield, Globe, Database } from 'lucide-react';

const PlatformSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    maxSubdomainsPerUser: 10,
    maxStoragePerUser: 1024,
    allowCustomDomains: true,
    enableSignups: true,
    maintenanceMode: false,
    autoBackups: true,
    deploymentTimeout: 600,
    maxConcurrentBuilds: 5
  });

  const handleSettingChange = (key: string, value: boolean | number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Platform Status */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-bold text-lg">Platform Status</h3>
            <p className="text-gray-400">Control global platform settings</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-success font-medium">Operational</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-4 bg-charcoal rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <div>
                <p className="text-white font-medium">Maintenance Mode</p>
                <p className="text-gray-400 text-sm">Disable new deployments</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('maintenanceMode', !settings.maintenanceMode)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                settings.maintenanceMode ? 'bg-warning' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                settings.maintenanceMode ? 'right-1' : 'left-1'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-charcoal rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-electric" />
              <div>
                <p className="text-white font-medium">New Signups</p>
                <p className="text-gray-400 text-sm">Allow new user registration</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('enableSignups', !settings.enableSignups)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                settings.enableSignups ? 'bg-success' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                settings.enableSignups ? 'right-1' : 'left-1'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Resource Limits */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="w-5 h-5 text-electric" />
          <h3 className="text-white font-bold text-lg">Resource Limits</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Max Subdomains per User
            </label>
            <input
              type="number"
              value={settings.maxSubdomainsPerUser}
              onChange={(e) => handleSettingChange('maxSubdomainsPerUser', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Max Storage per User (MB)
            </label>
            <input
              type="number"
              value={settings.maxStoragePerUser}
              onChange={(e) => handleSettingChange('maxStoragePerUser', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Deployment Timeout (seconds)
            </label>
            <input
              type="number"
              value={settings.deploymentTimeout}
              onChange={(e) => handleSettingChange('deploymentTimeout', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Max Concurrent Builds
            </label>
            <input
              type="number"
              value={settings.maxConcurrentBuilds}
              onChange={(e) => handleSettingChange('maxConcurrentBuilds', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Database className="w-5 h-5 text-electric" />
          <h3 className="text-white font-bold text-lg">Feature Controls</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-charcoal rounded-lg">
            <div>
              <p className="text-white font-medium">Custom Domains</p>
              <p className="text-gray-400 text-sm">Allow users to connect custom domains</p>
            </div>
            <button
              onClick={() => handleSettingChange('allowCustomDomains', !settings.allowCustomDomains)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                settings.allowCustomDomains ? 'bg-success' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                settings.allowCustomDomains ? 'right-1' : 'left-1'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-charcoal rounded-lg">
            <div>
              <p className="text-white font-medium">Automatic Backups</p>
              <p className="text-gray-400 text-sm">Enable daily automated backups</p>
            </div>
            <button
              onClick={() => handleSettingChange('autoBackups', !settings.autoBackups)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                settings.autoBackups ? 'bg-success' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                settings.autoBackups ? 'right-1' : 'left-1'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="btn-primary flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Save All Changes</span>
        </button>
      </div>
    </div>
  );
};

export default PlatformSettings;
