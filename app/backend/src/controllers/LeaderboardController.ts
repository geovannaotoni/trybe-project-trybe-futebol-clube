import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getAllLeaderboard(req: Request, res: Response) {
    const { path } = req.route;
    const { status, data } = await this.leaderboardService.getAllLeaderboard(path.substring(1));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
