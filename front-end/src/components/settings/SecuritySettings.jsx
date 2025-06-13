
import React, { useState } from 'react';
import { Shield, Key, Smartphone, Eye, EyeOff, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import SettingsSection from '../SettingsSection';

const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityNotifications, setSecurityNotifications] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');

  const sessions = [
    {
      id: '1',
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      browser: 'Chrome 120.0',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'iPhone 15',
      location: 'San Francisco, CA',
      browser: 'Safari Mobile',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: '3',
      device: 'iPad Pro',
      location: 'Los Angeles, CA',
      browser: 'Safari 17.1',
      lastActive: '2 days ago',
      current: false
    }
  ];

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full relative transition-colors ${
        enabled ? 'bg-electric' : 'bg-gray-600'
      }`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
        enabled ? 'right-1' : 'left-1'
      }`}></div>
    </button>
  );

  const handleRevokeSession = (sessionId) => {
    console.log('Revoking session:', sessionId);
  };

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Change Password"
        description="Update your account password"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-electric transition-colors"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-electric transition-colors"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full bg-charcoal border border-gray-600 rounded-lg px-4 py-2 pr-10 text-white focus:outline-none focus:border-electric transition-colors"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Password Requirements</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>At least 8 characters</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Contains uppercase letter</span>
              </li>
              <li className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span>Contains lowercase letter</span>
              </li>
              <li className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span>Contains number</span>
              </li>
            </ul>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Two-Factor Authentication"
        description="Add an extra layer of security to your account"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-6 h-6 text-electric" />
              <div>
                <h4 className="text-white font-medium">Authenticator App</h4>
                <p className="text-gray-400 text-sm">
                  {twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Use an app like Google Authenticator'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {twoFactorEnabled && (
                <span className="px-2 py-1 bg-success text-white text-xs rounded-full">
                  Enabled
                </span>
              )}
              <ToggleSwitch 
                enabled={twoFactorEnabled} 
                onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)} 
              />
            </div>
          </div>
          
          {twoFactorEnabled && (
            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Key className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="text-yellow-200 font-medium">Backup Codes</h4>
                  <p className="text-yellow-300 text-sm mt-1">
                    Save these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
                  </p>
                  <button className="btn-secondary mt-3 text-sm">
                    View Backup Codes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SettingsSection>

      <SettingsSection
        title="Security Preferences"
        description="Configure security settings and notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Security Notifications</h4>
                <p className="text-gray-400 text-sm">Get notified of suspicious account activity</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={securityNotifications} 
              onToggle={() => setSecurityNotifications(!securityNotifications)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Session Timeout</h4>
                <p className="text-gray-400 text-sm">Automatically log out after inactivity</p>
              </div>
            </div>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="bg-charcoal border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-electric transition-colors"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="240">4 hours</option>
              <option value="480">8 hours</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Active Sessions"
        description="Manage devices that are currently signed in to your account"
      >
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-electric rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-white font-medium">{session.device}</h4>
                    {session.current && (
                      <span className="px-2 py-1 bg-success text-white text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{session.browser} • {session.location}</p>
                  <p className="text-gray-500 text-xs">Last active: {session.lastActive}</p>
                </div>
              </div>
              {!session.current && (
                <button 
                  onClick={() => handleRevokeSession(session.id)}
                  className="btn-secondary text-sm"
                >
                  Revoke
                </button>
              )}
            </div>
          ))}
          
          <button className="w-full btn-secondary text-sm">
            Revoke All Other Sessions
          </button>
        </div>
      </SettingsSection>
    </div>
  );
};

export default SecuritySettings;
