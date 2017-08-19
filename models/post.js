module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    textContent: {
      type: DataType.TEXT,
      allowNull: true
    },
    likes: {
      type: DataType.INTEGER,
      validate: {
        min: 0
      }
    }
  });

  Post.associate(function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Post.hasOne(models.Photo, {
      foreignKey: {
        allowNull: true
      }
    });
    Photo.hasOne(models.Pet, {
      foreignKey: {
        allowNull: true
      }
    });
  });
};
