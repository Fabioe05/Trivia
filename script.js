import { preguntasMundo } from "./data.js";

const title = document.getElementById("title");
const pantallaInicial = document.getElementById("pantalla-inicial");
const resultadoParcial = document.getElementById("resultado-parcial");
const contenedorPregunta = document.getElementById("pregunta-texto");
const contenedorOpciones = document.getElementById("opciones-botones");
const botonInicio = document.getElementById("inicio");
let preguntaActual = 0;
let puntaje = 0;

botonInicio.addEventListener("click", () => iniciarTrivia());

function inicio() {
  pantallaInicial.style.display = "flex";
  contenedorPregunta.style.display = "none";
  contenedorOpciones.style.display = "none";
  resultadoParcial.style.display = "none";
}

inicio();

function iniciarTrivia() {
  pantallaInicial.style.display = "none";
  contenedorPregunta.style.display = "flex";
  contenedorOpciones.style.display = "flex";
  resultadoParcial.style.display = "flex";

  contenedorOpciones.innerHTML = "";
  resultadoParcial.innerText = "";

  if (preguntaActual >= preguntasMundo.length) {
    contenedorPregunta.innerText = "¡Juego Terminado!";
    contenedorOpciones.innerHTML = `<h3>Lograste ${puntaje} de ${preguntasMundo.length} aciertos.</h3>`;
    const botonReinicio = document.createElement("button");
    botonReinicio.innerText = "Volver a Jugar";
    botonReinicio.onclick = () => reinicio();
    resultadoParcial.append(botonReinicio);
    return;
  }

  let p = preguntasMundo[preguntaActual];
  contenedorPregunta.innerText = p.pregunta;

  p.opciones.forEach((opcion) => {
    const boton = document.createElement("button");
    boton.innerText = opcion;
    boton.onclick = () => validarRespuesta(opcion);
    contenedorOpciones.append(boton);
  });
}

function validarRespuesta(eleccionJugador) {
  const eleccionCorrecta = preguntasMundo[preguntaActual].respuestaCorrecta;
  if (eleccionJugador === eleccionCorrecta) {
    puntaje++;
  }

  preguntaActual++;
  iniciarTrivia();
}

function reinicio() {
  preguntaActual = 0;
  puntaje = 0;
  inicio();
}

