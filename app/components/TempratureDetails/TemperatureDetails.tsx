import React from "react";
import styles from "./TemperatureDetails.module.css";
import WeatherInfoBox from "../WeatherInfoBox/WeatherInfoBox";
import { formatDateTime } from "@/app/utils/formatDateTime";
import { convertUnixToDetailedDateTime } from "@/app/utils/convertUnixToDetailedDateTime";
import temptratureIcon from "../../icons/temperature-full-svgrepo-com.svg";
import humidityIcon from "../../icons/water-drop-svgrepo-com.svg";
import windIcon from "../../icons/wind-svgrepo-com.svg";
import arrowDownIcon from "../../icons/arrow-down-svgrepo-com.svg";
import arrowTopIcon from "../../icons/arrow-top-svgrepo-com.svg";
import sunriseIcon from "../../icons/sun-svgrepo-com.svg";
import sunsetIcon from "../../icons/sunset-svgrepo-com.svg";
import { ForecastConditionProps } from "@/app/utils/Types";
import ForecastCondition from "../ForecastCondition/ForecastCondition";

type TemperatureDetailsProps = {
  currentWeather?: any;
  maxTemp?: string;
  minTemp?: string;
};

const TemperatureDetails: React.FC<TemperatureDetailsProps> = ({
  currentWeather,
  maxTemp,
  minTemp,
}) => {
  return (
    <div className={styles.temperatureDetailsContainer}>
      <div className={styles.forecastCondition}>
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
      </div>
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
          <WeatherInfoBox
            label={"Feels Like: "}
            value={currentWeather?.feels_like?.toFixed()}
            unit={"°"}
            icon={temptratureIcon}
          />
          <WeatherInfoBox
            label={"Humidity: "}
            value={currentWeather?.humidity?.toFixed()}
            unit={"%"}
            icon={humidityIcon}
          />
          <WeatherInfoBox
            label={"Wind: "}
            value={currentWeather?.wind_speed?.toFixed()}
            unit={"m/h"}
            icon={windIcon}
          />
        </div>
      </div>
      <div className={styles.sunsetContainer}>
        <WeatherInfoBox
          label={"Rise: "}
          value={convertUnixToDetailedDateTime(currentWeather?.sunrise).time}
          unit={""}
          icon={sunriseIcon}
        />
        <WeatherInfoBox
          label={"Set: "}
          value={convertUnixToDetailedDateTime(currentWeather?.sunset).time}
          unit={""}
          icon={sunsetIcon}
        />
        {minTemp && (
          <WeatherInfoBox
            label={"Low: "}
            value={minTemp}
            unit={"°"}
            icon={arrowDownIcon}
          />
        )}
        {maxTemp && (
          <WeatherInfoBox
            label={"High: "}
            value={maxTemp}
            unit={"°"}
            icon={arrowTopIcon}
          />
        )}
      </div>
    </div>
  );
};

export default TemperatureDetails;
