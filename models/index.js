const Sequelize = require("sequelize")

const Products = require("./products.model")

const configuration = require("../utils/configuration")

const config = configuration()
const sequelize = new Sequelize(config.database)

const database = {
  Sequelize,
  sequelize,
  Products: Products(sequelize, Sequelize),
}

module.exports = database
