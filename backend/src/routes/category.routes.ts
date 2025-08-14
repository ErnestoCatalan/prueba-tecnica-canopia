import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import {
  listCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller';

const router = Router();

router.use(authenticate);

router.get('/', listCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;