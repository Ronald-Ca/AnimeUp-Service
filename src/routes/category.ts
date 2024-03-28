import { Router, Request, Response, NextFunction } from 'express';
import CategoryController from '../controllers/categoryController';
import Auth from '../middlewares/auth';

const router = Router()
const controller = new CategoryController()

router.get('/get', Auth, (req: Request, res: Response, next: NextFunction) => controller.getCategories(req, res).catch(next))
router.post('/create', Auth, (req: Request, res: Response, next: NextFunction) => controller.createCategory(req, res).catch(next))
router.put('/update/:id', Auth, (req: Request, res: Response, next: NextFunction) => controller.editCategory(req, res).catch(next))
router.delete('/delete/:id', Auth, (req: Request, res: Response, next: NextFunction) => controller.deleteCategory(req, res).catch(next))

export default router