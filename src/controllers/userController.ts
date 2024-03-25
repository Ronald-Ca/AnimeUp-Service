import { Prisma } from "@prisma/client";
import UserService from "../services/userService";
import { Request, Response } from 'express'
import { encrypt } from "../utils/bcrypt";
import { userCreateZod } from "../validations/user/userCreate";
import { responseError, responseSuccess } from "../utils/jsonResponse";
import InternalError from "../utils/internalError";
import { userEditZod } from "../validations/user/editUser";
import { validIdZod } from "../validations/global/ValidId";

export default class UserController {
    private _userService = new UserService()

    async getUsers(_: Request, res: Response) {
        try {
            const resService = await this._userService.getUsers();

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async createUser(req: Request, res: Response) {
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

            return res.status(200).json(responseSuccess('Success', resService))
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async editUser(req: Request, res: Response) {
        try {
            const { id } = validIdZod.parse(req.params);
            const { name, nickname } = userEditZod.parse(req.body);

            const existUser = await this._userService.existUserById(id);
            if (!existUser) return res.status(404).json(responseError(['User not found']));

            const user: Prisma.UserUpdateInput = {
                name: name,
                nickname: nickname
            }

            const resService = await this._userService.editUser(id, user)

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = validIdZod.parse(req.params);

            const existUser = await this._userService.existUserById(id);
            if (!existUser) return res.status(404).json(responseError(['User not found']));

            const resService = await this._userService.deleteUser(id);

            return res.status(200).json(responseSuccess('Success', resService));
        } catch (error) {
            if (error instanceof InternalError) throw new InternalError(error.message)
            throw error
        }
    }
}
