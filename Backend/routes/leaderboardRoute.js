const express = require('express');
const Leaderboard = require('../models/leaderboardModel');
const router = express.Router();

router.post('/submit', async (req, res) => {
  const { username, score } = req.body;

  try {
    const newLeaderboardEntry = new Leaderboard({ username, score });
    await newLeaderboardEntry.save();
    res.status(201).json({ message: 'Score submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving the score' });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10); 
    res.json(leaderboard); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leaderboard' });
  }
});

module.exports = router;
