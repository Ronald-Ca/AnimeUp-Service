import AnimeOpeningsService from '../services/animeOpeningsService'
import InternalError from '../utils/internalError'
import { Request, Response } from 'express'
import { responseError, responseSuccess } from '../utils/jsonResponse'
import { createOpeningZod } from '../validations/opening/createOpening'
import { validIdZod } from '../validations/global/validId'
import { editOpeningZod } from '../validations/opening/editOpening'

export default class AnimeOpeningsController {
    private _animeOpeningsService = new AnimeOpeningsService()

    async getAnimeOpenings(_: Request, res: Response) {
        try {
            const animeOpenings = await this._animeOpeningsService.getAnimeOpenings()

            return res.status(200).json(responseSuccess('Success', animeOpenings))
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async createAnimeOpening(req: Request, res: Response) {
        try {
            const { title, audio, video, animeId } = createOpeningZod.parse(req.body)

            const animeOpening = await this._animeOpeningsService.createAnimeOpening({ title, audio, video, Anime: { connect: { id: animeId } } })

            return res.status(200).json(responseSuccess('Success', animeOpening))
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async editAnimeOpening(req: Request, res: Response) {
        try {
            const { id } = validIdZod.parse(req.params)
            const { title, audio, video, animeId } = editOpeningZod.parse(req.body)

            const existAnimeOpening = await this._animeOpeningsService.getAnimeOpeningId(id)
            if (!existAnimeOpening) return res.status(404).json(responseError(['Anime Opening not found']))

            const animeOpening = await this._animeOpeningsService.editAnimeOpening(id, { title, audio, video, Anime: { connect: { id: animeId } } })

            return res.status(200).json(responseSuccess('Success', animeOpening))
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async deleteAnimeOpening(req: Request, res: Response) {
        try {
            const { id } = validIdZod.parse(req.params)

            const existAnimeOpening = await this._animeOpeningsService.getAnimeOpeningId(id)
            if (!existAnimeOpening) return res.status(404).json(responseError(['Anime Opening not found']))

            await this._animeOpeningsService.deleteAnimeOpening(id)

            return res.status(200).json(responseSuccess('Success', 'Anime Opening deleted'))
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}