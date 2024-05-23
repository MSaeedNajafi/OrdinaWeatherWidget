import React from "react";
import styles from "./HourlyForecast.module.css";
import Carousel from "../Carousel/Carousel";
import { convertUnixToDetailedDateTime } from "@/app/utils/convertUnixToDetailedDateTime";
import WeatherInfoBox from "../WeatherInfoBox/WeatherInfoBox";
import { ForecastConditionProps, HourDTO } from "@/app/utils/Types";
import ForecastCondition from "../ForecastCondition/ForecastCondition";

type HourlyForecastProps = {
  hourly: HourDTO[];
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const renderItems = [];
  let i = 1;

  for (const hour of hourly) {
    if (i > 24) {
      break;
    }
    const formattedDateTime = convertUnixToDetailedDateTime(hour.dt);
    const { time } = formattedDateTime;

    renderItems.push(
      <div key={hour.dt} className={styles.hourCard}>
        <p className={styles.timeText}>{time}</p>
        <div>
          {hour.weather &&
            hour.weather.map((condition: ForecastConditionProps) => (
              <div key={condition.id} className={styles.ForecastCondition}>
                <ForecastCondition
                  id={condition.id}
                  main={""}
                  description={condition.description}
                  icon={condition.icon}
                />
                <WeatherInfoBox
                  label={""}
                  value={Number(hour.temp).toFixed()}
                  unit={"°"}
                />
              </div>
            ))}
        </div>
      </div>
    );
    i++;
  }

  return (
    <div>
      <div>
        <h3>HOURLY FORECAST</h3>
        <hr className={styles.line} />
      </div>
      <Carousel>{renderItems}</Carousel>
    </div>
  );
};

export default HourlyForecast;
