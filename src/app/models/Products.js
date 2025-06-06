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
        tableName: 'Products',
        underscored: true,
      }
    );

    return this;
  }

  static associate(models) {
    // Relação com categoria
    this.belongsTo(models.categories, {
      foreignKey: 'category_id',
      as: 'category',
    });

    // Relação com favoritos
    this.belongsToMany(models.User, {
      through: models.Favorite,
      foreignKey: 'productId',
      as: 'favoritedBy',
    });
  }
}

export default Product;
