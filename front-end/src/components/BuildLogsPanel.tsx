
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Download, X, Play, Square } from 'lucide-react';

interface BuildLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'command';
  message: string;
  command?: string;
}

interface BuildLogsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  subdomainName: string;
  buildCommand?: string;
  runCommand?: string;
}

const BuildLogsPanel: React.FC<BuildLogsPanelProps> = ({
  isOpen,
  onClose,
  subdomainName,
  buildCommand = 'npm run build',
  runCommand = 'npm start'
}) => {
  const [logs, setLogs] = useState<BuildLog[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'building' | 'running'>('idle');
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (type: BuildLog['type'], message: string, command?: string) => {
    const newLog: BuildLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      command
    };
    setLogs(prev => [...prev, newLog]);
  };

  const simulateBuildProcess = async () => {
    setIsBuilding(true);
    setCurrentStep('building');
    setLogs([]);

    // Build process simulation
    addLog('command', `$ ${buildCommand}`, buildCommand);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addLog('info', 'Installing dependencies...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addLog('info', 'Found 0 vulnerabilities');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addLog('info', 'Compiling TypeScript...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addLog('success', 'TypeScript compilation completed successfully');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addLog('info', 'Building production bundle...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addLog('info', 'Optimizing assets...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addLog('success', `Build completed successfully!`);
    addLog('info', `Output written to dist/`);
    
    setIsBuilding(false);
    setCurrentStep('idle');
  };

  const simulateRunProcess = async () => {
    setIsRunning(true);
    setCurrentStep('running');
    
    addLog('command', `$ ${runCommand}`, runCommand);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addLog('info', 'Starting development server...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addLog('success', `Server running at https://${subdomainName}.subforge.com`);
    addLog('info', 'Watching for file changes...');
  };

  const stopRunProcess = () => {
    setIsRunning(false);
    setCurrentStep('idle');
    addLog('warning', 'Development server stopped');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const copyLogs = () => {
    const logText = logs.map(log => `[${log.timestamp}] ${log.message}`).join('\n');
    navigator.clipboard.writeText(logText);
    addLog('info', 'Logs copied to clipboard');
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'command': return 'text-electric';
      default: return 'text-gray-300';
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✗';
      case 'warning': return '⚠';
      case 'command': return '$';
      default: return '•';
    }
  };

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-charcoal rounded-xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Terminal className="w-5 h-5 text-electric" />
            <h2 className="text-white font-bold text-lg">
              Build & Run Logs - {subdomainName}
            </h2>
            {currentStep !== 'idle' && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-electric rounded-full animate-pulse"></div>
                <span className="text-electric text-sm capitalize">{currentStep}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={simulateBuildProcess}
              disabled={isBuilding}
              className="btn-secondary text-sm"
            >
              <Play className="w-4 h-4 mr-2" />
              {isBuilding ? 'Building...' : 'Build'}
            </button>
            
            {!isRunning ? (
              <button
                onClick={simulateRunProcess}
                disabled={isBuilding}
                className="btn-secondary text-sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Run
              </button>
            ) : (
              <button
                onClick={stopRunProcess}
                className="btn-secondary text-sm bg-error hover:bg-error/80"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop
              </button>
            )}
            
            <button
              onClick={copyLogs}
              className="text-gray-400 hover:text-white transition-colors p-2"
              title="Copy logs"
            >
              <Copy className="w-4 h-4" />
            </button>
            
            <button
              onClick={clearLogs}
              className="text-gray-400 hover:text-white transition-colors p-2"
              title="Clear logs"
            >
              <Download className="w-4 h-4" />
            </button>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Command Info */}
        <div className="p-4 bg-charcoal-light border-b border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Build Command:</span>
              <code className="ml-2 text-electric font-mono">{buildCommand}</code>
            </div>
            <div>
              <span className="text-gray-400">Run Command:</span>
              <code className="ml-2 text-electric font-mono">{runCommand}</code>
            </div>
          </div>
        </div>

        {/* Logs */}
        <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-black">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No logs yet. Click "Build" or "Run" to start.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3">
                  <span className="text-gray-500 text-xs w-20 flex-shrink-0 mt-0.5">
                    {log.timestamp}
                  </span>
                  <span className={`${getLogColor(log.type)} w-4 flex-shrink-0 mt-0.5`}>
                    {getLogIcon(log.type)}
                  </span>
                  <span className={`${getLogColor(log.type)} flex-1`}>
                    {log.message}
                  </span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-charcoal-light">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{logs.length} log entries</span>
            <span>Press Ctrl+C to stop processes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildLogsPanel;
