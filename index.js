const carrito = [];
let historialCompras = [];

// Se realiza el llamado al JSON de los productos
fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    // Guarda los productos en la variable 'productos'
    const productos = data;

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


    // Recuperar historial de compras del almacenamiento local
    const storedHistorial = localStorage.getItem('historialCompras');
    if (storedHistorial) {
      historialCompras = JSON.parse(storedHistorial);
    }

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


    // Funcion que agrega un producto al carrito
    function agregarAlCarrito(productoNombre, productoPrecio) {
      carrito.push({ nombre: productoNombre, precio: productoPrecio });

      // LIBRERIA Toastify JS
      Toastify({
        text: "Agregado al Carrito!",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 3000
      }).showToast();

      actualizarCarrito();
    }

    // Funcion que actualiza el carrito y borra los productos ya comprados
    function actualizarCarrito() {
      const carritoElement = document.getElementById('carrito');
      carritoElement.innerHTML = '';

      carrito.forEach(producto => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${producto.nombre} - ${producto.precio.toFixed(2)}`;

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-danger eliminar-producto m-3';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
          eliminarProducto(producto.nombre);
        });

        li.appendChild(btnEliminar);
        carritoElement.appendChild(li);
      });
    }

    // Funcion que elimina un producto del carrito
    function eliminarProducto(nombre) {
      const indice = carrito.findIndex(producto => producto.nombre === nombre);
      if (indice !== -1) {
        carrito.splice(indice, 1);
        actualizarCarrito();
      }
    }

    // Funcion que realiza una compra de todo el carrito agregando los productos al historial de compras
    function realizarCompra() {
      if (carrito.length > 0) {
        historialCompras.push([...carrito]);
        carrito.length = 0;
      }
      // LIBRERIA SweetAlert
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Compra realizada con éxito!',
        showConfirmButton: false,
        timer: 1500
      });

      actualizarCarrito();
      guardarHistorialLS();
    }

    // Función que calcula el total de una compra
    function calcularTotalCompra(compra) {
      return compra.reduce((total, producto) => total + producto.precio, 0);
    }

    // Funcion que guarda el historial en el almacenamiento local
    function guardarHistorialLS() {
      localStorage.setItem('historialCompras', JSON.stringify(historialCompras));
    }

    // Comenzamos a trabajar con el boton Mostrar Carrito
    const mostrarCarritoBtn = document.getElementById('mostrarCarritoBtn');

    mostrarCarritoBtn.addEventListener('click', () => {
      // Se obtiene una referencia al offcanvas del carrito utilizando su id
      const carritoOffcanvas = new bootstrap.Offcanvas(document.getElementById('carritoOffcanvas'));

      carritoOffcanvas.show();
    });

    // Comenzamos a trabajar con el filtro por categoria
    const filtroCategoria = document.getElementById('filtroCategoria');

    filtroCategoria.addEventListener('change', () => {
      const categoriaSeleccionada = filtroCategoria.value;

      // Filtrar los productos según la categoría seleccionada
      const productosFiltrados = categoriaSeleccionada === 'todos' ? productos : productos.filter(producto => producto.categoria === categoriaSeleccionada);

      // Limpiar el contenedor de productos
      productosContainer.innerHTML = '';

      // Crear las tarjetas nuevamente pero ahora mostrando solo las filtradas segun la categoria
      productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'col-lg-4';
        card.innerHTML = `
      <div class="card m-1">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>
          <button href="#" class="btn btn-primary agregar-carrito" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Agregar al carrito</button>
        </div>
      </div>
    `;
        productosContainer.appendChild(card);
      });

      // Se vuelve agregar el evento click a las nuevas tarjetas filtradas
      const btnAgregarCarrito = document.querySelectorAll('.agregar-carrito');
      btnAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', () => {
          const nombre = boton.getAttribute('data-nombre');
          const precio = parseFloat(boton.getAttribute('data-precio'));
          agregarAlCarrito(nombre, precio);
        });
      });
    });

    // Comenzamos a trabajar con el boton Mostrar Historial
    const mostrarHistorialBtn = document.getElementById('mostrarHistorialBtn');

    // Selector del elemento que mostrará el historial de compras
    const historialOffcanvas = new bootstrap.Offcanvas(document.getElementById('historialOffcanvas'));

    // Se llama el id del contenido que tendra el Offcanvas
    const historialComprasBody = document.getElementById('historialComprasBody');

    // Agrega un evento click al botón para mostrar el offcanvas
    mostrarHistorialBtn.addEventListener('click', () => {

      // Obtenemos el historial de compras desde el local sto
      const storedHistorial = localStorage.getItem('historialCompras');
      if (storedHistorial) {
        const historial = JSON.parse(storedHistorial);

        historialComprasBody.innerHTML = '';

        // Creamos las etiquetas html que contendran la informacion del local storaged y esto se mostrara en el Offcanvas
        historial.forEach((compra, index) => {
          const compraElement = document.createElement('div');
          compraElement.innerHTML = `
        <div class="mb-3">
          <h5>Compra ${index + 1}</h5>
          <ul>
            ${compra.map(producto => `<li>${producto.nombre} - $${producto.precio.toFixed(2)}</li>`).join('')}
          </ul>
          <p>Total: $${calcularTotalCompra(compra).toFixed(2)}</p>
        </div>
      `;
          historialComprasBody.appendChild(compraElement);
        });
      }

      historialOffcanvas.show();
    });




  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });
