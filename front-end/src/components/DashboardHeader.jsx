
import React, { useState } from 'react';
import { Search, Plus, Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import NotificationDropdown from './NotificationDropdown';
import NotificationsPage from './NotificationsPage';

const DashboardHeader = ({ 
  title, 
  subtitle, 
  onCreateNew 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  const handleNotificationClick = () => {
    setShowDropdown(false);
    setShowFullPage(true);
  };

  const handleViewAll = () => {
    setShowDropdown(false);
    setShowFullPage(true);
  };

  return (
    <>
      <div className="bg-charcoal border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div>
            <h1 className="text-h1 text-white font-bold">{title}</h1>
            {subtitle && (
              <p className="text-gray-400 text-body mt-1">{subtitle}</p>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search subdomains..."
                className="bg-charcoal-light border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-electric transition-colors w-64"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                onClick={handleNotificationClick}
              >
                <Bell className="w-5 h-5 text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full text-xs text-white flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              <div
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <NotificationDropdown
                  notifications={notifications}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                  onViewAll={handleViewAll}
                  isVisible={showDropdown}
                />
              </div>
            </div>

            {/* Create Button */}
            <button 
              onClick={onCreateNew}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Notifications Page */}
      {showFullPage && (
        <NotificationsPage
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onDeleteNotification={deleteNotification}
          onClose={() => setShowFullPage(false)}
        />
      )}
    </>
  );
};

export default DashboardHeader;
