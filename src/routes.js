
import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controlles/UserController';
import SessionController from './app/controlles/SessionController';
import ProducstController from './app/controlles/ProducstController';
import CategoryController from './app/controlles/CategoryController';
import OrderController from './app/controlles/OrderController';
import authmiddleware from './app/middlewares/auth';
import CreatePaymentIntentController from './app/controlles/stripe/CreatePaymentIntentController';
import FavoritesController from './app/controlles/FavoritesController';

// import User from './app/models/user';
// import { v4 } from 'uuid';

// import User from './app/models/user';


const routes = new Router();

const upload = multer(multerConfig);


routes.get('/', (req, res) => {
  return res.json({ message: 'Hello to my first API' });
});

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store);

routes.use(authmiddleware);

routes.post('/products', upload.single('file'), ProducstController.store)
routes.get('/products', ProducstController.index)
routes.put('/products/:id', upload.single('file'), ProducstController.update)

routes.post('/favorites', FavoritesController.store);          // adicionar favorito (product_id no body)
routes.delete('/favorites/:product_id', FavoritesController.delete);  // remover favorito pelo product_id
routes.get('/favorites', FavoritesController.index);

routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', CategoryController.update)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)
routes.post('/create-payment-intent', CreatePaymentIntentController.store);



// const user = await User.create({
//   id: v4(),
//   name: 'aaa',
//   email: 'jkjkdjjd@gmail.com',
//   password_hash: '123456',
// });

// return res.status(201).json(user);


export default routes;