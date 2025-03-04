import React, { useState, useEffect } from 'react';
import '../../styles/games.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={entry._id || index}>
            <span className="rank">{index + 1}.</span>
            <span className="username">{entry.username}</span>
            <span className="score">{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;