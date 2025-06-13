
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import SubdomainCard from './SubdomainCard';
import CodeEditor from './CodeEditor';
import CreateSubdomainModal from './CreateSubdomainModal';
import BuildLogsPanel from './BuildLogsPanel';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedSubdomain, setSelectedSubdomain] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [buildLogsOpen, setBuildLogsOpen] = useState(false);
  const [selectedSubdomainForLogs, setSelectedSubdomainForLogs] = useState<string | null>(null);

  // Mock data with build commands
  const subdomains = [
    {
      id: '1',
      name: 'demo.subforge.com',
      url: 'https://demo.subforge.com',
      status: 'live' as const,
      lastDeployed: '2 hours ago',
      preview: '/api/placeholder/200/150',
      buildCommand: 'npm run build',
      runCommand: 'npm run dev'
    },
    {
      id: '2',
      name: 'blog.subforge.com',
      url: 'https://blog.subforge.com',
      status: 'building' as const,
      lastDeployed: '5 minutes ago',
      preview: '/api/placeholder/200/150',
      buildCommand: 'yarn build',
      runCommand: 'yarn start'
    },
    {
      id: '3',
      name: 'app.subforge.com',
      url: 'https://app.subforge.com',
      status: 'error' as const,
      lastDeployed: '1 day ago',
      preview: '/api/placeholder/200/150',
      buildCommand: 'npm run build:prod',
      runCommand: 'npm run serve'
    },
    {
      id: '4',
      name: 'docs.subforge.com',
      url: 'https://docs.subforge.com',
      status: 'live' as const,
      lastDeployed: '3 hours ago',
      preview: '/api/placeholder/200/150',
      buildCommand: 'pnpm build',
      runCommand: 'pnpm dev'
    }
  ];

  const handleEdit = (id: string) => {
    setSelectedSubdomain(id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete subdomain:', id);
  };

  const handleVisit = (url: string) => {
    window.open(url, '_blank');
  };

  const handleViewLogs = (id: string) => {
    setSelectedSubdomainForLogs(id);
    setBuildLogsOpen(true);
  };

  const handleCreateNew = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = (data: any) => {
    console.log('Create subdomain with data:', data);
    // Handle subdomain creation logic here
  };

  const selectedSubdomainData = subdomains.find(s => s.id === selectedSubdomain);
  const selectedSubdomainForLogsData = subdomains.find(s => s.id === selectedSubdomainForLogs);

  if (selectedSubdomain && selectedSubdomainData) {
    return (
      <CodeEditor 
        onClose={() => setSelectedSubdomain(null)}
        subdomain={selectedSubdomainData}
      />
    );
  }

  return (
    <div className="flex h-screen bg-charcoal">
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          title="My Subdomains"
          subtitle="Manage your subdomain-based websites"
          onCreateNew={handleCreateNew}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {subdomains.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-white text-h2 font-bold mb-2">No sites yet</h3>
                <p className="text-gray-400 mb-6">Create your first subdomain to get started</p>
                <button onClick={handleCreateNew} className="btn-primary">
                  Create Your First Site
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subdomains.map((subdomain, index) => (
                <div key={subdomain.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <SubdomainCard
                    subdomain={subdomain}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
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
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <BuildLogsPanel
        isOpen={buildLogsOpen}
        onClose={() => {
          setBuildLogsOpen(false);
          setSelectedSubdomainForLogs(null);
        }}
        subdomainName={selectedSubdomainForLogsData?.name || ''}
        buildCommand={selectedSubdomainForLogsData?.buildCommand}
        runCommand={selectedSubdomainForLogsData?.runCommand}
      />
    </div>
  );
};

export default Dashboard;
