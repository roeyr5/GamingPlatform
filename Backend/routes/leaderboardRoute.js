const express = require('express');
const { submitScore, getLeaderboard } = require('../controllers/leaderboardController');
const router = express.Router();

router.post('/submit', submitScore);
router.get('/', getLeaderboard);

module.exports = router;
