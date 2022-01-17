import { Router } from 'express';

import usersController from '../controllers/user.controller';

const router = Router();

router.get('/', (req, res) => res.send("Hello from users route"));
router.get(`/api/getDataCart`, usersController._onGetDataCart);
router.post('/api/addAndRemoveCart', usersController._onChangeCart);
router.post('/api/changeQuantity', usersController._onChangeQuantity);
router.post('/api/addAndRemoveFavorite', usersController._onChangeFavorite);
router.put('/api/updateUserInfo', usersController._onUpdateUserInfo);
router.put('/api/updateUserPassword', usersController._onChangePassword);
router.get('/api/getUserOrders', usersController._onGetUserOrders);
router.get('/api/getOrderById', usersController._onGetOrderById);
router.post(`/api/order`, usersController._onOrder);
router.post('/api/applyCuponCode', usersController._onApplyCuponCode);
router.get('/api/getDetailNotificationFeed', usersController._onGetDetailNotificationFeed);
router.get('/api/getDetailNotificationActivity', usersController._onGetDetailNotificationActivity);
router.get('/api/getDetailNotificationOffer', usersController._onGetDetailNotificationOffer);
router.post(`/api/addAnAddress`, usersController._onAddAnAddress);
router.put(`/api/updateAddress`, usersController._onUpdateAnAddress);
router.get(`/api/getUserAddress`, usersController._onGetUserAddress);
router.get(`/api/getUserAddressById`, usersController._onGetUserAddressById);
router.delete(`/api/deleteAnAddress`, usersController._onDeleteAnAdress);

export default router;