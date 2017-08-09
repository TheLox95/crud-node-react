"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const Database_1 = require("./Database");
const Category_1 = require("./Category");
class Product {
    constructor(_name, _price, _category) {
        this._name = _name;
        this._price = _price;
        this._category = _category;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get category() {
        return this._category;
    }
}
exports.Product = Product;
exports.ProductModel = Database_1.Database.define('product', {
    id: {
        type: Sequelize.INTEGER,
        "allowNull": false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        "allowNull": false,
    },
    price: {
        type: Sequelize.INTEGER,
        "allowNull": false,
    }
}, {
    "tableName": "product",
    "timestamps": true,
    "createdAt": "created_at",
    "updatedAt": "updated_at",
});
exports.ProductModel.belongsTo(Category_1.CategoryModel, { foreignKey: 'category', as: 'categoryInfo' });
