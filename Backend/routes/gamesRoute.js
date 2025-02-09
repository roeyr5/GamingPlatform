const express = require('express');
const router = express.Router();

const ticTacToeRoutes = require('./ticTacToeRoutes');
const connectFourRoutes = require('./connectFourRoutes');
const chessRoutes = require('./chessRoutes');

router.use('/tic-tac-toe', ticTacToeRoutes);
router.use('/connect-four', connectFourRoutes);
router.use('/chess', chessRoutes);

module.exports = router;
