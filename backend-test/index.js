const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());

const CONFIG = {
  APP_ID: "387aa531",
  APP_KEY: "69c45bb4160021cd121dd18cf070e4c4",
};

const fetchFlightData = async (params) => {
  try {
    const options = {
      headers: {
        app_id: CONFIG.APP_ID,
        app_key: CONFIG.APP_KEY,
        ResourceVersion: "v4",
      },
      params,
    };

    const response = await axios.get(
      "https://api.schiphol.nl/public-flights/flights",
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return [];
  }
};
const fetchCityData = async (params) => {
  try {
    const options = {
      headers: {
        app_id: CONFIG.APP_ID,
        app_key: CONFIG.APP_KEY,
        ResourceVersion: "v4",
      },
      params,
    };

    const response = await axios.get(
      "https://api.schiphol.nl/public-flights/destinations",
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    return [];
  }
};
app.get("/flights", async (req, res) => {
  const params = req.query || {
    includedelays: false,
    page: 0,
    sort: "+scheduleTime",
  };
  const flights = await fetchFlightData(params);
  res.send(flights);
});
app.get("/cities", async (req, res) => {
  const params = req.query || {
    page: 0,
  };
  const cities = await fetchCityData(params);
  res.send(cities);
});
app.get("/destinations", async (req, res) => {
  const params = req.query || {
    page: 0,
  };
  const cities = await fetchDestinationData(params);
  res.send(cities);
});

app.listen(3000, () => {
  console.log("Sunucu ayağa kalktı");
});
