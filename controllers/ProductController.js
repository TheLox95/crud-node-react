"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductDao_1 = require("../models/ProductDao");
const Product_1 = require("../models/Product");
const util_1 = require("util");
class ProductController {
    getProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDao = new ProductDao_1.ProductDao();
            const products = yield productDao.getAllProduct();
            res.json({ "products": products });
            return Promise.resolve();
        });
    }
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDao = new ProductDao_1.ProductDao();
            try {
                const product = yield productDao.getProductById(req.params.id);
                res.json({ "product": product });
            }
            catch (error) {
                res.json({ res: 'Err', error: error });
            }
            return Promise.resolve();
        });
    }
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            ProductController._validateData(req, res);
            try {
                const productDao = new ProductDao_1.ProductDao();
                const product = new Product_1.Product(req.body.name, req.body.price, req.body.category);
                const productCreated = yield productDao.saveProduct(product);
                res.json({ res: 'OK', msg: `El producto ${productCreated.id} se creo exitosamente`, id: productCreated.id });
            }
            catch (error) {
                res.json({ res: 'Err', error: error });
            }
            return Promise.resolve();
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody('id', 'El id es obligatorio').notEmpty();
            try {
                const productDao = new ProductDao_1.ProductDao();
                const id = req.body.id;
                yield productDao.getProductById(id);
                yield productDao.deleteProduct(id);
                res.json({ res: 'OK', msg: `El producto con ID ${req.body.id} se elimino de manera satisfactoria` });
            }
            catch (error) {
                res.json({ res: 'Err', error: error });
            }
            return Promise.resolve();
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            ProductController._validateData(req, res);
            try {
                console.dir(`categoery recieved`);
                console.dir(req.body);
                const product = new Product_1.Product(req.body.name, req.body.price, req.body.category);
                product.id = req.body.id;
                const productDao = new ProductDao_1.ProductDao();
                yield productDao.updateProduct(product);
                res.json({ res: 'OK', msg: `El producto con ID ${req.body.id} se actualizo de manera satisfactoria` });
            }
            catch (error) {
                res.json({ res: 'Err', error: error });
            }
            return Promise.resolve();
        });
    }
    static _validateData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody('name', 'El nombre del producto es obligatorio').notEmpty();
            req.checkBody('name', 'El nombre del producto debe ser de entre 2 a 50 letras de largo').isLength({ min: 2, max: 50 });
            req.checkBody('price', 'El precio es obligatorio').notEmpty();
            req.checkBody('price', 'El precio debe ser un numero decimal de 0.01 o mayor ').isFloat({ min: 0.01, max: 999999 });
            req.checkBody('category', 'La Categoria es obligatoria').notEmpty().isInt({ min: 1, max: 999999 });
            req.checkBody('category', 'Categoria invalida').isInt({ min: 1, max: 999999 });
            const result = yield req.getValidationResult();
            if (!result.isEmpty()) {
                res.status(400).send(util_1.inspect(result.array()));
                throw 'isEmpty';
            }
        });
    }
}
exports.ProductController = ProductController;
exports.controller = new ProductController();
exports.getProducts = exports.controller.getProducts;
exports.getProductById = exports.controller.getProductById;
exports.createProduct = exports.controller.createProduct;
exports.updateProduct = exports.controller.updateProduct;
exports.deleteProduct = exports.controller.deleteProduct;
