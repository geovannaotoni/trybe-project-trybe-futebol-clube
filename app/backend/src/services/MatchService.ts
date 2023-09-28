import { ServiceResponse, ServiceResponseMessage } from '../Interfaces/ServiceResponse';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel: ITeamModel = new TeamModel(),
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

  public async finishMatch(id: number): Promise<ServiceResponse<ServiceResponseMessage>> {
    const updatedMatch = await this.matchModel.finish(id);
    if (!updatedMatch) return { status: 'INVALID_DATA', data: { message: 'Match not updated' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateGoalsMatch(id:number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<ServiceResponseMessage>> {
    const updatedMatch = await this.matchModel.updateGoals(id, homeTeamGoals, awayTeamGoals);
    if (!updatedMatch) return { status: 'INVALID_DATA', data: { message: 'Match not updated' } };
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(match: Partial<IMatch>): Promise<ServiceResponse<IMatch>> {
    if (match.homeTeamId === match.awayTeamId) {
      return { status: 'UNPROCESSABLE',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeTeam = await this.teamModel.findById(Number(match.homeTeamId));
    const awayTeam = await this.teamModel.findById(Number(match.awayTeamId));
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.create(match);
    return { status: 'CREATED', data: newMatch };
  }
}
