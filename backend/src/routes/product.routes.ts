import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';

const router = Router();

router.use(authenticate);

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
