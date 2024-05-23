import { DayDTO } from "./Types";

export function mapToDayDTO(apiResponse: any[]): DayDTO[] {
  return apiResponse.map((day: any) => ({
    dt: day.dt,
    summary: day.summary,
    weather: day.weather.map((w: any) => ({
      id: w.id,
      main: w.main,
      description: w.description,
      icon: w.icon,
    })),
    temp: {
      day: day.temp.day,
      min: day.temp.min,
      max: day.temp.max,
    },
  }));
}
