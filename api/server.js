const express = require("express");

const games = require('../games/gamesModel');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: "api get running" })
})

server.get('/games', async (req, res) => {
  const gotGames = await games.getAll();

  res.status(200).json(gotGames)
})

server.post('/games', async (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res.status(422).json({ Error: 'must add title and genre access server request'})
  } else {
    const gotGames = await games.getAll();
    res.status(201).json(gotGames)
  }
});

module.exports = server;