const mongoose = require('mongoose')

const TareaSchema = mongoose.Schema({
    descripcion: {
        type: String,
        required:[true, 'por favor teclea una descripcion']
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'User'
    }
},{
    timestamps: true 
})

module.exports = mongoose.model('Tarea', TareaSchema)