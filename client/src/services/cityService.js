import axios from "axios";

export const fetchCityData = async (params) => {
  try {
    const response = await axios.get("http://localhost:3000/cities", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return [];
  }
};
