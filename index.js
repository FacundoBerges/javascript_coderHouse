// Tarea clase 1 y 2

let nombre;
let apellido;
let ingresosBrutos;
let categoria;

//Ingreso del usuario
nombre = prompt("Ingrese nombre: ");
apellido = prompt("Ingrese apellido: ");
ingresosBrutos = parseFloat(prompt("Ingrese facturacion mensual bruta: "));

//Verifico que la facturacion sea un numero mayor a 0
while (isNaN(ingresosBrutos) || ingresosBrutos < 0) {
  ingresosBrutos = parseFloat(
    prompt("Error. Ingrese facturacion mensual (con numeros mayores a 0): ")
  );
}

console.log(nombre);
console.log(apellido);
console.log(ingresosBrutos);

if (ingresosBrutos > 3700000) {
  categoria = "responsable inscripto";
} else {
  categoria = "monotributista categoria ";
  if (ingresosBrutos > 3335000) {
    categoria = categoria + "K";
  } else if (ingresosBrutos > 2910000) {
    categoria = categoria + "J";
  } else if (ingresosBrutos > 2600000) {
    categoria = categoria + "I";
  } else if (ingresosBrutos > 2100000) {
    categoria = categoria + "H";
  } else if (ingresosBrutos > 1750000) {
    categoria = categoria + "G";
  } else if (ingresosBrutos > 1400000) {
    categoria = categoria + "F";
  } else if (ingresosBrutos > 1060000) {
    categoria = categoria + "E";
  } else if (ingresosBrutos > 770000) {
    categoria = categoria + "D";
  } else if (ingresosBrutos > 550000) {
    categoria = categoria + "C";
  } else if (ingresosBrutos > 370000) {
    categoria = categoria + "B";
  } else {
    categoria = categoria + "A";
  }
}

alert(
  "Bienvenido " +
    nombre +
    " " +
    apellido +
    ". Su facturacion mensual fue de $ " +
    ingresosBrutos +
    ". Usted se deberia encontrar inscripto como " +
    categoria +
    "."
);
