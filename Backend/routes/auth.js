const express = require('express');
const { signup, signin, getUserProfile } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/:userId', getUserProfile);

module.exports = router;
