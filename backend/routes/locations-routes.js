import express from 'express';
import checkAuth from '../middleware/check-auth.js';
import saveLocation from '../controllers/locations-controller.js';

const router = express.Router();

//Protected route for saving locations
router.post('/', checkAuth, saveLocation);

export default router;