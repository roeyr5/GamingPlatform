
const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  gameType: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  score: { type: Number, default: 0 }, 
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
