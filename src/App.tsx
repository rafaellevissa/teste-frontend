import { useEffect } from "react";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import Weather from "./components/Weather/Weather";
import useWeather from "./hook/use-weather";

export default function App() {
  const {
    weatherData,
    loading,
    loadWeatherByCityName,
    loadWeatherByCurrentLocation,
    error,
  } = useWeather();

  useEffect(() => {
    if (error) {
      alert(
        "The city could not be found or something went wrong while trying to fetch the city's weather information."
      );
    }
  }, [error]);

  const handleSearch = (value: string) => {
    loadWeatherByCityName(value);
  };

  const handleCurrentLocation = () => {
    loadWeatherByCurrentLocation();
  };

  if (loading) {
    return <Loading />;
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
