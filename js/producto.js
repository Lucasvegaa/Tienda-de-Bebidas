class Producto {
    constructor(idProducto, nombreProducto, marcaProducto, categoria, descripcionProducto, precio, img, cantidad) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.marcaProducto = marcaProducto;
        this.categoria = categoria;
        this.descripcionProducto = descripcionProducto;
        this.precio = precio;
        this.img = img;
        this.cantidad= cantidad || 1;
    }
    agregarCantidad(valor){
        this.cantidad += valor
    }
    subTotal(){
        return this.cantidad * this.precio;
    }
}