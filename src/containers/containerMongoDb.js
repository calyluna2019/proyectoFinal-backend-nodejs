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
            return `Se produjo un error: ${error}`
        }
    }
    async getAll(param = {}) {
        try{
            const all = await this.model.find(param);
            return all;
        }
        catch(error){
            return `Se produjo un error: ${error}`
        }
    }
    async deleteById(id) {
        try{
            const deleted = await this.model.findOneAndDelete({ _id: id });
            return id;
        }
        catch(error){
            return `Se produjo un error: ${error}`
        }
    }
    async getById(id) {
        try{
            const item = await this.model.findById(id);
            if(!item) {
                throw new Error;
            }
            return item;
        }
        catch(error){
            return `Se produjo un error: Id incorrecto`
        }
    }
    async updateById(id,item) {
        try{
            const updated = await this.model.findOneAndUpdate({ _id: id },item);
            return updated;
        }
        catch(error){
            return `Se produjo un error: ${error}`
        }
    }
    async searchBy(item) {
        try{
            return await this.model.findOne(item);
        }
        catch(error){
            return `Se produjo un error: ${error}`;
        }
    }
}

module.exports = ContainerMongoDb;