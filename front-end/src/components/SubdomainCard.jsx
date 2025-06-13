
import React from 'react';
import { ExternalLink, Edit, Trash2, Terminal, RotateCcw } from 'lucide-react';

const SubdomainCard = ({ 
  subdomain, 
  onEdit, 
  onDelete, 
  onVisit,
  onViewLogs,
  onRestore
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return 'bg-success';
      case 'building': return 'bg-warning';
      case 'error': return 'bg-error';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'live': return 'Live';
      case 'building': return 'Building';
      case 'error': return 'Error';
      default: return 'Unknown';
    }
  };

  const isDeleted = subdomain.deletedAt !== null;

  return (
    <div className={`bg-charcoal-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in group ${
      isDeleted ? 'opacity-60' : ''
    }`}>
      {/* Preview Image */}
      <div className="aspect-video bg-gray-800 relative overflow-hidden">
        <img 
          src={subdomain.preview} 
          alt={`Preview of ${subdomain.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            {!isDeleted ? (
              <>
                <button
                  onClick={() => onEdit(subdomain.id)}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => onVisit(subdomain.url)}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  title="Visit Site"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </button>
                {onViewLogs && (
                  <button
                    onClick={() => onViewLogs(subdomain.id)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    title="View Logs"
                  >
                    <Terminal className="w-4 h-4 text-white" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(subdomain.id)}
                  className="p-2 bg-red-500/20 rounded-full hover:bg-red-500/30 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onRestore(subdomain.id)}
                className="p-2 bg-green-500/20 rounded-full hover:bg-green-500/30 transition-colors"
                title="Restore Site"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h3 className={`font-bold text-lg truncate ${isDeleted ? 'text-gray-400' : 'text-white'}`}>
              {subdomain.name}
            </h3>
            {isDeleted && (
              <span className="px-2 py-1 bg-red-900 text-red-200 text-xs rounded-full">
                DELETED
              </span>
            )}
          </div>
          {!isDeleted && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(subdomain.status)}`}>
              {getStatusText(subdomain.status)}
            </span>
          )}
        </div>
        
        <p className="text-gray-400 text-sm mb-3">
          {isDeleted 
            ? `Deleted: ${new Date(subdomain.deletedAt).toLocaleDateString()}`
            : `Last deployed ${subdomain.lastDeployed}`
          }
        </p>

        <div className="flex space-x-2">
          {!isDeleted ? (
            <>
              <button
                onClick={() => onEdit(subdomain.id)}
                className="flex-1 btn-secondary text-sm"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => onVisit(subdomain.url)}
                className="flex-1 btn-primary text-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit
              </button>
            </>
          ) : (
            <button
              onClick={() => onRestore(subdomain.id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restore
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubdomainCard;
