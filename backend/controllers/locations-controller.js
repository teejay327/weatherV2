import Location from '../models/location.js';
import axios from 'axios';

const saveLocation = async(req, res) => {
  try {
    console.log('[SaveLocation] user:', req.userData);
    const { location } = req.body;
    
    if (!location || !location.trim()) {
      return res.status(400).json({message: 'Invalid location in request body'});
    }

    const locationName = location.trim();

    // using encodeURIComponent to avoid problems with spaces & special characters
    const q = encodeURIComponent(locationName);
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${process.env.WEATHER_API_KEY}`
    )

    if (!Array.isArray(geoRes.data) || geoRes.data.length === 0) {
      return res.status(404).json({ message: 'Location not found'})
    }

    const { lat,lon } = geoRes.data[0];
    if (typeof lat !== 'number' || typeof lon !=='number') {
      console.error('[SaveLocation] invalid lat/lon:', geoRes.data[0]);
      return res.status(502).json({message: 'Geocoding returned invalid data'});
    }

    const newLocation = new Location({
      location: locationName,
      lat,
      lon,
      userId: req.userData.userId
    });

    const saved = await newLocation.save();
    res.status(201).json(saved)
  } catch(err) {
      console.error('Error saving location:', err);
      res.status(500).json({message: 'Failed to save location', detail: err.message});
  };
};

const getRecentLocations = async(req, res) => {
  try {
    const locations = await Location.find({ userId: req.userData.userId })
      .sort({ createdAt: -1})
      .limit(3);

    console.log("[DEBUG] GET RECENT LOCATIONS FOUND:", locations);
    
    res.status(200).json(locations);
  } catch(err) {
      console.error('Error fetching recent locations', err);
      res.status(500).json({ message: 'Failed to fetch recent locations' });
  };
};

export {saveLocation,getRecentLocations};