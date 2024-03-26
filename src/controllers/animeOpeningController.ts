import AnimeOpeningsService from '../services/animeOpeningsService'
import InternalError from '../utils/internalError'
import { Request, Response } from 'express'
import { responseError, responseSuccess } from '../utils/jsonResponse'

export default class AnimeOpeningsController {
    private _animeOpeningsService = new AnimeOpeningsService()
    async createAnimeOpening(req: Request, res: Response) {
        try {
            const { title, audio, video, animeId } = req.body
            const animeOpening = await this._animeOpeningsService.createAnimeOpening({ title, audio, video, Anime: { connect: { id: animeId } } })
            return res.status(200).json(responseSuccess('Success', animeOpening))
        }
        catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

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

    async editAnimeOpening(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { title, audio, video, animeId } = req.body

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
            const { id } = req.params

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