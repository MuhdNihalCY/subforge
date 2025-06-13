
import React, { useState } from 'react';
import { X, Check, Trash2, Filter, Bell } from 'lucide-react';

const NotificationsPage = ({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDeleteNotification,
  onClose 
}) => {
  const [filter, setFilter] = useState('all');

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'deployment':
        return notification.type === 'deployment';
      case 'security':
        return notification.type === 'security';
      case 'system':
        return notification.type === 'system';
      case 'billing':
        return notification.type === 'billing';
      default:
        return true;
    }
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'deployment':
        return 'text-blue-400';
      case 'security':
        return 'text-red-400';
      case 'system':
        return 'text-yellow-400';
      case 'billing':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-charcoal rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-electric" />
              <h2 className="text-xl font-bold text-white">All Notifications</h2>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onMarkAllAsRead}
                className="btn-secondary flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Mark All Read</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 mt-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'unread', label: 'Unread' },
                { key: 'deployment', label: 'Deployments' },
                { key: 'security', label: 'Security' },
                { key: 'system', label: 'System' },
                { key: 'billing', label: 'Billing' }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === filterOption.key
                      ? 'bg-electric text-white'
                      : 'bg-charcoal-light text-gray-400 hover:text-white'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No notifications found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    !notification.read
                      ? 'bg-charcoal-light border-electric/20'
                      : 'bg-charcoal-light/50 border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <span className="text-2xl">{notification.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium ${
                            !notification.read ? 'text-white' : 'text-gray-300'
                          }`}>
                            {notification.title}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full capitalize ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-electric rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => onMarkAsRead(notification.id)}
                          className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 text-gray-400" />
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteNotification(notification.id)}
                        className="p-2 hover:bg-red-600/20 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
