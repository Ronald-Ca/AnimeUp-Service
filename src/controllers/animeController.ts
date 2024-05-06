import AnimeService from "../services/animeService";
import InternalError from "../utils/internalError";
import { responseError, responseSuccess } from "../utils/jsonResponse";
import { Request, Response } from 'express'
import { createAnimeZod } from "../validations/anime/createAnime";
import { Prisma } from "@prisma/client";
import { editAnimeZod } from "../validations/anime/editAnime";
import { validIdZod } from "../validations/global/ValidId";
import Upload, { CloudinaryUploadResult } from "../integrations/cloudinary";
import fileUpload from "express-fileupload";

export default class AnimeController {
    private _animeService = new AnimeService()

    async getAnimes(_: Request, res: Response) {
        try {
            const resService = await this._animeService.getAnimes()

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async getBestAnimes(_: Request, res: Response) {
        try {
            const resService = await this._animeService.getBestAnimes();

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async createAnime(req: Request, res: Response) {
        const { title, description, episodes: episodesString, rating: ratingString, status, year: yearString, opinion, publicRating: publicRatingString, favorite: favoriteString, following: followingString } = req.body
        const image = req.files?.image as fileUpload.UploadedFile
        const trailer = req.files?.trailer as fileUpload.UploadedFile

        const episodes = parseInt(episodesString)
        const rating = parseInt(ratingString)
        const year = parseInt(yearString)
        const publicRating = parseInt(publicRatingString)
        const favorite = favoriteString === 'true'
        const following = followingString === 'true'


        try {
            const validatedData = createAnimeZod.parse({
                title,
                description,
                episodes,
                rating,
                status,
                year,
                opinion,
                publicRating,
                favorite,
                following
            })


            const anime: Prisma.AnimeCreateInput = {
                title: validatedData.title,
                description: validatedData.description,
                episodes: validatedData.episodes,
                rating: validatedData.rating,
                status: validatedData.status,
                year: validatedData.year,
                opinion: validatedData.opinion,
                publicRating: validatedData.publicRating,
                favorite: validatedData.favorite,
                following: validatedData.following
            }

            const resService = await this._animeService.createAnime(anime)
            if (!resService) return res.status(400).json(responseError(['Error creating anime']));

            if (image) {
                const imageUpload = await Upload(image, 'anime') as CloudinaryUploadResult
                if (!imageUpload) return res.status(400).json(responseError(['Error uploading image']))
                await this._animeService.editAnime(resService.id, { image: imageUpload.secure_url })
            }

            if (trailer) {
                const trailerUpload = await Upload(trailer, 'anime') as CloudinaryUploadResult
                if (!trailerUpload) return res.status(400).json(responseError(['Error uploading trailer']))
                await this._animeService.editAnime(resService.id, { trailer: trailerUpload.secure_url })
            }

            const response = await this._animeService.existAnime(resService.id)
            if (!response) return res.status(404).json(responseError(['Anime not found']))

            return res.status(200).json(responseSuccess('Success', response))
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