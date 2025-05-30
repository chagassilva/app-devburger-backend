
import Sequelize, { Model } from "sequelize";


class categories extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://app-devburger-backend-production.up.railway.app/product-file/${this.path}`;
          },
        },
      },

      {
        sequelize,
        modelName: 'Category',
        tableName: 'categories', // ou 'Categories', dependendo da migration
        underscored: true, // <-- isso faz o Sequelize mapear created_at e updated_at
      }

    );

    return this;

  }

}

export default categories;