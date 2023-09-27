import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>,
  findAllByProgress(inProgress: boolean): Promise<IMatch[]>,
}
