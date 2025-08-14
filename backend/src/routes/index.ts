import { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';
import categoryRoutes from './category.routes';

const router = Router();

router.use('/auth', authRoutes); 
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

export default router;
