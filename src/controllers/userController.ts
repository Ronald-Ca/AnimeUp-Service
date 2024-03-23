import { Prisma } from "@prisma/client";
import UserService from "../services/userService";
import { Request, Response } from 'express'

export default class UserController {
    private _userService = new UserService()

    async create(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body
            const user: Prisma.UserCreateInput = {
                name: name,
                email: email,
                password: password
            }

            const resService = await this._userService.createUser(user)

            res.status(200).json(resService);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getUsers(_: Request, res: Response) {
        try {
            const resService = await this._userService.getUsers();

            res.status(200).json(resService);
        } catch (error) {
            res.status(500).json({ Error: error });
        }
    }

    async editUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            // const emailExist = await this._userService.existUser(email)
            // if (emailExist) res.status(400).json({ error: 'E-mail already registered' })

            const user: Prisma.UserUpdateInput = {
                name: name,
                email: email,
                password: password
            }

            const resService = await this._userService.editUser(id, user)

            res.status(200).json(resService);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}




// export const createUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const user = await User.create(req.body);

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// export const editUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const { name, email, password } = req.body;
//         const emailExist = await existUser(email)
//         if (emailExist) res.status(400).json({ error: 'E-mail already registered' })

//         const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }