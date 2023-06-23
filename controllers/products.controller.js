const { Produto, IsLiked, Favorito } = require("../models")

module.exports = class ProductsController{
  async getALL(request, response) {
    const produtos = await Produto.findAll();
  
    response.json({
        produtos,
    })
}

  async getLikes(request, response) {
      const likes = await IsLiked.findAll();
        
      response.json({
        likes,
      })
  }

  async  getFav(request, response) {
    try {
      const idUsuario = request.params.id;
      const favoritos = await Favorito.findAll({
        where: {
          id_usuario: idUsuario
        }
      });
      
      const favoritosIds = favoritos.map(favorito => favorito.id_produto);
      
      const vfavoritos = await Produto.findAll({
        where: {
          id_produto: favoritosIds
        }
      });
  
      response.json({
        favoritos: vfavoritos
      });
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      response.status(500).json({ error: 'Erro ao buscar favoritos' });
    }
  }
}
