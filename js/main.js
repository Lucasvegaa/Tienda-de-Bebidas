class Producto {
    constructor(idProducto, marcaProducto, categoria, descripcionProducto, precio) {
        this.idProducto = idProducto;
        this.marcaProducto = marcaProducto;
        this.categoria = categoria;
        this.descripcionProducto = descripcionProducto;
        this.precio = precio
    }
}

class Carrito {
    constructor(productos) {
        this.productos = productos;
    }

    agregarAlCarrito(carrito) {
        let valorID = 0;
        let total = 0;
        let articulos = 0;
        carrito.productos = [];

        do {

            valorID = parseInt(prompt("Ingrese el ID del producto que desea agregar: \n(lista de productos en consola) \n **Para salir ingrese 0 **\nCantidad Productos: " + articulos + " \nTOTAL: " + total));
            if (valorID != 0) {
                let producto = tienda.buscarProductoPorId(valorID);
                if (producto != undefined) {
                    this.productos.push(producto);
                    total = carrito.TotalCarrito(this.productos);
                    articulos++;
                }
                else {
                    alert("ID no es valido")
                }
            }


        } while (valorID != 0);
        console.clear();
        console.log("Su pedido es: ");
        carrito.listarProductos(this.productos);
        console.log("Usted cargo: " + articulos + " productos y el total va a pagar es de : $" + total);
    }

    TotalCarrito(productos) {
        let total = 0;

        for (const producto of productos) {
            total = total + producto.precio;
        }
        return total;
    }


    listarProductos(productos) {
        for (const producto of productos) {
            console.log("ID: %d - Marca: %s - Categoria: %s - Precio: %f", producto.idProducto, producto.marcaProducto, producto.categoria, producto.precio);
        };
    }

}
class Tienda {
    constructor(nombre, direccion, telefono, baseDeDatos) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.baseDeDatos = baseDeDatos;
    }
    filtrarProductoPorCategoria(valor) {
        const encontrado = this.baseDeDatos.filter(producto => producto.categoria == valor);
        if (encontrado != []) {
            console.log("Elementos de la categoria %s:\n ", valor)
            this.listarProductos(encontrado)
        } else {
            console.log("No se encontraron productos de la categoria %s .", valor)
        }
    };

    buscarProductoPorId(valorId) {
        const encontrado = this.baseDeDatos.find(producto => producto.idProducto == valorId);
        return encontrado;
    };

    listarProductos(productos) {
        for (const producto of productos) {
            console.log("ID: %d - Marca: %s - Categoria: %s - Precio: %f", producto.idProducto, producto.marcaProducto, producto.categoria, producto.precio);
        };
    }
}

const baseDeDatos = [
    { idProducto: 1, marcaProducto: 'Quilmes', categoria: 'Cerveza', descripcionProducto: 'lorem', precio: 100 },
    { idProducto: 2, marcaProducto: 'Ruttini', categoria: 'Vino', descripcionProducto: '1500s, when an unknown printer took a galley of type and scrambled it to ma', precio: 5000 },
    { idProducto: 3, marcaProducto: 'Jack Daniels', categoria: 'Whiskey', descripcionProducto: '1500s, when an unknown printer took a galley of type and scrambled it to ma', precio: 4500 },
    { idProducto: 4, marcaProducto: 'Heineken', categoria: 'Cerveza', descripcionProducto: ' like readable English. Many deskto', precio: 150 },
    { idProducto: 5, marcaProducto: 'Budweiser', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 140 },
    { idProducto: 6, marcaProducto: 'Los Primos', categoria: 'Vino', descripcionProducto: ' specimen book. It has', precio: 500 },
    { idProducto: 7, marcaProducto: 'Branca', categoria: 'Fernet', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 750 },
];

const tienda = new Tienda('Brooklyn', 'Avellaneda 334', 4885548, baseDeDatos);

function programa() {
    const carrito = new Carrito([]);
    alert("Bienvenido al Simulador de Carrito de compras.");

    let valor = 0;
    while (valor != 4) {
        valor = parseInt(prompt("MENU: \n 1- Cargar productos al carrito \n 2- Buscar por Categoria \n 3- Buscar por ID de producto \n 4- Salir "));
        switch (valor) {
            case 1:
                console.clear();
                tienda.listarProductos(tienda.baseDeDatos);
                carrito.agregarAlCarrito(carrito);
                break;

            case 2:
                console.clear();
                tienda.listarProductos(tienda.baseDeDatos);
                let categoria = prompt("Que Categoria de productos quiere buscar?:");
                console.clear();
                tienda.filtrarProductoPorCategoria(categoria);
                // if (filtrado != []) {
                //     for (const producto of filtrado) {
                //         console.log("ID: %d - Marca: %s - Categoria: %s - Precio: %f", producto.idProducto, producto.marcaProducto, producto.categoria, producto.precio);
                //     }
                // } else {
                //     console.log("No se encontro productos de la categoria %s.", categoria)
                // }
                break;

            case 3:
                let valorID = parseInt(prompt("Ingrese ID del producto?"));
                let encontrado = tienda.buscarProductoPorId(valorID)
                if (encontrado != undefined) {
                    console.log("El producto es: \n ID: %d - Marca: %s - Categoria: %s - Precio: %f - Descripcion: %s\n", encontrado.idProducto, encontrado.marcaProducto, encontrado.categoria, encontrado.precio, encontrado.descripcionProducto)
                } else {
                    console.log("No se encontro producto con el ID %d.", valorID)
                }
                break;

            case 4:

                break;

            default:

                break;
        }
    }
}