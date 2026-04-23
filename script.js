import { preguntasMundo } from "./data.js";

// Inicializa los selectores del html por id
const title = document.getElementById("title");
const pantallaInicial = document.getElementById("pantalla-inicial");
const resultadoParcial = document.getElementById("resultado-parcial");
const contenedorPregunta = document.getElementById("pregunta-texto");
const imagen = document.getElementById("pregunta-imagen");
const contenedorOpciones = document.getElementById("opciones-botones");
const botonInicio = document.getElementById("inicio");
const mostrar = document.getElementById("mostrar-resultados");
// Inicializa indicadores del juego
const elecciones = [];
let numeroDePregunta = 0;
let aciertos = 0;

function inicio() {
  // Muestra la pantalla inicial
  pantallaInicial.style.display = "flex";
  // Oculta los contenedores de la pregunta
  contenedorPregunta.style.display = "none";
  contenedorOpciones.style.display = "none";
  resultadoParcial.style.display = "none";
  imagen.style.display = "none";
}

inicio();

botonInicio.addEventListener("click", () => iniciarTrivia());

function iniciarTrivia() {
  mostrarTrivia();
  const preguntasCompletadas = numeroDePregunta >= preguntasMundo.length;
  if (preguntasCompletadas) {
    finDelJuego();
    return;
  }
  // Identifica y renderiza la pregunta actual mediante el número de la pregunta
  const preguntaActual = preguntasMundo[numeroDePregunta];
  contenedorPregunta.innerText = preguntaActual.pregunta;
  // Renderiza la imagen de la pregunta actual
  imagen.setAttribute("src", preguntaActual.imagen);
  imagen.style.display = "flex";
  // Renderiza opciones de la pregunta
  preguntaActual.opciones.forEach((opcion) => {
    const boton = document.createElement("button");
    boton.innerText = opcion;
    boton.onclick = () => validarRespuesta(opcion);
    contenedorOpciones.append(boton);
  });
}

function validarRespuesta(eleccionJugador) {
  const preguntaRespondida = preguntasMundo[numeroDePregunta];
  const eleccionCorrecta = preguntaRespondida.respuestaCorrecta;
  const acierto = eleccionJugador === eleccionCorrecta;
  if (acierto) {
    aciertos++;
  }
  // Recopila cada elección del jugador agregandolo en el array de elecciones
  elecciones.push({
    pregunta: preguntaRespondida.pregunta,
    respuesta: eleccionJugador,
    acierto,
  });
  numeroDePregunta++;
  iniciarTrivia();
}

function finDelJuego() {
  imagen.style.display = "none";
  // Renderiza resumen del juego con los aciertos dados
  contenedorPregunta.innerText = "¡Juego Terminado!";
  contenedorOpciones.innerHTML = `<h3>Lograste ${aciertos} de ${preguntasMundo.length} aciertos.</h3>`;
  // Renderiza botón para ver resultados
  const botonResultado = document.createElement("button");
  botonResultado.innerText = "Ver Resultados";
  botonResultado.onclick = () => {
    mostrarResultados();
    botonResultado.style.display = "none";
  };
  // Renderiza botón para volver a jugar
  const botonReinicio = document.createElement("button");
  botonReinicio.innerText = "Volver a Jugar";
  botonReinicio.onclick = () => reiniciaTrivia();
  resultadoParcial.append(botonResultado, botonReinicio);
}

function mostrarResultados() {
  // Muestra una lista con el resultado de las elecciones de cada pregunta
  elecciones.forEach((eleccion) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <p class="pregunta">
        Pregunta: <b>${eleccion.pregunta}</b>.
      </p> 
      <p class="respuesta">
        Respuesta: <span class="${eleccion.acierto ? "positivo" : "negativo"}">${eleccion.respuesta}</span>. ${eleccion.acierto ? "✅" : "❌"}
      </p>
    `;
    mostrar.append(item);
  });
}

function reiniciaTrivia() {
  // Reinicia los valores
  numeroDePregunta = 0;
  aciertos = 0;
  elecciones.length = 0;
  mostrar.innerText = "";
  inicio();
}

function mostrarTrivia() {
  // Oculta la pantalla inicial
  pantallaInicial.style.display = "none";
  // Muestra los contenedores de la pregunta
  contenedorPregunta.style.display = "flex";
  contenedorOpciones.style.display = "flex";
  resultadoParcial.style.display = "flex";
  // Vacía el contenido de las opciones y resultado parcial
  contenedorOpciones.innerHTML = "";
  resultadoParcial.innerText = "";
}
