import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchesController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  Validations.validateUpdateGoalsMatch,
  (req: Request, res: Response) => matchesController.updateGoalsMatch(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  Validations.validateNewMatch,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
