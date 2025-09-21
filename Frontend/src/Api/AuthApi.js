// src/api/AuthApi.js
import axios from 'axios';

// URL base del backend
const API_URL = 'http://localhost:3000'; // <- reemplaza con el puerto donde corre tu backend

// Función para loguear al usuario
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error en loginUser:', error.response?.data || error.message);
    throw error;
  }
};

// Si luego quieres agregar register
export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error en registerUser:', error.response?.data || error.message);
    throw error;
  }
};