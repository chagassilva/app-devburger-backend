

import * as Yup from 'yup';
import Products from '../models/Products';
import Category from '../models/Category';
import User from '../models/User';

class ProductsController {
    async store(req, res) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
        });
    

try {
    await schema.validateSync(req.body, { abortEarly: false });
} catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err.errors });
}

// Verifica se o usuario é admin

const {admin: IsAdmin} = await User.findByPk(req.userId)

        if(!IsAdmin){

            return res.status(401).json({ error: 'User is not admin' });

        }

// Verifica se o usuario é admin


const { filename: path } = req.file;
const { name,  price, category_id, offer } = req.body;

//const newPrice = Number(price);

const product = await Products.create({

    name,
    price,
    category_id,
    path,
    offer,
})

  return res.status(201).json(product);

}

//////////
async update(req, res) {
  const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
  });


try {
await schema.validateSync(req.body, { abortEarly: false });
} catch (err) {
return res.status(400).json({ error: 'Validation fails', messages: err.errors });
}

// Verifica se o usuario é admin

const {admin: IsAdmin} = await User.findByPk(req.userId)

        if(!IsAdmin){

            return res.status(401).json({ error: 'User is not admin' });

        }


//  Verifica se o usuario é admin


const { id } = req.params;

const findproduct = await Products.findByPk(id);
if(!findproduct) {
    return res.status(400).json({ error: 'Product not found' });
}

let path;
if(req.file) {
    path = req.file.filename;
}

const { name,  price, category_id, offer } = req.body;

//const newPrice = Number(price);

await Products.update({

name,
price,
category_id,
path,
offer,
},
{
    where: { id }
}
)

return res.status(200).json();

}

////////////////


// Pesquisar de produtos

  async index(req, res) {

    const products = await Products.findAll({

      // Relacionamento com a tabela de categorias
      
      include: [

      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },

      ]
      // Relacionamento com a tabela de categorias

  });


    return res.json(products);


  }
  // Pesquisar de produtos

}

export default new ProductsController();