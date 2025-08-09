import Location from '../models/location.js';

const getRecentLocations = async(req, res) => {
  try {
    const locations = await Location.find({ userId: req.userData.userId })
      .sort({ createdAt: -1}) // newest first
      .limit(3);

    res.status(200).json(locations);
  } catch(err) {
    console.error('Error fetching recent locations:', err);
    res.status(500).json({ message: 'Failed to fetch recent locations'});
  }
}

export default getRecentLocations;