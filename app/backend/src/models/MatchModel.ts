import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeMatch from '../database/models/SequelizeMatch';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;
  public async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map((match) => match.toJSON());
  }

  public async findAllByProgress(inProgress: boolean): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData.map((match) => match.toJSON());
  }

  public async finish(id: number): Promise<number> {
    const [updatedMatch] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return updatedMatch;
  }

  public async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<number> {
    const [updatedMatch] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return updatedMatch;
  }

  public async create(match: Omit<IMatch, 'id'>): Promise<IMatch> {
    const newMatch = await this.model.create(match);
    return newMatch.toJSON();
  }
}
