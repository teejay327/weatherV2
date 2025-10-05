import express from 'express';
import usersController from '../controllers/users-controller.js';
import checkAuth from '../middleware/check-auth.js';

const router = express.Router();

// Public routes
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

// Protected routes
router.get('/validate', checkAuth, usersController.validateToken);
router.get('/protected', checkAuth, (req,res) => {
  res.json({ message: `Ahoy, ${req.user.email}! You've reached the secure harbour!` });
});



export default router;