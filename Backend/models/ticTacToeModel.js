const mongoose = require('mongoose');

const ticTacToeSchema = new mongoose.Schema({
  players: [String], 
  board: [String], 
  currentTurn: String, 
  winner: { type: String},
});

module.exports = mongoose.model('TicTacToe', ticTacToeSchema);
