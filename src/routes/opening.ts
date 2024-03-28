import { Router, Request, Response, NextFunction } from 'express';
import AnimeOpeningsController from '../controllers/animeOpeningController';
import Auth from '../middlewares/auth';

const router = Router();
const controller = new AnimeOpeningsController();

router.get('/get', Auth, (req: Request, res: Response, next: NextFunction) => { controller.getAnimeOpenings(req, res).catch((erro) => next(erro)) });
router.post('/create', Auth, (req: Request, res: Response, next: NextFunction) => { controller.createAnimeOpening(req, res).catch((erro) => next(erro)) });
router.put('/edit/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.editAnimeOpening(req, res).catch((erro) => next(erro)) });
router.delete('/delete/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.deleteAnimeOpening(req, res).catch((erro) => next(erro)) });

export default router;