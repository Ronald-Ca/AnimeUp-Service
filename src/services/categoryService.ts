import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prismaService'
export default class CategoryService {
    async getCategories() {
        const categories = await PrismaService.category.findMany()

        return categories
    }

    async getCategoryByName(name: string) {
        const data = await PrismaService.category.findFirst({ where: { name } })

        return data
    }

    async createCategory(category: Prisma.CategoryCreateInput) {
        const data = await PrismaService.category.create({ data: category })

        return data
    }

    async editCategory(id: string, category: Prisma.CategoryUpdateInput) {
        const data = await PrismaService.category.update({ where: { id }, data: category })

        return data
    }

    async deleteCategory(id: string) {
        const data = await PrismaService.category.delete({ where: { id } })

        return data
    }

    async getCategoryById(id: string) {
        const data = await PrismaService.category.findUnique({ where: { id } })

        return data
    }
}