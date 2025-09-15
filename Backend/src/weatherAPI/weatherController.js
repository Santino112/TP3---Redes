
import axios from 'axios'

export async function getCurrentWeather(req, res) {
    const { city } = req.query


    if (!city) {
        return res.status(400).json({ error: 'Debe especificar una ciudad con ?city=' })
    }

    try {
        console.log('🌤️ Consultando WeatherAPI para la ciudad:', city, process.env.API_URL, process.env.API_KEY)

        const response = await axios.get(process.env.API_URL, {
            params: {
                key: process.env.API_KEY,
                q: city,
                aqi: 'no'
            }
        })

        const weather = response.data.current
        const location = response.data.location

        const now = new Date();

        const fecha = now.toISOString().split('T')[0];          // "2025-09-14"
        const hora = now.toISOString().split('T')[1].split('.')[0]; // "13:42:27"

        const result = {
            city: location.name,
            country: location.country,
            temp: weather.temp_c,
            condition: weather.condition.text,
            humidity: weather.humidity,
            fecha: fecha,
            hora: hora
        }

        res.json(result)
    } catch (err) {
        console.error('❌ Error consultando WeatherAPI:', err.message)
        res.status(500).json({ error: 'No se pudo obtener el clima' })
    }
}
