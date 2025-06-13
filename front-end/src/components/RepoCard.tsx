
import React, { useState } from 'react';
import { GitBranch, Github, Lock, Globe, MoreVertical, Link, X } from 'lucide-react';

interface RepoCardProps {
  repo: {
    id: string;
    name: string;
    fullName: string;
    url: string;
    branch: string;
    lastCommit: string;
    lastCommitTime: string;
    status: 'connected' | 'syncing' | 'error';
    language: string;
    isPrivate: boolean;
  };
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onViewCommits: (url: string) => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ 
  repo, 
  onConnect, 
  onDisconnect, 
  onViewCommits 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-success text-white';
      case 'syncing': return 'bg-warning text-black';
      case 'error': return 'bg-error text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected';
      case 'syncing': return 'Syncing';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'TypeScript': return 'bg-blue-500';
      case 'JavaScript': return 'bg-yellow-500';
      case 'React': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      className="bg-charcoal-light rounded-lg p-6 card-hover animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Github className="w-8 h-8 text-gray-400" />
          <div>
            <h3 className="text-white font-bold text-lg">{repo.name}</h3>
            <p className="text-gray-400 text-sm">{repo.fullName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {repo.isPrivate ? (
            <Lock className="w-4 h-4 text-gray-400" />
          ) : (
            <Globe className="w-4 h-4 text-gray-400" />
          )}
          <button className="p-1 hover:bg-gray-600 rounded">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Branch and Language */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <GitBranch className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300 text-sm">{repo.branch}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
          <span className="text-gray-300 text-sm">{repo.language}</span>
        </div>
      </div>

      {/* Last Commit */}
      <div className="mb-4">
        <p className="text-gray-300 text-sm mb-1">{repo.lastCommit}</p>
        <p className="text-gray-500 text-xs">{repo.lastCommitTime}</p>
      </div>

      {/* Status and Actions */}
      <div className="flex items-center justify-between">
        <span className={`status-badge ${getStatusColor(repo.status)}`}>
          {getStatusText(repo.status)}
        </span>
        
        {isHovered && (
          <div className="flex items-center space-x-2 animate-fade-in">
            <button
              onClick={() => onViewCommits(repo.url)}
              className="p-2 bg-electric hover:bg-electric-light rounded-lg transition-colors"
              title="View on GitHub"
            >
              <Link className="w-4 h-4 text-white" />
            </button>
            {repo.status === 'connected' ? (
              <button
                onClick={() => onDisconnect(repo.id)}
                className="p-2 bg-error hover:bg-red-600 rounded-lg transition-colors"
                title="Disconnect"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                onClick={() => onConnect(repo.id)}
                className="p-2 bg-success hover:bg-green-600 rounded-lg transition-colors"
                title="Connect"
              >
                <GitBranch className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoCard;
