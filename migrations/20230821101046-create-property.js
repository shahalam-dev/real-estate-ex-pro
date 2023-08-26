'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      property_type: {
        type: Sequelize.ENUM
      },
      location: {
        type: Sequelize.STRING
      },
      approximate_price: {
        type: Sequelize.INTEGER
      },
      property_images: {
        type: Sequelize.BLOB
      },
      contact_details: {
        type: Sequelize.STRING
      },
      available_hours: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('properties');
  }
};