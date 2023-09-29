import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboard';
import LeaderboardCalculate from '../utils/LeaderboardCalculate';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) {}

  public async getLeaderboardByType(type: 'home' | 'away'):
  Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.teamModel.findAll();
    const allFinishedMatches = await this.matchModel.findAllByProgress(false);
    const unsortedData = allTeams
      .map((team) => new LeaderboardCalculate(team, allFinishedMatches, type));
    const data = LeaderboardCalculate.sortLeaderboards(unsortedData);
    return { status: 'SUCCESSFUL', data };
  }

  public async getAllLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const homeData = (await this.getLeaderboardByType('home')).data as ILeaderboard[];
    const awayData = (await this.getLeaderboardByType('away')).data as ILeaderboard[];
    const unsortedData = LeaderboardCalculate.getAllLeaderboard(homeData, awayData);
    const data = LeaderboardCalculate.sortLeaderboards(unsortedData);
    return { status: 'SUCCESSFUL', data };
  }
}
