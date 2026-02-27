// src/components/ForecastCard.tsx
import { getWeatherIconUrl } from '../services/weatherApi';
import type { ForecastDay } from '../types/weather';
import { useWeatherStore } from '../store/useWeatherStore';

interface ForecastCardProps {
  forecast: ForecastDay;
}

function ForecastCard({ forecast }: ForecastCardProps) {
    //  forecast = { date: "Mon", temp: 16, icon: "03d", description: "scattered clouds" }

  const unit = useWeatherStore((state) => state.unit);

  // Convert temperature based on unit
  const convertTemp = (temp: number) => {
    if (unit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';
  const iconUrl = getWeatherIconUrl(forecast.icon);

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white text-center hover:bg-white/30 transition-all hover:scale-105 cursor-default">
      
      {/* Day Name */}
      <p className="font-bold text-lg mb-2">
        {forecast.date}
      </p>

      {/* Weather Icon */}
      <img
        src={iconUrl}
        alt={forecast.description}
        className="w-16 h-16 mx-auto drop-shadow-md"
      />

      {/* Temperature */}
      <p className="text-2xl font-bold mt-2">
        {convertTemp(forecast.temp)}{unitSymbol}
      </p>

      {/* Description */}
      <p className="text-white/70 text-sm capitalize mt-1">
        {forecast.description}
      </p>
     
    </div>
  );
}

export default ForecastCard;