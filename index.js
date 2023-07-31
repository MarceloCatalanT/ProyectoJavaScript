const productos = [
  { nombre: 'Lomo Vetado', precio: 9900 },
  { nombre: 'Cerdo Marinado', precio: 7000 },
  { nombre: 'Chuleta Parrillera Cerdo', precio: 4500 },
  { nombre: 'Chunchules', precio: 3000 },
  { nombre: 'Entraña', precio: 8990 },
  { nombre: 'Truto Pollo Grande', precio: 3250 },
];

// Esta funcion muestra el menu de opciones disponibles
function obtenerOpcionMenu() {
  return parseInt(prompt(
    "---- CARNICERIA METROPOLITANA SANTIAGO ----\n"
    + "1 - Ver todos los productos\n"
    + "2 - Comprar productos\n"
    + "3 - Filtrar por precio\n"
    + "4 - Salir"
  ));
}

// Esta funcion muestra los productos disponibles en catalogo
function catalogoProductos() {
  let mensajeProductos = "---- CATALOGO DE PRODUCTOS ----\n";
  productos.forEach((producto, index) => {
    mensajeProductos += `${index + 1}. ${producto.nombre} - $${producto.precio} x kg\n`;
  });
  alert(mensajeProductos);
}

// Esta funcion permite comprar productos por kilo y al final suma el total de la compra
function comprarProductos() {
  let total = 0;

  function comprarProducto(index) {
    if (index >= productos.length) {
      alert(`Total a pagar: $${total}\nGracias por su compra`);
      return;
    }

    const producto = productos[index];
    const cantidad = prompt(`¿Cuántos kg de ${producto.nombre} desea llevar? (Si quiere llevar este producto coloque 0)`);

    // Aca se calcula el total de la compra
    total += parseInt(cantidad) * producto.precio;

    comprarProducto(index + 1);
  }

  comprarProducto(0);
}

// Esta funcion ocupa el metodo de busqueda filter que permite filtrar una array por medio de una condicion que en este caso es mediante el precio de estos productos.
// Y para buscar los productos en la array ocupamos un forEach para iterar cada objeto.
function filtrarProductoPrecio() {
  const precioLimite = parseFloat(prompt('Ingrese el precio máximo para filtrar:'));

  let mensajeProductosFiltrados = "PRODUCTOS ENCONTRADOS\n";
  const productosFiltrados = productos.filter(producto => producto.precio <= precioLimite);

  if (productosFiltrados.length > 0) {
    productosFiltrados.forEach((producto, index) => {
      mensajeProductosFiltrados += `${index + 1}. ${producto.nombre} - Precio: $${producto.precio}\n`;
    });
    alert(mensajeProductosFiltrados);
  } else {
    alert("No se encontraron productos por debajo del precio estimado");
  }
}
// Esta funcion muestra las opciones disponibles y es la funcion principal que contiene las demas funciones y opciones.
function carniceria() {
  let opcion;
  do {
    opcion = obtenerOpcionMenu();

    switch (opcion) {
      case 1:
        catalogoProductos();
        break;
      case 2:
        comprarProductos();
        break;
      case 3:
        filtrarProductoPrecio();
        break;
      case 4:
        alert("Gracias por visitarnos!");
        break;
      default:
        alert("Opcion invalida, ingrese una de las que muestra el menu.");
        break;
    }
  } while (opcion !== 4);
}

// Aca llamamos a la funcion principal para arrancar el programa
carniceria();