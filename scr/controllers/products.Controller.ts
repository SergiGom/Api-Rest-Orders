// Controller de productos
import { Request, Response } from 'express';
import { getAllProducts, getProductById } from '../models/products.model';

const parseNumericParam = (value: string | string[] | undefined): number | null => {
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = rawValue ? parseInt(rawValue, 10) : NaN;
  return isNaN(parsed) ? null : parsed;
};

export const getAllProductsController = (req: Request, res: Response) => {
  try {
    const products = getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

export const getProductByIdController = (req: Request, res: Response) => {
  try {
    const id = parseNumericParam(req.params.id);
    if (id === null) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};