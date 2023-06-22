const { Produto, IsLiked } = require("../models")

module.exports = class ProductsController{
  async getALL(request, response) {
    const produtos = await Produto.findAll();
    const likes = await IsLiked.findAll()

    response.json({
        produtos,
        likes
    })
}
}