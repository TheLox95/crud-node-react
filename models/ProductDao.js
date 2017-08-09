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
const Product_1 = require("./Product");
const Category_1 = require("./Category");
class ProductDao {
    constructor() {
        this._productModel = Product_1.ProductModel;
    }
    getAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this._productModel.findAll({ include: [{ model: Category_1.CategoryModel, as: 'categoryInfo', attributes: ['id', 'name'] }] });
            return products;
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this._productModel.findById(id, { include: [{ model: Category_1.CategoryModel, as: 'categoryInfo', attributes: ['id', 'name'] }] });
            if (product === null) {
                throw `El producto ${id} no existe en la base de datos.`;
            }
            return product;
        });
    }
    saveProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productModel = yield this._productModel.create({ name: product.name, price: product.price, category: product.category });
                return productModel;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productResult = yield this.getProductById(product.id);
            return yield productResult.update({
                name: product.name,
                price: product.price,
                category: product.category
            });
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productResult = yield this.getProductById(id);
            if (productResult !== null) {
                productResult.destroy();
            }
        });
    }
}
exports.ProductDao = ProductDao;
