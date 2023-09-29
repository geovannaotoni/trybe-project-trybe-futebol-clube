import { ITeam } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboard';

export default class LeaderboardCalculate {
  public name: string;
  public totalPoints = 0;
  public totalGames = 0;
  public totalVictories = 0;
  public totalDraws = 0;
  public totalLosses = 0;
  public goalsFavor = 0;
  public goalsOwn = 0;
  public goalsBalance = 0;
  public efficiency = 0;

  constructor(
    team: ITeam,
    allFinishedMatches: IMatch[],
    type: 'home' | 'away',
  ) {
    this.name = team.teamName;
    this.getAllGamesPlayed(team, allFinishedMatches, type);
    this.getTotalPoints();
    this.getGoalsData(team, allFinishedMatches, type);
    this.getEfficiency();
  }

  private getAllGamesPlayed(team: ITeam, allFinishedMatches: IMatch[], type: 'home' | 'away'):
  void {
    const gamesPlayed = allFinishedMatches.filter((match) => match[`${type}TeamId`] === team.id);
    this.totalGames = gamesPlayed.length;
    const opponent = type === 'home' ? 'away' : 'home';
    const gamesVictories = gamesPlayed
      .filter((match) => match[`${type}TeamGoals`] > match[`${opponent}TeamGoals`]);
    this.totalVictories = gamesVictories.length;
    const gamesLosses = gamesPlayed
      .filter((match) => match[`${type}TeamGoals`] < match[`${opponent}TeamGoals`]);
    this.totalLosses = gamesLosses.length;
    const gamesDraws = gamesPlayed
      .filter((match) => match[`${type}TeamGoals`] === match[`${opponent}TeamGoals`]);
    this.totalDraws = gamesDraws.length;
  }

  private getTotalPoints() {
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
  }

  private getGoalsData(team: ITeam, allFinishedMatches: IMatch[], type: 'home' | 'away') {
    const gamesPlayed = allFinishedMatches.filter((match) => match[`${type}TeamId`] === team.id);
    this.goalsFavor = gamesPlayed.reduce((acc, match) => acc + match[`${type}TeamGoals`], 0);
    const opponent = type === 'home' ? 'away' : 'home';
    this.goalsOwn = gamesPlayed.reduce((acc, match) => acc + match[`${opponent}TeamGoals`], 0);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private getEfficiency() {
    this.efficiency = parseFloat(
      ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2),
    ) || 0;
  }

  private static getAllLeaderboardByTeam(homeTeam: ILeaderboard, awayTeams: ILeaderboard[]):
  ILeaderboard {
    const awayTeam = awayTeams.find((team) => team.name === homeTeam.name);
    if (!awayTeam) return homeTeam;
    return {
      name: homeTeam.name,
      totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
      totalGames: homeTeam.totalGames + awayTeam.totalGames,
      totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
      totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
      totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
      goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
      goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
      goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
      efficiency: parseFloat(
        (((homeTeam.totalPoints + awayTeam.totalPoints)
        / ((homeTeam.totalGames + awayTeam.totalGames) * 3)) * 100).toFixed(2),
      ) || 0,
    };
  }

  public static getAllLeaderboard(homeTeams: ILeaderboard[], awayTeams: ILeaderboard[]):
  ILeaderboard[] {
    const allData = homeTeams
      .map((homeTeam) => LeaderboardCalculate.getAllLeaderboardByTeam(homeTeam, awayTeams));
    return allData;
  }

  public static sortLeaderboards(leaderboards: ILeaderboard[]): ILeaderboard[] {
    return leaderboards.sort((a, b) => {
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
  }
}
