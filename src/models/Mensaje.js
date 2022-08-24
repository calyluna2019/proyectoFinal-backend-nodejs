const mongoose = require('mongoose');

const MensajeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    cuerpo: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
})

MensajeSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}

module.exports = mongoose.model('Mensaje', MensajeSchema);