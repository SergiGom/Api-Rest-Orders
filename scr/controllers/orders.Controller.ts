// Inicio contoller de orders

import { Request, Response } from 'express';
import { getAllOrders, getOrderById } from '../models/orders.model';

// Función para obtener todas las órdenes
export const getAllOrdersController = (req: Request, res: Response) => {
    try {
        const orders = getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};

// Función para obtener una orden por ID
export const getOrderByIdController = (req: Request, res: Response) => {
    try {
        const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid order ID' });
        }
        const order = getOrderById(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error });
    }
};