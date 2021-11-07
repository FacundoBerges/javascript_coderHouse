// Tarea clase 3

let numeroMinimo;
let numeroMaximo;
let cantidadNrosPares = 0;

//Ingresos de datos del usuario
numeroMinimo = parseInt(
  prompt(
    "Bienvenido al contador de numeros pares entre 2 numeros ingresados.\n\nPor favor, ingrese un numero (numero inicial): "
  )
);

//Verifico que el dato ingresado sea un numero
while (isNaN(numeroMinimo)) {
  numeroMinimo = parseInt(
    prompt("Error. ingrese un numero (numero inicial): ")
  );
}

//Ingresos de datos del usuario
numeroMaximo = parseInt(
  prompt("Por favor, ingrese un numero (numero final): ")
);

//Verifico que el dato ingresado sea un numero
while (isNaN(numeroMaximo)) {
  numeroMaximo = parseInt(prompt("Error. ingrese un numero (numero final): "));
}

for (i = numeroMinimo; i <= numeroMaximo; i++) {
  if (i % 2 == 0) {
    cantidadNrosPares = cantidadNrosPares + 1;
  }
}

alert(
  "Entre los numeros " +
    numeroMinimo +
    " y " +
    numeroMaximo +
    " hay un total de " +
    cantidadNrosPares +
    " numeros pares."
);
