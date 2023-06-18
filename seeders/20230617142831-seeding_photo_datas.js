'use strict';

const seeder = [{
  title: "Photo 1",
  caption: "caption 1",
  image_url: "https://1",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: "Photo 2",
  caption: "caption 2",
  image_url: "https://2",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  title: "Photo 3",
  caption: "caption 3",
  image_url: "https://3",
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
   await queryInterface.bulkInsert("Photos", seeder, {})
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
