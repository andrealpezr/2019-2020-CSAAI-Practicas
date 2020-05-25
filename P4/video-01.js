console.log("Ejecutando JS...");

//-- Obtener videos
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");
const prueba = document.getElementById("prueba_im");
const ot_prueba = document.getElementById("ot_prueba");

//-- Tamaño de los videos e imagen de prueba
ot_prueba.width= 300;  //-- Tamaño de la pantalla de video
ot_prueba.height= 200;

video1.width = 250;
video1.height = 150;

video2.width = 250;
video2.height = 150;

video3.width = 250;
video3.height = 150;

prueba.width = 250;
prueba.height = 140;


//-- Ubicaciones de videos e imagen
ot_prueba.poster="https://github.com/andrealpezr/videos/raw/master/ot_prueba.jpg";
video1.src="https://github.com/andrealpezr/videos/raw/master/video1.mp4";
video2.src="https://github.com/andrealpezr/videos/raw/master/video2.mp4";
video3.src="https://github.com/andrealpezr/videos/raw/master/video3.mp4";
prueba.src="https://github.com/andrealpezr/videos/raw/master/imagen_estatica.png";


//-- Obtengo los botones
const play_v1 = document.getElementById("play_v1");
const play_v2 = document.getElementById("play_v2");
const play_v3 = document.getElementById("play_v3");
const play_v4 = document.getElementById("play_v4");

//-- Botones del menu
const pausar = document.getElementById("pausar");
const reiniciar =  document.getElementById("reiniciar");
const sonido = document.getElementById("con_sonido");
const silenciar = document.getElementById("silenciar");
const parar_bucle = document.getElementById("parar_bucle");
const bucle = document.getElementById("bucle");
const continuar = document.getElementById("continuar");

//-- Variable para reproduccion en Bucle
var inicio = 0;


//-- Manejo de seleccion de botones

//--Video 1: Nia
play_v1.onclick = () => {
  console.log("Pulsado Video 1");
  ot_prueba.src = video1.src;
  ot_prueba.currentTime = video1.currentTime+0.35;
  ot_prueba.play();
  video1.style.border = "8px solid #F4C2C2";
  video2.style.border = "0px";
  video3.style.border = "0px";
  prueba.style.border = "0px";
};


//--Video2: Hugo y Anaju
play_v2.onclick = () => {
  console.log("Pulsado Video 2");
  ot_prueba.src = video2.src;
  ot_prueba.currentTime = video2.currentTime+0.35;
  ot_prueba.play();
  video2.style.border = "8px solid #F4C2C2";
  video1.style.border = "0px";
  video3.style.border = "0px";
  prueba.style.border = "0px";
};

//--Video3: Aitana
play_v3.onclick = () => {
  console.log("Pulsado Video 3");
  ot_prueba.src = video3.src;
  ot_prueba.currentTime = video3.currentTime+0.35;
  ot_prueba.play();
  video3.style.border = "8px solid #F4C2C2";
  video1.style.border = "0px";
  video2.style.border = "0px";
  prueba.style.border = "0px";
};

//-- Imagen de prueba
play_v4.onclick = () => {
  console.log("Emision en Prueba");
  ot_prueba.src = null;
  ot_prueba.poster = prueba.src;
  ot_prueba.play();
  prueba.style.border = "8px solid #F4C2C2";
  video1.style.border = "0px";
  video2.style.border = "0px";
  video3.style.border = "0px";
};

//-- Video en Bucle
bucle.onclick = () => {
  console.log("Reproduciendo en bucle");
  inicio = ot_prueba.currentTime;
  var time = setInterval(tiempo, 5000);
  function tiempo(){
    ot_prueba.currentTime = inicio;
  }
  parar_bucle.onclick = () => {
  console.log("Parando bucle");
  clearInterval(time);
  inicio = ot_prueba.currentTime;
  }
};

//-- silenciar
silenciar.onclick = () => {
  console.log("Silenciar video");
  ot_prueba.muted = true;
}

//-- activar sonido
sonido.onclick = () => {
  console.log("Sonido activado");
  ot_prueba.muted = false;
}

//-- Parar video
pausar.onclick = () => {
  ot_prueba.pause();
  console.log("has dado a Stop");
};

//-- Continuar (Play())
continuar.onclick = () => {
  console.log("Continuar reproduciendo video");
  ot_prueba.play();
}

//-- Reiniciar video
reiniciar.onclick = () => {
  console.log("Reiniciando");
  ot_prueba.currentTime = 0;
}
