
import { useState, useEffect } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deployment',
      title: 'Deployment Successful',
      message: 'Your site "my-portfolio" has been deployed successfully',
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      read: false,
      icon: '🚀'
    },
    {
      id: 2,
      type: 'security',
      title: 'New Login Detected',
      message: 'A new login was detected from Chrome on Windows',
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      read: false,
      icon: '🔒'
    },
    {
      id: 3,
      type: 'system',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight at 2 AM UTC',
      timestamp: new Date(Date.now() - 6 * 60 * 60000), // 6 hours ago
      read: true,
      icon: '⚙️'
    },
    {
      id: 4,
      type: 'billing',
      title: 'Payment Successful',
      message: 'Your monthly subscription has been renewed',
      timestamp: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
      read: true,
      icon: '💳'
    },
    {
      id: 5,
      type: 'deployment',
      title: 'Build Failed',
      message: 'Build failed for "blog-site" - check your configuration',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60000), // 2 days ago
      read: true,
      icon: '❌'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };
};
