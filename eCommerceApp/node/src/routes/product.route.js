import { Router } from 'express';

import productsController from '../controllers/product.controller';

const router = Router();

router.get('/api/getTopProductsFlashsale', productsController._onGetTopProductsFlashSale);
router.get('/api/getTopProductsMegaSale', productsController._onGetTopProductsMegaSale);
router.get('/api/getProductsSupperFlashSale', productsController._onGetProductsSuperFlashSale);
router.get('/api/getProductById', productsController._onGetProductById);
router.get('/api/getProductsRecommend', productsController._onGetProductRecommend);
router.get('/api/getFavoriteProducts', productsController._onGetFavoriteProducts);
router.get('/api/searchProduct', productsController._onSearchProduct);

export default router;