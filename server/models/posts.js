//-------------------------//
// Creates the posts table //
//-------------------------//
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    message: {
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
