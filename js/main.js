const baseDeDatos = [];
baseDeDatos.push(new Producto(1, "Pack 12 Cervezas Budweiser 710ml + Accesorios", "Budweiser", "Cerveza", "Lorem Ipsum is simply dummy text of the ", 3945, "pack12CervezasBudweiser710ml_Accesorios.png"))
baseDeDatos.push(new Producto(2, "Pack 24 Cervezas Corona 710ml", "Corona", "Cerveza", "Lorem Ipsum is simply dummy text of the ", 4300, "cervezaCorona.png"))
baseDeDatos.push(new Producto(3, "Pack 48 Cervezas Stella Artois Lager Lata 473ml", "Stella Artois", "Cerveza", "Lorem Ipsum is simply dummy text of the ", 4620, "pack48CervezasStellaArtoisLata473ml.png"))
baseDeDatos.push(new Producto(4, "Pack 6 Espumantes", "Varios", "Vino", "Lorem Ipsum is simply dummy text of the ", 2754, "pack6Espumantes.png"))
baseDeDatos.push(new Producto(5, "Pack 6 Vinos Premium", "Varios", "Vino", "Lorem Ipsum is simply dummy text of the ", 5442, "botellaLPQTP2020.png"))
baseDeDatos.push(new Producto(6, "Pack 24 Cervezas Patagonia 24.7 Lata 473ml", "Patagonia", "Cerveza", "Lorem Ipsum is simply dummy text of the ", 300, "cervezaPatagonia.png"))
baseDeDatos.push(new Producto(7, "Pack 12 Cervezas Brahma Lata 473ml + Conservadora", "Brahma", "Cerveza", "Lorem Ipsum is simply dummy text of the ", 3852, "PackConservadoraBrahma_12CervezasBrahmLata473ml.png"))


// { idProducto: 1, nombreProducto: "Pack 12 Cervezas Budweiser 710ml + Accesorios", marcaProducto: 'Budweiser', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 3945, img: "pack12CervezasBudweiser710ml_Accesorios.png" },
// { idProducto: 2, nombreProducto: "Pack 24 Cervezas Corona 710ml", marcaProducto: 'Corona', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 4300, img: "cervezaCorona.png" },
// { idProducto: 3, nombreProducto: "Pack 48 Cervezas Stella Artois Lager Lata 473ml", marcaProducto: 'Stella Artois', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 4620, img: "pack48CervezasStellaArtoisLata473ml.png" },
// { idProducto: 4, nombreProducto: "Pack 6 Espumantes", marcaProducto: 'Varios', categoria: 'Vino', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 2754, img: "pack6Espumantes.png" },
// { idProducto: 5, nombreProducto: "Pack 6 Vinos Premium", marcaProducto: 'Varios', categoria: 'Vino', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 5442, img: "botellaLPQTP2020.png" },
// { idProducto: 6, nombreProducto: "Pack 24 Cervezas Patagonia 24.7 Lata 473ml", marcaProducto: 'Patagonia', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 300, img: "cervezaPatagonia.png" },
// { idProducto: 7, nombreProducto: "Pack 12 Cervezas Brahma Lata 473ml + Conservadora", marcaProducto: 'Brahma', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 3852, img: "PackConservadoraBrahma_12CervezasBrahmLata473ml.png" },


const tienda = new Tienda('Brooklyn', 'Avellaneda 334', 4885548, baseDeDatos);
const carrito = new Carrito([]);
tienda.listarProductos(tienda.baseDeDatos);
verificarLocalStorage(carrito);

$(document).ready(function () {
    btnComprarOnClic(carrito);
    eventosBotones(carrito);
});


function btnComprarOnClic(carrito) {
    let botones = document.getElementsByClassName('btnComprar');
    for (const boton of botones) {
        boton.onclick = function () {
            let producto = tienda.buscarProductoPorId(boton.id);
            carrito.agregarAlCarrito(producto);
        }
    }
}

function selectFiltroOnChange(carrito) {
    let filtroProductos = document.getElementById('filtroCategorias')
    filtroProductos.addEventListener('change', function () {
        if (this.value != "Todos") {
            tienda.filtrarProductoPorCategoria(this.value, carrito);
        } else {
            tienda.listarProductos(tienda.baseDeDatos, carrito);
        }
    })
}

function verificarLocalStorage(carrito) {
    if ('Carrito' in localStorage) {
        const productosStorage = JSON.parse(localStorage.getItem("Carrito"));
        for (const producto of productosStorage) {
            const found = baseDeDatos.find(p => p.idProducto == producto.idProducto)
            found.modificarCantidad(producto.cantidad)
            carrito.productos.push(found);
        }
    } else {
        carrito.productos = [];
    }
    let contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.innerHTML = contadorCarritos();
}
function carritoOnClick(carrito) {
    let btnCarrito = document.getElementById('btnCarrito')
    btnCarrito.onclick = function () {
        carrito.listarProductos(carrito)
    }
}

function VaciarCarritoOnClick(carrito) {
    let btnVaciar = document.getElementById('btnVaciarCarrito')
    btnVaciar.onclick = function () {
        localStorage.clear();
        for (const producto of carrito.productos) {
            producto.vaciarCantidad()
        }
        carrito.productos = [];
        let contadorCarrito = document.getElementById("contadorCarrito");
        contadorCarrito.innerHTML = 0;
        carrito.listarProductos();

    }
}

function eventosBotones(carrito) {
    selectFiltroOnChange(carrito);
    carritoOnClick(carrito);
    VaciarCarritoOnClick(carrito);
}

$("#btnFinalizar").click(enviarEmail);

function enviarEmail(e) {
    e.preventDefault();
    $.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(carrito.productos), function (respuesta, estado) {
        if (estado == "success") {
            $("#alertCompra").fadeIn(2000).fadeOut(2000);
            localStorage.clear();
            for (const producto of carrito.productos) {
                producto.vaciarCantidad()
            }
            carrito.productos = [];
            let contadorCarrito = document.getElementById("contadorCarrito");
            contadorCarrito.innerHTML = 0;
            carrito.listarProductos();
        }
    });
}