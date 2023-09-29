import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import teamMock from './mocks/Team.mocks';
import leaderboardMock from './mocks/Leaderboard.mock';
import SequelizeMatch from '../database/models/SequelizeMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('#Leaderboard', () => {
  afterEach(sinon.restore);

  it('A requisição para a rota GET /leaderboard/home retorna as informações de cada time da casa', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(SequelizeTeam.bulkBuild(teamMock.teams));
    sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(leaderboardMock.finishedMatches));

    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardMock.leaderboardHome);
  });

  it('A requisição para a rota GET /leaderboard/away retorna as informações de cada time visitante', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(SequelizeTeam.bulkBuild(teamMock.teams));
    sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(leaderboardMock.finishedMatches));

    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboardMock.leaderboardAway);
  });
});