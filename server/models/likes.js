//--------------------------//
// Create and Exports model //
//--------------------------//
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes');
  return Likes;
};
