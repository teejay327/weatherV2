import Location from '../models/location.js';

const saveLocation = async(req, res) => {
  try {
    console.log('[DEBUG] req.userData:, req.userData');
    const { location } = req.body;

    const newLocation = new Location({
      location,
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
    
    res.status(200).json(locations);
  } catch(err) {
      console.error('Error fetching recent locations', err);
      res.status(500).json({ message: 'Failed to fetch recent locations' });
  };
};

export {saveLocation,getRecentLocations};