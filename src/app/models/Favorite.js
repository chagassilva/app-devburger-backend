// models/favorite.js
import { Model } from 'sequelize';
import { number } from 'yup';

export default (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: 'userId' });
      Favorite.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  Favorite.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites', // caso queira forçar o nome da tabela
  });

  return Favorite;
};
