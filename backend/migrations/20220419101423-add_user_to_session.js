'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('session', 'user_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'user_id',
        },
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('session', 'user_id')]);
  },
};
