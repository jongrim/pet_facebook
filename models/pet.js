module.exports = function(sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {
      pet_name: DataTypes.STRING,
      pet_birthday: DataTypes.DATE,
      pet_species: DataTypes.STRING,
      pet_breed: DataTypes.STRING,
      pet_about: DataTypes.TEXT,
    });
  
    Pet.associate = function(models) {
      // We're saying that a Pet should belong to an User
      // A Pet can't be created without an User due to the foreign key constraint
      Pet.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Pet;
  };
  