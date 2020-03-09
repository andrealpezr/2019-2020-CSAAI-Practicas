//-- Autor: Andrea Lopez Recio

//-- Punto de entrada: una vez cargada la página se llama a esta función.
//-- Ahí comienza el programa principal.
function main()
{
  console.log("La página ya está cargada")
  console.log("Ahora es seguro ejecutar el código js")
}

// Cojo los elementos con getElementById. IDENTIFICADORES
display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borra_ultimo = document.getElementById("borra_ultimo")

//-- Crea un array con todos los elementos de la clase cdigito
let digitos = document.getElementsByClassName("cdigito"); //-- Leo del html
//-- Crea un array con todos los elementos de la clase operacion
let operacion = document.getElementsByClassName("operacion"); //-- Leo del html
//-- Crea un array con todos los elementos de la clase boton
let boton = document.getElementsByClassName("boton"); //-- Leo del html

//-- Recorro el array de los digitos, son del 0 al 9
for (i=0; i<digitos.length; i++){
  digitos[i].onclick = (ev)=> {
    digito(ev.target);
  }
}
//-- Si se introduce un digito, elimino el 0 en el display
function digito(botons) {
  //-- Según el estado hacemos una cosa u otra
  if (display.innerHTML=="0"){
    display.innerHTML= botons.value;
  } else {
  display.innerHTML += botons.value;
  }
}

//-- Recorro el array de los operadores:
//-- sumar, restar, multiplicar, dividir, exponencial
for (i=0; i<operacion.length; i++){
  operacion[i].onclick = (ev)=> {
    digito(ev.target);
  }
}

//-- Evaluar la expresion: igual
//-- Coge la cadena del display, evalua y asigna al display para mostrarlo
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Borra el ultimo digito u operando
borra_ultimo.onclick = () => {
  display.innerHTML = display.innerHTML.slice(0,-1);
}

//-- Pone a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}
