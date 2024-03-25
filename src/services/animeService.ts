import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prismaService"

export default class AnimeService {

    async existAnime(id: string) {
        const anime = await PrismaService.anime.findUnique({ where: { id } })

        return !!anime
    }

    async getAnimes() {
        const animes = await PrismaService.anime.findMany()

        return animes
    }

    async createAnime(anime: Prisma.AnimeCreateInput) {
        const data = await PrismaService.anime.create({ data: anime })

        return data
    }

    async editAnime(id: string, anime: Prisma.AnimeUpdateInput) {
        const data = await PrismaService.anime.update({ where: { id }, data: anime })

        return data
    }

    async deleteAnime(id: string) {
        const data = await PrismaService.anime.delete({ where: { id } })

        return data
    }
}