// Inicio controller de orders

import { Request, Response } from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  replaceOrder,
  updateOrder,
  deleteOrder,
  getOrderItems,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from '../models/orders.model';

const parseNumericParam = (value: string | string[] | undefined): number | null => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = rawValue ? parseInt(rawValue, 10) : NaN;
  return isNaN(parsed) ? null : parsed;
};

export const getAllOrdersController = (req: Request, res: Response) => {
  try {
    const orders = getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error });
  }
};

export const getOrderByIdController = (req: Request, res: Response) => {
  try {
    const id = parseNumericParam(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error });
  }
};

export const createOrderController = (req: Request, res: Response) => {
  try {
    const { customerId, items } = req.body;
    if (typeof customerId !== 'number' || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Body must include customerId and items array' });
    }

    const createdOrder = createOrder(customerId, items);
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: (error as Error).message });
  }
};

export const replaceOrderController = (req: Request, res: Response) => {
  try {
    const id = parseNumericParam(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const orderData = req.body;
    if (!orderData || !Array.isArray(orderData.items) || !orderData.customer) {
      return res.status(400).json({ message: 'Body must contain a complete order object' });
    }

    const updatedOrder = replaceOrder(id, orderData);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error replacing order', error: (error as Error).message });
  }
};

export const patchOrderController = (req: Request, res: Response) => {
  try {
    const id = parseNumericParam(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const { orderDate, customerId, status } = req.body;
    if (orderDate === undefined && customerId === undefined && status === undefined) {
      return res.status(400).json({ message: 'Body must include at least one field to update' });
    }

    const updatedOrder = updateOrder(id, { orderDate, customerId, status });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order', error: (error as Error).message });
  }
};

export const deleteOrderController = (req: Request, res: Response) => {
  try {
    const id = parseNumericParam(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const deleted = deleteOrder(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};

export const getOrderItemsController = (req: Request, res: Response) => {
  try {
    const orderId = parseNumericParam(req.params.orderId);
    if (orderId === null) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const items = getOrderItems(orderId);
    if (!items) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order items', error });
  }
};

export const addOrderItemController = (req: Request, res: Response) => {
  try {
    const orderId = parseNumericParam(req.params.orderId);
    if (orderId === null) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const { productId, quantity } = req.body;
    if (typeof productId !== 'number' || typeof quantity !== 'number') {
      return res.status(400).json({ message: 'Body must include productId and quantity' });
    }

    const newItem = addOrderItem(orderId, productId, quantity);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: 'Error adding order item', error: (error as Error).message });
  }
};

export const patchOrderItemController = (req: Request, res: Response) => {
  try {
    const orderId = parseNumericParam(req.params.orderId);
    const itemId = parseNumericParam(req.params.itemId);
    if (orderId === null || itemId === null) {
      return res.status(400).json({ message: 'Invalid order ID or item ID' });
    }

    const { quantity, unitPrice } = req.body;
    if (quantity === undefined && unitPrice === undefined) {
      return res.status(400).json({ message: 'Body must include quantity or unitPrice' });
    }

    const updatedItem = updateOrderItem(orderId, itemId, { quantity, unitPrice });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Order or item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order item', error: (error as Error).message });
  }
};

export const deleteOrderItemController = (req: Request, res: Response) => {
  try {
    const orderId = parseNumericParam(req.params.orderId);
    const itemId = parseNumericParam(req.params.itemId);
    if (orderId === null || itemId === null) {
      return res.status(400).json({ message: 'Invalid order ID or item ID' });
    }

    const deleted = deleteOrderItem(orderId, itemId);
    if (!deleted) {
      return res.status(404).json({ message: 'Order or item not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order item', error });
  }
};