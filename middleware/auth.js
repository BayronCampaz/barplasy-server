const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('x-auth-token');

    console.log(token)
    if(!token){
        return res.status(401).json({message: "No hay token permiso no valido" })     
    }
    try {
        const encrypted = jwt.verify(token, process.env.SECRET);
        req.user = encrypted.user
        next()
    }catch (error) {
        res.status(401).json({message: 'Token no válido'});
    }

}