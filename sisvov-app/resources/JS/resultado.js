const perfiles = {
  INTJ: { titulo: "El Estratega", desc: "Analítico y planificador, te gusta entender sistemas completos antes de actuar.", carreras: ["Ingeniería de Sistemas", "Ingeniería Industrial", "Arquitectura"] },
  INTP: { titulo: "El Pensador", desc: "Curioso y lógico, disfrutas explorar ideas y teorías por tu cuenta.", carreras: ["Ingeniería de Sistemas", "Matemáticas", "Física"] },
  ENTJ: { titulo: "El Comandante", desc: "Decidido y organizador, te sientes cómodo liderando proyectos.", carreras: ["Ingeniería Industrial", "Administración de Empresas", "Derecho"] },
  ENTP: { titulo: "El Innovador", desc: "Ingenioso y debatidor, te atraen los retos y las ideas nuevas.", carreras: ["Ingeniería de Sistemas", "Publicidad", "Emprendimiento"] },
  INFJ: { titulo: "El Consejero", desc: "Reflexivo y empático, buscas causas con sentido para los demás.", carreras: ["Psicología", "Trabajo Social", "Educación"] },
  INFP: { titulo: "El Mediador", desc: "Idealista y creativo, valoras la autenticidad por sobre lo convencional.", carreras: ["Diseño Gráfico", "Psicología", "Literatura"] },
  ENFJ: { titulo: "El Protagonista", desc: "Carismático y motivador, te gusta ayudar a otros a crecer.", carreras: ["Educación", "Comunicación", "Recursos Humanos"] },
  ENFP: { titulo: "El Activista", desc: "Entusiasta y sociable, ves posibilidades en todo lo que haces.", carreras: ["Comunicación", "Publicidad", "Diseño"] },
  ISTJ: { titulo: "El Inspector", desc: "Responsable y detallista, cumples lo que prometes con orden.", carreras: ["Contaduría", "Ingeniería Civil", "Administración"] },
  ISFJ: { titulo: "El Protector", desc: "Cuidadoso y leal, das soporte constante a quienes te rodean.", carreras: ["Enfermería", "Educación", "Trabajo Social"] },
  ESTJ: { titulo: "El Ejecutivo", desc: "Organizado y firme, te gusta que los procesos funcionen bien.", carreras: ["Administración de Empresas", "Ingeniería Industrial", "Derecho"] },
  ESFJ: { titulo: "El Cónsul", desc: "Sociable y colaborador, cuidas el bienestar del grupo.", carreras: ["Recursos Humanos", "Enfermería", "Educación"] },
  ISTP: { titulo: "El Virtuoso", desc: "Práctico y observador, te gusta entender cómo funcionan las cosas.", carreras: ["Ingeniería Mecánica", "Ingeniería de Sistemas", "Electrónica"] },
  ISFP: { titulo: "El Aventurero", desc: "Sensible y estético, expresas tus ideas de forma concreta.", carreras: ["Diseño Gráfico", "Arquitectura", "Fotografía"] },
  ESTP: { titulo: "El Emprendedor", desc: "Directo y enérgico, actúas rápido ante cualquier situación.", carreras: ["Administración de Empresas", "Marketing", "Ingeniería Industrial"] },
  ESFP: { titulo: "El Animador", desc: "Espontáneo y expresivo, disfrutas estar en el centro de la acción.", carreras: ["Comunicación", "Diseño", "Turismo"] }
};

const codigoEl        = document.querySelector("#codigo");
const tituloPerfilEl  = document.querySelector("#tituloPerfil");
const descPerfilEl    = document.querySelector("#descPerfil");
const listaCarrerasEl = document.querySelector("#listaCarreras");
const btnVerCarreras  = document.querySelector("#btnVerCarreras");
const accionesEl      = document.querySelector("#accionesResultado");

const codigo = localStorage.getItem("sisvov_codigo");
const perfil = perfiles[codigo];

if (!codigo || !perfil) {
  codigoEl.textContent = "----";
  tituloPerfilEl.textContent = "Aún no hiciste el test";
  descPerfilEl.textContent = "Resuelve el test vocacional para ver tu resultado personalizado.";
  descPerfilEl.classList.remove("alert-secondary");
  descPerfilEl.classList.add("alert-warning");

  if (btnVerCarreras) btnVerCarreras.classList.add("disabled");
} else {
  codigoEl.textContent     = codigo;
  tituloPerfilEl.textContent = perfil.titulo;
  descPerfilEl.textContent   = perfil.desc;

  perfil.carreras.forEach(c => {
    const li = document.createElement("li");
    li.className = "list-group-item bg-transparent text-light border-secondary-subtle";
    li.textContent = c;
    listaCarrerasEl.appendChild(li);
  });
}
