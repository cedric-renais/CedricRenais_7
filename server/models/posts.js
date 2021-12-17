//--------------------------//
// Create and Exports model //
//--------------------------//

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
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Posts;
};
