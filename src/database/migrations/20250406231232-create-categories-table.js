

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface,  Sequelize) {
    
     await queryInterface.createTable('categories', {
     id:{
        
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    
  },

  name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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
    
     await queryInterface.dropTable('categories');
     
  }

}
