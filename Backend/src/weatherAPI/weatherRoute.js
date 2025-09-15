// routes/weather.routes.js
import { Router } from 'express'
import { getCurrentWeather } from '../weatherAPI/weatherController.js'

const router = Router()

// GET /api/weather?city=Berlin
router.get('/weather', getCurrentWeather)

export default router
