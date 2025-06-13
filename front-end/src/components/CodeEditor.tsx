
import React, { useState } from 'react';
import { Play, Save, Download, Monitor, Smartphone, Copy } from 'lucide-react';

interface CodeEditorProps {
  onClose: () => void;
  subdomain: {
    id: string;
    name: string;
    url: string;
  };
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onClose, subdomain }) => {
  const [activeFile, setActiveFile] = useState('index.html');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isDeploying, setIsDeploying] = useState(false);

  const files = [
    { name: 'index.html', type: 'html' },
    { name: 'style.css', type: 'css' },
    { name: 'script.js', type: 'javascript' },
    { name: 'config.json', type: 'json' }
  ];

  const logs = [
    { type: 'info', message: 'Starting build process...', timestamp: '14:32:01' },
    { type: 'success', message: 'Dependencies installed successfully', timestamp: '14:32:15' },
    { type: 'info', message: 'Compiling assets...', timestamp: '14:32:18' },
    { type: 'success', message: 'Build completed successfully', timestamp: '14:32:22' },
    { type: 'info', message: 'Deploying to subdomain...', timestamp: '14:32:23' },
    { type: 'success', message: 'Deployment successful!', timestamp: '14:32:25' },
  ];

  const getLogColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-gray-300';
    }
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => setIsDeploying(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-charcoal z-50 flex flex-col">
      {/* Header */}
      <div className="bg-charcoal-light border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </button>
          <div>
            <h2 className="text-white font-bold text-h2">{subdomain.name}</h2>
            <p className="text-gray-400 text-sm">{subdomain.url}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
          <button 
            onClick={handleDeploy}
            className="btn-primary relative overflow-hidden"
            disabled={isDeploying}
          >
            {isDeploying ? (
              <>
                <div className="absolute inset-0 bg-electric-light animate-progress"></div>
                <span className="relative">Deploying...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Deploy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div className="w-1/2 flex flex-col border-r border-gray-700">
          {/* File Tabs */}
          <div className="bg-charcoal-light border-b border-gray-700 flex">
            {files.map((file, index) => (
              <button
                key={index}
                onClick={() => setActiveFile(file.name)}
                className={`px-4 py-3 text-sm font-medium border-r border-gray-700 transition-colors ${
                  activeFile === file.name
                    ? 'bg-charcoal text-white border-b-2 border-electric'
                    : 'text-gray-400 hover:text-white hover:bg-gray-600'
                }`}
              >
                {file.name}
              </button>
            ))}
          </div>

          {/* Code Editor */}
          <div className="flex-1 bg-charcoal p-4 font-mono text-code overflow-auto">
            <div className="text-gray-300">
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">1</span>
                <span>&lt;!DOCTYPE html&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">2</span>
                <span>&lt;html lang="en"&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">3</span>
                <span>&lt;head&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">4</span>
                <span className="pl-4">&lt;meta charset="UTF-8"&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">5</span>
                <span className="pl-4">&lt;title&gt;{subdomain.name}&lt;/title&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">6</span>
                <span>&lt;/head&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">7</span>
                <span>&lt;body&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">8</span>
                <span className="pl-4">&lt;h1&gt;Welcome to {subdomain.name}&lt;/h1&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs mb-4">
                <span className="w-8">9</span>
                <span>&lt;/body&gt;</span>
              </div>
              <div className="flex text-gray-500 text-xs">
                <span className="w-8">10</span>
                <span>&lt;/html&gt;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 flex flex-col">
          {/* Preview Header */}
          <div className="bg-charcoal-light border-b border-gray-700 px-4 py-3 flex items-center justify-between">
            <h3 className="text-white font-medium">Live Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'desktop' ? 'bg-electric text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'mobile' ? 'bg-electric text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 bg-white flex items-center justify-center">
            <div className={`bg-white border border-gray-300 shadow-lg ${
              viewMode === 'mobile' ? 'w-80 h-96' : 'w-full h-full'
            } flex items-center justify-center`}>
              <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Welcome to {subdomain.name}
                </h1>
                <p className="text-gray-600">Your website preview appears here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Panel */}
      <div className="h-60 bg-black border-t border-gray-700 flex flex-col">
        <div className="bg-charcoal-light px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <h4 className="text-white font-medium">Build Logs</h4>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 p-4 font-mono text-code overflow-auto">
          {logs.map((log, index) => (
            <div key={index} className="flex items-center mb-1">
              <span className="text-gray-500 text-xs w-20">{log.timestamp}</span>
              <span className={`${getLogColor(log.type)} text-sm`}>
                {log.message}
              </span>
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-gray-500 text-xs w-20">14:32:25</span>
            <span className="text-electric text-sm animate-pulse">█</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
