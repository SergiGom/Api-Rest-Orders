//  Inicio index
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import ordersRoutes from './routes/orders.routes';
import productsRoutes from './routes/products.routes';

// Configurar dotenv para variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3002;

// Configuración Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Órdenes',
      version: '1.0.0',
      description: 'API REST para gestión de órdenes y productos',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
      },
    ],
  },
  apis: ['./scr/routes/*.ts'], // Archivos con anotaciones Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Parsear JSON en el body de las requests

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/v1/orders', ordersRoutes);
app.use('/api/v1/products', productsRoutes);

// Ruta raíz para verificar que la API funciona
app.get('/', (req, res) => {
  res.json({ message: 'API de Órdenes funcionando correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});