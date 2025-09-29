import express from 'express';
import { saveLocation, getRecentLocations } from '../controllers/locations-controller.js';
import checkAuth from '../middleware/check-auth.js';

//import { getRecentLocations } from '../controllers/get-recent-locations-controller.js'

const router = express.Router();

// make sure all routes are protect, not just individual
router.use(checkAuth);
//Protected route for saving locations
router.post('/', saveLocation);

//Get recent locations for logged-in user (Protected)
router.get('/recent', getRecentLocations);

export default router;