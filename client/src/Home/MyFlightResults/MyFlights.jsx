import React, { useState } from "react";
import "./MyFlights.scss"; // Yeni stil dosyası
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

const MyFlights = ({ favorites }) => {
  // State to store filter settings
  const [sortBy, setSortBy] = useState("Recommended");

  return (
    <div className="my-flights-container">
      <h2>My Favorite Flights</h2>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-options">
          <button
            className={`filter-btn ${sortBy === "Recommended" ? "active" : ""}`}
            onClick={() => setSortBy("Recommended")}
          >
            Recommended
          </button>
          <button
            className={`filter-btn ${sortBy === "Price" ? "active" : ""}`}
            onClick={() => setSortBy("Price")}
          >
            Price
          </button>
          <button
            className={`filter-btn ${sortBy === "Duration" ? "active" : ""}`}
            onClick={() => setSortBy("Duration")}
          >
            Duration
          </button>
        </div>

        {/* Star rating filter */}
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="star">
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="flight-cards">
        {favorites.length > 0 ? (
          favorites.map((flight) => (
            <div key={flight.id} className="flight-card">
              <div className="flight-card-left">
                {/* Uçuş logosu */}
                <img
                  src={flight.companyLogo}
                  alt={`${flight.operator} Logo`}
                  className="flight-company-logo"
                />
              </div>

              <div className="flight-card-right">
                <div className="flight-info">
                  <div className="departure-info">
                    <FaPlaneDeparture className="icon" />
                    <div>
                      <strong>Departure:</strong>{" "}
                      {new Date(flight.scheduleDateTime).toLocaleString()}
                    </div>
                  </div>
                  <div className="arrival-info">
                    <FaPlaneArrival className="icon" />
                    <div>
                      <strong>Arrival:</strong> {new Date(flight.publicEstimatedOffBlockTime).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flight-bottom">
                  <p>
                    <strong>Flight:</strong> {flight.flightName}
                  </p>
                  <p className="price">
                    <strong>Price:</strong> ${flight.flightNumber}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite flights yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyFlights;
