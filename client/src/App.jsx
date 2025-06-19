// src/App.jsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes' // 👈 Import your centralized routes
import Navbar from './Components/shared/Navbar'
import AwesomeFooter from './Components/shared/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRoutes />
      <AwesomeFooter/>
    </BrowserRouter>
  )
}

export default App
