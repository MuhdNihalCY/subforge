
import React from 'react';
import Dashboard from '../components/Dashboard';
import ToastContainer from '../components/ToastContainer';

const Index = () => {
  return (
    <div className="min-h-screen bg-charcoal">
      <Dashboard />
      <ToastContainer />
    </div>
  );
};

export default Index;
