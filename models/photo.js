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
    },
    default_Pic: {
      type: DataTypes.BOOLEAN,
    }
  });

  Photo.associate = function(models) {
    Photo.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Photo.hasMany(models.Post, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Photo;
};
