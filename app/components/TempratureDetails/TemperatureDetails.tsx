import React from "react";
import styles from "./TemperatureDetails.module.css";
import ForecastCondition from "../ForecastCondition/ForecastCondition";
import WeatherDetail from "../WeatherDetail/WeatherDetail";

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
  maxTemp?: number;
  minTemp?: number;
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
  maxTemp,
  minTemp,
}) => {
  return (
    <div className={styles.temperatureDetailsContainer}>
      {details &&
        details.map((condition) => (
          <div key={condition.id}>
            <ForecastCondition
              id={condition.id}
              main={condition.main}
              description={condition.description}
            />
          </div>
        ))}
      <div className={styles.tempratureDetails}>
        <div className={styles.forecastContainer}>
          {details &&
            details.map((condition) => (
              <div key={condition.id}>
                <ForecastCondition
                  id={condition.id}
                  main={""}
                  description={condition.description}
                  icon={condition.icon}
                />
              </div>
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
      <div className={styles.sunsetContainer}>
        <p className={styles.tempDetailsText}>
          Rise:{" "}
          <span className={styles.sunsetTime}>{formatDateUTC(sunrise)}</span>
        </p>
        <p className={styles.tempDetailsText}>
          Set:{" "}
          <span className={styles.sunsetTime}>{formatDateUTC(sunset)}</span>
        </p>
        {minTemp && (
          <p className={styles.tempDetailsText}>
            Min: <span className={styles.sunsetTime}>{minTemp}°</span>
          </p>
        )}
        {maxTemp && (
          <p className={styles.tempDetailsText}>
            Max: <span className={styles.sunsetTime}>{maxTemp}°</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TemperatureDetails;
