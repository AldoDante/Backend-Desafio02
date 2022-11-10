class Container {

    constructor(nombre) {
        this.fs = require('fs')
        this.nombre = nombre;
        this.productos = []
    }

    getNextId() {
        return this.productos.length + 1
    }

    async guardar(prod) {
        this.productos = await this.leer()

        prod.id = this.getNextId()
        this.productos.push(prod)

        try {
            await this.fs.promises.writeFile(this.nombre, JSON.stringify(this.productos,null,'\t'))
            console.log('Producto guardado')
        }
        catch(error) {
            console.log(`Error en guardar: ${error}`)            
        }
    }

    async leer() {
        try {
            let prods = await this.fs.promises.readFile(this.nombre, 'utf-8')
            return JSON.parse(prods)
        }
        catch(error) {
            return []
        }
    }

    async borrar() {
        try {
            await this.fs.promises.unlink(this.nombre)
            console.log('Productos borrados')
        }
        catch(error) {
            console.log(`Error en borrar: ${error}`)            
        }
    }
}

module.exports = Container

