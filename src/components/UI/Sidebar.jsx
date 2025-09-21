import { useState, useEffect } from "react";
import axios from "axios";
import SaveLocation  from "../SaveLocation.jsx";
import { useAuth } from "../shared/hooks/use-auth.jsx";

const Sidebar = () => {
  const { token } = useAuth();
  const [isOpen, setIsOpen ] = useState(false);
  const [recentLocations, setRecentLocations ] = useState([]);

    const fetchRecentLocations = async() => {
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:5000/api/locations/recent", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // token debug
        console.log("[Sidebar] sending token:", token);

        setRecentLocations(response.data);
        console.log("[DEBUG] Recent locations fetched:", response.data)
      } catch(error) {
        console.error("Failed to fetch recent locations:", error.response?.data || error.message);
      }
    };

    useEffect(() => {
      fetchRecentLocations();
    }, [token])
   
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
        <h2 className="text-lg font-bold mb-4">Saved locations</h2>
        <SaveLocation onLocationSaved={fetchRecentLocations} />
        <div className="mt-4">
        {recentLocations.length > 0 ? (
          <ul className="space-y-2">
            {recentLocations.map((loc) => (
              <li key={loc._id} className="p-2 bg-stone-700 rounded-md">
                <div className="font-semibold">
                  {loc.location}
                </div>
                {loc.lat && loc.lon && (
                  <div className="text-xs text-stone-400">
                    Lat: {loc.lat}, Lon: {loc.lon}
                  </div>
                )}
                {loc.weather && (
                  <div className="text-sm mt-1 italic">
                    {loc.weather.summary} - {loc.weather.temp}°C
                  </div>
                )}                
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No saved locations exist</p>
        )}
        </div>
      </div>
    </aside>
  )
};

export default Sidebar;