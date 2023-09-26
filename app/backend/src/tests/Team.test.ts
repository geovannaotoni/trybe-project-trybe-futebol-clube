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
});