import React, { useState } from 'react';
import '../../styles/games.css';
import Swal from 'sweetalert2';
import Leaderboard from '../sides/Leaderboard'; 
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


const NumberGuessingGame = () => {
  const { user } = useAuth(); 
  const [targetNumber, setTargetNumber] = useState(null); 
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);  
  const [maxAttempts] = useState(7);  
  const [isGameOver, setIsGameOver] = useState(false);  
  const [feedback, setFeedback] = useState(''); 

  const startGame = () => {
    const randomNum = Math.floor(Math.random() * 101);  
    setTargetNumber(randomNum);
    setGuess('');
    setAttempts(0);
    setIsGameOver(false);
    setFeedback('');
  };

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const checkGuess = async () => {
    if (!guess || isNaN(guess)) {
      setFeedback('Please enter a valid number.');
      return;
    }

    const numberGuess = parseInt(guess);

    if (numberGuess < 0 || numberGuess > 100) {
      setFeedback('Please enter a number between 0 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (numberGuess < targetNumber) {
      setFeedback('Too low! Try again.');
    } else if (numberGuess > targetNumber) {
      setFeedback('Too high! Try again.');
    } else {
      Swal.fire({
        title: 'Congratulations!',
        text: `You guessed the number in ${attempts + 1} attempts.`,
        icon: 'success',
        confirmButtonText: 'Start New Game',
      }).then(() => {
        setIsGameOver(true);
        updateLeaderboard();
      });
    }

    if (attempts + 1 === maxAttempts && numberGuess !== targetNumber) {
      setIsGameOver(true);
      Swal.fire({
        title: 'Game Over!',
        text: `You used all ${maxAttempts} attempts. The correct number was ${targetNumber}.`,
        icon: 'error',
        confirmButtonText: 'Start New Game',
      });
    }
  };

  const updateLeaderboard = async () => {
    try {
      await axios.post('http://localhost:4000/api/leaderboard/update', {
        player1: user.username,
        player2: 'AI or Opponent',
        gameType: 'numberGuessing', 
        winner: 'player1',
      });
    } catch (error) {
      console.error('Error updating the leaderboard:', error);
    }
  };

  return (
    <div className="game-container">
      <div className="game-board">
        {!isGameOver ? (
          <div>
            <h2>Number Guessing Game</h2>
            <p>Guess the number between 0 and 100!</p>
            <input
              type="number"
              value={guess}
              onChange={handleGuessChange}
              disabled={isGameOver}
            />
            <button onClick={checkGuess} disabled={isGameOver}>Guess</button>
            <p>Attempts left: {maxAttempts - attempts}</p>
            <span>{feedback}</span>
          </div>
        ) : (
          <div>
            <h2>Game Over</h2>
            <button onClick={startGame}>Start New Game</button>
          </div>
        )}
      </div>

      <div className="leaderboard-container">
        <Leaderboard gameType="numberGuessing" /> 
      </div>
    </div>
  );
};

export default NumberGuessingGame;
