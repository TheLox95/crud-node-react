"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("./Database");
const Sequelize = require("sequelize");
class Category {
    constructor(_name, _id) {
        this._name = _name;
        this._id = _id;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
}
exports.Category = Category;
exports.CategoryModel = Database_1.Database.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        "allowNull": false,
    }
}, {
    "tableName": "category",
    "timestamps": true,
    "createdAt": "created_at",
    "updatedAt": "updated_at",
});
