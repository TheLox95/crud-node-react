import { Category } from "./Category";
import * as Sequelize from "sequelize";
import { Database } from "./Database";
import { CategoryModel } from "./Category";


export class Product {
    private _id: number;

    constructor(private _name: string, private _price: string, private _category: Category){

    }

    get id (){
        return this._id;
    }

    set id (id: number ){
        this._id = id;
    }

    get name (){
        return this._name;
    }

    get price (){
        return this._price;
    }

    get category (){
        return this._category;
    }

}

export interface ProductInstance extends Sequelize.Instance<Product>, Product {
}

export const ProductModel = Database.define<ProductInstance, Product>('product', {
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
        },
            {
                "tableName": "product",
                "timestamps": true,
                "createdAt": "created_at",
                "updatedAt": "updated_at",
            });

ProductModel.belongsTo(CategoryModel, {foreignKey: 'category', as: 'categoryInfo'});