import React from "react";
import styles from "./tempratureDetails.module.css";
import WeatherDetail from "../WeatherDetail/weatherDetail";
import ForecastCondition from "../ForecastCondition/ForecastCondition";

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
      <div className={styles.tempratureDetails}>
        <div className={styles.forecastContainer}>
          {details &&
            details.map((condition) => (
              <ForecastCondition
                id={condition.id}
                main={""}
                description={condition.description}
                icon={condition.icon}
              />
            ))}
        </div>
        <p className={styles.temp}>{temp.toFixed()}°</p>
        <div>
          <WeatherDetail
            label={"feels Like: "}
            value={feelsLike.toFixed()}
            unit={"°"}
          />
          <WeatherDetail
            label={"humidity: "}
            value={humidity.toFixed()}
            unit={"%"}
          />
          <WeatherDetail label={"wind: "} value={wind.toFixed()} unit={"m/h"} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p className={styles.sunsetContainer}>
          Rise:{" "}
          <span className={styles.sunsetTime}>{formatDateUTC(sunrise)}</span>
        </p>
        <p className={styles.sunsetContainer}>
          {","}Set:{" "}
          <span className={styles.sunsetTime}>{formatDateUTC(sunset)}</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureDetails;
