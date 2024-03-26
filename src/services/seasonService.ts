import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prismaService'
export default class SeasonService {

    async getSeasons() {
        const seasons = await PrismaService.season.findMany()

        return seasons

    }
    async createSeason(season: Prisma.SeasonCreateInput) {
        const data = await PrismaService.season.create({ data: season })
        return data
    }

    async editSeason(id: string, season: Prisma.SeasonUpdateInput) {
        const data = await PrismaService.season.update({ where: { id }, data: season })
        return data
    }

    async deleteSeason(id: string) {
        const data = await PrismaService.season.delete({ where: { id } })
        return data
    }
}