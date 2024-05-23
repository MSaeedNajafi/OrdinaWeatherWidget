import React from "react";
import styles from "./TemperatureDetails.module.css";
import ForecastCondition, {
  ForecastConditionProps,
} from "../ForecastCondition/ForecastCondition";
import WeatherDetail from "../WeatherDetail/WeatherDetail";
import { formatDateTime } from "@/app/utils/formatDateTime";
import { convertUnixToDetailedDateTime } from "@/app/utils/convertUnixToDetailedDateTime";

// Define the types
type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon?: string;
};

type TemperatureDetailsProps = {
  currentWeather?: any;
  maxTemp?: number;
  minTemp?: number;
};

const TemperatureDetails: React.FC<TemperatureDetailsProps> = ({
  currentWeather,
  maxTemp,
  minTemp,
}) => {
  return (
    <div className={styles.temperatureDetailsContainer}>
      {currentWeather?.weather &&
        currentWeather?.weather.map((condition: ForecastConditionProps) => (
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
          {currentWeather?.weather &&
            currentWeather?.weather.map((condition: ForecastConditionProps) => (
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
        <p className={styles.temp}>{currentWeather?.temp?.toFixed()}°</p>
        <div>
          <WeatherDetail
            label={"feels Like: "}
            value={currentWeather?.feels_like?.toFixed()}
            unit={"°"}
          />
          <WeatherDetail
            label={"humidity: "}
            value={currentWeather?.humidity?.toFixed()}
            unit={"%"}
          />
          <WeatherDetail
            label={"wind: "}
            value={currentWeather?.wind_speed?.toFixed()}
            unit={"m/h"}
          />
        </div>
      </div>
      <div className={styles.sunsetContainer}>
        <p className={styles.tempDetailsText}>
          Rise:{" "}
          <span className={styles.sunsetTime}>
            {convertUnixToDetailedDateTime(currentWeather?.sunrise).time}
          </span>
        </p>
        <p className={styles.tempDetailsText}>
          Set:{" "}
          <span className={styles.sunsetTime}>
            {convertUnixToDetailedDateTime(currentWeather?.sunset).time}
          </span>
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
