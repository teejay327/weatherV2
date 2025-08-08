import { useState } from 'react';
import axios from 'axios';

const SaveLocation = ({ token }) => {
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
        />
          <button>
            Save location
          </button>
      </form>
      {message && <p>{ message }</p>}
    </div>
  )
}

export default SaveLocation;