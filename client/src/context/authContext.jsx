// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Context
const AuthContext = createContext();

// 2. Provide Context Wrapper
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const PORT = 'http://localhost:5005'

  // Load token/userId from localStorage on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, PORT }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for cleaner usage
export const useAuth = () => useContext(AuthContext);
