import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import RepoCard from '../components/RepoCard';
import CreateSubdomainModal from '../components/CreateSubdomainModal';
import { Search, Filter, GitBranch, Plus, Github, Clock, Star, Globe, Activity, AlertCircle } from 'lucide-react';

const Repos = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [filterBy, setFilterBy] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock repo data with more realistic information
  const repos = [
    {
      id: '1',
      name: 'e-commerce-frontend',
      fullName: 'mycompany/e-commerce-frontend',
      url: 'https://github.com/mycompany/e-commerce-frontend',
      branch: 'main',
      lastCommit: 'feat: implement payment gateway integration',
      lastCommitTime: '2 hours ago',
      lastCommitHash: 'a1b2c3d',
      status: 'connected',
      language: 'TypeScript',
      isPrivate: false,
      stars: 127,
      forks: 34,
      size: '2.4 MB',
      deployedUrl: 'https://e-commerce-frontend.subforge.com',
      description: 'Modern e-commerce platform built with React and TypeScript',
      archivedAt: null
    },
    {
      id: '2',
      name: 'blog-cms',
      fullName: 'mycompany/blog-cms',
      url: 'https://github.com/mycompany/blog-cms',
      branch: 'development',
      lastCommit: 'fix: resolve markdown rendering issues',
      lastCommitTime: '5 minutes ago',
      lastCommitHash: 'e4f5g6h',
      status: 'syncing',
      language: 'JavaScript',
      isPrivate: true,
      stars: 45,
      forks: 12,
      size: '1.8 MB',
      deployedUrl: 'https://blog-cms.subforge.com',
      description: 'Content management system for blog posts with rich editor',
      archivedAt: null
    },
    {
      id: '3',
      name: 'portfolio-website',
      fullName: 'mycompany/portfolio-website',
      url: 'https://github.com/mycompany/portfolio-website',
      branch: 'main',
      lastCommit: 'style: update responsive design for mobile devices',
      lastCommitTime: '1 day ago',
      lastCommitHash: 'i7j8k9l',
      status: 'error',
      language: 'React',
      isPrivate: false,
      stars: 89,
      forks: 23,
      size: '892 KB',
      deployedUrl: null,
      description: 'Personal portfolio showcasing projects and skills',
      archivedAt: null
    },
    {
      id: '4',
      name: 'api-dashboard',
      fullName: 'mycompany/api-dashboard',
      url: 'https://github.com/mycompany/api-dashboard',
      branch: 'feature/analytics',
      lastCommit: 'feat: add real-time analytics charts',
      lastCommitTime: '3 days ago',
      lastCommitHash: 'm0n1o2p',
      status: 'connected',
      language: 'Vue',
      isPrivate: true,
      stars: 156,
      forks: 67,
      size: '3.2 MB',
      deployedUrl: 'https://api-dashboard.subforge.com',
      description: 'Analytics dashboard for API monitoring and metrics',
      archivedAt: null
    },
    {
      id: '5',
      name: 'old-landing-page',
      fullName: 'mycompany/old-landing-page',
      url: 'https://github.com/mycompany/old-landing-page',
      branch: 'main',
      lastCommit: 'final: archive this project',
      lastCommitTime: '2 weeks ago',
      lastCommitHash: 'x9y8z7w',
      status: 'connected',
      language: 'React',
      isPrivate: false,
      stars: 23,
      forks: 5,
      size: '1.2 MB',
      deployedUrl: null,
      description: 'Old company landing page - archived',
      archivedAt: '2024-01-10'
    }
  ];

  const handleCreateNew = () => {
    setShowCreateModal(true);
  };

  const handleCreateSubmit = (formData) => {
    console.log('Creating new repository connection:', formData);
    // Here you would typically make an API call to connect the repository
    setShowCreateModal(false);
  };

  const handleConnect = (id) => {
    console.log('Connect repository:', id);
  };

  const handleDisconnect = (id) => {
    console.log('Disconnect repository:', id);
  };

  const handleArchive = (id) => {
    console.log('Archive repository:', id);
  };

  const handleRestore = (id) => {
    console.log('Restore repository:', id);
  };

  const handleViewCommits = (url) => {
    window.open(url, '_blank');
  };

  const handleVisitSite = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  // Filter repositories
  const filteredRepos = repos
    .filter(repo => {
      const isArchived = repo.archivedAt !== null;
      const showThisRepo = showArchived ? isArchived : !isArchived;
      
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          repo.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || 
                          (filterBy === 'connected' && repo.status === 'connected') ||
                          (filterBy === 'private' && repo.isPrivate) ||
                          (filterBy === 'public' && !repo.isPrivate);
      return showThisRepo && matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stars':
          return b.stars - a.stars;
        case 'updated':
        default:
          return new Date(b.lastCommitTime) - new Date(a.lastCommitTime);
      }
    });

  const activeRepos = repos.filter(r => r.archivedAt === null);
  const archivedRepos = repos.filter(r => r.archivedAt !== null);
  const connectedCount = activeRepos.filter(r => r.status === 'connected').length;
  const syncingCount = activeRepos.filter(r => r.status === 'syncing').length;
  const errorCount = activeRepos.filter(r => r.status === 'error').length;
  const liveCount = activeRepos.filter(r => r.deployedUrl).length;

  return (
    <div className="flex h-screen bg-charcoal">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onCreateNew={handleCreateNew}
      />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader 
          title="Git Repositories"
          subtitle="Manage your connected GitHub repositories"
          onCreateNew={handleCreateNew}
        />
        
        <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-charcoal via-charcoal to-charcoal-light">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-electric/10 to-electric/5 border border-electric/20 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Manage Your Repositories 🚀</h1>
                  <p className="text-gray-300">You have {activeRepos.length} active repositories with {connectedCount} connected</p>
                </div>
                <button 
                  onClick={handleCreateNew}
                  className="btn-primary flex items-center space-x-2 px-6 py-3 text-lg hover:bg-electric-light transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Connect Repository</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Overview</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-charcoal-light rounded-xl p-6 border border-gray-700/50 hover:border-success/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <Github className="w-5 h-5 text-success" />
                  </div>
                  <span className="text-2xl font-bold text-white">{connectedCount}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Connected</h3>
                <p className="text-success text-xs mt-1">Ready to deploy</p>
              </div>

              <div className="bg-charcoal-light rounded-xl p-6 border border-gray-700/50 hover:border-warning/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <Activity className="w-5 h-5 text-warning" />
                  </div>
                  <span className="text-2xl font-bold text-white">{syncingCount}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Syncing</h3>
                <p className="text-warning text-xs mt-1">In progress</p>
              </div>

              <div className="bg-charcoal-light rounded-xl p-6 border border-gray-700/50 hover:border-electric/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-electric/20 rounded-lg">
                    <Globe className="w-5 h-5 text-electric" />
                  </div>
                  <span className="text-2xl font-bold text-white">{liveCount}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Live Sites</h3>
                <p className="text-electric text-xs mt-1">Currently deployed</p>
              </div>

              <div className="bg-charcoal-light rounded-xl p-6 border border-gray-700/50 hover:border-error/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-error/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-error" />
                  </div>
                  <span className="text-2xl font-bold text-white">{errorCount}</span>
                </div>
                <h3 className="text-gray-400 text-sm font-medium">Errors</h3>
                <p className="text-error text-xs mt-1">Need attention</p>
              </div>
            </div>
          </div>

          {/* Filter and Actions Bar */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-white">
                  {showArchived ? 'Archived Repositories' : 'Active Repositories'}
                </h2>
                <span className="bg-charcoal-light px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-600">
                  {filteredRepos.length} {filteredRepos.length === 1 ? 'repository' : 'repositories'}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search repositories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-charcoal-light border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-electric/50 focus:ring-2 focus:ring-electric/20 w-64 transition-all"
                  />
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2.5 bg-charcoal-light border border-gray-600 rounded-lg text-white focus:outline-none focus:border-electric/50 transition-all"
                >
                  <option value="updated">Recently Updated</option>
                  <option value="name">Name</option>
                  <option value="stars">Most Stars</option>
                </select>

                {/* Filter */}
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-2.5 bg-charcoal-light border border-gray-600 rounded-lg text-white focus:outline-none focus:border-electric/50 transition-all"
                >
                  <option value="all">All Repos</option>
                  <option value="connected">Connected</option>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>

                {/* Archive Toggle */}
                <button
                  onClick={() => setShowArchived(!showArchived)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    showArchived 
                      ? 'bg-error/20 text-error border border-error/30 hover:bg-error/30' 
                      : 'bg-charcoal-light text-gray-300 border border-gray-600 hover:border-electric/50 hover:text-white'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>{showArchived ? 'Show Active' : 'Show Archived'}</span>
                  {!showArchived && archivedRepos.length > 0 && (
                    <span className="bg-gray-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                      {archivedRepos.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Repository Grid */}
          {filteredRepos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-charcoal-light rounded-2xl p-12 text-center max-w-md border border-gray-700/50">
                <div className="w-16 h-16 bg-gradient-to-br from-electric/20 to-electric/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Github className="w-8 h-8 text-electric" />
                </div>
                <h3 className="text-white text-xl font-bold mb-3">
                  {searchTerm || filterBy !== 'all' ? 'No repositories found' : 
                   showArchived ? 'No archived repositories' : 'Ready to connect your first repository?'}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {searchTerm || filterBy !== 'all' 
                    ? 'Try adjusting your search or filter criteria to find what you\'re looking for.' 
                    : showArchived
                    ? 'No repositories have been archived yet. When you archive repositories, they\'ll appear here for recovery.'
                    : 'Connect your GitHub repositories to start deploying your projects instantly. It takes less than a minute!'
                  }
                </p>
                {!searchTerm && filterBy === 'all' && !showArchived && (
                  <button 
                    onClick={handleCreateNew} 
                    className="btn-primary flex items-center space-x-2 mx-auto px-6 py-3 hover:bg-electric-light transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Connect Your First Repository</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
              {filteredRepos.map((repo, index) => (
                <div 
                  key={repo.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RepoCard
                    repo={repo}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                    onArchive={handleArchive}
                    onRestore={handleRestore}
                    onViewCommits={handleViewCommits}
                    onVisitSite={handleVisitSite}
                    isArchived={showArchived}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Create Repository Modal */}
      <CreateSubdomainModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateSubmit}
      />
    </div>
  );
};

export default Repos;
