module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define(
      "usuario",
      {
        id_usuario: { 
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        usuario: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        cpf: {
          type: Sequelize.STRING,
        },
        senha: {
          type: Sequelize.STRING,
        },
      },
      { timestamps: false }
    )

    return user
  }