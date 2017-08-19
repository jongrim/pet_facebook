module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      birthday: DataTypes.DATETIME,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      about: DataTypes.TEXT,
    },{
        paranoid: true,
        forceTableName: "User"
    });
  
    User.associate = function(models) {
      // Associating User with Posts
      // When an User is deleted, also delete any associated Posts
      User.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };