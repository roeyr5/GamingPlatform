const User = require('../models/userModel');

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

    if (winner.player === 'player1') {
      player1.games[gameType].wins += 1;
      player2.games[gameType].losses += 1;
    } else if (winner.player === 'player2') {
      player2.games[gameType].wins += 1;
      player1.games[gameType].losses += 1;
    }

    await player1.save();
    await player2.save();

    res.json({ msg: 'Game finished', player1, player2 });
  } catch (error) {
    console.error('Error ending the game:', error);
    res.status(500).json({ msg: 'Error ending the game', error: error.message });
  }
};

