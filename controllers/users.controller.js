const { User, IsLiked, Favorito } = require("../models")


module.exports = class UserController {
  
   async Login(request, response) {
    const { email, senha } = request.body;
    
    const usuario = await User.findOne({ where: { email, senha } });
   
    if (usuario) {
      response.statusCode = 200
      response.json({
        error: "Login Válido",
        usuario
      })
      return
    } else {
      response.statusCode = 400
      response.json({
        error: "Login Inválido",
      })
      return 
    }
  }

  async adicionarFavorito(request, response) {
    try {
      const { id_usuario, id_produto } = request.body;
  
      const favorito = await Favorito.create({
        id_usuario,
        id_produto
      });
  
      response.status(201).json(favorito);
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      response.status(500).json({ error: 'Erro ao adicionar favorito' });
    }
  }

    async Like(request, response) {
      try {
        const { id_produto, id_usuario } = request.body;
        const incrementedIdProduto = id_produto + 1;
        const dislike = 0;
    
        const existingLike = await IsLiked.findOne({
          where: { id_usuario: id_usuario, id_produto: incrementedIdProduto },
        });
    
        if (existingLike) {

          return response.status(400).json({ success: false, message: 'Usuário já deu like neste produto.' });
        }
    
        const newLike = await IsLiked.create({ id_usuario: id_usuario, id_produto: incrementedIdProduto, dislike });
    
        response.json({ like: newLike });
      } catch (error) {
        console.log('Ocorreu um erro ao registrar o like:', error);
        
        return response.status(500).json({ success: false, message: 'Não foi possível registrar o like.' });
      }
    };
  
  
    async Dislike(request, response) {
      try {
        const { id_produto, id_usuario } = request.body;
        const incrementedIdProduto = id_produto + 1;
        const dislike = 1;
  
        const existingDislike = await IsLiked.findOne({
          where: { id_usuario: id_usuario, id_produto: incrementedIdProduto, dislike },
        });
    
        if (existingDislike) {
          return response.status(400).json({ success: false, message: 'Usuário já deu dislike neste produto.' });
        }
    
        const newDislike = await IsLiked.create({ id_usuario: id_usuario, id_produto: incrementedIdProduto, dislike });
    
        return response.status(200).json({ success: true, message: 'Dislike registrado com sucesso.' });
      } catch (error) {
        console.log('Ocorreu um erro ao registrar o dislike:', error);
        
        return response.status(500).json({ success: false, message: 'Não foi possível registrar o dislike.' });
      }
    };


}
