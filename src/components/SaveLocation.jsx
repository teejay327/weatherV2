import { useState } from 'react';
import axios from 'axios';

const SaveLocation = ({ token, onLocationSaved }) => {
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/locations',
        { location },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('location saved successfully!');
      setLocation('');
      if (onLocationSaved) onLocationSaved();
    } catch(error) {
      console.error('error saving location:', error.response?.data || error.message);
      setMessage('failed to save location');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Save a location</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text"
          placeholder="Enter location (e.g. Brisbane)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Save location
          </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{ message }</p>}
    </div>
  )
}

export default SaveLocation;