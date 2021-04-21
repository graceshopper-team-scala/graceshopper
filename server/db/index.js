//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/user");
const Vehicle = require("./models/vehicle");
const Order = require("./models/order")
const Order_Vehicle = require("./models/order_vehicle")
//associations could go here!

User.hasMany(Order)
Order.belongsTo(User)


Vehicle.belongsToMany(Order, { through: Order_Vehicle });
Order.belongsToMany(Vehicle, { through: Order_Vehicle });




module.exports = {
  db,
  models: {
    User,
    Vehicle,
    Order, 
    Order_Vehicle
  },
};
