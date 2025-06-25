import React from "react";

const NotFound = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#18181b', 
      color: 'whitesmoke', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>404 - Page Not Found</h1>
      <p style={{ fontSize: 20, opacity: 0.8 }}>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound; 