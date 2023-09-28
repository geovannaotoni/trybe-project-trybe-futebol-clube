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

  public async getAllLeaderboard(type: 'home' | 'away'): Promise<ServiceResponse<ILeaderboard[]>> {
    const allTeams = await this.teamModel.findAll();
    const allFinishedMatches = await this.matchModel.findAllByProgress(false);
    const data = allTeams
      .map((team) => new LeaderboardCalculate(team, allFinishedMatches, type))
      .sort((a, b) => {
        if (b.totalPoints !== a.totalPoints) {
          return b.totalPoints - a.totalPoints;
        }
        if (b.totalVictories !== a.totalVictories) {
          return b.totalVictories - a.totalVictories;
        }
        if (b.goalsBalance !== a.goalsBalance) {
          return b.goalsBalance - a.goalsBalance;
        }
        return b.goalsFavor - a.goalsFavor;
      });

    return { status: 'SUCCESSFUL', data };
  }
}
