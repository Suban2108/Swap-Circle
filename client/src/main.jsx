import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux"
import { AuthProvider } from './context/authContext';
import { store } from "./store"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId='891912978499-gpfmsgjhunmgm2ihohmqknfskmk8slcq.apps.googleusercontent.com'>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </Provider>
)
