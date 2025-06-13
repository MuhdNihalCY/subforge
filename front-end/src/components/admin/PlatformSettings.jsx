
import React, { useState } from 'react';
import { Save, AlertTriangle, Shield, Database, Mail, Globe } from 'lucide-react';

const PlatformSettings = () => {
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'SubForge',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    
    // Security Settings
    passwordMinLength: 8,
    enableTwoFactor: true,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    
    // Email Settings
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUser: 'noreply@subforge.com',
    smtpPassword: '••••••••',
    
    // Resource Limits
    maxSubdomainsPerUser: 10,
    maxStoragePerUser: 1024, // MB
    maxBandwidthPerUser: 10240, // MB
    buildTimeout: 600, // seconds
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving platform settings:', settings);
    // Here you would send the settings to your backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl font-bold">Platform Settings</h2>
        <p className="text-gray-400">Configure global platform settings and limits</p>
      </div>

      {/* General Settings */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="w-5 h-5 text-blue-400" />
          <h3 className="text-white text-lg font-semibold">General Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Platform Name</label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => handleSettingChange('platformName', e.target.value)}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
            />
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-white">Maintenance Mode</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-white">Allow New Registrations</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-white">Require Email Verification</span>
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-red-400" />
          <h3 className="text-white text-lg font-semibold">Security Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Minimum Password Length</label>
            <input
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
              min="6"
              max="32"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Session Timeout (hours)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
              min="1"
              max="168"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Max Login Attempts</label>
            <input
              type="number"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
              min="3"
              max="10"
            />
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.enableTwoFactor}
                onChange={(e) => handleSettingChange('enableTwoFactor', e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-white">Enable Two-Factor Authentication</span>
            </label>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="w-5 h-5 text-green-400" />
          <h3 className="text-white text-lg font-semibold">Email Settings</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">SMTP Host</label>
            <input
              type="text"
              value={settings.smtpHost}
              onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">SMTP Port</label>
            <input
              type="number"
              value={settings.smtpPort}
              onChange={(e) => handleSettingChange('smtpPort', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">SMTP Username</label>
            <input
              type="email"
              value={settings.smtpUser}
              onChange={(e) => handleSettingChange('smtpUser', e.target.value)}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">SMTP Password</label>
            <input
              type="password"
              value={settings.smtpPassword}
              onChange={(e) => handleSettingChange('smtpPassword', e.target.value)}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Resource Limits */}
      <div className="bg-charcoal-light rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-yellow-400" />
          <h3 className="text-white text-lg font-semibold">Resource Limits</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-medium mb-2">Max Subdomains per User</label>
            <input
              type="number"
              value={settings.maxSubdomainsPerUser}
              onChange={(e) => handleSettingChange('maxSubdomainsPerUser', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Max Storage per User (MB)</label>
            <input
              type="number"
              value={settings.maxStoragePerUser}
              onChange={(e) => handleSettingChange('maxStoragePerUser', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
              min="100"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Max Bandwidth per User (MB)</label>
            <input
              type="number"
              value={settings.maxBandwidthPerUser}
              onChange={(e) => handleSettingChange('maxBandwidthPerUser', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
              min="1000"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Build Timeout (seconds)</label>
            <input
              type="number"
              value={settings.buildTimeout}
              onChange={(e) => handleSettingChange('buildTimeout', parseInt(e.target.value))}
              className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-electric focus:outline-none"
              min="60"
              max="3600"
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-white text-lg font-semibold">Danger Zone</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Reset All Settings</div>
              <div className="text-gray-400 text-sm">Reset all platform settings to default values</div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
              Reset Settings
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Clear All User Data</div>
              <div className="text-gray-400 text-sm">Permanently delete all user accounts and data</div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
              Clear Data
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
};

export default PlatformSettings;
