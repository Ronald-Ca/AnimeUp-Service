import { Router, Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';
import Auth from '../middlewares/auth';

const router = Router();
const controller = new UserController();

router.get('/get', Auth, (req: Request, res: Response, next: NextFunction) => { controller.getUsers(req, res).catch((erro) => next(erro)) });
router.post('/authenticate', (req: Request, res: Response, next: NextFunction) => { controller.authenticate(req, res).catch((erro) => next(erro)) });
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.createUser(req, res).catch((erro) => next(erro)) });
router.put('/update/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.editUser(req, res).catch((erro) => next(erro)) });
router.delete('/delete/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.deleteUser(req, res).catch((erro) => next(erro)) });

export default router;
