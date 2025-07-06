// src/App.jsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes' // 👈 Import your centralized routes
import Navbar from './Components/shared/Navbar'
import AwesomeFooter from './Components/shared/Footer'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            minWidth: '300px', // or maxWidth, width
            padding: '5px',
            fontSize: '14px',
            marginBottom:"5px"
          },
        }}
      />
      <AppRoutes />
      <AwesomeFooter />
    </BrowserRouter>
  )
}

export default App
