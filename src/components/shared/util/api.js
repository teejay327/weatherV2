import axios from 'axios';

const fetchRecentLocation = async(token) => {
  const response = await axios.get('http://localhost:5000/api/locations/recent', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.locations;
};

export default fetchRecentLocation;