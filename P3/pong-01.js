console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

//-- Obtener Sonidos
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");
const sonido_tanto = new Audio("pong-tanto.mp3");
const sonido_ganador = new Audio("sonido-ganador.mp3");

//-- Estados del juego
const ESTADO = {
  INIT: 0,
  SAQUE: 1,
  JUGANDO: 2,
  GANADOR: 3,
  SAQUE_GOL: 4,
}

//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;

//-- Niveles de dificultad
let dificultad_level = 0;
let difficult_level = 0;

//-- Easy
const easy = document.getElementById("easy")
  easy.onclick = () => {
    dificultad_level = 0.55;
    //-- Poder mover la pelota mas rapido
    difficult_level = 0.55;
    console.log("Dificultad: easy");
  }

//-- Medium
const medium = document.getElementById("medium")
  medium.onclick = () => {
    dificultad_level = 0.94;
    difficult_level = 0.85;
    console.log("Dificultad: medium");
}

//-- Difficult
const hard = document.getElementById("hard")
  hard.onclick = () => {
    dificultad_level = 2.0;
    difficult_level = 1.0;
    console.log("Dificultad: hard");
}

//-- Pintar todos los objetos en el canvas
function draw(){
  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if (estado == ESTADO.JUGANDO ||estado == ESTADO.SAQUE || estado ==ESTADO.SAQUE_GOL) {
    bola.draw();
  }

//-- Dibujar la raqueta izquierda y derecha
  raqI.draw();
  raqD.draw();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Estilo de la linea: discontinua
  //-- Trazos de 10 pixeles, y 10 de separacion
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(300, 55); //-- (300,0)

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(300, 415);
  ctx.stroke();

  //-- Dibujar el texto de sacar
  if (estado == ESTADO.SAQUE || estado == ESTADO.SAQUE_GOL) {
    ctx.font = "35px DS-DIGIT";
    ctx.fillStyle = "black";
    ctx.fillText("Saca!", 65, 380);
    console.log("Saca!");
  }

  //-- Dibujar el texto de comenzar
  if (estado == ESTADO.INIT) {
    ctx.font = "35px DS-DIGIT";
    ctx.fillStyle = "black";
    ctx.fillText("Pulsa Nivel!", 65, 380);
    raqI.init();
    raqD.init();
    Contador1 = 0;
    Contador2 = 0;

    if (estado != ESTADO.INIT){
      ctx.fillText("Pulsa start!", 65, 380);
      console.log("Pulsa Start!");
    }
  }

  //-- Dibujar ganador
  if (estado == ESTADO.GANADOR) {
    //-- Borrar el canvas (Coordx, Coordy, anchura, altura)
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.font = "40px DS-DIGIT";
    ctx.fillStyle = "black";
    ctx.fillText("HA ACABADO EL JUEGO!", 100, 210);
    console.log("Juego acabado");
    if (Contador1 == 4) {
      sonido_ganador.play();
      ctx.fillText("CONSOLE WIN!", 155, 270);
      console.log("CONSOLE WIN!");
      start.onclick = () => {
        estado = ESTADO.SAQUE;
        console.log("SAQUE!");
        canvas.focus();
      }
    }

    if (Contador2 == 4) {
     sonido_ganador.play();
     ctx.fillText("YOU ARE THE WINNER!", 125, 270);
     console.log("YOU WIN!");
       start.onclick = () => {
         estado = ESTADO.SAQUE;
         console.log("SAQUE!");
         canvas.focus();
       }
     }
   }
  }

//-- Dibujar el tanteo
var Contador1 = 0;
var Contador2 = 0;

function drawScore(){
  ctx.font = "39px DS-DIGIT";
  ctx.fillStyle = "black";
  ctx.fillText(Contador1, 200, 90);
  ctx.fillText(Contador2, 360, 90);
}

//-- Pongo cronometro
var microseg = 0;
var second = 0;
function cronometre(){
  if (estado == ESTADO.JUGANDO || estado == ESTADO.SAQUE_GOL){
    microseg ++
    if(microseg < 10){
      microseg = "0" + microseg;
    }
    if(microseg > 59){
      microseg = "00"
      second ++
      if(second < 10){
        second = "0" + second
      }
    }
    ctx.font = "39px DS-DIGIT";
    ctx.fillText(`${second}:${microseg}`, 254, 90);
  }else{
    ctx.font = "39px DS-DIGIT";
    ctx.fillText("00:00", 254, 90);
  }
}

//---- Bucle principal de la animación
function animacion(){
  //-- Actualizar las posiciones de los objetos móviles
  if (estado != ESTADO.INIT) {
    //-- Actualizar las raquetas con la velocidad actual
    raqI.update();
    raqD.update();
    //-- Hacemos que la raqueta izquierda la controle el ordenador
    raqI.y = bola.y * dificultad_level;
  }

  if (estado == ESTADO.INIT) {
    //-- Actualizar las raquetas con la velocidad actual
    raqI.update();
    raqD.update();
  }

  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= 501) {
    //-- Hay colisión. Cambiar el signo de la bola
    bola.vx = bola.vx * -1;
    //--Reproducir sonido
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
    estado == ESTADO.SAQUE_GOL
  //-- Comprobar si la bola ha alcanzado el límite izq
  }else if(bola.x <= 50){
    bola.vx = bola.vx * -1;
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
    estado == ESTADO.SAQUE_GOL
  }else if (bola.y >= 419) {
    bola.vy = bola.vy * -1;
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
    estado == ESTADO.SAQUE_GOL
  }else if (bola.y <= 95) {
    bola.vy = bola.vy * -1;
    //-- Reproducir sonido.
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();
    estado == ESTADO.SAQUE_GOL
  }
//-- Si llega al límite izquierdo, hemos perdido
  //-- pasamos al estado de SAQUE
  if (bola.x <= 50) {
     estado = ESTADO.SAQUE_GOL;
     bola.init();
     console.log("Tanto!!!!");
     Contador2++;
     sonido_tanto.play();
     console.log(Contador2);
     if (Contador2 == 4) {
       sonido_ganador.play();
       estado = ESTADO.GANADOR;
    }
  }

  //-- Si llega al límite derecho, hemos perdido
  //-- pasamos al estado de SAQUE
  if (bola.x >= 501) {
    estado = ESTADO.SAQUE_GOL;
    bola.init();
    console.log("Tanto!!!!");
    Contador1++;
    sonido_tanto.play();
    console.log(Contador1);
    if (Contador1 == 4) {
      sonido_ganador.play();
      estado = ESTADO.GANADOR;
    }
  }

  //-- Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
    bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
      bola.vx = bola.vx * -1;
      //-- Reproducir sonido.
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();
  }

  //-- Comprobar si hay colisión con la raqueta derecha
  if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width) &&
    bola.y >= raqD.y && bola.y <=(raqD.y + raqD.height)) {
      bola.vx = bola.vx * -1;
      //-- Reproducir sonido.
      sonido_raqueta.currentTime = 0;
      sonido_raqueta.play();
  }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola.update()
  raqI.y = bola.y;

  //-- Borrar el canvas (Coordx, Coordy, anchura, altura)
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();
  //-- Dibujo marcador
  drawScore();
//-- Dibujo cronometro
  cronometre();

  window.requestAnimationFrame(animacion);
}

//-- Inicializa la bola: Llevarla a su posicion inicial
const bola = new Bola(ctx);

//-- Crear las raquetas
const raqI = new Raqueta(ctx);
const raqD = new Raqueta(ctx);

//-- Cambiar las coordenadas de la raqueta derecha
raqD.x_ini = 496;
raqD.y_ini = 300;
raqD.init();

//-- Arrancar la animación
animacion();

///-- Retrollamada de las teclas
window.onkeydown = (e) => {
  if (estado == ESTADO.INIT)
    return;
  //-- Según la tecla se hace una cosa u otra
  switch (e.key) {
    case "p":
      raqD.v = raqD.v_ini * -1;
      break;
    case "l":
      raqD.v = raqD.v_ini;
      break;
    case " ":

//-- El saque solo funciona en el estado de SAQUE
      if (estado == ESTADO.SAQUE || estado == ESTADO.SAQUE_GOL) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

        //-- Llevar bola a su posicion incicial
        bola.init();

        //-- Darle velocidad
        bola.vx = bola.vx_ini * difficult_level;
        bola.vy = bola.vy_ini * difficult_level;

        //-- Cambiar al estado de jugando!
        estado = ESTADO.JUGANDO;
        return false;
      }
    default:
  }
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if(e.key == "p" || e.key == "l"){
    //-- Quitar velocidad de la raqueta
    raqD.v = 0;
  }
}

//-- Botón de arranque
const start = document.getElementById("start");

start.onclick = () => {
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

//-- Boton de stop
const stop = document.getElementById("stop");

stop.onclick = () => {
  //-- Volver al estado inicial
  estado = ESTADO.INIT;
  Contador1 = 0;
  Contador2 = 0;
  bola.init();
  start.disabled = false;
}
