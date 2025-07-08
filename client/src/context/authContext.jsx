// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const PORT = 'https://swap-circle-backend.onrender.com';
  const FRONTEND_PORT = 'https://swap-circle-frontend.onrender.com';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token) {
          setIsAuthLoading(false);
          return;
        }

        const { data } = await axios.get(`${PORT}/api/users/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data?._id) {
          setUserId(data._id);
          localStorage.setItem('userId', data._id);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const login = (newToken, userId) => {
    setToken(newToken);
    setUserId(userId);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        PORT,
        FRONTEND_PORT,
        isAuthLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
