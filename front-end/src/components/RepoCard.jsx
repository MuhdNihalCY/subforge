
import React, { useState } from 'react';
import { 
  ExternalLink, 
  GitBranch, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Loader2, 
  Star,
  GitCommit,
  Globe,
  Lock,
  Eye,
  Settings,
  Archive,
  RotateCcw,
  Play,
  Pause
} from 'lucide-react';

const RepoCard = ({ repo, onConnect, onDisconnect, onArchive, onRestore, onViewCommits, onVisitSite, isArchived }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusIcon = () => {
    switch (repo.status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'syncing':
        return <Loader2 className="w-4 h-4 text-warning animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-error" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (repo.status) {
      case 'connected': return 'Connected';
      case 'syncing': return 'Syncing';
      case 'error': return 'Build Failed';
      default: return 'Disconnected';
    }
  };

  const getStatusColor = () => {
    switch (repo.status) {
      case 'connected': return 'text-success bg-success/10 border-success/20';
      case 'syncing': return 'text-warning bg-warning/10 border-warning/20';
      case 'error': return 'text-error bg-error/10 border-error/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      'TypeScript': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'React': 'bg-cyan-500',
      'Vue': 'bg-green-500',
      'Python': 'bg-blue-600',
      'Java': 'bg-orange-500',
    };
    return colors[language] || 'bg-gray-500';
  };

  return (
    <div 
      className={`bg-charcoal-light rounded-xl border transition-all duration-300 hover:shadow-xl group relative h-full flex flex-col ${
        isArchived 
          ? 'border-gray-600/30 opacity-75 hover:opacity-100' 
          : 'border-gray-700/50 hover:border-electric/30 hover:shadow-electric/10'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Header */}
      <div className="p-6 pb-4 flex-shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-white font-bold text-xl truncate">{repo.name}</h3>
              {repo.isPrivate ? (
                <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              {isArchived && (
                <span className="bg-error/20 text-error text-xs px-2 py-1 rounded-full border border-error/30 flex-shrink-0">
                  Archived
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">{repo.description}</p>
            <p className="text-gray-500 text-xs font-mono">{repo.fullName}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium ${getStatusColor()}`}>
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>
      </div>

      {/* Repository Stats */}
      <div className="px-6 pb-4 flex-shrink-0">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
            <span className="font-medium">{repo.language}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>{repo.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitBranch className="w-3 h-3" />
              <span>{repo.forks}</span>
            </div>
            <span className="text-xs bg-gray-600/30 px-2 py-1 rounded">{repo.size}</span>
          </div>
        </div>
      </div>

      {/* Live Site Status */}
      {repo.deployedUrl && (
        <div className="px-6 pb-4 flex-shrink-0">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-success" />
                <div>
                  <span className="text-success text-sm font-medium block">Live Site</span>
                  <span className="text-success/70 text-xs">Deployed & Running</span>
                </div>
              </div>
              <button
                onClick={() => onVisitSite(repo.deployedUrl)}
                className="p-2 bg-success/20 hover:bg-success/30 text-success border border-success/30 rounded-lg transition-colors"
                title="Visit live site"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Last Commit Info */}
      <div className="px-6 pb-6 flex-1 flex flex-col justify-end">
        <div className="bg-charcoal/50 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center space-x-2 mb-3">
            <GitBranch className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 text-sm font-medium">{repo.branch}</span>
          </div>
          <div className="flex items-start space-x-3">
            <GitCommit className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm mb-2 line-clamp-2 leading-relaxed">{repo.lastCommit}</p>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <span className="font-mono bg-gray-700/50 px-2 py-1 rounded border">
                  {repo.lastCommitHash}
                </span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{repo.lastCommitTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 pt-0 flex-shrink-0">
        <div className="flex space-x-3">
          <button
            onClick={() => onViewCommits(repo.url)}
            className="flex-1 bg-charcoal hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on GitHub</span>
          </button>
          
          {isArchived ? (
            <button
              onClick={() => onRestore(repo.id)}
              className="px-4 py-3 bg-success/20 hover:bg-success/30 text-success border border-success/30 rounded-lg transition-all duration-200 text-sm font-medium flex items-center space-x-2"
              title="Restore repository"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore</span>
            </button>
          ) : repo.status === 'connected' ? (
            <button
              onClick={() => onDisconnect(repo.id)}
              className="px-4 py-3 bg-error/20 hover:bg-error/30 text-error border border-error/30 rounded-lg transition-all duration-200 text-sm font-medium flex items-center space-x-2"
              title="Disconnect repository"
            >
              <Pause className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          ) : (
            <button
              onClick={() => onConnect(repo.id)}
              className="px-4 py-3 btn-primary text-sm font-medium flex items-center space-x-2 transition-all duration-200"
              disabled={repo.status === 'syncing'}
            >
              {repo.status === 'syncing' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Syncing</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Connect</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Hover Actions Menu */}
      {showActions && !isArchived && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-2">
            <button
              onClick={() => onArchive(repo.id)}
              className="p-2 bg-charcoal hover:bg-error/20 hover:text-error rounded-lg border border-gray-600 hover:border-error/30 transition-all duration-200"
              title="Archive repository"
            >
              <Archive className="w-4 h-4 text-gray-400" />
            </button>
            <button
              className="p-2 bg-charcoal hover:bg-gray-600 rounded-lg border border-gray-600 transition-all duration-200"
              title="Repository settings"
            >
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoCard;
