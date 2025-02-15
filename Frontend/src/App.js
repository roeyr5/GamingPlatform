// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sides/Sidebar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Main from './components/Main';
import SnakeGame from './components/games/SnakeGame'; 
import Leaderboard from './components/sides/Leaderboard';  
import TicTacToe from './components/games/TicTacToe';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> 
        <div className="content">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/main" element={<Main />} />
            <Route path="/snake" element={<SnakeGame />} /> 
            <Route path="/tic-tac-toe" element={<TicTacToe />} /> 

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
