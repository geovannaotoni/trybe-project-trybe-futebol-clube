import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { invalidEmailLoginBody, invalidPasswordLoginBody, jwtPayload, registeredUser, validLoginBody } from './mocks/User.mock';
import SequelizeUser from '../database/models/SequelizeUser';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('#Login', () => {
  afterEach(sinon.restore);

  it('A requisição para a rota POST /login retorna uma mensagem de erro com body inválido', async function() {
    const { status, body } = await chai.request(app).post('/login').send({});

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('A requisição para a rota POST /login retorna uma mensagem de erro com email inválido', async function() {
    const { status, body } = await chai.request(app).post('/login').send(invalidEmailLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('A requisição para a rota POST /login retorna uma mensagem de erro com senha inválida', async function() {
    const { status, body } = await chai.request(app).post('/login').send(invalidPasswordLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('A requisição para a rota POST /login retorna um token quando o login é efetuado com sucesso', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(SequelizeUser.build(registeredUser));
    sinon.stub(JWT, 'sign').returns('token');

    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  it('A requisição para a rota POST /login retorna uma mensagem de erro se não encontrar o usuário', async function() {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).post('/login').send(validLoginBody);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('A requisição para a rota GET /login/role retorna o role do usuário', async function() {
    sinon.stub(JWT, 'verify').returns(jwtPayload);

    const { status, body } = await chai.request(app).get('/login/role').set('Authorization', 'genericToken');

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ role: jwtPayload.role });
  });
});