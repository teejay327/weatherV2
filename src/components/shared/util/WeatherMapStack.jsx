import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const { BaseLayer, Overlay } = LayersControl;

const WeatherMapStack = () => {
  return (
    <div className="w-full h-[500px] rounded-md overflow-hidden shadow-lg mt-8">
      <MapContainer
        center={[-27.4705,153.026]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Satellite">
            <TileLayer 
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles@Esri Source: Esri, Earthstar Geographics"
            />
            <TileLayer 
              url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=0d33e5afe0774544b33142154241008"
              attribution="@OpenWeatherMap"
              opacity={0.5}
            />
          </BaseLayer>
        
          <Overlay checked name="Radar">
            <TileLayer 
              url="https://tilecache.rainviewer.com/v2/radar/now/256/{z}/{x}/{y}/6/1_1.png"
              attribution="Radar data@Rainviewer"
              opacity={0.6}
              zIndex={1000}
            />
          </Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  )
}

export default WeatherMapStack ;