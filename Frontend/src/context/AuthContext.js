import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId;

        if (userId) {
          fetchUserById(userId);
        } else {
          console.error('UserId not found in decoded token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    setLoading(false);
  }, []);

  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/auth/${userId}`);
      const data = response.data;
      
      if (data.username) {
        setUser({ username: data.username, userId });
      } else {
        console.error('Username not found for this userId');
      }
    } catch (error) {
      console.error('Error fetching user data by userId:', error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      localStorage.setItem('token', data.token);
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
      setUser({ userId: decodedToken.userId, token: data.token });
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const signin = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signin', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      localStorage.setItem('token', data.token);
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
      setUser({ userId: decodedToken.userId, token: data.token });
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
