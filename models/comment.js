module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.TEXT,
      validate: {
        len: [1]
      }
    }
  });

  Comment.associate = function(models) {
    // Comment.belongsTo(models.Post, {
    //   foriegnKey: {
    //     allowNull: false
    //   }
    // });
    // Comment.hasOne(models.User, {
    //   foriegnKey: {
    //     allowNull: false,
    //     constraints: false
    //   }
    // });
  };

  return Comment;
};
