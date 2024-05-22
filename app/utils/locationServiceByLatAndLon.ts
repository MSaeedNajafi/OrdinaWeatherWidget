const API_KEY = "ab899246f13ec7b700d0fb7cab75d528";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/reverse";

const getLocationDataByLatAndLon = async (lat: string, lon: string) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    // Fetch location data
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching location data:", error);
    return error;
  }
};

export default getLocationDataByLatAndLon;
