console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imag');
const ctx = canvas.getContext('2d');


//-- Acceso al deslizador: RGB
const deslizador_R = document.getElementById('deslizador_R');
const deslizador_G = document.getElementById('deslizador_G');
const deslizador_B = document.getElementById('deslizador_B');
const barra = document.getElementById('barra');

//-- Valor de los deslizadores R,G,B
const range_value_R = document.getElementById('range_value_R');
const range_value_G = document.getElementById('range_value_G');
const range_value_B = document.getElementById('range_value_B');

//-- Botones de los filtros
const grises = document.getElementById('grises');
const negativo = document.getElementById('negativo');
const sepia = document.getElementById('sepia');
const contraste = document.getElementById('contraste');
const espejo = document.getElementById('espejo');
const rotar = document.getElementById('rotar');
const original = document.getElementById('original');



//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {
  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

function umbrales_RGB(){

    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //--Mostrar nuevos valores del deslizador
    range_value_R.innerHTML = deslizador_R.value;
    range_value_G.innerHTML = deslizador_G.value;
    range_value_B.innerHTML = deslizador_B.value;

    //-- Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > deslizador_R.value){
        data[i] = deslizador_R.value;
      }
      if (data[i+1] > deslizador_G.value){
        data[i+1] = deslizador_G.value;
      }
      if (data[i+2] > deslizador_B.value){
        data[i+2] = deslizador_B.value;
      }
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
}

//-- Si selecciono la barra llamo a la funcion
deslizador_R.oninput = () => {
  umbrales_RGB();
  console.log("modificando umbral de R");
}

deslizador_G.oninput = () => {
  umbrales_RGB();
  console.log("modificando umbral de G");
}

deslizador_B.oninput = () => {
  umbrales_RGB();
  console.log("modificando umbral de B");
}


//-- En caso de seleccionar en grises
grises.onclick = () => {
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data

  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i++) {
    var Rojo = data[i* 4];
    var Verde = data[i*4 + 1];
    var Azul = data[i*4 + 2];
    var Grises = (Rojo + Verde + Azul)/3;
    Grises = data[i*4] = data[i*4 +1] = data[i*4 +2];
    }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}



//-- En caso de seleccionar el Negativo
negativo.onclick = () => {

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data

  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i++) {
    var Rojo = data[i* 4];
    var Verde = data[i*4 + 1];
    var Azul = data[i*4 + 2];
    //-- Hago el negativo
    data[i*4] = 255 - Rojo;
    data[i*4 +1] = 255 - Verde;
    data[i*4 +2] = 255 - Azul;
    }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- En caso de seleccionar el sepia
sepia.onclick = () => {
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data
  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i++) {
    var Rojo = data[i* 4];
    var Verde = data[i*4 + 1];
    var Azul = data[i*4 + 2];

    //-- Hago sepia
    data[i*4] = (Rojo * .393) + (Verde* .769) + (Azul * .189);
    data[i*4 +1] = (Rojo * .349) + (Verde* .686) + (Azul * .168);
    data[i*4 +2] = (Rojo * .272) + (Verde* .534) + (Azul * .131);
    }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}


//-- En caso de seleccionar el sepia
contraste.onclick = () => {
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data

  var factor = 0;
  var valor = 100;

  factor = (259 * (valor + 255)) / (255 * (259 - valor));
  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i++) {
    var Rojo = data[i* 4];
    var Verde = data[i*4 + 1];
    var Azul = data[i*4 + 2];
    //-- Hago sepia
    data[i*4] = factor * (Rojo - 128) + 128;
    data[i*4 +1] = factor * (Verde -128) + 128;
    data[i*4 +2] = factor * (Azul -128) + 128;
    }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

//-- Opcion de espejo
espejo.onclick = () => {
  console.log("Espejo de la imagen");
  ctx.drawImage(img, 0, 0);
  ctx.translate(2*(img.width)/2,0);
  ctx.scale(-1, 1);
  ctx.drawImage(img, 0, 0);

}

//-- Opcion de ROTAR
rotar.onclick = () => {
  console.log("Rotar de la imagen");
  ctx.drawImage(img, 0, 0);
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
  ctx.drawImage(img, 0, 0);
}


//--Original

original.onclick = () => {
  console.log("Volver a la imagen original");
  ctx.drawImage(img, 0, 0);
}

console.log("Fin...");
