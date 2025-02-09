const express = require('express');
const { startGame, makeMove } = require('../controllers/ticTacToeController');
const router = express.Router();

router.post('/start', startGame);
router.post('/move/:gameId', makeMove);

module.exports = router;
