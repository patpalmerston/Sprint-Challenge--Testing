const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

describe('server.js', () => {

  it('should set the testing environment', () => {
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

    describe("/ endpoint testing for games api", () => {

      beforeEach(() => {
        return db('games').truncate();
      })

      it("if no games return empty array", async () => {
        const res = await request(server).get('/games');

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toEqual([])
      });


    })
  })
})