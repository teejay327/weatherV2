import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SatelliteMap = () => {
  return (
    <div className="w-full h-[500px] rounded-md overflow-hidden shadow-lg mt-8">
      <MapContainer
        center={[-27.4705,153.026]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer 
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles@Esri Source: Esri, Earthstar Geographics"
        />
      </MapContainer>
    </div>
  )
}

export default SatelliteMap;