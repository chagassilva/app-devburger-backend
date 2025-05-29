
import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';



class SessionController {
   
  async store(req, res) {
    
     const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      
    });


// funcao para verificaçao de email e senha

const emailorpasswordcorrect = () => {

    return res.status(401).json({ error: 'Email or password incorrect' });

}

// Verificacao se os dados do scheme estao corretos 

const isvalid = await schema.isValid(req.body)

if (!isvalid) {
    return emailorpasswordcorrect();
}


// Verificacao se o email existe

const { email, password } = req.body;

const user = await User.findOne({ where: { email } });

if (!user) {
    return emailorpasswordcorrect();
}

// Verificacao se a senha esta correta

const issamepassword = await user.checkPassword(password);

if (!issamepassword) {
    return emailorpasswordcorrect();
}


// Geracao do token

return res.status(201).json({ 
    

    id: user.id,
    name: user.name,
    email,
    admin: user.admin,
    Token: jwt.sign({ id: user.id, name: user.name}, authConfig.secret, {
        expiresIn: '5d',
    })
 
});

// Geracao do token

}}

  export default new SessionController();