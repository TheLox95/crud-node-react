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
const CategoryDao_1 = require("../models/CategoryDao");
class CategoryController {
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryDao = new CategoryDao_1.CategoryDao();
                const products = yield categoryDao.getAllCategories();
                res.json({ "categories": products });
            }
            catch (error) {
                res.json({ res: 'Err', error: error });
            }
            return Promise.resolve();
        });
    }
}
exports.CategoryController = CategoryController;
exports.controller = new CategoryController();
exports.getProducts = exports.controller.getCategories;
