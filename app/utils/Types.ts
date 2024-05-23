export type ForecastConditionProps = {
  id: number;
  main: string;
  description: string;
  icon?: string | undefined;
};

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationData {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}

export interface TempDTO {
  day: number;
  min: number;
  max: number;
}

export interface DayDTO {
  dt: number;
  summary: string;
  weather: ForecastConditionProps[];
  temp: TempDTO;
}

export interface HourDTO {
  dt: number;
  weather: ForecastConditionProps[];
  temp: number;
}

export interface WeatherDTO {
  dt: number;
  weather: ForecastConditionProps[];
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  sunrise: number;
  sunset: number;
}
