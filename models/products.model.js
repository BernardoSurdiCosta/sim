module.exports = (sequelize, Sequelize) => {
    const products = sequelize.define("products", {
      products: {
        type: Sequelize.STRING,
      },
    })
  
    return products
  }