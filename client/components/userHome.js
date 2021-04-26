import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { username } = props;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    return "unmounted";
  }, []);

  if (isLoading) {
    return (
      <div>
        <ReactLoading
          type={"bubbles"}
          color={"yellow"}
          height={667}
          width={375}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <big>Welcome back, {username}!</big>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
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
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(UserHome);
