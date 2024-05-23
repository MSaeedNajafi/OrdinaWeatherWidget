import React from "react";
import styles from "./Cities.module.css";
interface City {
  id: number;
  name: string;
}

interface CitiesProps {
  cities: City[];
  setCity: (cityName: string) => void;
  fetchLocation: (cityName: string) => void;
}

const Cities: React.FC<CitiesProps> = ({ cities, setCity, fetchLocation }) => {
  return (
    <div className={styles.cityContainer}>
      {cities.map((city) => {
        return (
          <div
            key={city.id}
            onClick={() => {
              setCity(city.name);
              fetchLocation(city.name);
            }}
          >
            {city.name}
          </div>
        );
      })}
    </div>
  );
};

export default Cities;
