module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      birthday: DataTypes.DATE,
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: DataTypes.STRING,
      about: DataTypes.TEXT
    },
    {
      paranoid: true
    }
  );

  User.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    User.hasMany(models.Pet, {
      onDelete: 'cascade'
    });
    User.hasMany(models.Post, {
      onDelete: 'cascade'
    });
    User.hasMany(models.Photo, {
      onDelete: 'cascade'
    });
    User.hasMany(models.Comment, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return User;
};
