//-------------------------//
// Creates the users table //
//-------------------------//
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //--------------------------//
  // Defines the associations //
  //--------------------------//
  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: 'cascade',
    });
    /*     Users.hasMany(models.Comments, {
      onDelete: 'cascade',
    }); */
    Users.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };
  return Users;
};
