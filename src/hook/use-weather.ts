import { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  cityName: string;
  [key: string]: any;
}

export default function useWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${openWeatherApiKey}`
    );

    const data = await response.json();
    return {
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      cityName: data.name,
    };
  };

  const loadWeatherByCityName = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);

      const weather = await fetchWeatherByCityName(cityName);

      setWeatherData(weather);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadWeatherByCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const position = await fetchLocation();
      const { latitude, longitude } = position.coords;

      const weather = await fetchWeatherData(latitude, longitude);

      setWeatherData(weather);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCityName = async (
    cityName: string
  ): Promise<WeatherData> => {
    const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: cityName,
          appid: openWeatherApiKey,
          units: "metric",
        },
      }
    );
    const data = response.data;
    return {
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      cityName: data.name,
    };
  };

  useEffect(() => {
    loadWeatherByCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loadWeatherByCurrentLocation,
    loadWeatherByCityName,
    weatherData,
    loading,
    error,
  };
}
