import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prismaService'
export default class UserService {

    async existUser(email: string) {
        const user = await PrismaService.user.findUnique({ where: { email } })

        return !!user
    }

    async getUsers() {
        const users = await PrismaService.user.findMany()

        return users
    }

    async createUser(user: Prisma.UserCreateInput) {
        const data = await PrismaService.user.create({ data: user })

        return data
    }

    async editUser(id: string, user: Prisma.UserUpdateInput) {
        const data = await PrismaService.user.update({ where: { id }, data: user })

        return data
    }

    async deleteUser(id: string) {
        const data = await PrismaService.user.delete({ where: { id } })

        return data
    }
}