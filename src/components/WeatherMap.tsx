// src/components/WeatherMap.tsx
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useWeatherStore } from '../store/useWeatherStore';
import 'leaflet/dist/leaflet.css';

// Component to recenter map when coordinates change
function MapUpdater({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);
  
  return null;
}

function WeatherMap() {
  const coordinates = useWeatherStore(state => state.coordinates);
  const currentWeather = useWeatherStore(state => state.currentWeather);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  if (!coordinates || !currentWeather) return null;

  const { lat, lon } = coordinates;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          🗺️ Weather Map
        </h3>
        <p className="text-blue-100 text-sm mt-1">
          {currentWeather.name}, {currentWeather.sys.country}
        </p>
      </div>

      {/* Map Container */}
      <div className="relative h-96 w-full">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          {/* Base Map Layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Weather Layers - Choose one or more */}
          
          {/* Temperature Layer */}
          <TileLayer
            url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={0.5}
          />

          {/* Clouds Layer (uncomment to use) */}
          {/* <TileLayer
            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={0.5}
          /> */}

          {/* Precipitation Layer (uncomment to use) */}
          {/* <TileLayer
            url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            opacity={0.5}
          /> */}

          {/* City Marker */}
          <Marker position={[lat, lon]}>
            <Popup>
              <div className="text-center">
                <p className="font-bold text-lg">{currentWeather.name}</p>
                <p className="text-gray-600">{Math.round(currentWeather.main.temp)}°C</p>
                <p className="text-gray-500 text-sm capitalize">
                  {currentWeather.weather[0].description}
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Auto-recenter when coordinates change */}
          <MapUpdater lat={lat} lon={lon} />
        </MapContainer>
      </div>

      {/* Map Legend */}
      <div className="bg-gray-50 p-4 border-t">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
            <span className="text-gray-600">Cold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 border border-green-500 rounded"></div>
            <span className="text-gray-600">Mild</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-300 border border-yellow-500 rounded"></div>
            <span className="text-gray-600">Warm</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-300 border border-red-500 rounded"></div>
            <span className="text-gray-600">Hot</span>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-2">
          Temperature overlay provided by OpenWeatherMap
        </p>
      </div>
    </div>
  );
}

export default WeatherMap;