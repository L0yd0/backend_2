const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const User = require('../models/usersModel')

const register = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error("faltan datos")
    }
    //verificar que exista el usuario
    const Userexist = await User.findOne({email})
    if(Userexist){
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }
    //hashear el password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //creas el user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    }
})

const login = asyncHandler(async(req,res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email:user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(401)
        throw new Error('Credenciales incorrectas')
    }
})

const data = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)
})

//generamos el token
const generateToken = (id_usuario) =>{
    return jwt.sign({id_usuario}, process.env.JWT_SECRET,{
        expiresIn: '15d'
    })
}
module.exports = {
    login, register, data
}