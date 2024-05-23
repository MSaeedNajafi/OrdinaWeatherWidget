import React from "react";
import styles from "./HourlyForecast.module.css";
import Carousel from "../Carousel/Carousel";
import ForecastCondition, {
  ForecastConditionProps,
} from "../ForecastCondition/ForecastCondition";
import { convertUnixToDetailedDateTime } from "@/app/utils/convertUnixToDetailedDateTime";
import WeatherDetail from "../WeatherDetail/WeatherDetail";

type HourlyForecastProps = {
  hourly: any[];
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
        <p>{time}</p>
        <div>
          {hour.weather &&
            hour.weather.map((condition: ForecastConditionProps) => (
              <div
                key={condition.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ForecastCondition
                  id={condition.id}
                  main={""}
                  description={condition.description}
                  icon={condition.icon}
                />
                <WeatherDetail
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
        <hr />
      </div>
      <Carousel>{renderItems}</Carousel>
    </div>
  );
};

export default HourlyForecast;
