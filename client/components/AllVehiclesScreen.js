import React from "react";
import { connect } from "react-redux";
import { fetchVehicles } from "../store/allVehicles";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
export class AllVehicles extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    this.props.getVehicles();
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const vehicles = this.props.vehicles;

    //priceFormatter converts integer price value from DB into dollar currency format
    const priceFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    if (this.state.isLoading) {
      return (
        <div className="loading-screen">
          <ReactLoading
            type={"spokes"}
            color={"#ffc107"}
            height={500}
            width={250}
          />
        </div>
      );
    }
    return (
      <div className="Allcards">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="Card">
            <Link to={`/vehicles/${vehicle.id}`}>
              <div className="Card-image">
                <img src={vehicle.imageUrl} alt={vehicle.model} />
                {vehicle.quantity === 0 && (
                  <img
                    className="sold-out"
                    src="https://pngimg.com/uploads/sold_out/sold_out_PNG77.png"
                  />
                )}
              </div>
            </Link>
            <div className="Card-data">
              <Link to={`/vehicles/${vehicle.id}`}>{vehicle.vehicleName}</Link>
              <div>{priceFormatter.format(vehicle.price)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    vehicles: state.vehicles,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getVehicles: () => dispatch(fetchVehicles()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AllVehicles);
