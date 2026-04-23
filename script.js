import { preguntasMundo } from "./data.js";

const title = document.getElementById("title");
const pantallaInicial = document.getElementById("pantalla-inicial");
const resultadoParcial = document.getElementById("resultado-parcial");
const contenedorPregunta = document.getElementById("pregunta-texto");
const imagen = document.getElementById("pregunta-imagen");
const contenedorOpciones = document.getElementById("opciones-botones");
const botonInicio = document.getElementById("inicio");
const resultados = [];
let preguntaActual = 0;
let puntaje = 0;

botonInicio.addEventListener("click", () => iniciarTrivia());

function inicio() {
  pantallaInicial.style.display = "flex";
  contenedorPregunta.style.display = "none";
  contenedorOpciones.style.display = "none";
  resultadoParcial.style.display = "none";
  imagen.style.display = "none";
  // TODO: Vaciar array resultados
}

inicio();

function iniciarTrivia() {
  pantallaInicial.style.display = "none";
  contenedorPregunta.style.display = "flex";
  contenedorOpciones.style.display = "flex";
  resultadoParcial.style.display = "flex";
  contenedorOpciones.innerHTML = "";
  resultadoParcial.innerText = "";

  const preguntasCompletadas = preguntaActual >= preguntasMundo.length;
  if (preguntasCompletadas) {
    finDelJuego();
    return;
  }
  const pregunta = preguntasMundo[preguntaActual];
  contenedorPregunta.innerText = pregunta.pregunta;
  imagen.setAttribute("src", pregunta.imagen);
  imagen.style.display = "flex";

  pregunta.opciones.forEach((opcion) => {
    const boton = document.createElement("button");
    boton.innerText = opcion;
    boton.onclick = () => validarRespuesta(opcion);
    contenedorOpciones.append(boton);
  });
}

function validarRespuesta(eleccionJugador) {
  const preguntaRespondida = preguntasMundo[preguntaActual];
  const eleccionCorrecta = preguntaRespondida.respuestaCorrecta;
  const acierto = eleccionJugador === eleccionCorrecta;
  if (acierto) {
    puntaje++;
  }
  resultados.push({
    pregunta: preguntaRespondida.pregunta,
    respuesta: eleccionJugador,
    acierto,
  });

  preguntaActual++;
  iniciarTrivia();
}

function reinicio() {
  preguntaActual = 0;
  puntaje = 0;
  resultados.length = 0;
  inicio();
}

function finDelJuego() {
  contenedorPregunta.innerText = "¡Juego Terminado!";
  contenedorOpciones.innerHTML = `<h3>Lograste ${puntaje} de ${preguntasMundo.length} aciertos.</h3>`;
  const botonResultado = document.createElement("button");
  botonResultado.innerText = "Ver Resultados";
  botonResultado.onclick = () => mostrarResultados();
  const botonReinicio = document.createElement("button");
  botonReinicio.innerText = "Volver a Jugar";
  botonReinicio.onclick = () => reinicio();
  resultadoParcial.append(botonReinicio, botonResultado);
  imagen.style.display = "none";
  console.log({ resultados }, "resultados");
  // TODO: Colocar boton ver resultado y renderizar los resultados
}
