import React from "react";
import styles from "./ForecastCondition.module.css";
import { ForecastConditionProps } from "@/app/utils/Types";
import SVGIcon from "../SVGIcon/SVGIcon";
import Could from "../../icons/Cloud.svg";
import Sun from "../../icons/Sun.svg";
import CouldMoon from "../../icons/Cloud-Moon.svg";
import CouldSun from "../../icons/Cloud-Sun.svg";
import Moon from "../../icons/Moon.svg";
import CloudDrizzle from "../../icons/Cloud-Drizzle.svg";
import CloudFog from "../../icons/Cloud-Fog.svg";
import CloudHail from "../../icons/Cloud-Hail.svg";
import CloudSnow from "../../icons/Cloud-Snow-Alt.svg";

const ForecastCondition: React.FC<ForecastConditionProps> = ({
  id,
  main,
  description,
  icon,
}) => {
  const size = 100;

  const getCustomIcon = (icon: string): JSX.Element | null => {
    switch (icon) {
      case "01d":
        return <SVGIcon icon={Sun} width={size} height={size} />;
      case "01n":
        return <SVGIcon icon={Moon} width={size} height={size} />;
      case "02d":
        return <SVGIcon icon={CouldSun} width={size} height={size} />;
      case "02n":
        return <SVGIcon icon={CouldMoon} width={size} height={size} />;
      case "03n":
        return <SVGIcon icon={Could} width={size} height={size} />;
      case "03d":
        return <SVGIcon icon={Could} width={size} height={size} />;
      case "04d":
        return <SVGIcon icon={Could} width={size} height={size} />;
      case "04n":
        return <SVGIcon icon={CouldMoon} width={size} height={size} />;

      case "09n":
        return <SVGIcon icon={CloudDrizzle} width={size} height={size} />;
      case "09d":
        return <SVGIcon icon={CloudDrizzle} width={size} height={size} />;

      case "10n":
        return <SVGIcon icon={CloudDrizzle} width={size} height={size} />;
      case "10d":
        return <SVGIcon icon={CloudDrizzle} width={size} height={size} />;

      case "11n":
        return <SVGIcon icon={CloudHail} width={size} height={size} />;
      case "11d":
        return <SVGIcon icon={CloudHail} width={size} height={size} />;

      case "13n":
        return <SVGIcon icon={CloudSnow} width={size} height={size} />;
      case "13d":
        return <SVGIcon icon={CloudSnow} width={size} height={size} />;

      case "50n":
        return <SVGIcon icon={CloudFog} width={size} height={size} />;
      case "50d":
        return <SVGIcon icon={CloudFog} width={size} height={size} />;
      default:
        return null;
    }
  };

  return (
    <div key={id} className={styles.forecastInfo}>
      <p title={description} className={styles.weatherCondition}>
        {main}
      </p>
      {(icon && getCustomIcon(icon)) ||
        (icon && (
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt={description}
          />
        ))}
    </div>
  );
};

export default ForecastCondition;
