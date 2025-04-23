import apiClient from './api';

export const register = async (userData) => {
  const response = await apiClient.post('/api/v1/auth/register', userData);
  if (response && response.token) {
    apiClient.setToken(response.token);
    try {
      const userData = await getCurrentUser();
      return { token: response.token, user: userData };
    } catch (err) {
      console.error('Failed to get user data after registration:', err);
      return { token: response.token };
    }
  }
  return response;
};

export const login = async (credentials) => {
  const response = await apiClient.post('/api/v1/auth/login', credentials);
  if (response && response.token) {
    apiClient.setToken(response.token);

    try {
      const userData = await getCurrentUser();
      return { token: response.token, user: userData };
    } catch (err) {
      console.error('Failed to get user data after login:', err);
      return { token: response.token };
    }
  }
  return response;
};

export const logout = () => {
  apiClient.removeToken();
};

export const getCurrentUser = async () => {
  return apiClient.get('/api/v1/users/me');
};

export const getAllUsers = async () => {
  return apiClient.get('/api/v1/users');
};

export const deleteUser = async (userId) => {
  return apiClient.delete(`/api/v1/users?id=${userId}`);
};
