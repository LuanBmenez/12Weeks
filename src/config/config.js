
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

export const config = {

  API_BASE_URL: isProduction 
    ? 'https://one2weeks.onrender.com/api'  
    : 'http://localhost:3001/api',          
  
  
  NODE_ENV: isProduction ? 'production' : 'development',
  
  
  API_TIMEOUT: isProduction ? 15000 : 10000, 
  
  
  SOCKET_URL: isProduction 
    ? 'https://one2weeks.onrender.com' 
    : 'http://localhost:3001',
};

export default config;
