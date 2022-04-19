'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('admin', {
      admin_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING(128),
        required: true,
      },
      first_name: {
        type: Sequelize.STRING(128),
        required: true,
      },
      last_name: {
        type: Sequelize.STRING(128),
        required: true,
      },
      password: {
        type: Sequelize.STRING(128),
        required: false,
      },
      email_is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verify_email_token: {
        type: Sequelize.STRING(256),
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
    return await queryInterface.dropTable('admin');
  },
};
