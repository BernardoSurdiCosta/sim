const Sequelize = require("sequelize")

const Produto = require("./products.model")
const User = require("./users.model")

const configuration = require("../utils/configuration")
const config = configuration()
const sequelize = new Sequelize(config.database)

const database = {
  Sequelize,
  sequelize,
  Produto: Produto(sequelize, Sequelize),
  User: User(sequelize, Sequelize),
}

module.exports = database
