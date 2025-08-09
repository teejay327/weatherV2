import Location from '../models/location.js';

const saveLocation = async(req, res) => {
  try {
    const { location } = req.body;

    const newLocation = new Location({
      location,
      userId: req.userData.userId
    });

    await newLocation.save();
    res.status(201).json({ message: 'Location saved successfully'});
  } catch {
      console.log('Error saving location:', err);
      res.status(500).json({message: 'Failed to save location'});
  };
}

export default saveLocation;