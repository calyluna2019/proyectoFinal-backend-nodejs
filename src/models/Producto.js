const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

ProductoSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}

module.exports = mongoose.model('Producto', ProductoSchema);