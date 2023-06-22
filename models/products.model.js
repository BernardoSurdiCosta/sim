module.exports = (sequelize, Sequelize) => {
    const produto = sequelize.define("produto", {
        id_produto: { 
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.STRING,
        },
      },
      { timestamps: false }
      )
  
    return produto
  }