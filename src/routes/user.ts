import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const controller = new UserController();

router.post('/create', (req, res) => { controller.create(req, res) });
router.get('/getUser', (req, res) => { controller.getUsers(req, res) });
router.put('/editUser:id', (req, res) => { controller.editUser(req, res) });

export default router;
