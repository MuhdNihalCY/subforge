
import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Monitor, Volume2 } from 'lucide-react';
import SettingsSection from '../SettingsSection';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    deployments: true,
    systemUpdates: true,
    billingAlerts: true,
    securityAlerts: true,
    marketingEmails: false,
    weeklyDigest: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    deployments: true,
    buildFailures: true,
    systemMaintenance: false,
    securityAlerts: true
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    deployments: true,
    buildLogs: true,
    systemMessages: true,
    tips: true
  });

  const handleEmailToggle = (key) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePushToggle = (key) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInAppToggle = (key) => {
    setInAppNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Email Notifications"
        description="Manage what emails you receive"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Deployment Updates</h4>
                <p className="text-gray-400 text-sm">Get notified when your sites are deployed</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={emailNotifications.deployments} 
              onToggle={() => handleEmailToggle('deployments')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">System Updates</h4>
                <p className="text-gray-400 text-sm">Platform updates and new features</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={emailNotifications.systemUpdates} 
              onToggle={() => handleEmailToggle('systemUpdates')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Billing Alerts</h4>
                <p className="text-gray-400 text-sm">Payment failures and subscription changes</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={emailNotifications.billingAlerts} 
              onToggle={() => handleEmailToggle('billingAlerts')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Security Alerts</h4>
                <p className="text-gray-400 text-sm">Important security notifications</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={emailNotifications.securityAlerts} 
              onToggle={() => handleEmailToggle('securityAlerts')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Marketing Emails</h4>
                <p className="text-gray-400 text-sm">Product updates and tips</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={emailNotifications.marketingEmails} 
              onToggle={() => handleEmailToggle('marketingEmails')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Weekly Digest</h4>
                <p className="text-gray-400 text-sm">Summary of your week's activity</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={emailNotifications.weeklyDigest} 
              onToggle={() => handleEmailToggle('weeklyDigest')} 
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Push Notifications"
        description="Browser and mobile push notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Successful Deployments</h4>
                <p className="text-gray-400 text-sm">When your sites go live</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={pushNotifications.deployments} 
              onToggle={() => handlePushToggle('deployments')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Build Failures</h4>
                <p className="text-gray-400 text-sm">When builds fail or encounter errors</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={pushNotifications.buildFailures} 
              onToggle={() => handlePushToggle('buildFailures')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">System Maintenance</h4>
                <p className="text-gray-400 text-sm">Scheduled maintenance windows</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={pushNotifications.systemMaintenance} 
              onToggle={() => handlePushToggle('systemMaintenance')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Security Alerts</h4>
                <p className="text-gray-400 text-sm">Critical security notifications</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={pushNotifications.securityAlerts} 
              onToggle={() => handlePushToggle('securityAlerts')} 
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="In-App Notifications"
        description="Notifications within the application"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Deployment Status</h4>
                <p className="text-gray-400 text-sm">Real-time deployment updates</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={inAppNotifications.deployments} 
              onToggle={() => handleInAppToggle('deployments')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Build Logs</h4>
                <p className="text-gray-400 text-sm">Show build log notifications</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={inAppNotifications.buildLogs} 
              onToggle={() => handleInAppToggle('buildLogs')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">System Messages</h4>
                <p className="text-gray-400 text-sm">Important system announcements</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={inAppNotifications.systemMessages} 
              onToggle={() => handleInAppToggle('systemMessages')} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-electric" />
              <div>
                <h4 className="text-white font-medium">Tips & Tutorials</h4>
                <p className="text-gray-400 text-sm">Helpful tips and feature highlights</p>
              </div>
            </div>
            <ToggleSwitch 
              enabled={inAppNotifications.tips} 
              onToggle={() => handleInAppToggle('tips')} 
            />
          </div>
        </div>
      </SettingsSection>
    </div>
  );
};

export default NotificationSettings;
