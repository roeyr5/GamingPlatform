import React, { createContext, useState, useEffect, useContext } from 'react';

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
      setUser(token);
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.token);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const signin = async (userData) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.token);
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
