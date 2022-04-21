'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('attend', {
      attend_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'event',
          key: 'event_id',
        },
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'user_id',
        },
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('attend');
  },
};
