import { Router } from 'express';
import { getWeatherHistory } from '../weatherAPI/weatherController.js';

const router = Router();

// GET histórico
router.get('/weather/history', getWeatherHistory);

export default router;