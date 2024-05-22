const API_KEY = "ab899246f13ec7b700d0fb7cab75d528";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/direct";

const getLocationDataByName = async (city: string) => {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
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

export default getLocationDataByName;
