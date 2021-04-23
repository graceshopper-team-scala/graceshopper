import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
const Home = (props) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide carousel-size carousel-size"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner ">
        <div className="carousel-item active">
          <img
            src="http://i.imgur.com/LmVILuw.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://unrealitymag.com/grand-theft-auto-5-car-ads/19-rqlgqzz/"
            className="d-block w-100"
            alt="..."
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://unrealitymag.com/wp-content/uploads/2013/12/14-NHeRHux-500x312.jpg"
            className="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Home;
