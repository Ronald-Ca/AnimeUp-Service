import { Request, Response } from 'express';
import InternalError from '../utils/internalError';
import SeasonService from '../services/seasonService';
import { responseSuccess } from '../utils/jsonResponse';
import { Prisma } from '@prisma/client';
import { createSeasonZod } from '../validations/season/createSeason';
import { editSeasonZod } from '../validations/season/editSeason';
export default class SeasonController {
    private _seasonService = new SeasonService();
    async getSeasons(req: Request, res: Response) {
        try {
            const seasons = await this._seasonService.getSeasons();
            return res.status(200).json(responseSuccess('Success', seasons));
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async createSeason(req: Request, res: Response) {
        try {
            const { name, description, year, image, episodes, status, opinion } = createSeasonZod.parse(req.body)

            const season: Prisma.SeasonCreateInput = {
                name,
                description,
                year,
                image,
                episodes,
                status,
                opinion
            };

            const resService = await this._seasonService.createSeason(season);

            return res.status(200).json(responseSuccess('Success', resService));
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async editSeason(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const { name, description, year, image, episodes, status, opinion } = editSeasonZod.parse(req.body);

            const season = {
                name,
                description,
                year,
                image,
                episodes,
                status,
                opinion
            };

            const resService = await this._seasonService.editSeason(id, season);

            return res.status(200).json(responseSuccess('Success', resService));
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async deleteSeason(req: Request, res: Response) {
        try {
            const { id } = req.params
            const resService = await this._seasonService.deleteSeason(id);
            return res.status(200).json(responseSuccess('Success', resService));
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}
