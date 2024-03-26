import { Router } from 'express';
import AnimeController from '../controllers/animeController';

const router = Router();
const controller = new AnimeController();

router.get('/get', (req, res) => { controller.getAnimes(req, res) });
router.post('/create', (req, res) => { controller.createAnime(req, res) });
router.put('/update/:id', (req, res) => { controller.editAnime(req, res) });
router.delete('/delete/:id', (req, res) => { controller.deleteAnime(req, res) });

export default router;