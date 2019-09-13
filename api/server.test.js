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

      it('needs to display an array of all games in db with status of 200', async () => {
        await db('games').insert({title: "Tetris", genre: "Console", releaseYear: 1982 })
        await db('games').insert({title: "Zelda", genre: "Console", releaseYear: 1986 })

        const res = await request(server).get('/games');
        const data = res.body
        
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(data.length).toBe(2);
        expect(data[0].id).toBe(1);
        expect(data[0].title).toBe('Tetris');
        expect(data[1].id).toBe(2);
        expect(data[1].title).toBe('Zelda');

      })


      xit('if required field is missing returns a 422 error', async () => {
        const game = { title: 'Tetris', releaseYear: 1982 };

        const res = await request(server).post('/games').send(game);

        expect(res.status).toBe(422)
        
      })

      it('should send 201 when a game is posted successfully', async () => {
        const res = await request(server).post('/games').send({ title: 'Tetris', genre: 'Console', releaseYear: 1982 });

        expect(res.status).toEqual(201);
      })

    })
  })
})