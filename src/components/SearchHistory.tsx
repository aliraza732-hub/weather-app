// src/components/SearchHistory.tsx
import { useWeatherStore } from '../store/useWeatherStore';

function SearchHistory() {
  // TODO: Get searchHistory from store
  const searchHistory = useWeatherStore(state => state.searchHistory);
  // TODO: Get searchWeather from store
  const searchWeather = useWeatherStore(state => state.searchWeather);
  // TODO: Get removeFromHistory from store
const removeFromHistory = useWeatherStore(state => state.removeFromHistory);
  // TODO: Return null if no history
  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      {/* Title */}
      <p className="text-gray-400 text-sm font-semibold mb-2">
        🕒 Recent Searches:
      </p>

      {/* History Buttons */}
      <div className="flex flex-wrap gap-2">
        {/* TODO: Map through searchHistory */}
        {searchHistory.map((city) => (
          <div
            key={city}
            className="flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-full px-3 py-1"
          >
            {/* City Button */}
            <button
              onClick={() => searchWeather(city)}
              className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition-colors"
            >
              {city}
            </button>

            {/* Remove Button */}
            <button
              onClick={() => {removeFromHistory(city)}}
              className="text-blue-300 hover:text-red-400 transition-colors text-xs font-bold ml-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;