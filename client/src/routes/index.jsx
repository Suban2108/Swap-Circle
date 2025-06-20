// src/routes/index.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/Home/HomePage'
import AuthForms from '../Pages/Auth/loginRegister'

const AppRoutes = () => (
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/login" element={<AuthForms />} />
  </Routes>
)

export default AppRoutes
