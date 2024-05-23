import { LocationData } from "./Types";

const API_KEY = "ab899246f13ec7b700d0fb7cab75d528";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/reverse";

const getLocationDataByLatAndLon = async (
  lat: string,
  lon: string
): Promise<LocationData[]> => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    // Fetch location data by lat and lon
    const response = await fetch(url);

    if (!response.ok) {
      // Check if the response status indicates an error
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length === 0) {
      // Handle the case where the city is not found
      console.error("City not found");
      return [];
    }
    return data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return [];
  }
};

export default getLocationDataByLatAndLon;
