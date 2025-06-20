import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        description: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/category-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'Products', // ou 'Categories', dependendo da migration
        underscored: true, // <-- isso faz o Sequelize mapear created_at e updated_at
      }
    );

    return this;
  }

  // Relacionamento com a tabela de categorias
  static associate(models) {
    this.belongsTo(models.categories, {
      foreignKey: 'category_id', 
      as: 'category',
    });
  }
 // Relacionamento com a tabela de categorias

}

export default Product;
