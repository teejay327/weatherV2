import Location from '../models/location.js';
import GeocodeCache from '../models/geocode-cache.js';
import axios from 'axios';
import mongoose from 'mongoose';
import { lastDayOfQuarter } from 'date-fns';

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
    if (!name) return res.status(400).json({ message: 'location name is required'});
    
    const key = normalizeName(name);

    // try cache
    let cache = await GeocodeCache.findOne({name: key}).exec();
    let lat, lon, displayName;
    let fromCache = false;

    if (cache) {
      fromCache = true;
      lat = cache.lat;
      lon = cache.lon;
      displayName = cache.displayName || name;
      console.debug('[SaveLocation] geocode cache HIT:', key);

      // if cache record but no displayName, try to fetch canonical name
      if (!cache.displayName) {
        (async () => {
          try {
            const geo = await geocodeViaOpenWeather(name);
            // update cache with canonical displayName & coordinates if they look !valid
            await GeocodeCache.findOneAndUpdate(
              { name: key },
              {
                displayName: geo.displayName,
                lat: geo.lat,
                lon: geo.lon,
                updatedAt: new Date(),
                source: 'openweather'
              },
              { new: true, setDefaultsOnInsert: true }
            ).exec();
            console.debug('[SaveLocation cache entry patched with displayName:', key);
          } catch(e) {
            // ignore background update errors
            console.warn('[SaveLocation] background cache patch failed', e);
          }
        })();
      } else {
        // touch updatedAt non-blocking
        cache.updatedAt = new Date();
        cache.save().catch((e) => console.warn('[SaveLocation] cache touch failed', e));
      }

      
      
    
    
    } else {
      console.debug('[SaveLocation] geocode cache MISS:', key);

      // Provider call via helper
      const geo = await geocodeViaOpenWeather(name);
      lat = geo.lat;
      lon = geo.lon;
      displayName = geo.displayName;

      // upsert into cache
      try {
        await GeocodeCache.findOneAndUpdate(
          { name: key },
          { name: key,
            displayName,
            lat,
            lon,
            source: 'openweather',
            updatedAt: new Date(),
          },
          { upsert: true,
            new: true,
            setDefaultsOnInsert: true
          }
        ).exec();

      } catch(err) {
        console.warn('[SaveLocation] cache upsert failed', err);
      }
    }

    // if we got here from cache, but didn't fill lat/lon yet, ensure they are set
    if (fromCache && (lat === undefined || lon === undefined)) {
      lat = cache.lat;
      lon = cache.lon;
    }

    // persist userLocation with canonical displayName when available
    const newLocation = new Location({
      location: displayName || name,
      lat,
      lon,
      userId
    });

    const saved = await newLocation.save();

    // optionally include cached flag in dev; currently returnin saved doc for compatability
    return res.status(201).json(saved);
  } catch(err) {
    const code = err.status ?? 500;
    if (code >= 500) console.error('error saving location:', err);
    return res.status(code).json({message: err.message || 'failed to save location'});
  }
};

const getRecentLocations = async(req, res) => {
  try {
    const userId = req?.userData?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'authentication required'});
    }

    const locations = await Location.find({ userId: req.userData.userId })
      .sort({ createdAt: -1})
      .limit(4)
      .lean()
      .exec();

    console.log('[DEBUG] GET RECENT LOCATIONS FOUND:', locations.length);
    
    res.status(200).json(locations);
  } catch(err) {
      console.error('[getRecentLocations] error:', err);
      return res.status(500).json({ message: 'Failed to fetch recent locations' });
  };
};

export {saveLocation,getRecentLocations};