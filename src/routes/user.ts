import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const controller = new UserController();

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getUsers(req, res).catch((erro) => next(erro)) });
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.createUser(req, res).catch((erro) => next(erro)) });
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => { controller.editUser(req, res).catch((erro) => next(erro)) });
router.delete('/delete/:id', (req: Request, res: Response, next: NextFunction) => { controller.deleteUser(req, res).catch((erro) => next(erro)) });

export default router;
