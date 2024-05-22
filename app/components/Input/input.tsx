"use client";
import React, { useState, FormEvent } from "react";

import Image from "next/image";
import styles from "./input.module.css";
import CurrentDateTime from "../Date/date";
import TempratureDetails from "../TempratureDetails/tempratureDetails";
import getLocationData from "@/app/utils/locationService";
import getWeatherData from "@/app/utils/weatherService";
import Form from "../Form/form";
import HourlyForecast from "../HourlyForecast/hourlyForecast";
import DailyForecast from "../DailyForecast/dailyForecast";

const API_KEY = "ab899246f13ec7b700d0fb7cab75d528";

const Input: React.FC = () => {
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // New state to store fetched data
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [daily, setDaily] = useState<any[]>([]);
  const [hourly, setHourly] = useState<any[]>([]);
  const [feels, setFeels] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [sunrise, setSunrise] = useState(0);
  const [sunset, setSunset] = useState(0);
  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [state, setState] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    // all of this needs to go inside a weatehr service
    // the api call and evrything the search parameters as well.
    e.preventDefault();

    try {
      setSubmitted(true);

      // // Fetch location data from the API
      const locationData = await getLocationData(city);
      setLocationData(locationData);

      if (locationData.length > 0) {
        const { name, country, state, lon, lat } = locationData[0];
        setCityName(name);
        setCountryName(country);
        setState(state);
        const weatherResponse = await getWeatherData(lat, lon);
        // console.log(weatherResponse);
        // console.log(weatherResponse.current.weather);
        setWeatherData(weatherResponse);
        setForecast(weatherResponse.current.weather);
        setFeels(weatherResponse.current.feels_like);
        setHumidity(weatherResponse.current.humidity);
        setSunrise(weatherResponse.current.sunrise);
        setSunset(weatherResponse.current.sunset);
        setTemp(weatherResponse.current.temp);
        setWind(weatherResponse.current.wind_speed);
        setCurrentTime(weatherResponse.current.dt);
        setDaily(weatherResponse.daily);
        setHourly(weatherResponse.hourly);
        // console.log("weatherResponse.current: ", weatherResponse);
      } else {
        throw new Error("No location data found");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the data. Please try again.");
    }
  };

  const handleChanage = (e: any) => {
    setCity(e.target.value);
    setSubmitted(false);
  };

  return (
    <div className={styles.main}>
      <Form
        city={city}
        handleChanage={handleChanage}
        handleSubmit={handleSubmit}
      />
      {submitted && locationData && (
        <div className={styles.weatherInfoContainer}>
          <CurrentDateTime currentTime={currentTime} />
          <h2>
            {cityName}, {state && state + ", "} {countryName}
          </h2>
          <TempratureDetails
            details={forecast}
            feelsLike={feels}
            humidity={humidity}
            sunrise={sunrise}
            sunset={sunset}
            temp={temp}
            wind={wind}
          />
          <HourlyForecast hourly={hourly} />
          <DailyForecast daily={daily} />
        </div>
      )}
    </div>
  );
};

export default Input;
