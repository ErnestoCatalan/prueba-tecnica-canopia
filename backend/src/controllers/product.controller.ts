import { Request, Response } from 'express';
import { productService } from '../services/product.service';

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.listProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProduct(Number(req.params.id));
    res.json(product);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await productService.updateProduct(Number(req.params.id), req.body);
    res.json(updatedProduct);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await productService.deleteProduct(Number(req.params.id));
    res.json(deleted);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
