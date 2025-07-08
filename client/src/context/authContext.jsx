// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // optional now
  const [userId, setUserId] = useState(null);

  const PORT = 'https://swap-circle-backend.onrender.com';
  const FRONTEND_PORT = 'https://swap-circle-frontend.onrender.com';

  // ✅ Check if user is authenticated via backend
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${PORT}/api/users/get-user`, {
          withCredentials: true,
        });

        if (data?._id) {
          setUserId(data._id);
          setToken('valid'); // Optional, just marks login
        }
      } catch (err) {
        console.log("Not authenticated", err.message);
        setUserId(null);
        setToken(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, PORT, FRONTEND_PORT, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
