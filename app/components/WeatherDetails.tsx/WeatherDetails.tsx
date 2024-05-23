import React from "react";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import DailyForecast from "../DailyForecast/DailyForecast";
import styles from "./WeatherDetails.module.css";
import CurrentDateTime from "../CurrentDateTime/CurrentDateTime";
import TemperatureDetails from "../TempratureDetails/TemperatureDetails";
import { DayDTO, HourDTO, WeatherDTO } from "@/app/utils/Types";

interface WeatherDetailsProps {
  currentWeather: WeatherDTO;
  cityName: string;
  state?: string;
  countryName: string;
  daily: DayDTO[];
  hourly: HourDTO[];
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({
  currentWeather,
  cityName,
  state,
  countryName,
  daily,
  hourly,
}) => {
  return (
    <div className={styles.weatherInfoContainer}>
      <CurrentDateTime currentTime={currentWeather.dt} />
      <h2>
        {cityName}, {state && state + ", "} {countryName}
      </h2>
      {/* get the min temp and max temp from today*/}
      <TemperatureDetails
        currentWeather={currentWeather}
        maxTemp={daily[0].temp.max.toFixed()}
        minTemp={daily[0].temp.min.toFixed()}
      />
      <HourlyForecast hourly={hourly} />
      <DailyForecast daily={daily} />
    </div>
  );
};

export default WeatherDetails;
