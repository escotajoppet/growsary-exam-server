module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV1,
        },
        name: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
        },
        isActive: {
          type: Sequelize.BOOLEAN,
        },
      })
      .then(_ => {
        return queryInterface.sequelize.query(`
          ALTER TABLE Users
          ADD CONSTRAINT Users_unique
          UNIQUE (email)
        `);
      });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
