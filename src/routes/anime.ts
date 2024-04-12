import { Router, Request, Response, NextFunction } from 'express';
import AnimeController from '../controllers/animeController';
import Auth from '../middlewares/auth';

const router = Router();
const controller = new AnimeController();

router.get('/get', Auth, (req: Request, res: Response, next: NextFunction) => { controller.getAnimes(req, res).catch((erro) => next(erro)) });
router.get('/best', (req: Request, res: Response, next: NextFunction) => { controller.getBestAnimes(req, res).catch((erro) => next(erro)) });
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.createAnime(req, res).catch((erro) => next(erro)) });
router.put('/update/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.editAnime(req, res).catch((erro) => next(erro)) });
router.delete('/delete/:id', Auth, (req: Request, res: Response, next: NextFunction) => { controller.deleteAnime(req, res).catch((erro) => next(erro)) });

export default router;