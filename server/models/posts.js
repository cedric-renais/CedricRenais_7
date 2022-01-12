//--------------------------------------------//
// Indicating the format of Posts model table //
//--------------------------------------------//
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //--------------------------//
  // Defines the associations //
  //--------------------------//
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: 'cascade',
    });
    Posts.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };
  return Posts;
};
