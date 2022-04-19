'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('session', 'deleted_at', {
        type: Sequelize.DATE,
        defaultValue: null,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('session', 'deleted_at')]);
  },
};
