
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Grid2x2, 
  GitBranch, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  User
} from 'lucide-react';

const Sidebar = ({ isCollapsed, onToggle, onCreateNew }) => {
  const navItems = [
    { icon: Grid2x2, label: 'My Subdomains', path: '/', badge: null },
    { icon: GitBranch, label: 'Git Repos', path: '/repos', badge: '3' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', badge: null },
    { icon: Settings, label: 'Settings', path: '/settings', badge: null },
    { icon: Shield, label: 'Admin', path: '/admin', badge: 'ADMIN' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    // You can add actual logout functionality like clearing tokens, redirecting, etc.
  };

  return (
    <div className={`bg-charcoal-light border-r border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="text-white font-bold text-lg">SubForge</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1 hover:bg-gray-600 rounded-md transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200
              ${isActive 
                ? 'bg-electric text-white' 
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
              }
            `}
          >
            <item.icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1">
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.badge === 'ADMIN' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-600 text-gray-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile & Logout Section */}
      <div className="p-4 border-t border-gray-700 space-y-3">
        {/* User Profile */}
        {!isCollapsed && (
          <div className="flex items-center space-x-3 px-3 py-2 bg-charcoal rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-electric to-electric-light rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">John Doe</p>
              <p className="text-gray-400 text-xs truncate">john@example.com</p>
            </div>
          </div>
        )}
        
        {/* Creative Logout Button */}
        <button 
          onClick={handleLogout}
          className={`group relative w-full flex items-center justify-center space-x-2 transition-all duration-300 bg-gradient-to-r from-red-600/20 to-orange-600/20 hover:from-red-600/40 hover:to-orange-600/40 border border-red-600/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-lg overflow-hidden ${
            isCollapsed ? 'px-3 py-3' : 'px-4 py-3'
          }`}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          
          <LogOut className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isCollapsed ? '' : 'group-hover:-translate-x-1'}`} />
          {!isCollapsed && (
            <span className="font-medium transition-all duration-200 group-hover:translate-x-1">
              Sign Out
            </span>
          )}
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg shadow-red-500/20"></div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
