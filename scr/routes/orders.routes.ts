// Rutas para las órdenes
import { Router } from 'express';
import {
  getAllOrdersController,
  getOrderByIdController,
  createOrderController,
  replaceOrderController,
  patchOrderController,
  deleteOrderController,
  getOrderItemsController,
  addOrderItemController,
  patchOrderItemController,
  deleteOrderItemController,
} from '../controllers/orders.Controller';

const router = Router();

router.get('/', getAllOrdersController);
router.get('/:id', getOrderByIdController);
router.post('/', createOrderController);
router.put('/:id', replaceOrderController);
router.patch('/:id', patchOrderController);
router.delete('/:id', deleteOrderController);

router.get('/:orderId/items', getOrderItemsController);
router.post('/:orderId/items', addOrderItemController);
router.patch('/:orderId/items/:itemId', patchOrderItemController);
router.delete('/:orderId/items/:itemId', deleteOrderItemController);

export default router;