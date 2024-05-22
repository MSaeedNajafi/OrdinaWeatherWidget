"use client";
import React, { useState, FormEvent } from "react";
import styles from "./WeatherComponent.module.css";
import CurrentDateTime from "../CurrentDateTime/CurrentDateTime";
import TempratureDetails from "../TempratureDetails/TemperatureDetails";
import getLocationDataByName from "@/app/utils/locationServiceByName";
import getWeatherData from "@/app/utils/weatherService";
import Form from "../Form/Form";
import HourlyForecast from "../HourlyForecast/HourlyForecast";
import DailyForecast from "../DailyForecast/DailyForecast";
import { Location, getLocation } from "@/app/utils/getLocation";
import getLocationDataByLatAndLon from "@/app/utils/locationServiceByLatAndLon";
import LocationSVG from "../../icons/location-pin-svgrepo-com.svg";
import SVGIcon from "../SVGIcon/SVGIcon";
import SearchIcon from "../../icons/search-svgrepo-com.svg";

const Input: React.FC = () => {
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // store fetched data
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const fetchWeather = async (lat: string, lon: string) => {
    setError(null);
    const weatherResponse = await getWeatherData(lat, lon);
    // console.log(weatherResponse);
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
  };

  const handleSubmit = async (e: FormEvent) => {
    if (city.length === 0) {
      return;
    }
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      setSubmitted(true);
      const locationData = await getLocationDataByName(city);
      setLocationData(locationData);

      if (locationData.length > 0) {
        const { name, country, state, lon, lat } = locationData[0];
        setCityName(name);
        setCountryName(country);
        setState(state);
        await fetchWeather(lat, lon);
        setLoading(false);
      } else {
        throw new Error("No location data found");
      }
    } catch (error) {
      setLoading(false);
      setLocationData(null);
      setSubmitted(false);
      setWeatherData(null);
      setError(error + "");
    }
  };

  const handleChanage = (e: any) => {
    setCity(e.target.value);
    setSubmitted(false);
  };

  const handleGetLocation = async () => {
    setLoading(true);
    setSubmitted(true);
    try {
      const loc = await getLocation();
      const locationData = await getLocationDataByLatAndLon(
        loc.latitude.toString(),
        loc.longitude.toString()
      );
      setCity(locationData[0].name);
      setCityName(locationData[0].name);
      setCountryName(locationData[0].country);
      setState(locationData[0].state);
      await fetchWeather(loc.latitude.toString(), loc.longitude.toString());
      setLocation(loc);
      setLocationError(null);
    } catch (err) {
      setLocationError(err + "");
    }
    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.formContainer}>
        <Form
          city={city}
          handleChanage={handleChanage}
          handleSubmit={handleSubmit}
        />
        <SVGIcon
          icon={SearchIcon}
          width={25}
          height={25}
          handleClick={handleSubmit}
        />
        <SVGIcon
          icon={LocationSVG}
          width={25}
          height={25}
          handleClick={handleGetLocation}
        />
        <div className={styles.unitSwitchContainer}>
          <p>°C</p>
          {"|"}
          <p>°F</p>
        </div>
      </div>
      {error && <p>{error}</p>}
      {loading ? (
        <p>loading....</p>
      ) : (
        submitted && (
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
              maxTemp={daily[0].temp && daily[0]?.temp.max.toFixed()}
              minTemp={daily[0].temp && daily[0]?.temp.min.toFixed()}
            />
            <HourlyForecast hourly={hourly} />
            <DailyForecast daily={daily} />
          </div>
        )
      )}
    </div>
  );
};

export default Input;
