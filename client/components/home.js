import React, { Component } from "react";
import ReactLoading from "react-loading";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
    window.localStorage.setItem("GUESTCART", JSON.stringify([]));
    this.loader = this.loader.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  loader(type, color) {
    return <ReactLoading type={type} color={color} height={500} width={250} />;
  }

  render() {
    const { username } = this.props;

    if (this.state.isLoading) {
      return <div>{this.loader("bubble", "yellow")}</div>;
    }

    return (
      <div>
        <div>
          {username ? (
            <big>Welcome back, {username}!</big>
          ) : (
            <big>Welcome to Grace Hopper Motors!</big>
          )}
        </div>
        <div id="main-home">
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
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
