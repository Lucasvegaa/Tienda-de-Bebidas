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

