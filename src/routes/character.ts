import { Router, Request, Response, NextFunction } from 'express';
import CharacterController from '../controllers/characterController';
import Auth from '../middlewares/auth';

const router = Router();
const controller = new CharacterController();

router.get('/get', Auth, (req: Request, res: Response, next: NextFunction) => { controller.getCharacters(req, res).catch((erro) => next(erro)) });
router.post('/create', Auth, (req: Request, res: Response, next: NextFunction) => { controller.createCharacter(req, res).catch((erro) => next(erro)) });
router.put('/update/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.editCharacter(req, res).catch((erro) => next(erro)) });
router.delete('/delete/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.deleteCharacter(req, res).catch((erro) => next(erro)) });

export default router;