const { Produto } = require("../models")

module.exports = class ProductsController{
  async getALL(request, response) {
    const produtos = await Produto.findAll()

    response.json({
        produtos,
    })
}
}