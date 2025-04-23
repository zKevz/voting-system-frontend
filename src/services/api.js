const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      return this.handleError(response)
    }

    const responseData = await response.json();

    if (responseData.code !== 200) {
      throw new Error(responseData.message || 'An error occurred');
    }

    return responseData.data;
  }

  async post(endpoint, data) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return this.handleError(response)
    }

    const responseData = await response.json();

    if (responseData.code !== 200) {
      throw new Error(responseData.message || 'An error occurred');
    }

    return responseData.data;
  }

  async delete(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      return this.handleError(response)
    }

    const responseData = await response.json();

    if (responseData.code !== 200) {
      throw new Error(responseData.message || 'An error occurred');
    }

    return responseData.data;
  }

  async handleError(response) {
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || `Error: ${response.status}`;
    } catch (e) {
      errorMessage = `Error: ${response.status}`;
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    return error;
  }
}

const apiClient = new ApiClient();
export default apiClient;
