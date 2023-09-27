import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(inProgress?: string): Promise<ServiceResponse<IMatch[]>> {
    if (inProgress) return this.getAllMatchesByProgress(inProgress === 'true');
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getAllMatchesByProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAllByProgress(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
