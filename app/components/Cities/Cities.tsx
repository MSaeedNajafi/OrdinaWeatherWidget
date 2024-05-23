import React from "react";

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "center",
        marginBottom: 16,
      }}
    >
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
