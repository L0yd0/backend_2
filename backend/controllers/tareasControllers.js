const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModel')

const getTareas = asyncHandler(async(req,res)=>{
    const tareas = await Tarea.find({user:req.user.id_usuario})
    res.status(200).json(tareas)
})

const createTareas = asyncHandler(async(req,res)=>{
    if(!req.body.descripcion){
        res.status(400)
        throw new Error("por favor teclea una descripcion")
    }

    const tarea = await Tarea.create({
        descripcion: req.body.descripcion,
        user: req.user.id
    })

    res.status(201).json({tarea})
})

const updateTareas = asyncHandler(async(req,res)=>{
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(404)
        throw new Error('la tarea no existe')
    } else{
        //verificar que la tarea exista y que pertenezca al usuario del token
        if(tarea.user.toString()!== req.user.id){
            res.status(401)
            throw new Error('La tarea no es de este usuario')
        }else{
            const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
            res.status(200).json(tareaUpdated)
        }
    }
})

const deleteTareas = asyncHandler(async(req,res)=>{
    if(!tarea){
        res.status(404)
        throw new Error('la tarea no existe')
    }else{
        await tarea.deleteOne()
        res.status(200).json({id: req.params.id})
    }
})

module.exports = {getTareas, createTareas, updateTareas, deleteTareas}