// 'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('products', {
      
      id:{
        
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        
      },

      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      price:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      category:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      path:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      description:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    
  })

},

  async down (queryInterface) {
    
     await queryInterface.dropTable('products')
     
  }

}
