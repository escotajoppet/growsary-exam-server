module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    topicid: {
      type: DataTypes.UUID,
      references: {
        model: 'Topics',
        key: 'id',
      },
    },
    message: DataTypes.TEXT,
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
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.Topic, {
      foreignKey: 'topicId',
    });

    Message.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'owner',
    });

    Message.belongsTo(models.User, {
      foreignKey: 'updatedBy',
      as: 'updater',
    });
  };
  return Message;
};
