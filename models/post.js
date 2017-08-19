module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    textContent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    }
  });

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Post.hasMany(models.Comment, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Post;
};
