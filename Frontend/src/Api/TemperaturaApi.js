import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getClimaPorCiudad = async (city) => {
  try {
    const response = await axios.get(`${API_URL}/weather/history`, {
      params: { city }
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error al obtener clima de ${city}:`, error.message);
    throw error;
  }
};