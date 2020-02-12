module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('couriers', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'files',
        key: 'id',
      },
      OnUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('couriers', 'avatar_id');
  },
};
