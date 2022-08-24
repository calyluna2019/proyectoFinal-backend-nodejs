const mongoose = require('mongoose');
const Producto = require('./Producto');

const CarritoSchema = new mongoose.Schema({
    productos: {
        type: Array,
        default: []
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    timestamp:{
        type: Number,
        required: false,
    }
});

CarritoSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
  }
module.exports = mongoose.model('Carrito',CarritoSchema);