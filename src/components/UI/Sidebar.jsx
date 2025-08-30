import { useState, useEffect } from "react";
import axios from "axios";
import SaveLocation  from "../SaveLocation";

const Sidebar = ({ token }) => {
  const [isOpen, setIsOpen ] = useState(false);
  const [recentLocations, setRecentLocations ] = useState([]);

  const fetchRecentLocations = async() => {
    console.log("[SIDEBAR]: Fetching recent locations ...");
    if (!token) return;
    try {
      const response = await axios.get("http://localhost:5000/api/locations/recent", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("[SIDEBAR] Response from backend:", response.data);
      setRecentLocations(response.data);
    } catch(error) {
      console.log("Failed to fetch recent locations:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) { 
      fetchRecentLocations();
    }
  }, [token]);

  return (
    <aside className={`w-1/4 h-full px-2 py-4 bg-stone-800 md:w-72 text-stone-300 rounded-r-md
      transition-all duration-300 ease-in-out ${isOpen ? "w-64 px-4" : "w-[8px] overflow-hidden" } md:w-72`}
     onMouseEnter={() => setIsOpen(true)}
     onMouseLeave={() => setIsOpen(false)}
    >
      <div className={`transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible w-full" : "opacity-0 invisible w-0"
        } md:opacity-100 md:visible md:w-full `}
      >
        <h2 className="text-lg font-bold mb-4">Recent locations</h2>
        {recentLocations.length > 0 ? (
          <ul className="space-y-2">
            {recentLocations.map((loc) => (
              <li key={loc._id} className="p-2 bg-stone-700 rounded-md">
                {loc.location}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No saved locations exist</p>
        )}

        {/* Save new location */}
        {token && (
          <SaveLocation 
            token={token}
            onLocationSaved={fetchRecentLocations} // refresh sidebar when new location saved
          />
        )}
      </div>
    </aside>
  )
};

export default Sidebar;