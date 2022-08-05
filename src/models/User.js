const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    imageProfile: {
        type: String,
        required: false,
    }
})

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

UserSchema.methods.matchPassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

UserSchema.methods.toJSON = function(){
    const {__v,_id,...data} = this.toObject();
    data.id = _id;
    return data;
}

module.exports = mongoose.model('User', UserSchema);