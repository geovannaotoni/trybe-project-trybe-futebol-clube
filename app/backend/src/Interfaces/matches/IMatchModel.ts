import { ICRUDModelCreator } from '../ICRUDModel';
import { IMatch } from './IMatch';

export interface IMatchModel extends ICRUDModelCreator<IMatch> {
  findAll(): Promise<IMatch[]>,
  findAllByProgress(inProgress: boolean): Promise<IMatch[]>,
  finish(id: number): Promise<number>,
  updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<number>,
}
