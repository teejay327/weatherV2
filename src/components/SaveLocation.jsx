import { useState } from 'react';
import axios from 'axios';
import { useAuth } from './shared/hooks/use-auth.jsx';
import { useNavigate } from 'react-router-dom';

const SaveLocation = ({ onLocationSaved }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [location, setLocation] = useState(''); 
  const [status, setStatus] = useState(null); // 'saving' / 'success' / 'error'
  const [error, setError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    };
    if (!location.trim()) return;

    setStatus("saving");
    setError("");

    try {
      const response = await axios.post(
        'http://localhost:5000/api/locations',
        { location: location.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      console.log("[DEBUG] Location saved:", response.data);
      setStatus('location saved successfully!');
      setLocation('');
      if (onLocationSaved) onLocationSaved();
    } catch(error) {
      console.error('error saving location:', error.response?.data || error.message);
      const msg = error?.response?.data?.message || 'failed to save location';
      setError(msg);
      setStatus("error");
    } finally {
      // clear status after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const renderStatus = () => {
    switch(status) {
      case "saving":
        return <p className="mt-4 text-center text-sm text-yellow-600">saving ...</p>
      case "success":
        return <p className="mt-4 text-center text-sm text-yellow-600">location saved successfully!</p>
      case "error":
        return <p className="mt-4 text-center text-sm text-red-600"></p>
      default:
        return null;
    }
  }

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
          <button 
            type="submit" 
            disabled={!location.trim() || status === "saving" || !token} 
            className="w-full bg-stone-500 text-stone-200 py-2 rounded-md hover:bg-blue-600">
            {status === "saving" ? "saving ..." : "save location"}
          </button>
      </form>
      {renderStatus()}
    </div>
  )
}

export default SaveLocation;