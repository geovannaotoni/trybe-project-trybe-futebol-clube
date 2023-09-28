import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const { status, data } = await this.matchService.getAllMatches(String(inProgress));
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateGoalsMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService
      .updateGoalsMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService
      .createMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
