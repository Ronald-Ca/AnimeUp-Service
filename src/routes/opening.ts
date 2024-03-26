import { Router, Request, Response, NextFunction } from 'express';
import AnimeOpeningsController from '../controllers/animeOpeningController';

const router = Router();
const controller = new AnimeOpeningsController();

router.get('/get', async (req: Request, res: Response, next: NextFunction) => { await controller.getAnimeOpenings(req, res).catch((erro) => next(erro)) });
router.post('/create', async (req: Request, res: Response, next: NextFunction) => { await controller.createAnimeOpening(req, res).catch((erro) => next(erro)) });
router.put('/edit/:id', async (req: Request, res: Response, next: NextFunction) => { await controller.editAnimeOpening(req, res).catch((erro) => next(erro)) });
router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => { await controller.deleteAnimeOpening(req, res).catch((erro) => next(erro)) });

export default router;