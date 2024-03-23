import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prismaService'

interface User {
    name: string
    email: string
    password: string
}

interface UserUpdate {
    name?: any
    email?: any
    password?: any
}

export default class UserService {

    async existUser(email: string) {
        const user = await PrismaService.user.findUnique({ where: { email } })

        return !!user
    }

    async getUsers() {
        const users = await PrismaService.user.findMany()

        return users
    }

    async createUser(user: User) {
        const data = await PrismaService.user.create({ data: user })

        return data
    }

    async editUser(id: string, user: UserUpdate) {
        const data = await PrismaService.user.update({ where: { id }, data: user })

        return data
    }
}