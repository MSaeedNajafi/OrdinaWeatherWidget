import React from "react";
import styles from "./ForecastCondition.module.css";
import { isDate } from "util/types";

// Define the types
export type TemperatureDetailsProps = {
  id: number;
  main: string;
  description: string;
  icon?: string | undefined;
};

const ForecastCondition: React.FC<TemperatureDetailsProps> = ({
  id,
  main,
  description,
  icon,
}) => {
  return (
    <div key={id} className={styles.forecastInfo}>
      <p title={description} className={styles.WeatherCondition}>
        {main}
      </p>
      {icon && (
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
        />
      )}
    </div>
  );
};

export default ForecastCondition;
