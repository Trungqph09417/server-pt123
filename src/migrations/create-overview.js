"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Overviews", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      target: {
        type: Sequelize.STRING,
      },
      created: {
        type: Sequelize.STRING,
      },
      expired: {
        type: Sequelize.STRING,
      },
      bonus: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Overviews");
  },
};
