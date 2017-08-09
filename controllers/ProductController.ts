import * as express from "express";
import { ProductDao } from "../models/ProductDao";
import { Product } from "../models/Product";
import { inspect } from "util";

export class ProductController {
    private _productDao: ProductDao;

    async getProducts(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const productDao = new ProductDao();
        const products = await productDao.getAllProduct();
        res.json({ "products": products });

        return Promise.resolve();
    }

    async getProductById(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const productDao = new ProductDao();
        try {
            const product = await productDao.getProductById(req.params.id);
            res.json({ "product": product });
        } catch (error) {
            res.json({ res: 'Err', error: error });
        }

        return Promise.resolve();
    }

    async createProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        ProductController._validateData(req, res);
        try {
            const productDao = new ProductDao();
            const product = new Product(req.body.name, req.body.price, req.body.category);
            const productCreated = await productDao.saveProduct(product);

            res.json({ res: 'OK', msg: `El producto ${productCreated.id} se creo exitosamente`, id:  productCreated.id});
        } catch (error) {
            res.json({ res: 'Err', error: error });
        }

        return Promise.resolve();
    }

    async deleteProduct(req:any, res: express.Response, next: express.NextFunction): Promise<void> {
        req.checkBody('id', 'El id es obligatorio').notEmpty();

        try {
            const productDao = new ProductDao();
            const id = req.body.id;
            await productDao.getProductById(id);
            await productDao.deleteProduct(id);

            res.json({ res: 'OK', msg: `El producto con ID ${req.body.id} se elimino de manera satisfactoria` });
        } catch (error) {
            res.json({ res: 'Err', error: error });
        }

        return Promise.resolve();
    }

    async updateProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        ProductController._validateData(req, res);

        try {
            console.dir(`categoery recieved`);
            console.dir(req.body);
            const product = new Product(req.body.name, req.body.price, req.body.category);
            product.id = req.body.id;
            const productDao = new ProductDao();
            await productDao.updateProduct(product);

            res.json({ res: 'OK', msg: `El producto con ID ${req.body.id} se actualizo de manera satisfactoria` });
        } catch (error) {
            res.json({ res: 'Err', error: error });
        }

        return Promise.resolve();
    }

    static async _validateData(req: any, res: any) {
        req.checkBody('name', 'El nombre del producto es obligatorio').notEmpty();
        req.checkBody('name', 'El nombre del producto debe ser de entre 2 a 50 letras de largo').isLength({ min: 2, max: 50 });

        req.checkBody('price', 'El precio es obligatorio').notEmpty();
        req.checkBody('price', 'El precio debe ser un numero decimal de 0.01 o mayor ').isFloat({ min: 0.01, max: 999999 });

        req.checkBody('category', 'La Categoria es obligatoria').notEmpty().isInt({ min: 1, max: 999999 });
        req.checkBody('category', 'Categoria invalida').isInt({ min: 1, max: 999999 });

        const result = await req.getValidationResult();

        if (!result.isEmpty()) {
            res.status(400).send(inspect(result.array()));
            throw 'isEmpty'

        }
    }

}

export const controller = new ProductController();

export const getProducts = controller.getProducts;
export const getProductById = controller.getProductById;
export const createProduct = controller.createProduct;
export const updateProduct = controller.updateProduct;
export const deleteProduct = controller.deleteProduct;

