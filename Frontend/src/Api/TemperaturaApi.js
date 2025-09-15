import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; //cheqear esto y desp mandarlo a un .env

export const getClimaPorCiudad = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/obtenerClima`, {
      params: { city }
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error al obtener clima de ${city}:`, error.message);
    throw error;
  }
};