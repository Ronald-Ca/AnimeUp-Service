import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prismaService'
export default class CharacterService {
    async getCharacters() {
        const characters = await PrismaService.character.findMany()

        return characters

    }
    async createCharacter(character: Prisma.CharacterCreateInput) {
        const data = await PrismaService.character.create({ data: character })
        return data
    }

    async editCharacter(id: string, character: Prisma.CharacterUpdateInput) {
        const data = await PrismaService.character.update({ where: { id }, data: character })
        return data
    }

    async getCharacterById(id: string) {
        const data = await PrismaService.character.findUnique({ where: { id } })
        return data
    }

    async deleteCharacter(id: string) {
        const data = await PrismaService.character.delete({ where: { id } })
        return data
    }
}