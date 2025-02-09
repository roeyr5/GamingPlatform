const TicTacToe = require('../models/ticTacToeModel');

exports.startGame = async (req, res) => {
  try {
    const newGame = new TicTacToe({
      players: [req.body.player1, req.body.player2],
      board: Array(9).fill(null), 
      currentTurn: 'X', 
    });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ msg: 'error starting the TicTacToe game' });
  }
};

exports.makeMove = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { player, move } = req.body;

    const game = await TicTacToe.findById(gameId);

    if (game.currentTurn !== player) {
      return res.status(400).json({ msg: "It's not your turn!" });
    }

    if (game.board[move] === null) {
      game.board[move] = player;  
      game.currentTurn = player === 'X' ? 'O' : 'X';
      await game.save();

      res.json(game);
    } else {
      res.status(400).json({ msg: "Invalid move" });
    }
  } catch (error) {
    res.status(500).json({ msg: 'error making the move in TicTacToe' });
  }
};
