import { Router, Request, Response, NextFunction } from 'express';
import SeasonController from '../controllers/seasonController';

const router = Router();
const controller = new SeasonController();

router.get('/get', (req: Request, res: Response, next: NextFunction) => { controller.getSeasons(req, res).catch((erro) => next(erro)) });
router.post('/create', (req: Request, res: Response, next: NextFunction) => { controller.createSeason(req, res).catch((erro) => next(erro)) });
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => { controller.editSeason(req, res).catch((erro) => next(erro)) });
router.delete('/delete/:id', (req: Request, res: Response, next: NextFunction) => { controller.deleteSeason(req, res).catch((erro) => next(erro)) });

export default router;