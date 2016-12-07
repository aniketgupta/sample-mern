import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Add a new User
router.route('/user/register').post(UserController.registerUser);
router.route('/user/login').post(UserController.login);

export default router;
