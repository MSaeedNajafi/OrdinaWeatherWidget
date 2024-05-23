import React from "react";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import DailyForecast from "../DailyForecast/DailyForecast";
import styles from "./WeatherDetails.module.css";
import CurrentDateTime from "../CurrentDateTime/CurrentDateTime";
import TemperatureDetails from "../TempratureDetails/TemperatureDetails";

interface WeatherInfoProps {
  currentWeather: any;
  cityName: string;
  state?: string;
  countryName: string;
  daily: any[];
  hourly: any[];
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({
  currentWeather,
  cityName,
  state,
  countryName,
  daily,
  hourly,
}) => {
  return (
    <div className={styles.weatherInfoContainer}>
      <CurrentDateTime currentTime={currentWeather?.dt} />
      <h2>
        {cityName}, {state && state + ", "} {countryName}
      </h2>
      <TemperatureDetails
        currentWeather={currentWeather}
        maxTemp={daily[0]?.temp && daily[0]?.temp.max.toFixed()}
        minTemp={daily[0]?.temp && daily[0]?.temp.min.toFixed()}
      />
      <HourlyForecast hourly={hourly} />
      <DailyForecast daily={daily} />
    </div>
  );
};

export default WeatherInfo;
