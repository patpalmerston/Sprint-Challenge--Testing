const request = require('supertest');
const server = require('./server');

describe('server.js', () => {

  it('should set the testing enivronment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })

  describe('endpoints', () => {
    describe('GET /', () => {
      it('should return 200 ok using async', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200)
      })

      it('should return JSON', async () => {
        const res = await request(server).get('/');
        expect(res.type).toBe('application/json')
      })

      it('should return {api: "api get running"}', async () => {
        const res = await request(server).get('/');
        expect(res.body).toEqual({api: "api get running"});

      })
    })
  })
})