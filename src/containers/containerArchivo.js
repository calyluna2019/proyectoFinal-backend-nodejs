class ContainerArchivo {

    constructor(pathFile) {
        this.fs = require('fs').promises;
        this.pathFile = `src/databases/${pathFile}`;
    }
    async save(item){
        try {
            let id;
            const items = await this.getAll();
            if(items.length>0){
                const ultim = items.find((e) => {
                    return items[items.length - 1].id == e.id;
                })
                id = ultim.id + 1;
            } else {
                id = 1;
            }
            item.timestamp = Date.now();
            const prod = {...item, id}
            items.push(prod);
            this.fs.writeFile(this.pathFile, JSON.stringify(items));
            return prod;
            
        } catch (error) {
            return `Se produjo un error: ${error}`;
        }
    }
    async getAll() {
        try {
            const items = await this.fs.readFile(this.pathFile, 'utf-8');
            const itemsParse = JSON.parse(items);
            return itemsParse.map(item => item);
        } catch (error) {
            return `Se produjo un error: ${error}`;
        }
    }
    async deleteById(id) {
        try {
            const items = await this.getAll();
            const byId = items.findIndex((e)=>e.id === id);
            if(byId > -1){
                items.splice(byId,1)
                await this.fs.writeFile(this.pathFile, JSON.stringify(items));
            } else {
                throw new Error("Id incorrecto");
            }
        } catch (error) {
            return `Se produjo un error: ${error.message}`;
        }
        
    }
    async getById(id) {
        try {
            const items = await this.getAll();
            const byId = items.find((e)=>e.id === id);
            if(!byId) {
                throw new Error("Id incorrecto");
            } else {
                return byId;
            }
        } catch (error) {
            return error.message
        }
    }
    async updateById(id, item){
        try{
            const items = await this.getAll();
            const byId = items.findIndex(p => p.id === id);

            item.timestamp = Date.now();
            item.id = id;
            items[byId] = item;
            await this.fs.writeFile(this.pathFile,JSON.stringify(items));
        }
        catch(error){
            return `Se produjo un error: "${error}"`
        }
    }
}

module.exports = ContainerArchivo;