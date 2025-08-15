import express from 'express';
import checkAuth from '../middleware/check-auth.js';
import { saveLocation, getRecentLocations } from '../controllers/locations-controller.js';
//import { getRecentLocations } from '../controllers/get-recent-locations-controller.js'

const router = express.Router();

//Protected route for saving locations
router.post('/', checkAuth, saveLocation);

//Get recent locations for logged-in user (Protected)
router.get('/recent', checkAuth, getRecentLocations);

export default router;