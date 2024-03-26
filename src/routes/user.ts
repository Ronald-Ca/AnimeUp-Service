import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();
const controller = new UserController();

router.get('/get', (req, res) => { controller.getUsers(req, res) });
router.post('/create', (req, res) => { controller.createUser(req, res) });
router.put('/update/:id', (req, res) => { controller.editUser(req, res) });
router.delete('/delete/:id', (req, res) => { controller.deleteUser(req, res) });

export default router;
