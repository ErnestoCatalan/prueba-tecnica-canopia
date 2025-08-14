import { Request, Response, NextFunction } from 'express';
import { categoryService } from '../services/category.service';

export const listCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.listCategories();
    res.json({ ok: true, data: categories });
  } catch (err) {
    next(err);
  }
};

export const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryService.getCategory(Number(req.params.id));
    res.json({ ok: true, data: category });
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = await categoryService.createCategory(req.body);
    res.status(201).json({ ok: true, data: newCategory });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCategory = await categoryService.updateCategory(
      Number(req.params.id),
      req.body
    );
    res.json({ ok: true, data: updatedCategory });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryService.deleteCategory(Number(req.params.id));
    res.json({ ok: true, message: 'Categoría eliminada' });
  } catch (err) {
    next(err);
  }
};