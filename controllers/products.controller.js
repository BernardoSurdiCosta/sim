const { Products } = require("../models")

module.exports = class ProductsController{
  async getALL(request, response) {
    const products = await Products.findAll()

    response.json({
        products,
    })
}
}