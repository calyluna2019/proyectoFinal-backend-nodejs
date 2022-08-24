const mongoose = require('mongoose');

const OrdenSchema = new mongoose.Schema({
    numero_orden: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    productos: {
        type: Array,
        default: []
    },
    total : {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        default: "generada"
    },
    timestamp: {
        type: Number,
        required: false,
    }
})

OrdenSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}

module.exports = mongoose.model('Order', OrdenSchema);