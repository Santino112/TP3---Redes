import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import { getConnection } from './src/database.js';
import authRoutes from './src/auth/autControllerRoute.js'
import weatherRoutes from './src/weatherAPI/weatherRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/api', weatherRoutes); //get api/weather?city=Berlin

try {
  const connection = getConnection();
  console.log('Conectado a la base de datos correctamente');

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
} catch (error) {
    console.log('Error al conectar con la base de datos', error);
    process.exit(1);
};
