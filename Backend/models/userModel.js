const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  games: {
    tictactoe: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
    },
    battleships: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
    },
    snake:{
      score: { type: Number, default: 0 }
    },
    rockpaper: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 },
    },
  },
});

module.exports = mongoose.model('User', UserSchema);
