
import User from '../models/User';
import { v4} from 'uuid';

import * as Yup from 'yup';

class UserController{

    async store(req, res) {

        const { name, email, password, admin } = req.body;

        

        // Validação de dados com Yup

        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        });

        schema.validate(req.body, { abortEarly: false }).catch(err => {
            return res.status(400).json({ error: err.errors });
        });

        // Validação de dados com Yup

        // Validação de email já cadastrado

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

         // Validação de email já cadastrado
        

    const user = await User.create({
        id: v4(),
        name,
        email,
        password,
        admin,
      });

      return res.status(201).json({

        id: user.id,
        name,
        email,
        admin,
          
        
    
    });

    }

}

export default new UserController();