const { User, Product } = require("../models")

module.exports = class UserController {
  
   async Login(request, response) {
    const { email, senha } = request.body;
    
    const usuario = await User.findOne({ where: { email, senha } });
   
    if (usuario) {
      response.statusCode = 200
      response.json({
        error: "Login Válido",
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

  async Favoritar(request,response) {
    const { favoritos } = request.body;
    console.log(favoritos)
    const updatedUser = await User.update(
      {
        where: {
          id: Number(request.params.id),
        },
      }
    )

    response.json(updatedUser)
  }
}
