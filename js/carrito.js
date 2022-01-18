class Carrito {
    constructor(productos) {
        this.productos = productos;
    }

    agregarAlCarrito(producto) {
        this.productos.push(producto);
        localStorage.setItem('Carrito', JSON.stringify(this.productos));
        let contadorCarrito = document.getElementById("contadorCarrito");
        contadorCarrito.innerHTML = this.productos.length;
    }

    totalCarrito() {
        let total = 0;
        for (const producto of this.productos) {
            total = total + producto.precio;
        }
        let bodyCarrito = document.getElementById("bodyCarrito")
        let contenedor = document.createElement("tr");
        contenedor.innerHTML = `
                                    <th scope="row"></th>
                                    <td colspan=3>Total:</td>
                                    <td>$${total}</td>
                                    `;
        bodyCarrito.appendChild(contenedor);
    }

    listarProductos() {
        let bodyCarrito = document.getElementById("bodyCarrito")
        bodyCarrito.innerHTML = "";
        for (const producto of this.productos) {
            let contenedor = document.createElement("tr");
            contenedor.innerHTML = `
                                    <th scope="row">${producto.idProducto}</th>
                                    <td>${producto.nombreProducto}</td>
                                    <td>${producto.categoria}</td>
                                    <td>$${producto.precio}</td>
                                    <td class="btnEliminarProducto"><button type="button" class="btn btn-danger btn-sm p-2">X</button></td>
                                    `;
            bodyCarrito.appendChild(contenedor);
        };
        this.totalCarrito()
    }
}