
import React, { useState, useEffect } from 'react';
import { X, Download, Trash2 } from 'lucide-react';

const BuildLogsPanel = ({ isOpen, onClose, subdomainId }) => {
  const [logs, setLogs] = useState([]);
  const [isLive, setIsLive] = useState(false);

  // Mock log data - in real implementation, this would come from your backend
  useEffect(() => {
    if (isOpen && subdomainId) {
      const mockLogs = [
        { timestamp: '2024-01-15 10:30:15', level: 'info', message: 'Starting build process...' },
        { timestamp: '2024-01-15 10:30:16', level: 'info', message: 'Installing dependencies...' },
        { timestamp: '2024-01-15 10:30:45', level: 'info', message: 'npm install completed successfully' },
        { timestamp: '2024-01-15 10:30:46', level: 'info', message: 'Running build command: npm run build' },
        { timestamp: '2024-01-15 10:31:20', level: 'success', message: 'Build completed successfully' },
        { timestamp: '2024-01-15 10:31:21', level: 'info', message: 'Deploying to subdomain...' },
        { timestamp: '2024-01-15 10:31:25', level: 'success', message: 'Deployment successful! Site is now live.' }
      ];
      setLogs(mockLogs);
    }
  }, [isOpen, subdomainId]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      default: return 'text-gray-300';
    }
  };

  const handleDownloadLogs = () => {
    const logText = logs.map(log => `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`).join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subdomain-${subdomainId}-logs.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-charcoal-light rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-white font-bold text-h2">Build Logs</h2>
            <p className="text-gray-400 text-sm">Subdomain ID: {subdomainId}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadLogs}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
              title="Download Logs"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={handleClearLogs}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
              title="Clear Logs"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Logs Content */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="bg-black rounded-lg h-full p-4 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                No logs available
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-2 flex">
                  <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
                  <span className={`mr-2 font-bold ${getLevelColor(log.level)}`}>
                    {log.level.toUpperCase()}:
                  </span>
                  <span className="text-gray-200">{log.message}</span>
                </div>
              ))
            )}
            
            {/* Live indicator */}
            {isLive && (
              <div className="flex items-center text-green-400 mt-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm">Live logs (auto-updating)</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
                className="mr-2"
              />
              Auto-refresh logs
            </label>
          </div>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildLogsPanel;
