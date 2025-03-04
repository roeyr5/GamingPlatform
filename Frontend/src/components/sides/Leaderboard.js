import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/games.css';

const Leaderboard = ({ gameType }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [statisticMode, setStatisticMode] = useState('winLoss');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/leaderboard', {
          params: { gameType },
        });
        setLeaderboard(response.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };
    fetchLeaderboard();
  }, []);

  const calculateWinPercentage = (wins, losses) => {
    const totalGames = wins + losses;
    return totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : 0;
  };

  const calculateLossPercentage = (wins, losses) => {
    const totalGames = wins + losses;
    return totalGames > 0 ? ((losses / totalGames) * 100).toFixed(2) : 0;
  };

  const handleStatisticChange = (event) => {
    setStatisticMode(event.target.value);
  };

  return (
    <div className="leaderboard">
      <h3>{gameType} Leaderboard</h3>

      <div className="statistic-mode-selection">
        <label>
          Select Statistic Mode:
          <select onChange={handleStatisticChange} value={statisticMode}>
            <option value="winLoss">Win/Loss</option>
            <option value="winPercentage">Win Percentage</option>
            <option value="lossPercentage">Loss Percentage</option>
            <option value="totalGames">Total Games</option>
            {gameType === 'snake' && <option value="score">Score</option>}
          </select>
        </label>
      </div>

      <ul>
        {leaderboard.map((entry, index) => {
          const { wins, losses, score } = entry;

          const winPercentage = calculateWinPercentage(wins, losses);
          const lossPercentage = calculateLossPercentage(wins, losses);
          const totalGames = wins + losses;

          return (
            <li key={entry._id || index}>
              <span className="rank">{index + 1}.</span>
              <span className="username">{entry.userId.username}</span>

              {statisticMode === 'winLoss' && (
                <>
                  <span className="score">W : {wins}</span>
                  <span className="score">L :{losses}</span>
                </>
              )}

              {statisticMode === 'winPercentage' && (
                <span className="percentage">Win %: {winPercentage}</span>
              )}

              {statisticMode === 'lossPercentage' && (
                <span className="percentage">Loss %: {lossPercentage}</span>
              )}

              {statisticMode === 'totalGames' && (
                <span className="total-games">Total Games: {totalGames}</span>
              )}

              {statisticMode === 'score' && gameType === 'snake' && (
                <span className="score">{score}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
