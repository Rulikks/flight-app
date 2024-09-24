import React, { useEffect, useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
} from "react-icons/fa";
import "./FlightSearch.scss";
import moment from "moment";
import { Select } from "antd";
import { fetchCityData } from "../../services/cityService";

const FlightSearch = ({ onChange }) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [departure, setDeparture] = useState(null);
  const [flightDirection, setFlightDirection] = useState("A");

  useEffect(() => {
    const getCities = async () => {
      try {
        setLoading(true);
        const data = await fetchCityData();
        console.log(data.destinations);
        setCities(data.destinations || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setLoading(false);
      }
    };
    getCities();
  }, []);
 
  const submitChange = () => {
    onChange({
      fromDateTime: fromDate && moment(fromDate).format("YYYY-MM-DDTHH:mm:ss"),
      toDateTime: toDate && moment(toDate).format("YYYY-MM-DDTHH:mm:ss"),
    });
  };
  return (
    <div className="flight-search-container">
            <h3>Book Your Flight</h3>
            <div className="trip-type">
        <button className={"round-trip active"}>Round trip</button>
        <button className="one-way">One way</button>
      </div>
      {!loading && cities.length > 0 ? (
        <div className="flight-search">
          <div className="input-group">
            <FaPlaneDeparture className="icon" />
            <Select placeholder="Select a departure city" onChange={(value) => setDeparture(value)}>
              {cities.map((cityObj, index) => (
                cityObj.city ?
                <Option key={index} value={cityObj.city}>
                  {cityObj.city}
                </Option> : ''
               ))}
            </Select>
          </div>
          <div className="input-group">
            <FaPlaneArrival className="icon" />
            <Select placeholder="Select a departure city" onChange={(value) => setDeparture(value)}>
              {cities.map((cityObj, index) => (
                cityObj.city ?
                <Option key={index} value={cityObj.city}>
                  {cityObj.city}
                </Option> : ''
              ))}
            </Select>
          </div>
          <div className="input-group">
            <FaCalendarAlt className="icon" />
            <input
              type="date"
              value={fromDate}
              min={moment().endOf("hour").format("YYYY-MM-DD")}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaCalendarAlt className="icon" />
            <input
              type="date"
              value={toDate}
              min={moment(fromDate || new Date())
                .add(1, "day")
                .endOf("hour")
                .format("YYYY-MM-DD")}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <button className="search-btn" onClick={submitChange}>
            Show Flights
          </button>
        </div>
      ) : (
        "Loading..."
      )}

     
    </div>
  );
};

export default FlightSearch;
