import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Weather from "./Weather";

describe("Weather Component", () => {
  const mockWeatherData = {
    temperature: 25,
    cityName: "CityName",
    windSpeed: 15,
    condition: "Clear",
    humidity: 60,
  };

  test("renders temperature and city name correctly", () => {
    render(<Weather weatherData={mockWeatherData} />);

    expect(screen.getByTestId("temperature")).toHaveTextContent("25°C");
    expect(screen.getByTestId("city-name")).toHaveTextContent("CityName");
  });

  test("renders weather information icons and data", () => {
    render(<Weather weatherData={mockWeatherData} />);

    expect(screen.getByTestId("wind-speed")).toHaveTextContent("15 km/h");
    expect(screen.getByTestId("condition")).toHaveTextContent("Clear");
    expect(screen.getByTestId("humidity")).toHaveTextContent("60%");
  });

  test("changes unit from Celsius to Fahrenheit", () => {
    render(<Weather weatherData={mockWeatherData} />);

    expect(screen.getByTestId("temperature")).toHaveTextContent("25°C");

    fireEvent.click(screen.getByLabelText("Fahrenheit"));

    expect(screen.getByTestId("temperature")).toHaveTextContent("77°F");
  });
});
