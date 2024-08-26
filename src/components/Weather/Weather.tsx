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

type Props = {
  weatherData: any;
};

export default function Weather({ weatherData }: Props) {
  const [unit, setUnit] = useState<"C" | "F">("C");

  const handleUnitChange = (
    event: React.MouseEvent<HTMLElement>,
    newUnit: "C" | "F"
  ) => {
    if (newUnit) {
      setUnit(newUnit);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={styles.container}
      data-testid="weather-container"
    >
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h1"
          className={styles.temperature}
          data-testid="temperature"
        >
          {unit === "C"
            ? `${weatherData?.temperature ?? 0}°C`
            : `${((weatherData?.temperature ?? 0) * 9) / 5 + 32}°F`}
        </Typography>
        <Typography variant="h3" data-testid="city-name">
          {weatherData.cityName}
        </Typography>
      </Grid>

      <Grid item className={styles.unitSelector} data-testid="unit-selector">
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
        data-testid="weather-info"
      >
        <Grid item className={styles.weatherInfoItem}>
          <IconButton
            className={styles.weatherIconButton}
            data-testid="wind-speed"
          >
            <AirIcon fontSize="large" />
            <span>{weatherData?.windSpeed} km/h</span>
          </IconButton>
        </Grid>

        <Grid item className={styles.weatherInfoItem}>
          <IconButton
            className={styles.weatherIconButton}
            data-testid="condition"
          >
            <ThunderstormIcon fontSize="large" />
            <span>{weatherData?.condition}</span>
          </IconButton>
        </Grid>

        <Grid item className={styles.weatherInfoItem}>
          <IconButton
            className={styles.weatherIconButton}
            data-testid="humidity"
          >
            <WaterDropIcon fontSize="large" />
            <span>{weatherData?.humidity}%</span>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
