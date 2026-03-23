const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('retourne un message de bienvenue', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Bonjour le monde!');
  });
});

describe('GET /health', () => {
  it('retourne le statut ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.uptime).toBeDefined();
  });
});

describe('POST /echo', () => {
  it('renvoie le body reçu', async () => {
    const payload = { nom: 'Claude', lang: 'fr' };
    const res = await request(app)
      .post('/echo')
      .send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body.received).toEqual(payload);
  });

  it('gère un body vide', async () => {
    const res = await request(app)
      .post('/echo')
      .send({});
    expect(res.statusCode).toBe(200);
    expect(res.body.received).toEqual({});
  });
});
