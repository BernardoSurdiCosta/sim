const { User, IsLiked } = require("../models")


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


    async Like(request, response) {
      try {
        const { id_produto, id_usuario } = request.body;
        const incrementedIdProduto = id_produto + 1;
        const dislike = 0;
        // Verifica se o like já existe no banco de dados para o usuário e produto específicos
        const existingLike = await IsLiked.findOne({
          where: { id_usuario: id_usuario, id_produto: incrementedIdProduto },
        });
    
        if (existingLike) {
          // Se o like já existe, retorne uma resposta informando que o usuário já deu like neste produto
          return response.status(400).json({ success: false, message: 'Usuário já deu like neste produto.' });
        }
    
        // Crie um novo registro de like no banco de dados
        const newLike = await IsLiked.create({ id_usuario: id_usuario, id_produto: incrementedIdProduto, dislike });
    
        // Retorna uma resposta de sucesso
        return response.status(200).json({ success: true, message: 'Like registrado com sucesso.' });
      } catch (error) {
        console.log('Ocorreu um erro ao registrar o like:', error);
        // Retorna uma resposta de erro
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


