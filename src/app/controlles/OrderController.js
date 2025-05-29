

import * as Yup from 'yup';
import Order from '../schemas/order';
import Product from '../models/Products';
import Category from '../models/Category';
import User from '../models/User';


class OrderController {
    async store(req, res) {
        const schema = Yup.object({
           
            products: Yup.array().required().of(

              Yup.object({
                id: Yup.number().required(),
                quantity: Yup.number().required(),           
              })
            )           
        });
    

try {
    await schema.validateSync(req.body, { abortEarly: false });
} catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err.errors });
}



const {admin: isAdmin} = await User.findByPk(req.userId);

if(!isAdmin) {
  return res.status(401).json({ error: 'User is not admin' });

}

 const { products } = req.body;

 // Procurando as orders por id
 const productsIds = products.map((product) => product.id);

 const findProducts = await Product.findAll({ 
  
  where: { 
    id: productsIds
  },

  include: [

    {
      model: Category,
      as: 'category',    
      attributes: ['name'],    
    },

  ],

});

const  formetedProducts =  findProducts.map(product => {

const productsIndex = products.findIndex(item => item.id === product.id)

const newProducts = {

  id: product.id,
  name: product.name,
  price: product.price,
  category: product.category.name,
  url: product.url,
  quantity: products[productsIndex].quantity,

}

return newProducts;

})

// erro aqui
 const order = {

  user:{
     id: req.userId,
     name: req.userName,
   },
   products: formetedProducts,
   status: 'Pedido realizado',
 }

const createOrder = await Order.create(order);

return res.status(201).json(createOrder);

// erro aqui

  }

  async index(req, res) {

  const orders = await Order.find();

  return res.json(orders)

}

 // update do status do pedido

  async update(req, res) {

    const schema = Yup.object({
     
      status: Yup.string().required(),    

  });

try {
await schema.validateSync(req.body, { abortEarly: false });
} catch (err) {
return res.status(400).json({ error: 'Validation fails', messages: err.errors });
}

// Verifica se o usuario é admin

const {admin: isAdmin} = await User.findByPk(req.userId);

if(!isAdmin) {
    return res.status(401).json({ error: 'User is not admin' });

}

// Verifica se o usuario é admin

    const { id } = req.params;
    const { status } = req.body;

    // update do status do pedido

    // Update do pedido

    try {
        await Order.updateOne({ _id: id }, { status });
      }
      catch (err) {
          return res.status(400).json({ error: 'Order not found' });
      }
      
      return res.status(200).json({ message: 'Status atualizado com sucesso' });

// //Update do pedido

 
}

}

export default new OrderController();






// const {admin: isAdmin} = await User.findByPk(req.userId);

// if(!isAdmin) {
//   return res.status(401).json({ error: 'User is not admin' });

// }

//  const { products } = req.body;

//  // Procurando as orders por id
//  const productsIds = products.map((product) => product.id);

//  const findProducts = await Product.findAll({ 
  
//   where: { 
//     id: productsIds
//   },

//   include: [

//     {
//       model: Category,
//       as: 'category',    
//       attributes: ['name'],    
//     },

//   ],

// });

// const  formetedProducts =  findProducts.map(product => {

// const productsIndex = products.findIndex(item => item.id === product.id)

// const newProducts = {

//   id: product.id,
//   name: product.name,
//   price: product.price,
//   category: product.category.name,
//   url: product.url,
//   quantity: products[productsIndex].quantity,

// }

// return newProducts;

// })

//  const order = {

//   user:{
//      id: req.userId,
//      name: req.userName,
//    },
//    products: formetedProducts,
//    status: 'Pedido realizado',
//  }

// const createOrder = await Order.create(order);

// return res.status(201).json(createOrder);

//   }

//   async index(req, res) {

//   const orders = await Order.find();

//   return res.json(orders)

// }

//  // update do status do pedido

//   async update(req, res) {

//     const schema = Yup.object({
     
//       status: Yup.string().required(),    

//   });

// try {
// await schema.validateSync(req.body, { abortEarly: false });
// } catch (err) {
// return res.status(400).json({ error: 'Validation fails', messages: err.errors });
// }

// // Verifica se o usuario é admin

// const {admin: isAdmin} = await User.findByPk(req.userId);

// if(!isAdmin) {
//     return res.status(401).json({ error: 'User is not admin' });

// }

// // Verifica se o usuario é admin

//     const { id } = req.params;
//     const { status } = req.body;

//     // update do status do pedido

//     // Update do pedido

//     try {
//         await Order.updateOne({ _id: id }, { status });
//       }
//       catch (err) {
//           return res.status(400).json({ error: 'Order not found' });
//       }
      
//       return res.status(200).json({ message: 'Status atualizado com sucesso' });

// //Update do pedido
