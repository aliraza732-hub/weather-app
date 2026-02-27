

// Current weather data from API
export interface WeatherData {
  coord: {
    lat:number;
    lon:number;
  }
  name: string;           // City name
  sys: {
    country: string;      // Country code (US, UK, etc)
  };
  main: {
    temp: number;         // Temperature
    feels_like: number;   // Feels like temperature
    humidity: number;     // Humidity percentage
    pressure: number;     // Atmospheric pressure
  };
  weather: Array<{
    main: string;         // Weather condition (Clear, Clouds, Rain)
    description: string;  // Description (clear sky, light rain)
    icon: string;         // Icon code (01d, 02n, etc)
  }>;
  wind: {
    speed: number;        // Wind speed
  };
  dt: number;            // Timestamp
}

// Forecast data (5-day forecast)
export interface ForecastData {
  list: Array<{
    dt: number;          // Timestamp
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
  city: {
    name: string;
    country: string;
  };
}

// Simplified forecast item for display
export interface ForecastDay {
  date: string;          // Day name (Mon, Tue, Wed)
  temp: number;          // Temperature
  icon: string;          // Weather icon code
  description: string;   // Weather description
}