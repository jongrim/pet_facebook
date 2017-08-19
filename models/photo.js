module.exports = function(sequelize, DataTypes) {
  const Photo = sequelize.define('Photo', {
    isPet: {
      type: DataTypes.BOOLEAN
    },
    likes: {
      type: DataTypes.INTEGER
    },
    img_url: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    }
  });

  Photo.associate(function(models) {
    Photo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Photo.hasOne(models.Pet, {
      foreignKey: {
        allowNull: true
      }
    });
  });

  return Photo;
};
