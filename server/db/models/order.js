const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM(['pending', 'completed']),
    defaultValue: 'pending',
    allowNull: false,
  },
});

module.exports = Order;
