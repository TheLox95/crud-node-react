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
const Category_1 = require("./Category");
class CategoryDao {
    constructor() {
        this._categoryModel = Category_1.CategoryModel;
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this._categoryModel.findAll();
            let categoriesJson = [];
            for (const category of categories) {
                categoriesJson.push({ id: category.id, name: category.name });
            }
            return categoriesJson;
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this._categoryModel.findById(id);
            if (product === null) {
                throw `La categoria no existe`;
            }
            return product;
        });
    }
    saveCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._categoryModel.create({ name: category.name });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = 1;
            if (category.id !== undefined) {
                id = category.id;
            }
            console.log(id);
            const productResult = yield this.getCategoryById(id);
            yield productResult.update({
                name: category.name
            });
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productResult = yield this.getCategoryById(id);
            if (productResult !== null) {
                productResult.destroy();
            }
        });
    }
}
exports.CategoryDao = CategoryDao;
