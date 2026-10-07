const becas = [
  { id: 1, nombre: "Beca Excelencia Académica", universidad: "UNIFRANZ", tipo: "academica", porcentaje: 50,
    descripcion: "Dirigida a estudiantes con un rendimiento académico sobresaliente que deseen continuar sus estudios universitarios.",
    requisitos: ["Promedio general igual o superior a 90/100", "No tener materias reprobadas", "Carta de recomendación de un docente"],
    referencia: "Información - UNIFRANZ", telefono: "71502211", correo: "info@unifranz.edu.bo" },

  { id: 2, nombre: "Beca Deportiva Destacada", universidad: "UPB", tipo: "deportiva", porcentaje: 30,
    descripcion: "Para deportistas que representen a su institución o al departamento en competencias oficiales.",
    requisitos: ["Certificado deportivo vigente", "Participación comprobable en torneos", "Promedio mínimo de 70/100"],
    referencia: "Admisiones - UPB", telefono: "77201229", correo: "" },

  { id: 3, nombre: "Beca Social Comunitaria", universidad: "UCB", tipo: "social", porcentaje: 100,
    descripcion: "Beca completa para estudiantes de bajos recursos que demuestren compromiso con su comunidad.",
    requisitos: ["Situación económica comprobable", "Participación en proyectos sociales", "Promedio mínimo de 80/100"],
    referencia: "Incripción Virtual - UCB", telefono: "77789724", correo: "mugarte@ucb.edu.bo" },

  { id: 4, nombre: "Beca Económica Familiar", universidad: "UNIFRANZ", tipo: "economica", porcentaje: 40,
    descripcion: "Ayuda económica destinada a estudiantes cuyos ingresos familiares no superan el salario mínimo.",
    requisitos: ["Comprobante de ingresos familiares", "Certificado de domicilio", "Promedio mínimo de 75/100"],
    referencia: "Información - UNIFRANZ", telefono: "71502211", correo: "info@unifranz.edu.bo" },

  { id: 5, nombre: "Beca Investigación Joven", universidad: "UMSA", tipo: "academica", porcentaje: 25,
    descripcion: "Para estudiantes con interés en investigación científica que deseen participar en proyectos de la universidad.",
    requisitos: ["Propuesta de investigación breve", "Promedio mínimo de 85/100", "Disponibilidad de 10 horas semanales"],
    referencia: "Información - UMSA", telefono: "800160013", correo: "informate@umsa.bo" },

  { id: 6, nombre: "Beca Talento Artístico", universidad: "UPB", tipo: "social", porcentaje: 35,
    descripcion: "Dirigida a estudiantes con talento artístico (música, danza, teatro, artes visuales) que deseen desarrollarlo mientras estudian.",
    requisitos: ["Portafolio artístico", "Participación en eventos culturales", "Promedio mínimo de 70/100"],
    referencia: "Admisiones - UPB", telefono: "77201229", correo: "" },

  { id: 7, nombre: "Beca Deportiva Federada", universidad: "UCB", tipo: "deportiva", porcentaje: 60,
    descripcion: "Para deportistas federados que representen al país en competencias internacionales.",
    requisitos: ["Carnet de federación vigente", "Participación internacional comprobable", "Promedio mínimo de 70/100"],
    referencia: "Incripción Virtual - UCB", telefono: "77789724", correo: "mugarte@ucb.edu.bo"  },

  { id: 8, nombre: "Beca Económica de Emergencia", universidad: "UMSA", tipo: "economica", porcentaje: 50,
    descripcion: "Apoyo económico temporal para estudiantes que atraviesen situaciones familiares adversas.",
    requisitos: ["Informe de situación de emergencia", "Promedio mínimo de 70/100", "Entrevista con trabajo social"],
    referencia: "Información - UMSA", telefono: "800160013", correo: "informate@umsa.bo" }
];

let filtroActual = "todas";

const buscador      = document.querySelector("#buscador");
const contador      = document.querySelector("#contador");
const sinResultados = document.querySelector("#sinResultados");

const modalBeca        = new bootstrap.Modal(document.querySelector("#modalBeca"));
const modalTipo        = document.querySelector("#modalTipo");
const modalNombre      = document.querySelector("#modalNombre");
const modalUniversidad = document.querySelector("#modalUniversidad");
const modalPorcentaje  = document.querySelector("#modalPorcentaje");
const modalDescripcion = document.querySelector("#modalDescripcion");
const modalRequisitos  = document.querySelector("#modalRequisitos");
const modalContacto    = document.querySelector("#modalContacto");

function etiquetaTipo(tipo) {
  if (tipo === "academica") return "Académica";
  if (tipo === "deportiva") return "Deportiva";
  if (tipo === "social") return "Social";
  if (tipo === "economica") return "Económica";
  return tipo;
}

function actualizarVista() {
  const texto = buscador.value.toLowerCase().trim();
  let visibles = 0;

  for (let i = 0; i < becas.length; i++) {
    const b = becas[i];
    const tarjeta = document.querySelector("#card-" + b.id);

    const coincideTipo = (filtroActual === "todas") || (b.tipo === filtroActual);
    const coincideTexto =
      (texto === "") ||
      b.nombre.toLowerCase().includes(texto) ||
      b.universidad.toLowerCase().includes(texto);

    if (coincideTipo && coincideTexto) {
      tarjeta.classList.remove("d-none");
      visibles = visibles + 1;
    } else {
      tarjeta.classList.add("d-none");
    }
  }

  if (visibles === 0) {
    sinResultados.classList.remove("d-none");
    contador.textContent = "";
  } else {
    sinResultados.classList.add("d-none");
    contador.textContent = "Mostrando " + visibles + " de " + becas.length + " becas";
  }
}

function abrirModal(idBeca) {
  let beca = null;
  for (let i = 0; i < becas.length; i++) {
    if (becas[i].id === idBeca) {
      beca = becas[i];
    }
  }
  if (beca === null) return;

  modalTipo.textContent = etiquetaTipo(beca.tipo);
  modalTipo.className = "badge rounded-pill mb-2 badge-" + beca.tipo;

  modalNombre.textContent = beca.nombre;
  modalUniversidad.textContent = beca.universidad;
  modalPorcentaje.textContent = beca.porcentaje + "%";
  modalDescripcion.textContent = beca.descripcion;

  let htmlReferencias = '<p class="fw-semibold mb-2">' + beca.referencia + '</p>';

  htmlReferencias = htmlReferencias +
    '<a href="https://wa.me/591' + beca.telefono + '" target="_blank" ' +
    'class="btn btn-success rounded-pill px-4 fw-semibold me-2 mb-2">' +
    '🟢 ✆' + beca.telefono + '</a>';

  if (beca.correo !== "") {
    htmlReferencias = htmlReferencias +
      '<a href="mailto:' + beca.correo + '" ' +
      'class="btn btn-light rounded-pill px-4 fw-semibold mb-2">' +
      '✉︎ ' + beca.correo + '</a>';
  }

  modalContacto.innerHTML = htmlReferencias;
  modalBeca.show();
}

const idsFiltros = ["filtro-todas", "filtro-academica", "filtro-deportiva", "filtro-social", "filtro-economica"];
const valoresFiltros = ["todas", "academica", "deportiva", "social", "economica"];

for (let i = 0; i < idsFiltros.length; i++) {
  const boton = document.querySelector("#" + idsFiltros[i]);
  const valor = valoresFiltros[i];

  boton.addEventListener("click", () => {
    for (let j = 0; j < idsFiltros.length; j++) {
      document.querySelector("#" + idsFiltros[j]).classList.remove("activo");
    }
    boton.classList.add("activo");
    filtroActual = valor;
    actualizarVista();
  });
}

for (let i = 1; i <= 8; i++) {
  const boton = document.querySelector("#btn-ver-" + i);
  boton.addEventListener("click", () => {
    abrirModal(i);
  });
}

buscador.addEventListener("input", actualizarVista);
actualizarVista();
