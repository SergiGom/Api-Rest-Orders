// Rutas para las órdenes
import { Router } from 'express';
import { getAllOrdersController, getOrderByIdController } from '../controllers/orders.Controller';

const router = Router();

// Ruta para obtener todas las órdenes: GET /orders
router.get('/', getAllOrdersController);

// Ruta para obtener una orden por ID: GET /orders/:id
router.get('/:id', getOrderByIdController);

export default router;