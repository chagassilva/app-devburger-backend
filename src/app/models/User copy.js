
import Sequelize, { Model, VIRTUAL } from 'sequelize';
import bcrypt from 'bcrypt';


class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      admin: Sequelize.BOOLEAN,


    }, {


      sequelize,
      
      

    });


    // criptografia da senha

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    })

    return this;

  }

  // criptografia da senha



  async checkPassword(password) {

    return bcrypt.compare(password, this.password_hash);

  }


}





export default User;

