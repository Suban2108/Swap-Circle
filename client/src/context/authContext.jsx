// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

// 1. Create the Context
const AuthContext = createContext();

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const PORT = 'http://localhost:5005';
  const FRONTEND_PORT = 'http://localhost:3000';

  // ✅ Load token/userId from cookies on app load
  useEffect(() => {
    const cookieToken = Cookies.get('token'); // will be undefined if httpOnly
    const cookieUserId = Cookies.get('userId');

    setToken(cookieToken || null);     // still useful for non-httpOnly cookies
    setUserId(cookieUserId || null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, PORT, FRONTEND_PORT }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook
export const useAuth = () => useContext(AuthContext);
