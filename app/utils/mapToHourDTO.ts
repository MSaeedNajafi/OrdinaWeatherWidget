import { HourDTO } from "./Types";

export function mapToHourDTO(apiResponse: any[]): HourDTO[] {
  return apiResponse.map((hour: any) => ({
    dt: hour.dt,
    weather: hour.weather.map((w: any) => ({
      id: w.id,
      main: w.main,
      description: w.description,
      icon: w.icon,
    })),
    temp: hour.temp,
  }));
}
