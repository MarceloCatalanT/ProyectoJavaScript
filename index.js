let producto1 = 9990;
let producto2 = 6800;
let producto3 = 5700;

alert("PROMOCION ASADO FAMILIAR!!! Elige la cantidad de los productos que tenemos disponibles para la promocion y sorprendete con el TOTAL!!");

let cantidadProducto1 = 0;
let cantidadProducto2 = 0;
let cantidadProducto3 = 0;


while (cantidadProducto1 < 1 || cantidadProducto1 > 5) {

  cantidadProducto1 = parseInt(prompt("Cuantos kg de Lomo Vetado desea comprar (máximo 5 kg):"));
  if (cantidadProducto1 < 1 || cantidadProducto1 > 5) {
    alert("Ingrese una cantidad válida para el producto 1");
  }
}

while (cantidadProducto2 < 1 || cantidadProducto2 > 3) {

  cantidadProducto2 = parseInt(prompt("Cuantos paquetes de 8 chorizos desea comprar (maximo 3)"));
  if (cantidadProducto2 < 1 || cantidadProducto2 > 3) {
    alert("Ingrese una cantidad válida para el producto 2");
  }
}

while (cantidadProducto3 < 1 || cantidadProducto3 > 4) {
    
  cantidadProducto3 = parseInt(prompt("Cuantos kg de Pulpa Cerdo Marinada desea comprar (máximo 4 kg):"));
  if (cantidadProducto3 < 1 || cantidadProducto3 > 4) {
    alert("Ingrese una cantidad válida para el producto 3");
  }
}

let costoTotal = 0;

function sumaTotalProductos() {
  let costoTotal1 = cantidadProducto1 * producto1;
  let costoTotal2 = cantidadProducto2 * producto2;
  let costoTotal3 = cantidadProducto3 * producto3;

  let valorTotal = costoTotal1 + costoTotal2 + costoTotal3;
  return valorTotal;
}

costoTotal = sumaTotalProductos();
alert("El costo total de la compra es: $" + costoTotal);
