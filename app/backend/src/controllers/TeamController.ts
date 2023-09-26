import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async getAllTeams(req: Request, res: Response) {
    const ServiceResponse = await this.teamService.getAllTeams();
    res.status(mapStatusHTTP(ServiceResponse.status)).json(ServiceResponse.data);
  }
}
