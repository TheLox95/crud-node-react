import * as Sequelize from "sequelize";
import { Database } from "./Database";
import { Product, ProductInstance, ProductModel } from "./Product";
import { CategoryModel } from "./Category";

export class ProductDao {
    private _productModel: Sequelize.Model<ProductInstance, Product>;

    constructor() {
        this._productModel = ProductModel;
            
    }

    async getAllProduct() {
        const products = await this._productModel.findAll({include: [{ model: CategoryModel, as: 'categoryInfo', attributes: ['id' ,'name'] }]});
        return products;
    }

    async getProductById(id: number) {
        const product = await this._productModel.findById(id, {include: [{ model: CategoryModel, as: 'categoryInfo', attributes: ['id' ,'name'] }]});

        if (product === null) {
            throw `El producto ${id} no existe en la base de datos.`;
        }

        return product;

    }

    async saveProduct(product: Product) {
        try {
            const productModel = await this._productModel.create(<Product>{ name: product.name, price: product.price, category: product.category });
            return productModel;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(product: Product) {
        const productResult = await this.getProductById(product.id);
        return await productResult.update({
            name: product.name,
            price: product.price,
            category: product.category
        });
    }

    async deleteProduct(id: number) {
        const productResult = await this.getProductById(id);

        if (productResult !== null) {
            productResult.destroy();
        }

    }
}