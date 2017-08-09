import * as express from "express";
import * as Sequelize from "sequelize";
import { Database } from "./Database";
import { CategoryInstance } from "./Category";
import { CategoryModel, Category } from "./Category";

export class CategoryDao {
    private _categoryModel: Sequelize.Model<CategoryInstance, Category>;

    constructor() {
        this._categoryModel = CategoryModel;
    }

    async getAllCategories() {
        const categories = await this._categoryModel.findAll();
        let categoriesJson = [];

        for (const category of categories) {
            categoriesJson.push({ id: category.id, name: category.name });
        }

        return categoriesJson;
    }


    async getCategoryById(id: number) {
        const product = await this._categoryModel.findById(id);

        if (product === null) {
            throw `La categoria no existe`;
        }

        return product;

    }

    async saveCategory(category: Category) {
        try {
            return await this._categoryModel.create(<Category>{ name: category.name });
        } catch (error) {
            throw error;
        }
    }

    async updateCategory(category: Category) {
        let id = 1;
        if (category.id !== undefined) {
            id = category.id;
        }

        console.log(id);

        const productResult = await this.getCategoryById(id);
        await productResult.update({
            name: category.name
        });
    }

    async deleteProduct(id: number) {
        const productResult = await this.getCategoryById(id);

        if (productResult !== null) {
            productResult.destroy();
        }

    }

}

