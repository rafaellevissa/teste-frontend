import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Weather from "./components/Weather/Weather";
import useWeather from "./hook/use-weather";

export default function App() {
  const {
    weatherData,
    loading,
    loadWeatherByCityName,
    loadWeatherByCurrentLocation,
  } = useWeather();

  const handleSearch = (value: string) => {
    loadWeatherByCityName(value);
  };

  const handleCurrentLocation = () => {
    loadWeatherByCurrentLocation();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Navbar
        onSearchChange={handleSearch}
        onLocationClick={handleCurrentLocation}
      />
      <Weather weatherData={weatherData} />
    </main>
  );
}
