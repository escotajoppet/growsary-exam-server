const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    subject: DataTypes.STRING,
    description: DataTypes.TEXT,
    deletedBy: {
      type: DataTypes.UUID,
      reference: {
        model: 'Users',
        key: 'id',
      },
    },
    deletedAt: DataTypes.DATE,
    createdBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    defaultScope: {
      where: {
        [Op.and]: [
          { deletedAt: null },
          { deletedBy: null },
        ],
      },
    },
  });
  Topic.associate = function(models) {
    Topic.hasMany(models.Message, {
      foreignKey: 'topicId',
    });

    Topic.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'owner',
    });

    Topic.belongsTo(models.User, {
      foreignKey: 'updatedBy',
      as: 'updater',
    });

    Topic.belongsTo(models.User, {
      foreignKey: 'deletedBy',
      as: 'deleter',
    });
  };
  return Topic;
};
