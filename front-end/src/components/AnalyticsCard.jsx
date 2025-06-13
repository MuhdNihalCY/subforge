
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const AnalyticsCard = ({ title, value, change, trend }) => {
  return (
    <div className="bg-charcoal-light rounded-lg p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={`flex items-center space-x-1 ${
          trend === 'up' ? 'text-success' : 'text-error'
        }`}>
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );
};

export default AnalyticsCard;
