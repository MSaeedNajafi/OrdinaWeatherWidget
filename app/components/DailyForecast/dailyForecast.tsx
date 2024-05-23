import React from "react";
import styles from "./DailyForecast.module.css";
import Carousel from "../Carousel/Carousel";
import WeatherDetail from "../WeatherDetail/WeatherDetail";
import ForecastCondition from "../ForecastCondition/ForecastCondition";
import { convertUnixToDetailedDateTime } from "@/app/utils/convertUnixToDetailedDateTime";
import { DayDTO } from "@/app/utils/Types";

type DailyForecastProps = {
  daily: DayDTO[];
};

const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  const renderItems = [];
  for (const day of daily) {
    const { dayOfWeek, monthAndDate } = convertUnixToDetailedDateTime(day.dt);
    renderItems.push(
      <div key={day.dt} className={styles.dayCard}>
        <p
          className={styles.text}
          title={day.summary}
          style={{ cursor: "help" }}
        >
          {dayOfWeek}
        </p>
        <p className={styles.text}>{monthAndDate}</p>
        <div className={styles.ForecastCondition}>
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
      <div>
        <h3>DAILY FORECAST</h3>
        <hr className={styles.line} />
      </div>
      <Carousel>{renderItems}</Carousel>
    </div>
  );
};

export default DailyForecast;
