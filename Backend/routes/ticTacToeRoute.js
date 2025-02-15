const express = require('express');
const router = express.Router();
const ticTacToeController = require('../controllers/ticTacToeController');

router.post('/start', ticTacToeController.startGame);
router.post('/end', ticTacToeController.endGame);

module.exports = router;
