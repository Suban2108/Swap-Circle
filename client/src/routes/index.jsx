// src/routes/index.js
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/Home/HomePage'

const AppRoutes = () => (
  <Routes>
    <Route path="/home" element={<HomePage />} />
  </Routes>
)

export default AppRoutes
