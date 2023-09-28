import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findAllByProgress(inProgress: boolean): Promise<IMatch[]>,
  finish(id: number): Promise<number>,
  updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number>,
}
