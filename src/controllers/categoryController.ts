import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';
import { responseError, responseSuccess } from "../utils/jsonResponse";
import InternalError from '../utils/internalError';
import { Prisma } from '@prisma/client';

export default class CategoryController {
    private _categoryService = new CategoryService()

    async getCategories(req: Request, res: Response) {
        try {
            const resService = await this._categoryService.getCategories()

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const { name, description } = req.body

            const category: Prisma.CategoryCreateInput = {
                name,
                description
            }

            const resService = await this._categoryService.createCategory(category)

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async editCategory(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { name, description } = req.body

            const category: Prisma.CategoryUpdateInput = {
                name,
                description
            }

            const resService = await this._categoryService.editCategory(id, category)

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params

            const existsCategory = await this._categoryService.getCategoryById(id)
            if (!existsCategory) return res.status(404).json(responseError(['Category not found']))

            const resService = await this._categoryService.deleteCategory(id)

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

}