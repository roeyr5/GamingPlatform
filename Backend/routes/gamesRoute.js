const express = require('express');
const router = express.Router();

const ticTacToeRoutes = require('./ticTacToeRoute');

router.use('/tic-tac-toe', ticTacToeRoutes);

module.exports = router;
