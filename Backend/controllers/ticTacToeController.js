const User = require('../models/userModel');
const Leaderboard = require('../models/leaderboardModel');


exports.startGame = async (req, res) => {
  try {
    const { player1 } = req.body;

    if (!player1) {
      return res.status(400).json({ msg: 'Player1 is required' });
    }

    const users = await User.find();

    if (users.length < 2) {
      return res.status(400).json({ msg: 'Not enough players to start a game' });
    }

    let randomOpponent;
    do {
      randomOpponent = users[Math.floor(Math.random() * users.length)];
    } while (randomOpponent.username === player1);

    res.status(201).json({ opponent: randomOpponent.username });
  } catch (error) {
    console.error('Error starting the game:', error);
    res.status(500).json({ msg: 'Error starting the game', error: error.message });
  }
};

exports.endGame = async (req, res) => {
  try {
    const { winner, gameType } = req.body;

    if (!gameType || !['tictactoe'].includes(gameType)) {
      return res.status(400).json({ msg: 'Invalid game type' });
    }

    const player1 = await User.findOne({ username: winner.player1 });
    const player2 = await User.findOne({ username: winner.player2 });

    if (!player1 || !player2) {
      return res.status(404).json({ msg: 'Player not found' });
    }

    let player1Leaderboard = await Leaderboard.findOne({ userId: player1._id, gameType });
    let player2Leaderboard = await Leaderboard.findOne({ userId: player2._id, gameType });

    if (!player1Leaderboard) {
      player1Leaderboard = new Leaderboard({
        userId: player1._id,
        gameType,
        wins: 0,
        losses: 0
      });
    }
    if (!player2Leaderboard) {
      player2Leaderboard = new Leaderboard({
        userId: player2._id,
        gameType,
        wins: 0,
        losses: 0
      });
    }

    if (winner.player === 'player1') {
      player1Leaderboard.wins += 1;
      player2Leaderboard.losses += 1;
    } else if (winner.player === 'player2') {
      player2Leaderboard.wins += 1;
      player1Leaderboard.losses += 1;
    }

    await player1Leaderboard.save();
    await player2Leaderboard.save();

    res.json({ msg: 'Game finished', player1Leaderboard, player2Leaderboard });
  } catch (error) {
    console.error('Error ending the game:', error);
    res.status(500).json({ msg: 'Error ending the game', error: error.message });
  }
};





