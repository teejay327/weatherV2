const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');
const checkAuth = require('../middleware/check-auth');

// Public routes
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

// Protected routes
router.get('protected', checkAuth, (req,res) => {
  res.json({ message: `Ahoy, ${req.user.email}! You've reached the secure harbour!` });
});

module.exports = router;