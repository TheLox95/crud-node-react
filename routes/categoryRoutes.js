const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const categoryController = new CategoryController.CategoryController();
const router = express.Router();

/* GET home page. */
router.get('/', categoryController.getCategories);

module.exports = router;