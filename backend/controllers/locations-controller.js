import Location from '../models/location.js';
import axios from 'axios';

const saveLocation = async(req, res) => {
  try {
    console.log('[DEBUG] req.userData:, req.userData');
    const { location } = req.body;

    const geoRes = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.WEATHER_API_KEY}`
    )

    if (!geoRes.data.length) {
      return res.status(404).json({ message: 'Location not found'})
    }

    const { lat,lon } = geoRes.data[0];

    const newLocation = new Location({
      location,
      lat,
      lon,
      userId: req.userData.userId
    });

    await newLocation.save();
    res.status(201).json({ message: 'Location saved successfully'});
  } catch(err) {
      console.error('Error saving location:', err);
      res.status(500).json({message: 'Failed to save location'});
  };
};

const getRecentLocations = async(req, res) => {
  try {
    const locations = await Location.find({ userId: req.userData.userId })
      .sort({ createdAt: -1})
      .limit(3);

    console.log("GET RECENT LOCATIONS] FOUND:", locations);
    
    res.status(200).json(locations);
  } catch(err) {
      console.error('Error fetching recent locations', err);
      res.status(500).json({ message: 'Failed to fetch recent locations' });
  };
};

export {saveLocation,getRecentLocations};