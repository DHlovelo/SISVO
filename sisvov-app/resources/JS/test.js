const preguntas = [
  { dimension: "EI", texto: "En una reunión de grupo para el proyecto, generalmente...",
    opciones: [
      { letra: "E", texto: "Propongo ideas en voz alta apenas se me ocurren" },
      { letra: "I", texto: "Prefiero pensarlas primero y hablar cuando ya están claras" }
    ]},
  { dimension: "EI", texto: "Un fin de semana ideal para ti es...",
    opciones: [
      { letra: "E", texto: "Salir con varias personas y hacer planes nuevos" },
      { letra: "I", texto: "Quedarte en casa o con poca gente, tranquilo" }
    ]},
  { dimension: "EI", texto: "Cuando conoces gente nueva...",
    opciones: [
      { letra: "E", texto: "Me siento con energía y entablo conversación fácil" },
      { letra: "I", texto: "Necesito un tiempo para sentirme cómodo" }
    ]},
  { dimension: "SN", texto: "Al aprender algo nuevo prefieres...",
    opciones: [
      { letra: "S", texto: "Ejemplos concretos y pasos claros" },
      { letra: "N", texto: "Entender la idea general y las posibilidades" }
    ]},
  { dimension: "SN", texto: "Te describen mejor como alguien...",
    opciones: [
      { letra: "S", texto: "Práctico y realista" },
      { letra: "N", texto: "Imaginativo y curioso por el futuro" }
    ]},
  { dimension: "SN", texto: "Cuando resuelves un problema...",
    opciones: [
      { letra: "S", texto: "Me apoyo en datos y experiencias anteriores" },
      { letra: "N", texto: "Busco patrones o conexiones nuevas" }
    ]},
  { dimension: "TF", texto: "Al tomar una decisión importante, pesa más...",
    opciones: [
      { letra: "T", texto: "La lógica y los hechos" },
      { letra: "F", texto: "Cómo afecta a las personas involucradas" }
    ]},
  { dimension: "TF", texto: "Si un compañero comete un error en el trabajo...",
    opciones: [
      { letra: "T", texto: "Le explico directamente qué estuvo mal" },
      { letra: "F", texto: "Cuido cómo se lo digo para no incomodarlo" }
    ]},
  { dimension: "JP", texto: "Prefieres tu semana...",
    opciones: [
      { letra: "J", texto: "Organizada, con horarios definidos" },
      { letra: "P", texto: "Flexible, decidiendo sobre la marcha" }
    ]},
  { dimension: "JP", texto: "Antes de un viaje o entrega importante...",
    opciones: [
      { letra: "J", texto: "Ya tengo todo planeado con anticipación" },
      { letra: "P", texto: "Resuelvo los detalles cerca de la fecha" }
    ]}
];

const respuestas = new Array(preguntas.length).fill(null);
let actual = 0;

const contenedor      = document.querySelector("#preguntas");
const progresoFill    = document.querySelector("#progresoFill");
const progresoTexto   = document.querySelector("#progresoTexto");
const progresoPorc    = document.querySelector("#progresoPorcentaje");
const btnAnterior     = document.querySelector("#btnAnterior");
const btnSiguiente    = document.querySelector("#btnSiguiente");

function construirPreguntas() {
  preguntas.forEach((p, i) => {
    
    const div = document.createElement("div");
    div.className = "pregunta";
    div.dataset.index = i;
    if (i === 0) div.classList.add("activa");

    const h2 = document.createElement("h2");
    h2.className = "h5 fw-semibold mb-3";
    h2.textContent = (i + 1) + ". " + p.texto;
    div.appendChild(h2);

    const lista = document.createElement("div");
    lista.className = "list-group";

    p.opciones.forEach((op) => {
      const label = document.createElement("label");
      label.className = "list-group-item opcion d-flex align-items-center gap-2";

      const input = document.createElement("input");
      input.type = "radio";
      input.className = "form-check-input mt-0 flex-shrink-0";
      input.name = "pregunta" + i;
      input.value = op.letra;

      if (respuestas[i] === op.letra) {
        input.checked = true;
        label.classList.add("seleccionada");
      }

      input.addEventListener("change", () => {
        respuestas[i] = op.letra;
        lista.querySelectorAll(".opcion").forEach(o => o.classList.remove("seleccionada"));
        label.classList.add("seleccionada");
        actualizarBotonSiguiente();
      });

      label.appendChild(input);
      label.append(op.texto);
      lista.appendChild(label);
    });

    div.appendChild(lista);
    contenedor.appendChild(div);
  });
}

function mostrarPregunta(indice) {
  document.querySelectorAll(".pregunta").forEach(div => {
    div.classList.toggle("activa", Number(div.dataset.index) === indice);
  });

  const porcentaje = Math.round(((indice + 1) / preguntas.length) * 100);
  progresoFill.style.width = porcentaje + "%";
  progresoFill.parentElement.setAttribute("aria-valuenow", porcentaje);
  progresoTexto.textContent = "Pregunta " + (indice + 1) + " de " + preguntas.length;
  progresoPorc.textContent  = porcentaje + "%";

  btnAnterior.disabled = indice === 0;
  btnSiguiente.textContent = (indice === preguntas.length - 1)
    ? "Ver resultado →"
    : "Siguiente →";

  actualizarBotonSiguiente();
}

function actualizarBotonSiguiente() {
  btnSiguiente.disabled = respuestas[actual] === null;
}

function calcularResultado() {
  const puntos = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
  respuestas.forEach(letra => { if (letra) puntos[letra]++; });

  const codigo =
    (puntos.E >= puntos.I ? "E" : "I") +
    (puntos.S >= puntos.N ? "S" : "N") +
    (puntos.T >= puntos.F ? "T" : "F") +
    (puntos.J >= puntos.P ? "J" : "P");

  localStorage.setItem("sisvov_codigo", codigo);
  window.location.href = "resultado.html";
}

btnSiguiente.addEventListener("click", () => {
  if (actual < preguntas.length - 1) {
    actual++;
    mostrarPregunta(actual);
  } else {
    calcularResultado();
  }
});

btnAnterior.addEventListener("click", () => {
  if (actual > 0) {
    actual--;
    mostrarPregunta(actual);
  }
});

construirPreguntas();
mostrarPregunta(0);
