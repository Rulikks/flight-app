import axios from "axios";

export const fetchFlightData = async (params) => {
  try {
    const response = await axios.get("http://localhost:3000/flights", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return [];
  }
};
