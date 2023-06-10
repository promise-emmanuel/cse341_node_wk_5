const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const validate = require('../middleware/validate');

router.get('/', productController.getAllProducts);

router.get('/:query', productController.getProductsBySearch);

router.post('/', validate.saveProducts, productController.createProduct);

router.put('/:id', validate.saveProducts, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;