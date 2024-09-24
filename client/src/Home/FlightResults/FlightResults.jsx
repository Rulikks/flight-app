import React, { useState, useEffect } from "react";
import { Select, Radio, Button } from "antd"; // Pagination bileşeni eklendi
import { fetchFlightData } from "../../services/flightService";
import PlaneSVG from "../../../public/airplane.svg";
import { FaHeart, FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa"; // Kalp ikonu eklendi
import moment from "moment";
import "./FlightResults.scss";

const FlightResults = ({ filters, addToFavorites, favorites }) => {  // addToFavorites ve favorites prop'ları alındı
  const { Option } = Select;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Şu anki sayfa durumu

  useEffect(() => {
    const getFlights = async () => {
      try {
        setLoading(true);
        const data = await fetchFlightData({
          page: currentPage,
          ...filters,
        });
        // API'den gelen uçuş verilerine marka logosu ekliyoruz
        data.flights.map((flight) => {
          flight.companyLogo = `https://content.airhex.com/content/logos/airlines_${flight.prefixIATA}_700_100_r.png`;
        });
        setFlights(data.flights || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setLoading(false);
      }
    };

    getFlights();
  }, [currentPage, filters]);

  const formatDiff = (startDate, endDate) => {
    let date1 = moment(startDate);
    let date2 = moment(endDate);

    let duration = moment.duration(date2.diff(date1));

    let totalMinutes = duration.asMinutes(); // Toplam dakika
    let hours = Math.floor(totalMinutes / 60); // Toplam saat
    let minutes = Math.floor(totalMinutes % 60); // Kalan dakikalar
    return `${hours}h ${minutes}m`;
  };

  // Sayfa değiştirme fonksiyonu
  const prevPagination = () => {
    if (currentPage <= 1) {
      setCurrentPage(1);
      return;
    }
    setCurrentPage(currentPage - 1);
    document
      .querySelector(".flight-search-container")
      .scrollIntoView({ behavior: "smooth" });
  };

  const nextPagination = () => {
    setCurrentPage(currentPage + 1);
    document
      .querySelector(".flight-search-container")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flight-results-container">
      <div className="results-section">
        {loading ? (
          <p>Loading flights...</p>
        ) : flights.length > 0 ? (
          <>
            {flights.map((flight) => (
              <div className="flight-card" key={flight.id}>
                <div className="flight-card-info">
                  <div className="flight-info">
                    <div className="title">
                      <FaPlaneDeparture className="icon" />
                      Departure
                    </div>
                    <div className="time">
                      {moment(flight.scheduleDateTime).format("HH:mm A")}
                    </div>
                    <div className="description">
                      Airport: {flight.publicFlightState.flightStates[0]}
                    </div>
                  </div>
                  <div className="breaker"></div>
                  <div className="airline-info">
                    <div className="title">{flight.operator}</div>
                    {/* Marka logosunu yükleyen img etiketi */}
                    <img
                      src={flight.companyLogo}
                      style={{ width: 100, height: 20 }}
                      alt={`${flight.operator} Logo`}
                    />
                    <br />
                    <img src={PlaneSVG} alt="Plane Icon" />
                    <p>
                      {flight.flightName} ({flight.flightDirection})
                    </p>
                    <p>
                      Flight Duration:
                      {formatDiff(
                        flight.scheduleDateTime,
                        flight.publicEstimatedOffBlockTime
                      )}
                    </p>
                  </div>
                  <div className="breaker"></div>
                  <div className="arrival-info">
                    <div className="title">
                      <FaPlaneArrival className="icon" />
                      Arrival
                    </div>
                    <div className="time">
                      {moment(flight.publicEstimatedOffBlockTime).format(
                        "HH:mm A"
                      )}
                    </div>
                    <div className="description">
                      Airport: {flight.publicFlightState.flightStates[1]}
                    </div>
                  </div>
                </div>
                <div className="flight-card-bottom">
                  <div className="price-info">
                    Price: ${flight.flightNumber}
                  </div>
                  {/* Kalp ikonu */}
                  <FaHeart
                    onClick={() => addToFavorites(flight)}  // Favorilere eklemek için
                    className="favorite-icon"
                    style={{
                      color: favorites.some((fav) => fav.id === flight.id) ? "red" : "gray", // Favoriyse kırmızı, değilse gri
                      cursor: "pointer",
                    }}
                  />
                  <Button type="primary" className="book-flight-btn">
                    Book Flight
                  </Button>
                </div>
              </div>
            ))}
            {/* Pagination Bileşeni */}
            <div className={"pagination-buttons"}>
              <div onClick={prevPagination} className={"pagination-button"}>
                Prev
              </div>
              <div onClick={nextPagination} className={"pagination-button"}>
                Next
              </div>
            </div>
          </>
        ) : (
          <p>No flights available at the moment.</p>
        )}
      </div>
      <div className="filter-section">
        <h3>Sort by:</h3>
        <Select defaultValue="lowest" style={{ width: 200 }}>
          <Option value="lowest">Lowest Price</Option>
          <Option value="highest">Highest Price</Option>
        </Select>

        <h3>Arrival Time</h3>
        <Radio.Group defaultValue="5AM-12PM">
          <Radio value="5AM-12PM">5:00 AM - 11:59 AM</Radio>
          <Radio value="12PM-6PM">12:00 PM - 5:59 PM</Radio>
        </Radio.Group>

        <h3>Stops</h3>
        <Radio.Group defaultValue="nonstop">
          <Radio value="nonstop">Nonstop</Radio>
          <Radio value="1stop">1 Stop</Radio>
          <Radio value="2stops">2+ Stops</Radio>
        </Radio.Group>

        <h3>Airlines Included</h3>
        <div className="airlines-list">
          {["Alitalia", "Lufthansa", "Air France", "Brussels Airlines", "Air Italy", "Siberia"].map((airline) => (
            <p key={airline}>
              {airline} <span>$230</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
