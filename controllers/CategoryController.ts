import * as express from "express";
import { CategoryDao } from "../models/CategoryDao";
import { Category } from "../models/Category";
import { inspect } from "util";

export class CategoryController {
    private _categoryDao: CategoryDao;

    async getCategories(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        try {
            const categoryDao = new CategoryDao();
            const products = await categoryDao.getAllCategories();
            res.json({ "categories": products });
        } catch (error) {
            res.json({ res: 'Err', error: error });
        }

        return Promise.resolve();
    }
}

export const controller = new CategoryController();

export const getProducts = controller.getCategories;