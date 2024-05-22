import React from "react";
import styles from "./WeatherDetail.module.css";

// Define the types
type WeatherDetailProps = {
  label: string;
  value: string;
  unit: string;
};

const WeatherDetail: React.FC<WeatherDetailProps> = ({
  label,
  value,
  unit,
}) => {
  return (
    <div className={styles.detailsContainer}>
      <p className={styles.weatherInfoLabel}>{label}</p>
      <p className={styles.weatherInfoValue}>{value + unit}</p>
    </div>
  );
};

export default WeatherDetail;
