import React from "react";
import styles from "./WeatherInfoBox.module.css";
import SVGIcon from "../SVGIcon/SVGIcon";

// Define the types
type WeatherInfoBoxProps = {
  label: string;
  value: string;
  unit: string;
  icon?: string;
};

const WeatherInfoBox: React.FC<WeatherInfoBoxProps> = ({
  label,
  value,
  unit,
  icon,
}) => {
  return (
    <div className={styles.detailsContainer}>
      {icon && <SVGIcon icon={icon} width={15} height={15} />}
      <p className={styles.weatherInfoLabel}>{label}</p>
      <p className={styles.weatherInfoValue}>{value + unit}</p>
    </div>
  );
};

export default WeatherInfoBox;
