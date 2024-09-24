import React, { useState } from "react";
import Header from "../Header/Header";
import FlightSearch from "../FlightSearch/FlightSearch";
import FlightResults from "../FlightResults/FlightResults";
import RightSidebar from "../RightSidebar/RightSidebar"; // RightSidebar bileşenini ekledik
import MyFlights from "../MyFlightResults/MyFlights";
import { Routes, Route } from "react-router-dom";  // Route ve Routes importu
import "./Home.scss";


const Home = () => {
  const [filters, setFilters] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleFilterChange = (filters) => {
    setFilters(filters);
  };

  const addToFavorites = (flight) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === flight.id);
    if (!isAlreadyFavorite) {
      setFavorites([...favorites, flight]);
    } else {
      setFavorites(favorites.filter((fav) => fav.id !== flight.id));
    }
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="content-section">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="left-content">
                    <FlightSearch onChange={handleFilterChange} />
                    <FlightResults
                      filters={filters}
                      addToFavorites={addToFavorites}
                      favorites={favorites}
                    />
                  </div>
                  <RightSidebar /> {/* Sağda görsel kutular */}
                </>
              }
            />
            <Route
              path="/my-flights"
              element={<MyFlights favorites={favorites} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
