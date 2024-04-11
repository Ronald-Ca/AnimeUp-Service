import AnimeService from "../services/animeService";
import InternalError from "../utils/internalError";
import { responseError, responseSuccess } from "../utils/jsonResponse";
import { Request, Response } from 'express'
import { createAnimeZod } from "../validations/anime/createAnime";
import { Prisma } from "@prisma/client";
import { editAnimeZod } from "../validations/anime/editAnime";
import { validIdZod } from "../validations/global/ValidId";

export default class AnimeController {
    private _animeService = new AnimeService()

    async getAnimes(_: Request, res: Response) {
        try {
            const resService = await this._animeService.getAnimes();

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async createAnime(req: Request, res: Response) {
        try {
            const { title, description, episodes, image, rating, status, year, opinion, publicRating, trailer } = createAnimeZod.parse(req.body)

            const anime: Prisma.AnimeCreateInput = {
                title,
                description,
                episodes,
                image,
                rating,
                status,
                year,
                opinion,
                publicRating,
                trailer
            }

            const resService = await this._animeService.createAnime(anime)

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async editAnime(req: Request, res: Response) {
        try {
            const { id } = validIdZod.parse(req.params)
            const { title, description, episodes, image, rating, status, year, opinion, publicRating, trailer } = editAnimeZod.parse(req.body)

            const existAnime = await this._animeService.existAnime(id)
            if (!existAnime) return res.status(404).json(responseError(['Anime not found']));

            const anime: Prisma.AnimeUpdateInput = {
                title,
                description,
                episodes,
                image,
                rating,
                status,
                year,
                opinion,
                publicRating,
                trailer
            }

            const resService = await this._animeService.editAnime(id, anime)

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async deleteAnime(req: Request, res: Response) {
        try {
            const { id } = validIdZod.parse(req.params);

            const existAnime = await this._animeService.existAnime(id);
            if (!existAnime) return res.status(404).json(responseError(['Anime not found']));

            const resService = await this._animeService.deleteAnime(id)

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}