import React, { useState, useEffect, useRef } from 'react';
import '../../styles/games.css';
import Leaderboard from '../sides/Leaderboard';

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const moveSnake = () => {
    let newSnake = [...snake];
    let head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    newSnake.unshift(head);
    newSnake.pop();
    setSnake(newSnake);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
    if (e.key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
    if (e.key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
  };

  const checkCollision = () => {
    let head = snake[0];
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      setGameOver(true);
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        setGameOver(true);
      }
    }
  };

  const checkFoodCollision = () => {
    let head = snake[0];
    if (head.x === food.x && head.y === food.y) {
      setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
      setScore(score + 1);
      setSnake((prevSnake) => [
        ...prevSnake,
        { x: prevSnake[prevSnake.length - 1].x, y: prevSnake[prevSnake.length - 1].y }
      ]);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach((segment) => {
      ctx.fillStyle = 'green';
      ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
  };

  useEffect(() => {
    if (!gameStarted || countdown > 0) return;  
  
    if (gameOver) {
      return;
    }
  
    const interval = setInterval(() => {
      moveSnake();
      checkCollision();
      checkFoodCollision();
      drawGame();
    }, 100);
  
    return () => clearInterval(interval);
  }, [snake, direction, food, score, gameOver, gameStarted, countdown]);  
  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  if (gameOver) {
    return (
      <div>
        <div className="game-over">Game Over! Final Score: {score}</div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-board">
        {!gameStarted && <button className="start-button" onClick={startGame}>Start Game</button>}
        {gameStarted && countdown > 0 && <div className="countdown">{countdown}</div>}
        <canvas ref={canvasRef} width={400} height={400} />
        <div className="score">Score: {score}</div>
        {gameOver && <div className="game-over">Game Over! Final Score: {score}</div>}
      </div>

      <div className="leaderboard-container">
        <Leaderboard /> 
      </div>
    </div>
  );
};

export default SnakeGame;
