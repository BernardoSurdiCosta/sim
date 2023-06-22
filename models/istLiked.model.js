module.exports = (sequelize, Sequelize) => {
    const IsLiked = sequelize.define("isliked", {
      id_isliked: { 
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
      },
      dislike: { 
        type: Sequelize.INTEGER,
      },
    },
    { 
      timestamps: false 
    });
  
    IsLiked.associate = (models) => {
      IsLiked.belongsTo(models.Produto, {
        foreignKey: 'id_produto',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
  
      IsLiked.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    };
  
    return IsLiked;
  };