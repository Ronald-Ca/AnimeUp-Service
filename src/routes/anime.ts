import AnimeController from '../controllers/animeController';
import { NextFunction, Router, Request, Response } from 'express'

const router = Router();
const controller = new AnimeController();

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getAnimes(req, res).catch((erro) => next(erro)) });
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.createAnime(req, res).catch((erro) => next(erro)) });
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => { controller.editAnime(req, res).catch((erro) => next(erro)) });
router.delete('/delete/:id', (req: Request, res: Response, next: NextFunction) => { controller.deleteAnime(req, res).catch((erro) => next(erro)) });

export default router;