import Product from '../models/Products';
import User from '../models/User';

class FavoritesController {
  // Adicionar produto aos favoritos
  async store(req, res) {
    const user_id = req.userId;
    const { product_id } = req.body;

    const user = await User.findByPk(user_id);
    const product = await Product.findByPk(product_id);

    if (!user || !product) {
      return res.status(404).json({ error: 'User or product not found.' });
    }

    await user.addFavorite(product); // Nome do alias: 'favorites' → método: addFavorite

    return res.status(200).json({ message: 'Product added to favorites.' });
  }

  // Remover produto dos favoritos
  async delete(req, res) {
    const user_id = req.userId;
    const { product_id } = req.params;

   
    const user = await User.findByPk(user_id);
    const product = await Product.findByPk(product_id);

    if (!user || !product) {
      return res.status(404).json({ error: 'User or product not found.' });
    }

    await user.removeFavorite(product); // removeFavorite

    return res.status(200).json({ message: 'Product removed from favorites.' });
  }

  // Listar favoritos do usuário
  async index(req, res) {
    const user = await User.findByPk(req.userId, {
      include: {
        model: Product,
        as: 'favorites', // nome do alias correto
        through: { attributes: [] }, // não retorna dados da tabela intermediária
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json(user.favorites);
  }
}

export default new FavoritesController();
