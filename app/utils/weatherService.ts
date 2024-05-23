const API_KEY = "ab899246f13ec7b700d0fb7cab75d528";
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

type WeatherResponse =
  | { success: true; data: any }
  | { success: false; error: string };

const getWeatherData = async (
  lat: number,
  lon: number,
  unit = "metric"
): Promise<WeatherResponse> => {
  // Construct the full URL with search parameters
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely&units=${unit}&appid=${API_KEY}`;

  try {
    // Fetch weather data
    const response = await fetch(url);

    if (!response.ok) {
      return {
        success: false,
        error: response.statusText,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error + "",
    };
  }
};

export default getWeatherData;
