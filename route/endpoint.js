const express = require('express');
const router = express.Router(); 

const server = require('../controller/server');
router.get('/', server.server);

const userController = require('../controller/userController');
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUsersById);
router.post('/user', userController.addData);
router.put('/user/:id', userController.updateData);
router.delete('/user/:id', userController.deleteData);

const productController = require('../controller/productController');
router.get('/products', productController.getAllProduct);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

const orderController = require('../controller/orderController');
router.get('/orders', orderController.getAllOrder);
router.get('/orders/:id', orderController.getOrderById);
router.post('/order', orderController.addOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router; 
