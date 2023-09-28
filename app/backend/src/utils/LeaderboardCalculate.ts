import { ITeam } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';

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
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }
}
