import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Main = () => {
  return (
    <div className="main-container">
      <h2 className="main-title">Choose Your Game</h2>
      
      <div className="game-grid">
        <div className="game-section skill-game">
          <h3>Skill Games</h3>
          <Link to="/tic-tac-toe" className="game-card">Tic Tac Toe</Link>
          <Link to="/snake" className="game-card">Snake</Link>
        </div>

        <div className="game-section skill-luck-game">
          <h3>Skill & Luck</h3>
          <Link to="/boats" className="game-card">Battleship</Link>
        </div>

        <div className="game-section luck-game">
          <h3>Memory Games</h3>
          <Link to="/simon" className="game-card">Simon Game</Link>
        </div>
      </div>
    </div>
  );
};

export default Main;