
const Leaderboard = require('../models/leaderboardModel');
const User = require('../models/userModel');

exports.submitScore = async (req, res) => {
  const { username, score, gameType } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const newLeaderboardEntry = new Leaderboard({ 
      userId: user._id, 
      score, 
      gameType 
    });

    await newLeaderboardEntry.save();

    user.leaderboardEntries.push(newLeaderboardEntry._id);
    await user.save();

    res.status(201).json({ message: 'Score submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving the score' });
  }
};


exports.getLeaderboard = async (req, res) => {
    const { gameType } = req.query; 
    try {
      const leaderboard = await Leaderboard.find({ gameType }).sort({ score: -1 }).limit(10).populate('userId', 'username');
      res.json(leaderboard);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching leaderboard' });
    }
  };
  