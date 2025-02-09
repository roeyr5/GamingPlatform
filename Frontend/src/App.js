// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Main from './components/Main';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Sidebar is always visible */}
        <div className="content">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/main" element={<Main />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
