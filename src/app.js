import express from 'express';
import routes from './routes';
import { resolve } from 'node:path';
import cors from 'cors';

import './database';

const allowedOrigins = [
  'http://localhost:5173',
  'https://app-devburger-frontend.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permite ferramentas internas (Postman, etc.)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

class App {
  constructor() {
    this.app = express();
    this.app.use(cors(corsOptions));
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
