// src/App.tsx
import './utils/leafletFix';  // ✅ Add this at top
import { useWeatherStore } from './store/useWeatherStore';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import WeatherMap from './components/WeatherMap';  // ✅ Import

function App() {
  const { currentWeather, isLoading, error, clearError } = useWeatherStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 p-4 pb-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            ☀️ Weather Dashboard
          </h1>
          <p className="text-blue-100 text-lg">
            Real-time weather with interactive maps
          </p>
        </header>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-5 mb-6">
          <SearchBar />
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl">❌</span>
              <div>
                <strong className="font-bold block text-lg">
                  Oops! Something went wrong
                </strong>
                <span className="text-sm">{error}</span>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 font-bold text-2xl transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center text-white py-16">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-white border-t-transparent mb-6">
            </div>
            <p className="text-2xl font-bold">Fetching weather data...</p>
            <p className="text-blue-100 mt-2">Please wait a moment</p>
          </div>
        )}

        {/* Weather Content */}
        {!isLoading && currentWeather && (
          <div className="space-y-6 animate-fade-in">
            <CurrentWeather />
            <ForecastList />
            <WeatherMap />  {/* ✅ Add WeatherMap */}
          </div>
        )}

        {/* Welcome State */}
        {!currentWeather && !isLoading && !error && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-12 text-center text-white shadow-xl">
            <div className="text-9xl mb-6">🌍</div>
            <h3 className="text-4xl font-bold mb-4">
              Welcome to Weather Dashboard!
            </h3>
            <p className="text-blue-100 text-xl mb-8">
              Search for any city or use your current location
            </p>

            {/* Quick Search Cities */}
            <div>
              <p className="text-blue-200 text-sm mb-3 font-semibold">
                POPULAR CITIES
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['London', 'New York', 'Tokyo', 'Dubai', 'Paris'].map(city => (
                  <QuickCityButton key={city} city={city} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-8 text-blue-200 text-sm">
          <p>Data & maps provided by OpenWeatherMap API</p>
        </footer>
      </div>
    </div>
  );
}

// Helper component
function QuickCityButton({ city }: { city: string }) {
  const searchWeather = useWeatherStore(state => state.searchWeather);

  return (
    <button
      onClick={() => searchWeather(city)}
      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-semibold transition-all hover:scale-105 border border-white/30"
    >
      {city}
    </button>
  );
}

export default App;