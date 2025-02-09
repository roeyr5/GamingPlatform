import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const { signin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(formData);
  };

  return (
    <div className="form-container">
    <h2>Sign In</h2>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign In</button>
    </form>
  </div>
  );
};

export default SignIn;
