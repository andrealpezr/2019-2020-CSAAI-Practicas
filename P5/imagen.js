console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imag');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador: RGB
const deslizador_R = document.getElementById('deslizador_R');
const deslizador_G = document.getElementById('deslizador_G');
const deslizador_B = document.getElementById('deslizador_B');

//-- Valor de los deslizadores R,G,B
const range_value_R = document.getElementById('range_value_R');
const range_value_G = document.getElementById('range_value_G');
const range_value_B = document.getElementById('range_value_B');

//-- Botones de los filtros
const rgb = document.getElementById('RGB');

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

console.log("Fin...");
