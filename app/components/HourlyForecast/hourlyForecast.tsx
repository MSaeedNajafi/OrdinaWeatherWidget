import React from "react";
import styles from "./HourlyForecast.module.css";
import Carousel from "../Carousel/Carousel";
import ForecastCondition, {
  TemperatureDetailsProps,
} from "../ForecastCondition/ForecastCondition";

function formatDateTime(unixTime: number) {
  // convert seconds to milliseconds
  const date = new Date(unixTime * 1000);
  const hour = date.getHours();
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
  });

  // Extracting components
  const dayOfWeek = formattedDate.split(",")[0];
  const monthAndDate = formattedDate.split(",")[1];
  const year = formattedDate.split(",")[2].trim();
  const time = formattedDate.split(" at ")[1];

  return {
    dayOfWeek,
    monthAndDate,
    year,
    time,
    hour,
    date,
  };
}

// Define the types
type HourlyForecastProps = {
  hourly: any[];
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const renderItems = [];
  let lastDate = null;
  let i = 1;

  for (const hour of hourly) {
    if (i > 24) {
      break;
    }
    const formattedDateTime = formatDateTime(hour.dt);
    const { dayOfWeek, time } = formattedDateTime;

    renderItems.push(
      <div key={hour.dt} className={styles.hourCard}>
        <p>
          {dayOfWeek} {time}
        </p>
        <div>
          {hour.weather &&
            hour.weather.map((condition: TemperatureDetailsProps) => (
              <div
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
                <p>{hour.temp.toFixed()} °</p>
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
