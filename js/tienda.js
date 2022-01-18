class Tienda {
    constructor(nombre, direccion, telefono, baseDeDatos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.baseDeDatos = baseDeDatos;
    }
    filtrarProductoPorCategoria(valor, carrito) {
        let espacioProductos = document.getElementsByClassName("contenedorProductos")
        espacioProductos[0].innerHTML = "";
        const encontrado = this.baseDeDatos.filter(producto => producto.categoria == valor);
        this.listarProductos(encontrado, carrito);
    };

    buscarProductoPorId(valorId) {
        const encontrado = this.baseDeDatos.find(producto => producto.idProducto == valorId);
        return encontrado;
    };

    listarProductos(baseDeDatos, carrito) {
        let espacioProductos = document.getElementsByClassName("contenedorProductos")
        espacioProductos[0].innerHTML = "";
        for (const producto of baseDeDatos) {
            let contenedor = document.createElement("div");
            contenedor.className = "col bg-dark text-white m-3 text-sm-center p-1";
            contenedor.innerHTML = `
                                    <img class="img-fluid" src="../img/${producto.img}" alt="bebida">
                                    <p> ${producto.nombreProducto}</p>
                                    <h4> $${producto.precio} </h4>
                                    <button id="${producto.idProducto}" type="button" class="btn btn-primary btnComprar">Comprar</button>                                
                                `;
            espacioProductos[0].appendChild(contenedor);
            btnComprarOnClic(carrito);
        }
    }
}