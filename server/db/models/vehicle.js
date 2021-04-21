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
  vehicleName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.make} ${this.model}`;
    },
  },
  class: {
    type: Sequelize.ENUM([
      "sedan",
      "suv",
      "electric",
      "sports",
      "military",
      "offroad",
      "boats",
      "planes",
    ]),
    defaultValue: "sedan",
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  logoUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "https://img.icons8.com/ios/452/rockstar-games.png",
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      "https://www.chevynorthcountry.com/themes/foundation/dist/images/inventory-placeholder.png",
  },
});

module.exports = Vehicle;
