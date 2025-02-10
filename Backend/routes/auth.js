const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User does not exist' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
