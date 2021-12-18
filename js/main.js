class Producto {
    constructor(idProducto, nombreProducto, marcaProducto, categoria, descripcionProducto, precio, img) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.marcaProducto = marcaProducto;
        this.categoria = categoria;
        this.descripcionProducto = descripcionProducto;
        this.precio = precio
        this.img = img;
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
    filtrarProductoPorCategoria(valorgit) {
        const encontrado = this.baseDeDatos.filter(producto => producto.categoria == valor);
        let espacioProductos = document.getElementsByClassName("contenedorProductos")
        for (const producto of encontrado) {
            let contenedor = document.createElement("div");
            contenedor.className = "col bg-dark text-white m-3 text-sm-center p-1";
            contenedor.innerHTML = `
                                    <img class="img-fluid" src="../img/${producto.img}" alt="bebida">
                                    <p> ${producto.nombreProducto}</p>
                                    <h4> $${producto.precio} </h4>
                                    <button id="${producto.idProducto}" type="button" class="btn btn-primary btnComprar">Comprar</button>                                
                                `;
            espacioProductos[0].appendChild(contenedor);
        }
        console.log("Hola");
    };

    buscarProductoPorId(valorId) {
        const encontrado = this.baseDeDatos.find(producto => producto.idProducto == valorId);
        console.log(encontrado);
        return encontrado;
    };

    listarProductos(espacioProductos) {
        for (const producto of this.baseDeDatos) {
            let contenedor = document.createElement("div");
            contenedor.className = "col bg-dark text-white m-3 text-sm-center p-1";
            contenedor.innerHTML = `
                                    <img class="img-fluid" src="../img/${producto.img}" alt="bebida">
                                    <p> ${producto.nombreProducto}</p>
                                    <h4> $${producto.precio} </h4>
                                    <button id="${producto.idProducto}" type="button" class="btn btn-primary btnComprar">Comprar</button>                                
                                `;
            espacioProductos[0].appendChild(contenedor);
        }
    }
}

const baseDeDatos = [
    { idProducto: 1, nombreProducto:"Pack 12 Cervezas Budweiser 710ml + Accesorios",marcaProducto: 'Budweiser', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 750, img:"pack12CervezasBudweiser710ml_Accesorios.png" },
    { idProducto: 2, nombreProducto:"Pack 24 Cervezas Corona 710ml",marcaProducto: 'Corona', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 750, img:"cervezaCorona.png" },    
];

const tienda = new Tienda('Brooklyn', 'Avellaneda 334', 4885548, baseDeDatos);

function programa() {
    const carrito = new Carrito([]);
    let espacioProductos = document.getElementsByClassName("contenedorProductos")
    tienda.listarProductos(espacioProductos);
    btnComprarOnClic();
    selectFiltroOnChange();
}

function btnComprarOnClic() {
    let botones = document.getElementsByClassName('btnComprar');
    for (const boton of botones) {
        boton.addEventListener('click', function(){
            tienda.buscarProductoPorId(this.id)
        } )
        boton.addEventListener('click', function(){
            //agregar al LocalStorage
            
        })
    }
    
}

function selectFiltroOnChange() {
    let filtroProductos = document.getElementById('filtroCategorias')
    filtroProductos.addEventListener('change', function(){
        tienda.filtrarProductoPorCategoria("Cerveza");
    })
}
