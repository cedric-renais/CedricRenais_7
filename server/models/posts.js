//--------------//
// Create model //
//--------------//
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //--------------------//
  // Define association //
  //--------------------//
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: 'cascade',
    });
  };
  return Posts;
};
