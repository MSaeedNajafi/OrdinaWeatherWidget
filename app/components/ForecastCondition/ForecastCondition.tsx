import React from "react";
import styles from "./ForecastCondition.module.css";

export type ForecastConditionProps = {
  id: number;
  main: string;
  description: string;
  icon?: string | undefined;
};

const ForecastCondition: React.FC<ForecastConditionProps> = ({
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
