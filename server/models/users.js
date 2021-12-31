//-------------------------//
// Creates the users table //
//-------------------------//
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0',
    },
  });
  //--------------------------//
  // Defines the associations //
  //--------------------------//
  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: 'cascade',
    });
    Users.hasMany(models.Comments, {
      onDelete: 'cascade',
    });
    Users.hasMany(models.Likes, {
      onDelete: 'cascade',
    });
  };
  return Users;
};
