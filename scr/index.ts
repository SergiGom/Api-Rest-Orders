//  Inicio index
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ordersRoutes from './routes/orders.routes';

// Configurar dotenv para variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON en el body de las requests

// Rutas
app.use('/orders', ordersRoutes);

// Ruta raíz para verificar que la API funciona
app.get('/', (req, res) => {
    res.json({ message: 'API de Órdenes funcionando correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});