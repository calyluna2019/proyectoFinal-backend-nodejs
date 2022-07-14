const mongoose = require('mongoose');

class ContainerMongoDb {
    constructor(model){
        this.model = model;
    }
    async save(item) {
        try{
            item.timestamp = Date.now();
            const data = await this.model.create(item);
            return data;
        }
        catch(error){
            return `Se produjo un error:"${error}"`
        }
    }
    async getAll() {
        try{
            const all = await this.model.find({});
            return all;
        }
        catch(error){
            return `Se produjo un error:"${error}"`
        }
    }
    async deleteById(id) {
        try{
            const deleted = await this.model.findOneAndDelete({ _id: id });
            return id;
        }
        catch(error){
            return `Se produjo un error:"${error}"`
        }
    }
    async getById(id) {
        try{
            if (mongoose.Types.ObjectId.isValid(id)) {
                const item = await this.model.findById(id);
                return item;
            } else {
                throw new Error("Id incorrecto");
            }
        }
        catch(error){
            return `Error:"${error.message}"`
        }
    }
    async updateById(id,item) {
        try{
            const updated = await this.model.findOneAndUpdate({ _id: id },item);
            return updated;
        }
        catch(error){
            return `Se produjo un error:"${error}"`
        }
    }
}

module.exports = ContainerMongoDb;