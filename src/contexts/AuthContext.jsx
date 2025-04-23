import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout } from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (localStorage.getItem('token')) {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Failed to load user:', err);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    isAdmin,
    loading,
    error,
    updateUser,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
