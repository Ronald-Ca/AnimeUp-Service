import { Router, Request, Response, NextFunction } from 'express';
import CategoryController from '../controllers/categoryController';

const router = Router()
const controller = new CategoryController()

router.get('/get', (req: Request, res: Response, next: NextFunction) => controller.getCategories(req, res).catch(next))
router.post('/create', (req: Request, res: Response, next: NextFunction) => controller.createCategory(req, res).catch(next))
router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => controller.editCategory(req, res).catch(next))
router.delete('/delete/:id', (req: Request, res: Response, next: NextFunction) => controller.deleteCategory(req, res).catch(next))

export default router