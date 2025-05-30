import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        offer: Sequelize.BOOLEAN,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://app-devburger-backend-production.up.railway.app/${this.path}`;
          },
        },
      },
      {
        sequelize,
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
