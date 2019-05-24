const request = require('supertest');
const games = require('./gamesModel');
const db = require('../data/dbConfig');


describe('The games model', () => {
  describe('Insert function', async () => {

    beforeEach(() => {
      return db('games').truncate();
    })

    it('insert new game to database', async () => {
      const newGame = {
        title: "Tetris",
        genre: "Console", 
        releaseYear: 1982
      }

      const game = await games.insert(newGame);

      expect(game.title).toBe('Tetris');
      expect(game.genre).toBe('Console');
      expect(game.releaseYear).toBe(1982);
    })
  })

  describe('getAll', () => {
    it('should recieve all games', async () => {
      db('games').insert({ title: "Tetris", genre: "Console", releaseYear: 1982});

      const gameList = await games.getAll();

      expect(gameList.length).toBe(1);
    });

    it('retrieve all feilds from each game', async () => {
      db('games').insert({ title: "Tetris", genre: "Console", releaseYear: 1982 });

      const gameList = await games.getAll();

      expect(gameList[0].title).toBe('Tetris');
      expect(gameList[0].genre).toBe('Console');
      expect(gameList[0].releaseYear).toBe(1982);
    })
  })

})