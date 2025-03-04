import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/games.css'; 

const Sidebar = () => {
  const { user, signout } = useAuth(); 

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Game Platform</h2>
      <ul className="sidebar-menu">

        {!user ? (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/main">Games</Link></li> {}
            <li><button className="logout-btn" onClick={signout}>Logout</button></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
