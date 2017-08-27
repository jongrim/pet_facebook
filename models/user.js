const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      birthday: DataTypes.DATE,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(password) {
          this.setDataValue('password', bcrypt.hashSync(password, 12, null));
        }
      },
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

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
