import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const glowingDotIcon = L.divIcon({
  className: "mini-map-dot",
  html: '<div class="mini-map-dot-inner"></div>',
  iconSize: [16,16],
  iconAnchor: [8, 8]
})

const MiniNightMap = ({ location }) => {
  if (!location || typeof location.lat !== "number" || typeof location.lon !== "number" ) {
    return null;
  }

  // Centre the map on the first saved location
  const centre = [location.lat, location.lon];

  return (
    <div className="mt-2 h-40 w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-900/80 shadow-sm">
      <MapContainer
        center={centre}
        zoom={7}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
        className="h-full w-full"
        style={{ width: "100%", height: "100%"}}
      >
        {/* Dark earth basemap */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={centre} icon={glowingDotIcon} />
      </MapContainer>
    </div>
  )
};

export default MiniNightMap;