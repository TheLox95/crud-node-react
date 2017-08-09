const express = require('express');
const productsControllerModule = require('../controllers/ProductController');
const productsController = new productsControllerModule.ProductController();
const router = express.Router();

/* GET home page. */
router.get('/', productsController.getProducts);
router.get('/id/:id', productsController.getProductById);

router.post('/create', productsController.createProduct);
router.delete('/delete', productsController.deleteProduct);
router.put('/update', productsController.updateProduct);

module.exports = router;