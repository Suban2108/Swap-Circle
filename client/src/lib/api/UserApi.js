// src/api/UserAPI.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // or from .env
const token = localStorage.getItem('token');


const api = axios.create({
  baseURL: BASE_URL,
});

export const getCurrentUser = async () => {
  return await axios.get(`${BASE_URL}/api/users/me`,
    {headers:{
      Authorization: `Bearer ${token}`,
    }}
  )
}

export const updateUserProfile = async (userData) => {
  const response = await api.put(`${BASE_URL}${/api/users/update-user}`, userData);
  return response.data;
};

export const uploadProfileImage = async (formData) => {
  const response = await api.post("/api/users/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
