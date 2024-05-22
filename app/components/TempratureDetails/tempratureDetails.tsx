import React from "react";
import styles from "./tempratureDetails.module.css";
import WeatherDetail from "../WeatherDetail/weatherDetail";

// Define the types
type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon?: string;
};

type TemperatureDetailsProps = {
  details?: WeatherCondition[];
  temp: number;
  feelsLike: number;
  humidity: number;
  sunrise: number;
  sunset: number;
  wind: number;
};

function formatDateUTC(unixTime: number) {
  // convert seconds to milliseconds
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const TemperatureDetails: React.FC<TemperatureDetailsProps> = ({
  details,
  temp,
  feelsLike,
  humidity,
  sunrise,
  sunset,
  wind,
}) => {
  return (
    <div>
      <div className={styles.forecastContainer}>
        {details &&
          details.map((condition) => (
            <div key={condition.id} className={styles.forecastInfo}>
              <p>
                {condition.main} - <strong>{condition.description}</strong>
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${condition.icon}.png`}
                alt={condition.description}
              />
            </div>
          ))}
      </div>
      <div className={styles.tempratureDetails}>
        <div>
          <p className={styles.sunsetContainer}>
            sunrise:{" "}
            <span className={styles.sunsetTime}>{formatDateUTC(sunrise)}</span>
          </p>
          <p className={styles.sunsetContainer}>
            sunset:{" "}
            <span className={styles.sunsetTime}>{formatDateUTC(sunset)}</span>
          </p>
        </div>
        <p className={styles.temp}>{temp.toFixed()}°</p>
        <div>
          <WeatherDetail label={"feels Like: "} value={feelsLike} unit={"°"} />
          <WeatherDetail label={"humidity: "} value={humidity} unit={"%"} />
          <WeatherDetail label={"wind: "} value={wind} unit={"m/h"} />
        </div>
      </div>
    </div>
  );
};

export default TemperatureDetails;
