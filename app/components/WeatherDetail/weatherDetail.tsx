import React from "react";
import styles from "./weatherDetail.module.css";

// Define the types
type WeatherDetailProps = {
  label: string;
  value: number;
  unit: string;
};

const WeatherDetail: React.FC<WeatherDetailProps> = ({
  label,
  value,
  unit,
}) => {
  // console.log("details: ", details);
  return (
    <div className={styles.detailsContainer}>
      <p className={styles.weatherInfoLabel}>{label}</p>
      <p className={styles.weatherInfoValue}>{value.toFixed() + unit}</p>
    </div>
  );
};

export default WeatherDetail;
