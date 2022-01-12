//--------------------------------------------//
// Indicating the format of Users model table //
//--------------------------------------------//
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'Aucune biographie disponible pour le moment.',
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'http://localhost:3001/image/default_user.png',
    },
    isAdmin: {
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
