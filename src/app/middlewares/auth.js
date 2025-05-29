
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'


function authmiddleware(req, res, next) {

    const authtoken = req.headers.authorization 

    if (!authtoken) {

        return res.status(401).json({ error: 'Token not provided' })
    } 
       
    

    const token = authtoken.split(' ').at(1)

    

    try {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
        
        if (err) {
           throw new Error()
        }

        req.userId = decoded.id;
        req.userName = decoded.name;
 
    })

    
}catch {
    return res.status(401).json({ error: 'Token invalid' })
}

return next()

}

export default authmiddleware;