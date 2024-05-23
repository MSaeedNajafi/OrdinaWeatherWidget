import React from "react";
import styles from "./DailyForecast.module.css";
import Carousel from "../Carousel/Carousel";
import WeatherDetail from "../WeatherDetail/WeatherDetail";
import ForecastCondition from "../ForecastCondition/ForecastCondition";
import { convertUnixToDetailedDateTime } from "@/app/utils/convertUnixToDetailedDateTime";

type DailyForecastProps = {
  daily: any[];
};

const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  const renderItems = [];
  for (const day of daily) {
    const { dayOfWeek, monthAndDate } = convertUnixToDetailedDateTime(day.dt);
    renderItems.push(
      <div key={day.dt} className={styles.dayCard}>
        <p style={{ cursor: "help" }} title={day.summary}>
          {dayOfWeek}
        </p>
        <p>{monthAndDate}</p>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <ForecastCondition
            id={day.weather[0].id}
            main={""}
            description={day.weather[0].description}
            icon={day.weather[0].icon}
          />
        </div>

        <div className={styles.tempratureDetails}>
          <WeatherDetail
            label={""}
            value={Number(day.temp.day).toFixed()}
            unit={"°"}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ paddingBottom: 20 }}>
        <h3>DAILY FORECAST</h3>
        <hr />
      </div>
      <Carousel>{renderItems}</Carousel>
    </div>
  );
};

export default DailyForecast;
