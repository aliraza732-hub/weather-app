// src/store/useWeatherStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WeatherData, ForecastDay } from '../types/weather';
import { 
  fetchWeatherByCity, 
  fetchForecastByCity, 
  fetchWeatherByCoords 
} from '../services/weatherApi';

interface WeatherStore {
  // State
  currentWeather: WeatherData | null;
  forecast: ForecastDay[];
  isLoading: boolean;
  error: string | null;
  unit: 'celsius' | 'fahrenheit';
  searchHistory: string[];  // NEW!
  coordinates: { lat: number; lon: number } | null;
  
  // Actions
  searchWeather: (city: string) => Promise<void>;
  getWeatherByLocation: () => Promise<void>;
  toggleUnit: () => void;
  clearError: () => void;
  removeFromHistory: (city: string) => void;  // NEW!
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentWeather: null,
      forecast: [],
      isLoading: false,
      error: null,
      unit: 'celsius',
      searchHistory: [],
      coordinates: null,

      searchWeather: async (city: string) => {
        if (!city.trim()) {
          set({ error: 'Please enter a city name' });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const weatherData = await fetchWeatherByCity(city);
          const forecastData = await fetchForecastByCity(city);

          const dailyForecast: ForecastDay[] = [];
          const seenDates = new Set<string>();

          forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateStr = date.toDateString();

            if (!seenDates.has(dateStr) && dailyForecast.length < 5) {
              seenDates.add(dateStr);
              dailyForecast.push({
                date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                temp: Math.round(item.main.temp),
                icon: item.weather[0].icon,
                description: item.weather[0].description
              });
            }
          });

          // NEW! Update search history
          const cityName = weatherData.name;
          const currentHistory = get().searchHistory;

          // Remove if already exists (avoid duplicates)
          const filteredHistory = currentHistory.filter(
            c => c.toLowerCase() !== cityName.toLowerCase()
          );

          // Add to beginning, keep only last 5
          const newHistory = [cityName, ...filteredHistory].slice(0, 5);

          set({
            currentWeather: weatherData,
            forecast: dailyForecast,
            isLoading: false,
            error: null,
            searchHistory: newHistory,
            // ensure we store valid coordinates returned by API
            coordinates: {
              lat: weatherData.coord.lat,
              lon: weatherData.coord.lon
            }
          });

        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error 
              ? error.message 
              : 'Failed to fetch weather data'
          });
        }
      },

      getWeatherByLocation: async () => {
        set({ isLoading: true, error: null });

        if (!navigator.geolocation) {
          set({
            isLoading: false,
            error: 'Geolocation is not supported by your browser'
          });
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const weatherData = await fetchWeatherByCoords(latitude, longitude);
              const forecastData = await fetchForecastByCity(weatherData.name);

              const dailyForecast: ForecastDay[] = [];
              const seenDates = new Set<string>();

              forecastData.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dateStr = date.toDateString();

                if (!seenDates.has(dateStr) && dailyForecast.length < 5) {
                  seenDates.add(dateStr);
                  dailyForecast.push({
                    date: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: Math.round(item.main.temp),
                    icon: item.weather[0].icon,
                    description: item.weather[0].description
                  });
                }
              });

              // Update search history
              const cityName = weatherData.name;
              const currentHistory = get().searchHistory;
              const filteredHistory = currentHistory.filter(
                c => c.toLowerCase() !== cityName.toLowerCase()
              );
              const newHistory = [cityName, ...filteredHistory].slice(0, 5);

              set({
                currentWeather: weatherData,
                forecast: dailyForecast,
                isLoading: false,
                error: null,
                searchHistory: newHistory,
                coordinates: {
                  lat: latitude,
                  lon: longitude
                }
                
              });

            } catch (error) {
              set({
                isLoading: false,
                error: error instanceof Error 
                  ? error.message 
                  : 'Failed to fetch weather data'
              });
            }
          },
          () => {
            set({
              isLoading: false,
              error: 'Unable to get your location. Please search manually.'
            });
          }
        );
      },

      toggleUnit: () => {
        set(state => ({
          unit: state.unit === 'celsius' ? 'fahrenheit' : 'celsius'
        }));
      },

      clearError: () => {
        set({ error: null });
      },

      // NEW! Remove city from history
      removeFromHistory: (city: string) => {
        set(state => ({
          searchHistory: state.searchHistory.filter(c => c !== city)
        }));
      }
    }),
    {
      name: 'weather-storage',
      // Only persist these fields
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        unit: state.unit
      })
    }
  )
);