import { Prisma } from "@prisma/client";
import UserService from "../services/userService";
import { Request, Response } from 'express'
import { encrypt } from "../utils/bcrypt";
import { userCreateZod } from "../validations/user/userCreate";
import { responseError, responseSuccess } from "../utils/jsonResponse";
import InternalError from "../utils/internalError";
import { userEditZod } from "../validations/user/editUser";

export default class UserController {
    private _userService = new UserService()

    async getUsers(_: Request, res: Response) {
        try {
            const resService = await this._userService.getUsers();

            res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { email, name, password, nickname } = userCreateZod.parse(req.body)

            const emailExist = await this._userService.existUser(email)
            if (emailExist) return res.status(400).json(responseError(['E-mail already registered']))

            const user: Prisma.UserCreateInput = {
                name: name,
                email: email,
                password: encrypt(password),
                nickname: nickname
            }

            const resService = await this._userService.createUser(user)

            res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async editUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, nickname } = userEditZod.parse(req.body);

            const user: Prisma.UserUpdateInput = {
                name: name,
                nickname: nickname
            }

            const resService = await this._userService.editUser(id, user)

            res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const resService = await this._userService.deleteUser(id);

            res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}
