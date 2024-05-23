import React from "react";
import styles from "./ForecastCondition.module.css";
import { ForecastConditionProps } from "@/app/utils/Types";

const ForecastCondition: React.FC<ForecastConditionProps> = ({
  id,
  main,
  description,
  icon,
}) => {
  return (
    <div key={id} className={styles.forecastInfo}>
      <p title={description} className={styles.weatherCondition}>
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
