const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
    defaultScope: {
      attributes: {
        exclude: [
          'password',
        ],
      },
    },
    hooks: {
      async beforeCreate(instance) {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(instance.password, saltRounds);

        instance.password = hash;
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
