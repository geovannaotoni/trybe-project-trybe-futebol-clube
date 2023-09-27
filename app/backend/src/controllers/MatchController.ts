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
}
