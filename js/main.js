

const baseDeDatos = [
    { idProducto: 1, nombreProducto: "Pack 12 Cervezas Budweiser 710ml + Accesorios", marcaProducto: 'Budweiser', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 3945, img: "pack12CervezasBudweiser710ml_Accesorios.png" },
    { idProducto: 2, nombreProducto: "Pack 24 Cervezas Corona 710ml", marcaProducto: 'Corona', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 4300, img: "cervezaCorona.png" },
    { idProducto: 3, nombreProducto: "Pack 48 Cervezas Stella Artois Lager Lata 473ml", marcaProducto: 'Stella Artois', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 4620, img: "pack48CervezasStellaArtoisLata473ml.png" },
    { idProducto: 4, nombreProducto: "Pack 6 Espumantes", marcaProducto: 'Varios', categoria: 'Vino', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 2754, img: "pack6Espumantes.png" },
    { idProducto: 5, nombreProducto: "Pack 6 Vinos Premium", marcaProducto: 'Varios', categoria: 'Vino', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 5442, img: "botellaLPQTP2020.png" },
    { idProducto: 6, nombreProducto: "Pack 24 Cervezas Patagonia 24.7 Lata 473ml", marcaProducto: 'Patagonia', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 300, img: "cervezaPatagonia.png" },
    { idProducto: 7, nombreProducto: "Pack 12 Cervezas Brahma Lata 473ml + Conservadora", marcaProducto: 'Brahma', categoria: 'Cerveza', descripcionProducto: 'Lorem Ipsum is simply dummy text of the ', precio: 3852, img: "PackConservadoraBrahma_12CervezasBrahmLata473ml.png" },
];

const tienda = new Tienda('Brooklyn', 'Avellaneda 334', 4885548, baseDeDatos);
const carrito = new Carrito([]);
tienda.listarProductos(tienda.baseDeDatos);
verificarLocalStorage(carrito);

$(document).ready(function() {
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
            carrito.productos.push(producto);
        }
    } else {
        carrito.productos = [];
    }
    let contadorCarrito = document.getElementById("contadorCarrito");
    contadorCarrito.innerHTML = carrito.productos.length;
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