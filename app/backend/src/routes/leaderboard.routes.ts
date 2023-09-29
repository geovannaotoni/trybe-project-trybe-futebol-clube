import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  ((req: Request, res: Response) => leaderboardController.getLeaderboardByType(req, res)),
);

router.get(
  '/away',
  ((req: Request, res: Response) => leaderboardController.getLeaderboardByType(req, res)),
);

router.get(
  '/',
  ((req: Request, res: Response) => leaderboardController.getAllLeaderboard(req, res)),
);

export default router;
