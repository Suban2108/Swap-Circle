import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Components/ui/theme/themeContextProvider'

createRoot(document.getElementById('root')).render(
  // <ThemeProvider>
    <App />
  /* </ThemeProvider> */
)
