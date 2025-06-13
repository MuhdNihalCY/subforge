
import React from 'react';
import { X, Eye } from 'lucide-react';

const NotificationDropdown = ({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onViewAll,
  isVisible 
}) => {
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const recentNotifications = notifications.slice(0, 5);

  if (!isVisible) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-charcoal border border-gray-600 rounded-lg shadow-lg z-50">
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">Notifications</h3>
          <button
            onClick={onMarkAllAsRead}
            className="text-electric hover:text-electric/80 text-sm flex items-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>Mark all read</span>
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {recentNotifications.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            No notifications
          </div>
        ) : (
          recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-700 hover:bg-charcoal-light transition-colors ${
                !notification.read ? 'bg-charcoal-light/50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg">{notification.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      !notification.read ? 'text-white' : 'text-gray-300'
                    }`}>
                      {notification.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-electric rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <button
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-xs text-electric hover:text-electric/80 mt-2"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 5 && (
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={onViewAll}
            className="w-full text-center text-electric hover:text-electric/80 text-sm font-medium"
          >
            View All Notifications ({notifications.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
