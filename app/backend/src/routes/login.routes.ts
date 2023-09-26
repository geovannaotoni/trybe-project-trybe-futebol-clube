import { Request, Response, Router } from 'express';
import Validations from '../middlewares/Validations';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  ((req: Request, res: Response) => userController.login(req, res)),
);

router.get(
  '/role',
  Validations.validateToken,
  ((req: Request, res: Response) => UserController.getRole(req, res)),
);

export default router;
