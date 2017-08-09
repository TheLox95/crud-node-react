import { Database } from "./Database";
import * as Sequelize from "sequelize";

export class Category{
        
    constructor(private _name: string, private _id?: number) {}

    get id (){
        return this._id;
    }

    get name (){
        return this._name;
    }

}

export interface CategoryInstance extends Sequelize.Instance<Category>, Category {
}

export const CategoryModel = Database.define<CategoryInstance, Category>('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        "allowNull": false,
    }
},
    {
        "tableName": "category",
        "timestamps": true,
        "createdAt": "created_at",
        "updatedAt": "updated_at",
    });
