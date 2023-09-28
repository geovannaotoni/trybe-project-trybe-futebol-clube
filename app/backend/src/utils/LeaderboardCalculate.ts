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
  ) {
    this.name = team.teamName;
    this.getAllGamesPlayed(team, allFinishedMatches);
    this.getTotalPoints();
    this.getGoalsData(team, allFinishedMatches);
    this.getEfficiency();
  }

  private getAllGamesPlayed(team: ITeam, allFinishedMatches: IMatch[]): void {
    const gamesPlayed = allFinishedMatches.filter((match) => match.homeTeamId === team.id);
    this.totalGames = gamesPlayed.length;
    const gamesVictories = gamesPlayed.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
    this.totalVictories = gamesVictories.length;
    const gamesLosses = gamesPlayed.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
    this.totalLosses = gamesLosses.length;
    const gamesDraws = gamesPlayed.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
    this.totalDraws = gamesDraws.length;
  }

  private getTotalPoints() {
    this.totalPoints = this.totalVictories * 3 + this.totalDraws;
  }

  private getGoalsData(team: ITeam, allFinishedMatches: IMatch[]) {
    const gamesPlayed = allFinishedMatches.filter((match) => match.homeTeamId === team.id);
    this.goalsFavor = gamesPlayed.reduce((acc, match) => acc + match.homeTeamGoals, 0);
    this.goalsOwn = gamesPlayed.reduce((acc, match) => acc + match.awayTeamGoals, 0);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private getEfficiency() {
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }
}
