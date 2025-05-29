
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
                    return `http://localhost:3001/category-file/${this.path}`;
                  },
                },
      },

      {
        sequelize,
      }

    );

    return this;

}

}

export default categories;