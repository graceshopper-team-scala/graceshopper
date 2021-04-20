const Sequelize = require("sequelize");
const db = require("../db");

const Vehicle = db.define("vehicle", {
  make: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  model: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  class: {
    type: Sequelize.ENUM([
      "sedan",
      "suv",
      "electric",
      "sports",
      "military",
      "offroad",
    ]),
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  logoUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Vehicle;
