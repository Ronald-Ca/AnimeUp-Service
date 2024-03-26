import { Request, Response } from 'express';
import InternalError from "../utils/internalError";
import { Prisma } from "@prisma/client";
import UserService from "../services/userService";
import { responseError, responseSuccess } from "../utils/jsonResponse";
import CharacterService from '../services/characterService';

export default class CharacterController {
    private _characterService = new CharacterService()
    async getCharacters(_: Request, res: Response) {
        try {
            const resService = await this._characterService.getCharacters();

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async createCharacter(req: Request, res: Response) {
        try {
            const { name, description, image } = req.body

            const character: Prisma.CharacterCreateInput = {
                name,
                description,
                image,
            }

            const resService = await this._characterService.createCharacter(character)

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async editCharacter(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, image } = req.body;

            const existCharacter = await this._characterService.getCharacterById(id);
            if (!existCharacter) return res.status(404).json(responseError(['Character not found']));

            const character: Prisma.CharacterUpdateInput = {
                name,
                description,
                image,
            }

            const resService = await this._characterService.editCharacter(id, character)

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async deleteCharacter(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const existCharacter = await this._characterService.getCharacterById(id);
            if (!existCharacter) return res.status(404).json(responseError(['Character not found']));

            const resService = await this._characterService.deleteCharacter(id)

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}