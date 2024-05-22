const API_KEY = "ab899246f13ec7b700d0fb7cab75d528";
const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

const getWeatherData = async (lat: string, lon: string) => {
  // Base URL for the OpenWeatherMap API
  const baseUrl = "https://api.openweathermap.org/data/3.0/onecall";

  // Construct the full URL with search parameters
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  try {
    // Fetch weather data
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return error;
  }
};

export default getWeatherData;
