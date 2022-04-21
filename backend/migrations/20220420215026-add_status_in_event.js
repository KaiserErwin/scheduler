'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('event', 'status', {
        type: Sequelize.ENUM,
        values: ['DID_NOT_START', 'IN_PROGRESS', 'FINALIZED', 'CANCELLED'],
        defaultValue: 'DID_NOT_START',
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn('event', 'status')]);
  },
};
