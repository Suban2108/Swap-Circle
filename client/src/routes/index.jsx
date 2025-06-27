// src/routes/index.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/Home/HomePage'
import AuthForms from '../Pages/Auth/loginRegister'
import About from '../Pages/About/About'
import ContactPage from '../Pages/Contact/Contact'
import SwapCircleDashboard from '../Pages/Profile/Dashboard'
import UserProfile from '../Pages/Profile/UserProfile'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<AuthForms />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/profile" element={<UserProfile />} />
    <Route path="/dashboard" element={<SwapCircleDashboard />} />
  </Routes>
)

export default AppRoutes
