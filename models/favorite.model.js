module.exports = (sequelize, Sequelize) => {
    const Favorito = sequelize.define("favorito", {
      id_favorito: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_produto: { 
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_usuario: { 
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    { 
      timestamps: false 
    });
  
    Favorito.associate = (models) => {
      Favorito.belongsTo(models.Produto, {
        foreignKey: 'id_produto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
  
      Favorito.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    };
  
    return Favorito;
  };