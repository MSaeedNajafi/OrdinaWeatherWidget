import React from "react";
import styles from "./dailyForecast.module.css";
import Carousel from "../Carousel/Carousel";
import WeatherDetail from "../WeatherDetail/weatherDetail";
import ForecastCondition from "../ForecastCondition/ForecastCondition";

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
type DailyForecastProps = {
  daily: any[];
};

const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  // console.log("daily: ", daily);

  const renderItems = [];

  for (const day of daily) {
    const formattedDateTime = formatDateTime(day.dt);
    const { dayOfWeek, monthAndDate } = formattedDateTime;

    console.log("day: ", day);

    renderItems.push(
      <div key={day.dt} className={styles.dayCard}>
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
        <p style={{ cursor: "help" }} title={day.summary}>
          {dayOfWeek}
        </p>
        <p>{monthAndDate}</p>
        {/* <p>{time}</p> */}

        <div className={styles.tempratureDetails}>
          <WeatherDetail
            label={"min: "}
            value={Number(day.temp.min).toFixed()}
            unit={"°"}
          />
          <WeatherDetail
            label={"max:"}
            value={Number(day.temp.max).toFixed()}
            unit={"°"}
          />
        </div>
        <div className={styles.tempratureDetails}>
          <WeatherDetail
            label={"Rise: "}
            value={formatDateTime(day.sunrise).time}
            unit={""}
          />
          <WeatherDetail
            label={"Set: "}
            value={formatDateTime(day.sunset).time}
            unit={""}
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
