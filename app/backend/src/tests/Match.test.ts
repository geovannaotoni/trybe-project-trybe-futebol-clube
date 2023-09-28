import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatch from '../database/models/SequelizeMatch';
import matchMock from './mocks/Match.mock';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validations';
import { jwtPayload } from './mocks/User.mock';

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

  it('A requisição para a rota PATCH /matches/:id/finish finaliza uma partida caso ela esteja em andamento', async function() {
    sinon.stub(JWT, 'verify').resolves(jwtPayload);
    // sinon.stub(Validations, 'validateToken').resolves();
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const { status, body } = await chai.request(app).patch('/matches/1/finish').set('Authorization', 'genericToken');

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  it('A requisição para a rota PATCH /matches/:id/finish retorna uma mensagem de erro caso a partida não seja atualizada', async function() {
    sinon.stub(JWT, 'verify').resolves(jwtPayload);
    sinon.stub(SequelizeMatch, 'update').resolves([0]);

    const { status, body } = await chai.request(app).patch('/matches/2/finish').set('Authorization', 'genericToken');

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'Match not updated' });
  });

  it('A requisição para a rota PATCH /matches/:id atualiza os gols dos times', async function() {
    sinon.stub(JWT, 'verify').resolves(jwtPayload);
    sinon.stub(SequelizeMatch, 'update').resolves([1]);

    const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', 'genericToken').send(matchMock.goalsToUpdate);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Updated' });
  });

  it('A requisição para a rota PATCH /matches/:id não atualiza os gols dos times caso os dados já estejam no banco', async function() {
    sinon.stub(JWT, 'verify').resolves(jwtPayload);
    sinon.stub(SequelizeMatch, 'update').resolves([0]);

    const { status, body } = await chai.request(app).patch('/matches/2').set('Authorization', 'genericToken').send(matchMock.goalsToUpdate);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'Match not updated' });
  });
});