class Productos {
    constructor() {
        this.count =0
        this.productos = []
    }
   listar(){
    let respuesta = {}
       if (this.productos.length === 0 ){
        respuesta.error = "No hay productos cargados"
       }else{
           respuesta = this.productos
       }
       return respuesta
   }
   guardar (producto){
       this.count++
       producto.id = this.count
       this.productos.push(producto)
       return producto
   }
   listarPorId(id){
    let respuesta = {}
    if(this.productos.filter(a => a.id == id)){
        respuesta = this.productos.filter(a => a.id == parseInt(id));
    }else{
        respuesta.error = 'Producto no encontrado'
    }
    return respuesta
   }
   borrar (id){
    let respuesta = {}
    const produtoEliminado = this.productos.filter(a => a.id == id);
    if (produtoEliminado.length > 0){
        respuesta = produtoEliminado
        this.productos = this.productos.filter(a => a.id != id)
    }else{
        respuesta.error = 'Producto no encontrado para borrar'
    }
    return respuesta
    }
    actualizar(id, datosProducto){
        let respuesta = {}
        const index =this.productos.findIndex(a => a.id == id);
        let prodcutoSelec = this.productos.filter(a => a.id == id);
        if(prodcutoSelec.length > 0){
            prodcutoSelec[0].title = datosProducto.title
            prodcutoSelec[0].price = datosProducto.price
            prodcutoSelec[0].thumbnail = datosProducto.thumbnail
            respuesta = datosProducto
            this.productos.splice(index,1,prodcutoSelec[0])
        }else{
            respuesta.error = 'Producto no encontrado para actualizar'
        }
        return respuesta
       }
}

// exporto una instancia de la clase
module.exports = new Productos();