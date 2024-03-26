import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prismaService"

export default class AnimeOpeningsService {
    async createAnimeOpening(animeOpenings: Prisma.AnimeOpeningsCreateInput) {
        const data = await PrismaService.animeOpenings.create({ data: animeOpenings })

        return data
    }

    async getAnimeOpenings() {
        const animeOpenings = await PrismaService.animeOpenings.findMany()

        return animeOpenings
    }

    async getAnimeOpeningId(id: string) {
        const animeOpening = await PrismaService.animeOpenings.findUnique({ where: { id } })

        return animeOpening
    }

    async editAnimeOpening(id: string, animeOpenings: Prisma.AnimeOpeningsUpdateInput) {
        const data = await PrismaService.animeOpenings.update({ where: { id }, data: animeOpenings })

        return data
    }

    async deleteAnimeOpening(id: string) {
        const data = await PrismaService.animeOpenings.delete({ where: { id } })

        return data
    }
}