const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Fetch MongoDB connection status and metrics
 */
export const getMongoStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/monitor/status`);
    if (!response.ok) throw new Error('Failed to fetch MongoDB status');
    return await response.json();
  } catch (error) {
    console.error('Error fetching MongoDB status:', error);
    throw error;
  }
};

/**
 * Fetch system metrics including MongoDB metrics
 */
export const getSystemMetrics = async () => {
  try {
    const response = await fetch(`${API_URL}/monitor/metrics`);
    if (!response.ok) throw new Error('Failed to fetch system metrics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching system metrics:', error);
    throw error;
  }
};

/**
 * Perform MongoDB health check
 */
export const checkMongoHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/monitor/health`);
    if (!response.ok) throw new Error('Health check failed');
    return await response.json();
  } catch (error) {
    console.error('Error checking MongoDB health:', error);
    throw error;
  }
};
