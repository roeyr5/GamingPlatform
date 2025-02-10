import React, { useState, useEffect } from 'react';
import '../../styles/games.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/leaderboard/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      }
    };

    fetchLeaderboard();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {index + 1}. {entry.username} - {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
