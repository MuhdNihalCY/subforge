import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import SubdomainCard from './SubdomainCard';
import CreateSubdomainModal from './CreateSubdomainModal';
import BuildLogsPanel from './BuildLogsPanel';
import MongoDBStatus from './MongoDBStatus';
import { Filter, Plus, Globe, Activity, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [buildLogsOpen, setBuildLogsOpen] = useState(false);
  const [selectedSubdomainId, setSelectedSubdomainId] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  // Mock subdomain data with soft delete support
  const subdomains = [
    {
      id: '1',
      name: 'my-portfolio',
      url: 'https://my-portfolio.subforge.com',
      status: 'live',
      lastDeployed: '2 hours ago',
      preview: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop',
      deletedAt: null
    },
    {
      id: '2',
      name: 'blog-site',
      url: 'https://blog-site.subforge.com',
      status: 'building',
      lastDeployed: '5 minutes ago',
      preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop',
      deletedAt: null
    },
    {
      id: '3',
      name: 'demo-app',
      url: 'https://demo-app.subforge.com',
      status: 'error',
      lastDeployed: '1 day ago',
      preview: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
      deletedAt: null
    },
    {
      id: '4',
      name: 'old-project',
      url: 'https://old-project.subforge.com',
      status: 'live',
      lastDeployed: '1 week ago',
      preview: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=200&fit=crop',
      deletedAt: '2024-01-15'
    }
  ];

  const handleCreateNew = () => {
    setCreateModalOpen(true);
  };

  const handleCreateSubmit = (formData) => {
    console.log('Creating subdomain:', formData);
    // Here you would typically send the data to your backend
  };

  const handleEdit = (id) => {
    console.log('Edit subdomain:', id);
  };

  const handleDelete = (id) => {
    console.log('Soft deleting subdomain:', id);
    // In a real app, this would make an API call to mark the subdomain as deleted
  };

  const handleRestore = (id) => {
    console.log('Restoring subdomain:', id);
    // In a real app, this would make an API call to restore the subdomain
  };

  const handleVisit = (url) => {
    window.open(url, '_blank');
  };

  const handleViewLogs = (id) => {
    setSelectedSubdomainId(id);
    setBuildLogsOpen(true);
  };

  const filteredSubdomains = subdomains.filter(subdomain => {
    return showDeleted ? subdomain.deletedAt !== null : subdomain.deletedAt === null;
  });

  const activeSubdomainsCount = subdomains.filter(s => s.deletedAt === null).length;
  const deletedSubdomainsCount = subdomains.filter(s => s.deletedAt !== null).length;
  const liveCount = subdomains.filter(s => s.status === 'live' && s.deletedAt === null).length;
  const buildingCount = subdomains.filter(s => s.status === 'building' && s.deletedAt === null).length;
  const errorCount = subdomains.filter(s => s.status === 'error' && s.deletedAt === null).length;

  return (
    <div className="flex h-screen bg-charcoal">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader 
          title="My Subdomains"
          subtitle="Manage your SubForge deployments"
          onCreateNew={handleCreateNew}
        />
        
        <main className="flex-1 p-8 overflow-auto bg-gradient-to-br from-charcoal via-charcoal to-charcoal-light">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-electric/10 to-electric/5 border border-electric/20 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Welcome back! 👋</h1>
                  <p className="text-gray-300">You have {activeSubdomainsCount} active sites running smoothly</p>
                </div>
                <button 
                  onClick={handleCreateNew}
                  className="btn-primary flex items-center space-x-2 px-6 py-3 text-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Site</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-charcoal-light rounded-xl p-6 border border-gray-700/50 hover:border-electric/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <Globe className="w-5 h-5 text-success" />
                  </div>
                  <span className="text-2xl font-bold text-white">{liveCount}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Live Sites</h3>
                <p className="text-success text-xs mt-1">All systems operational</p>
              </div>

              <div className="bg-charcoal-light rounded-xl p-6 border border-gray-700/50 hover:border-warning/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <Activity className="w-5 h-5 text-warning" />
                  </div>
                  <span className="text-2xl font-bold text-white">{buildingCount}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Building</h3>
                <p className="text-warning text-xs mt-1">Deployments in progress</p>
              </div>

              <div className="bg-charcoal-light rounded-xl p-6 border border-gray-700/50 hover:border-error/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-error/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-error" />
                  </div>
                  <span className="text-2xl font-bold text-white">{errorCount}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Errors</h3>
                <p className="text-error text-xs mt-1">Requires attention</p>
              </div>

              <div className="bg-charcoal-light rounded-xl p-6 border border-gray-700/50 hover:border-gray-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-gray-500/20 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-2xl font-bold text-white">{deletedSubdomainsCount}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Archived</h3>
                <p className="text-gray-400 text-xs mt-1">Deleted sites</p>
              </div>
            </div>
          </div>

          {/* Filter and Actions Bar */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-white">
                  {showDeleted ? 'Archived Sites' : 'Active Sites'}
                </h2>
                <span className="bg-charcoal-light px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-600">
                  {filteredSubdomains.length} sites
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowDeleted(!showDeleted)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    showDeleted 
                      ? 'bg-error/20 text-error border border-error/30 hover:bg-error/30' 
                      : 'bg-charcoal-light text-gray-300 border border-gray-600 hover:border-electric/50 hover:text-white'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>{showDeleted ? 'Show Active' : 'Show Archived'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sites Grid */}
          {filteredSubdomains.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-charcoal-light rounded-2xl p-12 text-center max-w-md border border-gray-700/50">
                <div className="w-16 h-16 bg-gradient-to-br from-electric/20 to-electric/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-3">
                  {showDeleted ? 'No archived sites' : 'Ready to launch your first site?'}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {showDeleted 
                    ? 'No sites have been archived yet. When you delete sites, they\'ll appear here for recovery.' 
                    : 'Create your first subdomain and start deploying your projects instantly. It takes less than a minute!'
                  }
                </p>
                {!showDeleted && (
                  <button 
                    onClick={handleCreateNew} 
                    className="btn-primary flex items-center space-x-2 mx-auto px-6 py-3"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Your First Site</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSubdomains.map((subdomain, index) => (
                <div 
                  key={subdomain.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SubdomainCard
                    subdomain={subdomain}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRestore={handleRestore}
                    onVisit={handleVisit}
                    onViewLogs={handleViewLogs}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <CreateSubdomainModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <BuildLogsPanel
        isOpen={buildLogsOpen}
        onClose={() => setBuildLogsOpen(false)}
        subdomainId={selectedSubdomainId}
      />
    </div>
  );
};

export default Dashboard;
