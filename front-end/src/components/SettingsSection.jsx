
import React from 'react';

const SettingsSection = ({ title, description, children }) => {
  return (
    <div className="bg-charcoal-light rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-white font-bold text-h2 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      {children}
      <div className="flex justify-end mt-6 pt-6 border-t border-gray-700">
        <button className="btn-primary">Save Changes</button>
      </div>
    </div>
  );
};

export default SettingsSection;
