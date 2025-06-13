
import React, { useState } from 'react';
import { X, Github, Globe, Zap, CheckCircle, ExternalLink, Copy, AlertCircle } from 'lucide-react';

const CreateSubdomainModal = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    repository: '',
    branch: 'main',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    environmentVariables: '',
    autoDeployOnPush: true,
    customDomains: []
  });

  const [newDomain, setNewDomain] = useState('');
  const [domainType, setDomainType] = useState('custom'); // 'custom' or 'subdomain'

  const steps = [
    { id: 1, title: 'Project Details', icon: Globe },
    { id: 2, title: 'GitHub Repository', icon: Github },
    { id: 3, title: 'Build & Deploy', icon: Zap }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.repository.trim() !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const addCustomDomain = () => {
    if (newDomain.trim()) {
      setFormData({
        ...formData,
        customDomains: [...formData.customDomains, { domain: newDomain.trim(), type: domainType, verified: false }]
      });
      setNewDomain('');
    }
  };

  const removeDomain = (index) => {
    setFormData({
      ...formData,
      customDomains: formData.customDomains.filter((_, i) => i !== index)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-charcoal rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-electric to-blue-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold mb-2">Create New Site</h2>
          <p className="text-white/90">Deploy your project in minutes</p>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-6 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  currentStep >= step.id ? 'text-white' : 'text-white/50'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep >= step.id 
                      ? 'bg-white text-electric border-white' 
                      : 'border-white/30'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-medium text-sm">{step.title}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block w-12 h-0.5 ml-6 ${
                    currentStep > step.id ? 'bg-white' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Project Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <Globe className="w-12 h-12 text-electric mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Project Details</h3>
                <p className="text-gray-400">Set up your site with a subdomain</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Site Name
                  </label>
                  <div className="flex rounded-lg border-2 border-gray-600 focus-within:border-electric transition-colors overflow-hidden bg-charcoal-light">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="flex-1 bg-transparent px-4 py-3 text-white focus:outline-none placeholder-gray-400"
                      placeholder="my-awesome-site"
                      required
                    />
                    <div className="bg-gray-700 px-4 py-3 text-gray-300 flex items-center font-medium border-l border-gray-600">
                      .subforge.com
                    </div>
                  </div>
                  {formData.name && (
                    <div className="mt-2 p-3 bg-electric/10 border border-electric/20 rounded-lg">
                      <p className="text-sm text-electric">
                        ✓ Your site will be available at: <span className="font-medium">{formData.name}.subforge.com</span>
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-charcoal-light border-2 border-gray-600 rounded-lg px-4 py-3 text-white focus:border-electric focus:outline-none transition-colors resize-none placeholder-gray-400"
                    placeholder="A brief description of your project..."
                    rows="3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: GitHub Repository */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <Github className="w-12 h-12 text-electric mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Connect Repository</h3>
                <p className="text-gray-400">Link your GitHub repository for deployment</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.repository}
                    onChange={(e) => setFormData({...formData, repository: e.target.value})}
                    className="w-full bg-charcoal-light border-2 border-gray-600 rounded-lg px-4 py-3 text-white focus:border-electric focus:outline-none transition-colors placeholder-gray-400"
                    placeholder="https://github.com/username/repository"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Branch
                  </label>
                  <input
                    type="text"
                    value={formData.branch}
                    onChange={(e) => setFormData({...formData, branch: e.target.value})}
                    className="w-full bg-charcoal-light border-2 border-gray-600 rounded-lg px-4 py-3 text-white focus:border-electric focus:outline-none transition-colors placeholder-gray-400"
                    placeholder="main"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-charcoal-light rounded-lg border border-gray-600">
                  <div>
                    <p className="font-medium text-white">Auto-deploy on push</p>
                    <p className="text-sm text-gray-400">Automatically deploy when you push to this branch</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.autoDeployOnPush}
                      onChange={(e) => setFormData({...formData, autoDeployOnPush: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-electric"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Build & Custom Domains */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <Zap className="w-12 h-12 text-electric mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Build & Custom Domains</h3>
                <p className="text-gray-400">Configure build settings and add custom domains</p>
              </div>

              <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Build Configuration */}
                <div className="bg-charcoal-light rounded-xl p-6 border border-gray-600">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-electric" />
                    Build Settings
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-medium mb-2">
                        Build Command
                      </label>
                      <input
                        type="text"
                        value={formData.buildCommand}
                        onChange={(e) => setFormData({...formData, buildCommand: e.target.value})}
                        className="w-full bg-charcoal border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none font-mono text-sm transition-colors placeholder-gray-400"
                        placeholder="npm run build"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">
                        Output Directory
                      </label>
                      <input
                        type="text"
                        value={formData.outputDirectory}
                        onChange={(e) => setFormData({...formData, outputDirectory: e.target.value})}
                        className="w-full bg-charcoal border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none font-mono text-sm transition-colors placeholder-gray-400"
                        placeholder="dist"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">
                        Environment Variables
                      </label>
                      <textarea
                        value={formData.environmentVariables}
                        onChange={(e) => setFormData({...formData, environmentVariables: e.target.value})}
                        className="w-full bg-charcoal border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none font-mono text-sm resize-none transition-colors placeholder-gray-400"
                        placeholder="NODE_ENV=production&#10;API_URL=https://api.example.com"
                        rows="3"
                      />
                      <p className="text-xs text-gray-400 mt-1">One variable per line in KEY=value format</p>
                    </div>
                  </div>
                </div>

                {/* Custom Domains */}
                <div className="bg-charcoal-light rounded-xl p-6 border border-gray-600">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-electric" />
                    Custom Domains
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                      <p className="text-blue-300 text-sm font-medium">Primary Domain</p>
                      <p className="text-blue-200/80 text-sm">{formData.name || 'your-site'}.subforge.com</p>
                    </div>

                    <div>
                      <label className="block text-gray-300 font-medium mb-2">
                        Add Custom Domain
                      </label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <select
                            value={domainType}
                            onChange={(e) => setDomainType(e.target.value)}
                            className="bg-charcoal border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none text-sm"
                          >
                            <option value="custom">Custom Domain</option>
                            <option value="subdomain">Subdomain</option>
                          </select>
                          <input
                            type="text"
                            value={newDomain}
                            onChange={(e) => setNewDomain(e.target.value)}
                            className="flex-1 bg-charcoal border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-electric focus:outline-none text-sm placeholder-gray-400"
                            placeholder={domainType === 'custom' ? 'yourdomain.com' : 'app.yourdomain.com'}
                          />
                          <button
                            type="button"
                            onClick={addCustomDomain}
                            className="bg-electric hover:bg-electric-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    {formData.customDomains.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-gray-300 font-medium text-sm">Added Domains</p>
                        {formData.customDomains.map((domain, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-charcoal border border-gray-600 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Globe className="w-4 h-4 text-gray-400" />
                              <span className="text-white text-sm">{domain.domain}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                domain.verified 
                                  ? 'bg-green-900/30 text-green-400' 
                                  : 'bg-yellow-900/30 text-yellow-400'
                              }`}>
                                {domain.verified ? 'Verified' : 'Pending'}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDomain(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
                        <div>
                          <p className="text-amber-300 font-medium text-xs">DNS Configuration Required</p>
                          <p className="text-amber-200/80 text-xs mt-1">
                            You'll need to configure DNS records after deployment. We'll provide detailed instructions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-700">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors font-medium"
                >
                  ← Previous
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-electric hover:bg-electric-light disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium px-6 py-2 rounded-lg transition-all"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-gradient-to-r from-electric to-blue-600 hover:from-electric-light hover:to-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all flex items-center space-x-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Create & Deploy</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubdomainModal;
