import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem('laposh_admin_token');
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await authAPI.getMe();
        if (res.data?.success && res.data.admin) {
          setAdmin(res.data.admin);
        } else {
          localStorage.removeItem('laposh_admin_token');
          setAdmin(null);
        }
      } catch (error) {
        localStorage.removeItem('laposh_admin_token');
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.data?.success) {
      localStorage.setItem('laposh_admin_token', res.data.token);
      setAdmin(res.data.admin);
      return res.data;
    }
    throw new Error(res.data?.message || 'Login failed');
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.warn('Logout error:', err.message);
    } finally {
      localStorage.removeItem('laposh_admin_token');
      setAdmin(null);
      window.location.href = '/admin/login';
    }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
