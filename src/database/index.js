import { Sequelize } from "sequelize";
import User from "../app/models/User";
import configDatabase from "../config/database";
import Products  from "../app/models/Products";
import Category from "../app/models/Category";
import mongoose from "mongoose";

const models = [User, Products, Category];

class Database {
    constructor() {
    this.init();
    this.mongo();  // Conexão com o MongoDB
  }

  // Relacionamento entre as tabelas

  init() {
    this.connection = new Sequelize('postgresql://postgres:CZKkbzaJRRaBPjpJnulLbrxIThDhFpkx@postgres.railway.internal:5432/railway');
    models.map(model => model.init(this.connection)).map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
  
  // Relacionamento entre as tabelas


  // Conexão com o MongoDB, Requer a instalação do mongoose

   mongo() {
    this.mongoConnection = mongoose.connect("mongodb://mongo:mEIhPbBfOzIcqdoMNLZxcnfeUMQipgzv@centerbeam.proxy.rlwy.net:32301", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  
  // Conexão com o MongoDB, Requer a instalação do mongoose

}


export default new Database();
