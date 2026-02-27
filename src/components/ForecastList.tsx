// src/components/ForecastList.tsx
import { useWeatherStore } from '../store/useWeatherStore';
import ForecastCard from './ForecastCard';

function ForecastList() {
  // TODO: Get forecast from store
  const forecast = useWeatherStore(state => state.forecast);

  // TODO: Return null if no forecast
  if (forecast.length === 0) return null;

  return (
    <div>
      {/* Title */}
      <h3 className="text-white text-2xl font-bold mb-4">
        📅 5-Day Forecast
      </h3>

      {/* Forecast Cards Grid */}
      <div className="grid grid-cols-5 gap-3">
        {/* TODO: Map through forecast and render ForecastCard */}
        {forecast.map((day, index) => (
          <ForecastCard
            key={index}
            forecast={day}
          />
        ))}
      </div>
    </div>
  );
}

export default ForecastList;