import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const serviceResponse = await this.matchService.getAllMatches();
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
