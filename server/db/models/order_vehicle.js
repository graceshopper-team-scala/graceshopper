const Sequelize = require("sequelize");
const db = require("../db");

const Order_Vehicle = db.define("order_vehicle", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});



module.exports = Order_Vehicle;