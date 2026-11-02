const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const protected = asyncHandler(async(req, res, next) =>{
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //obtenemos el token 
        token = req.headers.authorization.split(' ')[1]
        //verificar que este firmado
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //obtener los datos del usuario logeado menos el password
        req.user = await User.findById(decoded.id_usuario).select('-password')
        next()
    }else{
        res.status(401)
        throw new Error("Acceso no autorizado")
    }

    if(!token){
        res.status(401)
        throw new Error("no proporcionaste un token")
    }
})

module.exports = protected