import {
  Air as AirIcon,
  Thunderstorm as ThunderstormIcon,
  WaterDrop as WaterDropIcon,
} from "@mui/icons-material";
import {
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styles from "./Weather.module.scss";
import useWeather from "../../hook/use-weather";

export default function Weather() {
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [temperature, setTemperature] = useState<number>(100);
  const { weatherData, fetchWeatherByCityName, loading } = useWeather();

  const handleUnitChange = (
    event: React.MouseEvent<HTMLElement>,
    newUnit: "C" | "F"
  ) => {
    if (newUnit) {
      setUnit(newUnit);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={styles.container}
    >
      <Grid item>
        <Typography variant="h1" className={styles.temperature}>
          {unit === "C"
            ? `${weatherData?.temperature ?? 0}°C`
            : `${(weatherData?.temperature ?? 0 * 9) / 5 + 32}°F`}
        </Typography>
      </Grid>

      <Grid item className={styles.unitSelector}>
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={handleUnitChange}
          aria-label="temperature unit"
        >
          <ToggleButton value="C" aria-label="Celsius">
            °C
          </ToggleButton>
          <ToggleButton value="F" aria-label="Fahrenheit">
            °F
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid
        item
        container
        justifyContent="center"
        spacing={4}
        className={styles.weatherInfo}
      >
        <Grid item className={styles.weatherInfoItem}>
          <IconButton className={styles.weatherIconButton}>
            <AirIcon fontSize="large" />
            <span>{weatherData?.windSpeed} km/h</span>
          </IconButton>
        </Grid>

        <Grid item className={styles.weatherInfoItem}>
          <IconButton className={styles.weatherIconButton}>
            <ThunderstormIcon fontSize="large" />
            <span>{weatherData?.condition}%</span>
          </IconButton>
        </Grid>

        <Grid item className={styles.weatherInfoItem}>
          <IconButton className={styles.weatherIconButton}>
            <WaterDropIcon fontSize="large" />
            <span>{weatherData?.humidity}%</span>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
