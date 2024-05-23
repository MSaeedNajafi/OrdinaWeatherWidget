import { WeatherDTO } from "./Types";

export function mapToWeatherDTO(apiResponse: any): WeatherDTO {
  return {
    dt: apiResponse.dt,
    weather: apiResponse.weather,
    temp: apiResponse.temp,
    feels_like: apiResponse.feels_like,
    humidity: apiResponse.humidity,
    wind_speed: apiResponse.wind_speed,
    sunrise: apiResponse.sunrise,
    sunset: apiResponse.sunset,
  };
}
