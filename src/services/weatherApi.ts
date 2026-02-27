// src/services/weatherApi.ts
import axios from 'axios';
import type { WeatherData, ForecastData } from '../types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Check if API key exists
if (!API_KEY) {
  console.error('❌ Weather API key is missing! Add VITE_WEATHER_API_KEY to .env file');
}

// Fetch current weather by city name
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Use Celsius (change to 'imperial' for Fahrenheit)
      }
    });
    
    console.log('✅ Weather data fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching weather:', error);
    throw new Error('Could not fetch weather data. Please check the city name.');
  }
};

// Fetch 5-day forecast by city name
export const fetchForecastByCity = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get<ForecastData>(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    console.log('✅ Forecast data fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching forecast:', error);
    throw new Error('Could not fetch forecast data.');
  }
};

// Fetch weather by coordinates (for geolocation)
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    console.log('✅ Weather data fetched by coords:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching weather by coords:', error);
    throw new Error('Could not fetch weather data for your location.');
  }
};

// Helper: Get weather icon URL
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};