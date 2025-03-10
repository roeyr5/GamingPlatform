import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../styles/games.css';
import Leaderboard from '../sides/Leaderboard';

const TicTacToe = () => {
  const { user } = useAuth(); 
  const [game, setGame] = useState(null); 
  const [player, setPlayer] = useState(''); 
  const [winner, setWinner] = useState(null); 
  const [isGameOver, setIsGameOver] = useState(false);
  const [turnPlayer, setTurnPlayer] = useState('');

  const startGame = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/tic-tac-toe/start', {
        player1: user.username,
      });

      setGame({ board: Array(9).fill(null), currentTurn: 'X', opponent: response.data.opponent });
      setPlayer('X'); 
      setTurnPlayer(user.username);
      setIsGameOver(false);
    } catch (error) {
      console.error('Error starting the game', error);
    }
  };

  const makeMove = async (index) => {
    if (game.board[index] !== null || isGameOver) {
      return;
    }

    const newBoard = [...game.board];
    newBoard[index] = player;

    const nextPlayer = player === 'X' ? 'O' : 'X';

    const gameWon = checkWinner(newBoard);
    if (gameWon) {
      setWinner(player);
      setIsGameOver(true);
      await updatePoints(player);
      Swal.fire({
        title: `${player === 'X' ? 'You' : game.opponent} win!`,
        text: 'The game will reset now.',
        icon: 'success',
        confirmButtonText: 'OK',
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then(() => {
        resetGame();
      });
    } else if (newBoard.every(cell => cell !== null)) {
      setIsGameOver(true);
      Swal.fire({
        title: "It's a tie!",
        text: 'The game will reset now.',
        icon: 'info',
        confirmButtonText: 'OK',
        allowOutsideClick: true,
        allowEscapeKey: true,
      }).then(() => {
        resetGame();
      });
    }

    setGame((prevState) => ({ ...prevState, board: newBoard, currentTurn: nextPlayer }));
    setPlayer(nextPlayer);
    setTurnPlayer(nextPlayer === 'X' ? game.opponent : user.username);
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const updatePoints = async (winner) => {
    try {
      await axios.post('http://localhost:4000/api/tic-tac-toe/end', { 
        winner: {
          player1: user.username,
          player2: game.opponent,
          player: winner === 'X' ? 'player1' : 'player2'
        },
        gameType: 'tictactoe', 
      });
    } catch (error) {
      console.error('Error updating player points', error);
    }
  };

  const renderBoard = () => (
    <div className="board">
      {game.board.map((cell, index) => (
        <div
          key={index}
          className="cell"
          onClick={() => makeMove(index)}
          style={{
            cursor: isGameOver ? 'not-allowed' : 'pointer',
            backgroundColor: cell ? 'lightgrey' : 'white',
          }}
        >
          {cell}
        </div>
      ))}
    </div>
  );

  const resetGame = () => {
    setGame(null);
    setWinner(null);
    setIsGameOver(false);
    setTurnPlayer('');

  };

  useEffect(() => {
    if (game) {
      setWinner(null);
      setIsGameOver(false);
    }
  }, [game]);

  return (
    <div className="game-container">
      <div className="game-board">
        {!game ? (
          <button onClick={startGame}>Start Game</button>
        ) : (
          <div>
            <div className="game-info">
              <h2>Tic Tac Toe</h2>
              <p>Current Turn: {turnPlayer}</p>
              <p>Opponent: {game.opponent}</p>
              {winner && <p>{winner} wins!</p>}
            </div>
            {renderBoard()}
          </div>
        )}
      </div>

      <div className="leaderboard-container">
        <Leaderboard gameType="tictactoe" /> 
      </div>
    </div>
  );
};

export default TicTacToe;
