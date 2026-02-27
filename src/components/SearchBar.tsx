// src/components/SearchBar.tsx
import { useState } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import SearchHistory from './SearchHistory';

function SearchBar() {
  const [city, setCity] = useState('');
  const searchWeather = useWeatherStore((state) => state.searchWeather);
  const getWeatherByLocation = useWeatherStore((state) => state.getWeatherByLocation);
  const isLoading = useWeatherStore((state) => state.isLoading);

  const handleSearch = () => {
    if (city.trim()) {
      searchWeather(city);
      setCity('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Search Row */}
      <div className="flex gap-3 w-full">
        {/* Input */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for a city... (e.g. London, Tokyo, Dubai)"
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 outline-none text-gray-700 text-lg focus:border-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isLoading || !city.trim()}
          className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>🔍</span>
          )}
          Search
        </button>

        {/* Location Button */}
        <button
          onClick={getWeatherByLocation}
          disabled={isLoading}
          className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Use my location"
        >
          📍
        </button>
      </div>

      {/* Search History (below input) */}
      <SearchHistory />
    </div>
  );
}

export default SearchBar;