'use strict';

const data = [
  {
    title: "title 1 user 1",
    caption: "caption user 1",
    image_url: "http://1.1.1",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "title 2 user 1",
    caption: "caption user 1",
    image_url: "http://2.1.1",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "title 3 user 1",
    caption: "caption user 1",
    image_url: "http://3.1.1",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Photos", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Photos", null, {})
  }
};
