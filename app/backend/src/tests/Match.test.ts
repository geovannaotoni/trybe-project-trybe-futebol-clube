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

  it.only('A requisição para a rota GET /matches retorna a lista de partidas', async function() {
    sinon.stub(SequelizeMatch, 'findAll').resolves(SequelizeMatch.bulkBuild(matchMock.matches));

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    console.log(body);
    expect(body).to.deep.equal(matchMock.matches);
  });
});