import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';

import { Response } from 'superagent';
import { teams } from './mocks/Team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('#Teams', () => {
  afterEach(sinon.restore);

  it('A requisição para a rota GET /teams retorna todos os times', async function() {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams.map((team) => SequelizeTeam.build(team)));

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('A requisição para a rota GET /teams/:id retorna o time com id correto', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(SequelizeTeam.build(teams[0]));

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams[0]);
  });

  it('A requisição para a rota GET /teams/:id retorna uma mensagem de erro se não encontrar o time', async function() {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/9999');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Team 9999 not found' });
  });
});