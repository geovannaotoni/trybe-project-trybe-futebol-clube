import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatch from '../database/models/SequelizeMatch';
import matchMock from './mocks/Match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('#Match', () => {
  afterEach(sinon.restore);

  it('A requisição para a rota GET /matches retorna a lista de partidas', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matchMock.matches));

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock.matches);
  });

  it('A requisição para a rota GET /matches?inProgress=true retorna a lista de partidas em andamento', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matchMock.matchesInProgress));

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock.matchesInProgress);
  });

  it('A requisição para a rota GET /matches?inProgress=false retorna a lista de partidas finalizadas', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matchMock.finishedMatches));

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchMock.finishedMatches);
  });
});