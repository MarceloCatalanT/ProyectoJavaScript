const carrito = [];
let historialCompras = [];

// Array de productos
const productos = [
  { nombre: "Lomo Vetado", precio: 11990, imagen: "imagenes/lomovetado.jpg", categoria: "Vacuno" },
  { nombre: "Chuleta Parrillera", precio: 6500, imagen: "imagenes/chuleta.jpg", categoria: "Cerdo" },
  { nombre: "Entrañas", precio: 9730, imagen: "imagenes/entraña.jpg", categoria: "Vacuno" },
  { nombre: "Prietas", precio: 4600, imagen: "imagenes/prieta.jpg", categoria: "Embutidos" },
  { nombre: "Chorizo Parrillero", precio: 5990, imagen: "imagenes/chorizo.jpg", categoria: "Embutidos" },
  { nombre: "Butifarras", precio: 3600, imagen: "imagenes/butifarra.jpg", categoria: "Embutidos" },
  { nombre: "Lomo Liso", precio: 9390, imagen: "imagenes/lomoliso.jpg", categoria: "Vacuno" },
  { nombre: "Asado Carnicero", precio: 7000, imagen: "imagenes/carnicero.jpg", categoria: "Vacuno" },
  { nombre: "Cerdo Marinado", precio: 6990, imagen: "imagenes/cerdomarinado.jpg", categoria: "Cerdo" },
  { nombre: "Abastero", precio: 5450, imagen: "imagenes/abastero.jpg", categoria: "Vacuno" },
];

// Recuperar historial de compras del almacenamiento local
const storedHistorial = localStorage.getItem('historialCompras');
if (storedHistorial) {
  historialCompras = JSON.parse(storedHistorial);
}

// Se crea las tarjetas con los productos del array
const productosContainer = document.getElementById('productosContainer');
productos.forEach(producto => {
  const card = document.createElement('div');
  card.className = 'col-lg-4';
  card.innerHTML = `
                <div class="card m-1">
                    <img src="${producto.imagen}" class="card-img-top " alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <button href="#" class="btn btn-primary agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
                    </div>
                </div>
            `;
  productosContainer.appendChild(card);
});

// Se agrega evento click para cada boton de la tarjeta de productos
const btnAgregarCarrito = document.querySelectorAll('.agregar-carrito');
btnAgregarCarrito.forEach(boton => {
  boton.addEventListener('click', () => {
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseFloat(boton.getAttribute('data-precio'));
    agregarAlCarrito(nombre, precio);
  });
});

// Se agrega evento click al boton comprar que esta en el carrito de compras
const comprarBtn = document.getElementById('comprarBtn');
comprarBtn.addEventListener('click', () => {
  realizarCompra();
});

// Se agrega el evento clik al boton borrar historial
const borrarHistorialBtn = document.getElementById('borrarHistorialBtn');
borrarHistorialBtn.addEventListener('click', () => {
  borrarHistorial();
});

// Funcion que agrega un producto al carrito
function agregarAlCarrito(productoNombre, productoPrecio) {
  carrito.push({ nombre: productoNombre, precio: productoPrecio });
  actualizarCarrito();
}

// Funcion que actualiza el carrito y borra los productos ya comprados
function actualizarCarrito() {
  const carritoElement = document.getElementById('carrito');
  carritoElement.innerHTML = '';

  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
    carritoElement.appendChild(li);
  });
}

// Funcion que realiza una compra de todo el carrito agregando los productos al historial de compras
function realizarCompra() {
  if (carrito.length > 0) {
    historialCompras.push([...carrito]);
    carrito.length = 0;
    actualizarCarrito();
    actualizarHistorial();
    guardarHistorialLS();
  }
}

// Funcion que llama al historial para mostrarlo en la pagina
function actualizarHistorial() {
  const historialElement = document.getElementById('historial');
  historialElement.innerHTML = '';

  historialCompras.forEach((compra, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `Compra #${index + 1}: ${compra.map(producto => producto.nombre).join(', ')} - Total: $${calcularTotalCompra(compra).toFixed(2)}`;
    historialElement.appendChild(li);
  });
}

// Funcion que calcula el total de la compra
function calcularTotalCompra(compra) {
  return compra.reduce((total, producto) => total + producto.precio, 0);
}

// Funcion que guarda el historial en el almacenamiento local
function guardarHistorialLS() {
  localStorage.setItem('historialCompras', JSON.stringify(historialCompras));
}

// Funcion que borra todo el historial de compra y del local storage
function borrarHistorial() {
  historialCompras = [];
  actualizarHistorial();
  guardarHistorialLS();
}

// Se agrega un evento change a un selector
const filtroCategoria = document.getElementById('filtroCategoria');
filtroCategoria.addEventListener('change', () => {
  const categoriaSeleccionada = filtroCategoria.value;
  filtrarProductosPorCategoria(categoriaSeleccionada);
});

// Funcion que filtra los productos por su propiedad categoria
function filtrarProductosPorCategoria(categoria) {
  const productosFiltrados = categoria === 'todos' ? productos : productos.filter(producto => producto.categoria === categoria);

  productosContainer.innerHTML = '';

  // Se vuelve a crear las tarjetas pero solo con los productos filtrados
  productosFiltrados.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'col-lg-4';
    card.innerHTML = `
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <a href="#" class="btn btn-primary agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</a>
                    </div>
                </div>
            `;
    productosContainer.appendChild(card);
  });
}
// LLamamos la funcion para mostrar el historial en la pagina
actualizarHistorial();