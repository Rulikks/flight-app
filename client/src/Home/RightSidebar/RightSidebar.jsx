import React from 'react';
import { Image } from 'antd';
import { AiFillCar } from 'react-icons/ai'; 
import { FaHotel } from 'react-icons/fa'; 
import { FaUmbrellaBeach } from 'react-icons/fa'; 
import './RightSidebar.scss';

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      <div className="card">
        <Image
          preview={false}
          src="/car-rental.png"
          alt="Car Rentals"
          className="card-image"
        />
        <div className="card-content">
          <AiFillCar className="card-icon" />
          <h3>CAR RENTALS</h3>
        </div>
      </div>

      <div className="card">
        <Image
          preview={false}
          src="/hotels.png"
          alt="Hotels"
          className="card-image"
        />
        <div className="card-content">
          <FaHotel className="card-icon" />
          <h3>HOTELS</h3>
        </div>
      </div>

      <div className="card">
        <Image
          preview={false}
          src="/travel-packages.png"
          alt="Travel Packages"
          className="card-image"
        />
        <div className="card-content">
          <FaUmbrellaBeach className="card-icon" />
          <h3>TRAVEL PACKAGES</h3>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
