import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"

const MiniNightMap = ({ locations }) => {
  if (!locations || typeof locations.lat !== "number" || typeof locations.lon !== "number" ) {
    return null;
  }

  // Centre the map on the first saved location
  const centre = locations[0];

  return (
    <div className="mt-2 h-40 w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-900/80 shadow-sm">
      <MapContainer>
        <TileLayer>

        </TileLayer>
        <Marker>

        </Marker>
      </MapContainer>
    </div>
  )
};

export default MiniNightMap;