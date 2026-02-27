// src/components/CurrentWeather.tsx
import { useWeatherStore } from '../store/useWeatherStore';
import { getWeatherIconUrl } from '../services/weatherApi';

function CurrentWeather() {
  const currentWeather = useWeatherStore((state) => state.currentWeather);
  const unit = useWeatherStore((state) => state.unit);
  const toggleUnit = useWeatherStore((state) => state.toggleUnit);

  if (!currentWeather) return null;

  // Convert temperature based on unit
  const convertTemp = (temp: number) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const temp = convertTemp(currentWeather.main.temp);
  const feelsLike = convertTemp(currentWeather.main.feels_like);
  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  const iconUrl = getWeatherIconUrl(currentWeather.weather[0].icon);

  // Get weather background based on condition
  const getWeatherBg = () => {
    const condition = currentWeather.weather[0].main.toLowerCase();
    if (condition.includes('clear')) return 'from-yellow-400 to-orange-400';
    if (condition.includes('cloud')) return 'from-gray-400 to-gray-600';
    if (condition.includes('rain')) return 'from-blue-600 to-blue-800';
    if (condition.includes('snow')) return 'from-blue-100 to-blue-300';
    if (condition.includes('thunder')) return 'from-gray-700 to-gray-900';
    return 'from-blue-400 to-blue-600';
  };

  return (
    <div className={`bg-gradient-to-br ${getWeatherBg()} rounded-2xl shadow-xl p-8 mb-6 text-white`}>
      
      {/* City Name & Date */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-4xl font-bold mb-1">
            {currentWeather.name}, {currentWeather.sys.country}
          </h2>
          <p className="text-white/80 text-lg">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Unit Toggle Button */}
        <button
          onClick={toggleUnit}
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl font-bold transition-all border border-white/30"
        >
          Switch to {unit === 'celsius' ? '°F' : '°C'}
        </button>
      </div>

      {/* Temperature & Icon */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {/* Main Temperature */}
          <div className="text-8xl font-bold mb-2">
            {temp}{unitSymbol}
          </div>
          
          {/* Description */}
          <p className="text-2xl capitalize text-white/90">
            {currentWeather.weather[0].description}
          </p>
          
          {/* Feels like */}
          <p className="text-white/70 mt-1">
            Feels like {feelsLike}{unitSymbol}
          </p>
        </div>

        {/* Weather Icon */}
        <div className="text-right">
          <img
            src={iconUrl}
            alt={currentWeather.weather[0].description}
            className="w-32 h-32 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Humidity */}
        <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
          <div className="text-3xl mb-1">💧</div>
          <div className="text-2xl font-bold">{currentWeather.main.humidity}%</div>
          <div className="text-white/70 text-sm">Humidity</div>
        </div>

        {/* Wind Speed */}
        <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
          <div className="text-3xl mb-1">💨</div>
          <div className="text-2xl font-bold">{Math.round(currentWeather.wind.speed)} km/h</div>
          <div className="text-white/70 text-sm">Wind Speed</div>
        </div>

        {/* Pressure */}
        <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
          <div className="text-3xl mb-1">🌡️</div>
          <div className="text-2xl font-bold">{currentWeather.main.pressure} hPa</div>
          <div className="text-white/70 text-sm">Pressure</div>
        </div>

        {/* Condition */}
        <div className="bg-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
          <div className="text-3xl mb-1">☁️</div>
          <div className="text-2xl font-bold">{currentWeather.weather[0].main}</div>
          <div className="text-white/70 text-sm">Condition</div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;