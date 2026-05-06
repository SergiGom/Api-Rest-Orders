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

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtener todas las órdenes
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */
router.get('/', getAllOrdersController);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden encontrada
 *       404:
 *         description: Orden no encontrada
 */
router.get('/:id', getOrderByIdController);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Orden creada
 */
router.post('/', createOrderController);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Reemplazar una orden completa
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderNumber:
 *                 type: string
 *               orderDate:
 *                 type: string
 *               customer:
 *                 type: object
 *               items:
 *                 type: array
 *     responses:
 *       200:
 *         description: Orden reemplazada
 */
router.put('/:id', replaceOrderController);

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Actualizar parcialmente una orden
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               orderDate:
 *                 type: string
 *               customerId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Orden actualizada
 */
router.patch('/:id', patchOrderController);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Eliminar una orden
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Orden eliminada
 */
router.delete('/:id', deleteOrderController);

/**
 * @swagger
 * /orders/{orderId}/items:
 *   get:
 *     summary: Obtener items de una orden
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de items
 */
router.get('/:orderId/items', getOrderItemsController);

/**
 * @swagger
 * /orders/{orderId}/items:
 *   post:
 *     summary: Agregar item a una orden
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item agregado
 */
router.post('/:orderId/items', addOrderItemController);

/**
 * @swagger
 * /orders/{orderId}/items/{itemId}:
 *   patch:
 *     summary: Actualizar item de una orden
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *               unitPrice:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item actualizado
 */
router.patch('/:orderId/items/:itemId', patchOrderItemController);

/**
 * @swagger
 * /orders/{orderId}/items/{itemId}:
 *   delete:
 *     summary: Eliminar item de una orden
 *     tags: [Order Items]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item eliminado
 */
router.delete('/:orderId/items/:itemId', deleteOrderItemController);

export default router;