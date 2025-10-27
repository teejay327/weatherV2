import Location from '../models/location.js';
import GeocodeCache from '../models/geocode-cache.js';
import axios from 'axios';

// normalize a location name for the cache keys
const normalizeName = (name) => name.trim().toLowerCase();

// Geocode via OpenWeather (returns { lat, lon, displayName } or throws)
const geocodeViaOpenWeather = async(query) => {
  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    throw Object.assign(new Error('WEATHER_API_KEY not configured'),{status:500});
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    query
  )}&limit=1&appid=${apiKey}`;

  const resp = await axios.get(url, { timeout:10000});
  const arr = resp?.data;

  if (!Array.isArray(arr) || arr.length === 0) {
    const err = new Error('location not found');
    err.status = 404;
    throw err;
  }

  const first = arr[0];
  const lat = Number(first.lat);
  const lon = Number(first.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    const err = new Error('geocoding returned invalid co-ordinates');
    err.status = 502;
    throw err;
  }

  return { lat, lon, displayName: first.name || query };
};


const saveLocation = async(req, res) => {
  try {
    console.log('[SaveLocation] user:', req.userData);

    // Auth & input checks
    const userId = req?.userData?.userId;
    if (!userId) return res.status(401).json({ message: 'Authentication required'});

    const name = typeof req.body?.location === 'string' ? req.body.location.trim() : '';
    if (!name) return Eraser.status(400).json({ message: 'Invalid location in request body'});
    const key = normalizeName(name);

    // try cache
    // WE ARE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  } catch(err) {
    console.warn('[SaveLocation] cache upsert failed', err);
  }
}

// const saveLocation = async(req, res) => {
//   try {
//     console.log('[SaveLocation] user:', req.userData);
//     const { location } = req.body;
    
//     if (!location || !location.trim()) {
//       return res.status(400).json({message: 'Invalid location in request body'});
//     }

//     const locationName = location.trim();

//     // using encodeURIComponent to avoid problems with spaces & special characters
//     const q = encodeURIComponent(locationName);
//     const geoRes = await axios.get(
//       `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${process.env.WEATHER_API_KEY}`
//     )

//     if (!Array.isArray(geoRes.data) || geoRes.data.length === 0) {
//       return res.status(404).json({ message: 'Location not found'})
//     }

//     const { lat,lon } = geoRes.data[0];
//     if (typeof lat !== 'number' || typeof lon !=='number') {
//       console.error('[SaveLocation] invalid lat/lon:', geoRes.data[0]);
//       return res.status(502).json({message: 'Geocoding returned invalid data'});
//     }

//     const newLocation = new Location({
//       location: locationName,
//       lat,
//       lon,
//       userId: req.userData.userId
//     });

//     const saved = await newLocation.saveLocation = async(req,res) => {
// ();
//     res.status(201).json(saved)
//   } catch(err) {
//       console.error('Error saving location:', err);
//       res.status(500).json({message: 'Failed to saveLocation = async(req,res) => {
//  location', detail: err.message});
//   };
// };

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