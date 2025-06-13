
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ id, type, title, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error': return <XCircle className="w-5 h-5 text-error" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-warning" />;
      default: return <AlertCircle className="w-5 h-5 text-electric" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success': return 'border-l-success';
      case 'error': return 'border-l-error';
      case 'warning': return 'border-l-warning';
      default: return 'border-l-electric';
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } bg-charcoal-light border border-gray-600 ${getBorderColor()} border-l-4 rounded-lg shadow-card p-4 mb-3 animate-slide-up`}
    >
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1">
          <h4 className="text-white font-medium text-sm">{title}</h4>
          <p className="text-gray-400 text-sm mt-1">{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
