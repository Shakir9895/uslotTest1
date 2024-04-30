import axios from 'axios';
import { uslotBaseURL } from 'src/config-global';

// Create an Axios instance for API calls
const axiosInstanceUslot = axios.create({ baseURL: uslotBaseURL });

// Request Interceptor to add the authorization token to requests
axiosInstanceUslot.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response Interceptor to handle automatic token refresh
axiosInstanceUslot.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    // Check if we should refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      const role = localStorage.getItem('role');
      if (refreshToken) {
        try {
          const response = await refreshAccessToken(refreshToken,role);
        
        
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
          return axiosInstanceUslot(originalRequest);
        } catch (refreshError) {
          console.error('Unable to refresh token', refreshError);
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

async function refreshAccessToken(refreshToken:any,role:any) {
  // Call your refresh token API endpoint
  const response = await axios.post(`${uslotBaseURL}/api/auth/access-token?role=${role}`, { refreshToken });
  localStorage.setItem('access_token', response.data.access_token);
  return response.data;
}

export default axiosInstanceUslot;
