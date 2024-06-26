"use client";
import React, { useState, FormEvent } from "react";
import classNames from "classnames";
import styles from "./WeatherComponent.module.css";
import getLocationDataByName from "@/app/utils/locationServiceByName";
import getWeatherData from "@/app/utils/weatherService";
import Form from "../Form/Form";
import { getLocation } from "@/app/utils/getLocation";
import getLocationDataByLatAndLon from "@/app/utils/locationServiceByLatAndLon";
import LocationSVG from "../../icons/location-pin-svgrepo-com.svg";
import SVGIcon from "../SVGIcon/SVGIcon";
import SearchIcon from "../../icons/search-svgrepo-com.svg";
import Cities from "../Cities/Cities";
import WeatherDetails from "../WeatherDetails.tsx/WeatherDetails";
import { mapToDayDTO } from "@/app/utils/mapToDayDTO";
import { DayDTO, HourDTO, LocationData, WeatherDTO } from "@/app/utils/Types";
import { mapToHourDTO } from "@/app/utils/mapToHourDTO";
import { mapToWeatherDTO } from "@/app/utils/mapToWeatherDTO";

const WeatherComponent: React.FC = () => {
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // store fetched data
  const [currentWeather, setCurrentWeather] = useState<WeatherDTO | null>(null);
  const [daily, setDaily] = useState<DayDTO[]>([]);
  const [hourly, setHourly] = useState<HourDTO[]>([]);
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    setError(null); // Reset the error state
    const weatherResponse = await getWeatherData(lat, lon);
    if (weatherResponse.success) {
      // The response is successful, update the weather states
      setCurrentWeather(weatherResponse.data.current);
      setDaily(weatherResponse.data.daily);
      setHourly(weatherResponse.data.hourly);
      setSubmitted(true);
    } else {
      setCurrentWeather(null);
      setDaily([]);
      setHourly([]);
      setError(weatherResponse.error);
      setSubmitted(false);
    }
  };

  const fetchLocation = async (city: string) => {
    if (city.length === 0) {
      setError("City name cannot be empty.");
      setSubmitted(false);
      return;
    }
    let locationData: LocationData[] | null = null;
    try {
      setLoading(true);
      setSubmitted(true);
      locationData = await getLocationDataByName(city);
      if (locationData && locationData.length > 0) {
        const { name, country, state, lon, lat } = locationData[0];
        setCityName(name);
        setCountryName(country);
        setState(state);
        await fetchWeather(lat, lon);
      } else {
        setError("No location found for the provided city name.");
        setCurrentWeather(null);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      setError(
        "An error occurred while fetching the location data. Please try again."
      );
    } finally {
      setLoading(false);
      if (!locationData || locationData.length === 0) {
        setSubmitted(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await fetchLocation(city);
  };

  const handleChanage = (e: any) => {
    setCity(e.target.value);
    setSubmitted(false);
  };

  const handleGetLocation = async () => {
    setLoading(true);
    try {
      const loc = await getLocation();
      const locationData = await getLocationDataByLatAndLon(
        loc.latitude.toString(),
        loc.longitude.toString()
      );

      // Check if locationData is valid and has at least one result
      if (locationData.length === 0) {
        throw new Error("No location data found for the given coordinates.");
      }

      const { name, country, state } = locationData[0];
      setCity(name);
      setCityName(name);
      setCountryName(country);
      setState(state);
      await fetchWeather(loc.latitude, loc.longitude);
    } catch (err) {
      setError("Error in handleGetLocation" + err);
    } finally {
      setLoading(false);
    }
  };

  const cities = [
    { id: 1, name: "Berlin" },
    { id: 2, name: "Dubai" },
    { id: 3, name: "Amsterdam" },
    { id: 4, name: "Bangkok" },
    { id: 5, name: "Tokyo" },
    { id: 6, name: "Chicago" },
  ];

  const getBackground =
    currentWeather?.temp === undefined
      ? ""
      : currentWeather?.temp > 20
      ? styles.gradientHot
      : styles.gradientCold;

  return (
    <div className={classNames(styles.main, getBackground)}>
      <Cities cities={cities} setCity={setCity} fetchLocation={fetchLocation} />
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
      </div>
      {error && <p>{error}</p>}
      {loading ? (
        <p>loading....</p>
      ) : (
        submitted && (
          <WeatherDetails
            currentWeather={mapToWeatherDTO(currentWeather)}
            cityName={cityName}
            state={state}
            countryName={countryName}
            daily={mapToDayDTO(daily)}
            hourly={mapToHourDTO(hourly)}
          />
        )
      )}
    </div>
  );
};

export default WeatherComponent;
