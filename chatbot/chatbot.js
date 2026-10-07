const SIMILITUD_MINIMA = 0.34;

const GRUPOS_SIMILITUD = [
    ["test", "prueba", "cuestionario", "evaluacion", "evaluación", "testeo"],
    ["vocacional", "vocacion", "vocación", "orientacion", "orientación", "profesional"],
    ["funciona", "funcionamiento", "sirve", "utilidad", "hacer", "realizar"],
    ["requisito", "requisitos", "necesito", "necesitar", "requiere", "requerimiento"],
    ["gratis", "gratuito", "gratis", "cobran", "costo", "pago", "pagar"],
    ["universidad", "universidades", "institucion", "instituciones", "institución", "instituciones"],
    ["instituto", "institutos", "tecnico", "técnico", "tecnicos", "técnicos"],
    ["informacion", "información", "datos", "detalle", "detalles", "contenido"],
    ["inscripcion", "inscripción", "matricula", "matrícula", "inscribirme", "matricularme", "registrarme"],
    ["prefa", "prefas", "preuniversitario", "preuniversitarios", "ingreso", "admisión", "admision", "examen"],
    ["materia", "materias", "temario", "temarios", "asignatura", "asignaturas"],
    ["malla", "mallas", "curricula", "curricular", "plan", "estudio", "estudios"],
    ["beca", "becas", "financiamiento", "ayuda", "economica", "económica"],
    ["buscar", "buscador", "encontrar", "catalogo", "catálogo", "filtro", "filtrar"],
    ["postular", "postulacion", "postulación", "aplicar", "solicitar", "convocatoria"],
    ["papeles", "documentos", "documentacion", "documentación", "requisitos"],
    ["monto", "montos", "dinero", "cobertura", "cubren", "cubre", "beneficio"],
    ["fecha", "fechas", "plazo", "plazos", "limite", "límite", "vigencia"],
    ["chatbot", "asistente", "asistencia", "ayuda", "pregunta", "consultar"],
    ["persona", "humano", "humana", "real", "robot", "virtual", "ia", "inteligencia"],
    ["problema", "tramite", "trámite", "caso", "administrativo", "universidad"],
    ["objetivo", "objetivos", "creo", "creada", "crear", "desinformacion", "desinformación", "proposito", "propósito"],
    ["internet", "conexion", "conexión", "online", "linea", "línea", "red"],
    ["funciona", "offline", "internet", "conexion", "conexión"],
];

const PALABRAS_VACIAS = new Set([
    "que", "qué", "como", "cómo", "cual", "cuál", "cuales", "cuáles", "para", "por", "el", "la", "los", "las",
    "un", "una", "unos", "unas", "de", "del", "al", "en", "y", "o", "a", "me", "te", "se", "mi", "mis",
    "yo", "aqui", "aquí", "hay", "puedo", "pueden", "tengo", "tienen", "es", "son", "es", "si", "sí", "no",
    "desde", "esta", "este", "estas", "estos", "tambien", "también", "más", "mas", "muy", "solo", "sólo"
]);

const RESPUESTAS_CORTESIA = [
    { tipo: "saludo", palabras: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches"], respuesta: "¡Hola! 👋 Soy el asistente virtual de SISVOV. Puedo orientarte sobre el test vocacional, universidades e institutos, becas y el funcionamiento de la plataforma." },
    { tipo: "agradecimiento", palabras: ["gracias", "muchas gracias", "te agradezco"], respuesta: "¡De nada! 😊 Estoy aquí para orientarte con la información disponible en SISVOV." }
];

function respuestaCortesia(preguntaUsuario) {
    const texto = normalizarTexto(preguntaUsuario);
    for (const item of RESPUESTAS_CORTESIA) {
        const coincide = item.palabras.some(palabra => {
            const palabraNormalizada = normalizarTexto(palabra);
            return texto === palabraNormalizada || texto.includes(palabraNormalizada);
        });
        if (coincide) return item.respuesta;
    }
    return null;
}

const BASE_CONOCIMIENTO = [
    {
        categoria: "Test vocacional",
        pregunta: "¿Qué es y cómo funciona el test vocacional?",
        respuesta: "Es un cuestionario interactivo que analiza tus respuestas e intereses personales para sugerirte carreras y áreas de estudio que te puedan gustar.",
        variantes: [
            "Que es el test vocacional",
            "Como funciona el test",
            "Como se hace la prueba vocacional",
            "Para que sirve el cuestionario de orientacion",
            "Quiero realizar el test vocacional"
        ],
        palabrasClave: "test vocacional cuestionario analizar respuestas intereses carreras áreas estudio"
    },
    {
        categoria: "Test vocacional",
        pregunta: "¿Qué requisitos necesito para hacer el test vocacional?",
        respuesta: "El único requisito para usar la plataforma y realizar el test vocacional es tener una conexión activa a Internet en todo momento.",
        variantes: [
            "Que necesito para hacer el test",
            "Necesito algun requisito para la prueba",
            "Puedo realizar el test desde cualquier lugar",
            "Se necesita internet para el test",
            "Que debo tener para hacer el cuestionario"
        ],
        palabrasClave: "requisitos test vocacional internet conexion activa plataforma"
    },
    {
        categoria: "Test vocacional",
        pregunta: "¿Me cobran por hacer el test vocacional?",
        respuesta: "No, nuestra plataforma está diseñada para guiar y simplificar el proceso de elección profesional de los bachilleres de forma accesible.",
        variantes: [
            "El test es gratis",
            "Cuanto cuesta hacer el test",
            "Tengo que pagar por la prueba",
            "Cobran por realizar el cuestionario",
            "Hay algun costo para usar el test"
        ],
        palabrasClave: "cobran pagar costo gratis gratuito test vocacional plataforma accesible"
    },
    {
        categoria: "Universidades e institutos",
        pregunta: "¿Qué información de las universidades puedo encontrar aquí?",
        respuesta: "Contamos con información de universidades públicas, privadas e institutos técnicos. Puedes revisar sus mallas curriculares, planes de estudio, la duración de las carreras y los requisitos de admisión.",
        variantes: [
            "Que informacion tienen de las universidades",
            "Que datos puedo ver de una universidad",
            "Puedo consultar carreras e institutos",
            "Que ofrece el sistema sobre las instituciones",
            "Que puedo saber de una universidad aqui"
        ],
        palabrasClave: "universidades públicas privadas institutos tecnicos información mallas curriculares planes estudio duración carreras requisitos admisión"
    },
    {
        categoria: "Universidades e institutos",
        pregunta: "¿Me puedo inscribir o matricular en la universidad a través de esta página?",
        respuesta: "No, nuestro sistema solo proporciona información y orientación. No realizamos inscripciones oficiales, matriculaciones directas, ni cobros de pensiones o matrículas.",
        variantes: [
            "Puedo inscribirme en la universidad desde esta pagina",
            "Puedo matricularme aqui",
            "La plataforma hace la inscripcion",
            "Puedo pagar la matricula por aqui",
            "Ustedes registran estudiantes"
        ],
        palabrasClave: "inscribirme matricularme inscripción matrícula universidad plataforma pagos pensiones información orientación"
    },
    {
        categoria: "Universidades e institutos",
        pregunta: "¿Tienen guías para los exámenes de ingreso o prefas?",
        respuesta: "¡Sí! Tenemos una sección especial donde publicamos los temarios y las materias que debes revisar para los exámenes de admisión o cursos pre-universitarios.",
        variantes: [
            "Tienen material para examen de ingreso",
            "Hay guias para prefa",
            "Puedo ver temarios para admision",
            "Que debo estudiar para entrar a la universidad",
            "Publican materias del preuniversitario"
        ],
        palabrasClave: "guias examen ingreso prefas preuniversitario temarios materias admisión estudio"
    },
    {
        categoria: "Universidades e institutos",
        pregunta: "¿De dónde sacan la información de las materias y carreras?",
        respuesta: "Toda la información que mostramos, como mallas curriculares, costos y fechas, proviene de la información pública que proporcionan las mismas instituciones educativas.",
        variantes: [
            "De donde obtienen los datos de las universidades",
            "De donde sale la informacion de las carreras",
            "Quien proporciona la informacion",
            "La informacion es oficial",
            "De donde sacan las mallas y costos"
        ],
        palabrasClave: "fuente información materias carreras mallas costos fechas pública instituciones educativas oficial"
    },
    {
        categoria: "Buscador de becas",
        pregunta: "¿Cómo puedo buscar una beca que se adapte a mí?",
        respuesta: "Contamos con un catálogo interactivo con filtros. Puedes buscar becas revisando los requisitos, cuánto dinero cubren y las fechas límite para postular.",
        variantes: [
            "Como encuentro una beca para mi perfil",
            "Donde busco becas",
            "Como funciona el buscador de becas",
            "Quiero encontrar una beca",
            "Puedo filtrar las becas"
        ],
        palabrasClave: "buscar beca catálogo filtros requisitos dinero cobertura fechas postular"
    },
    {
        categoria: "Buscador de becas",
        pregunta: "¿Puedo enviar mis papeles o postular a la beca desde este chat/página?",
        respuesta: "No, nosotros te mostramos los requisitos y te guiamos hacia las convocatorias oficiales, pero no recibimos documentos ni nos encargamos de la adjudicación final de las becas.",
        variantes: [
            "Puedo postular a una beca desde aqui",
            "Puedo enviar documentos por el chat",
            "Reciben mis papeles para la beca",
            "Ustedes hacen la postulacion",
            "Puedo solicitar la beca en la pagina"
        ],
        palabrasClave: "postular beca enviar papeles documentos chat página convocatorias oficiales adjudicación requisitos"
    },
    {
        categoria: "Buscador de becas",
        pregunta: "¿Qué información exacta me dan sobre las becas?",
        respuesta: "Te detallamos los requisitos necesarios para aplicar, los montos de cobertura (dinero que cubren) y los plazos o fechas de postulación.",
        variantes: [
            "Que datos muestran sobre las becas",
            "Que incluye la informacion de una beca",
            "Puedo ver cuanto cubre una beca",
            "Muestran los requisitos y fechas",
            "Que detalles tiene cada convocatoria"
        ],
        palabrasClave: "becas información requisitos montos cobertura dinero plazos fechas postulación convocatoria"
    },
    {
        categoria: "Capacidades del chatbot",
        pregunta: "¿En qué más me puedes ayudar? / ¿Para qué sirves?",
        respuesta: "Estoy aquí para responder tus preguntas frecuentes sobre la oferta educativa, enseñarte cómo usar el sitio web y explicarte cómo son los procesos de postulación a las instituciones.",
        variantes: [
            "En que puedes ayudarme",
            "Para que sirve el chatbot",
            "Que puedes hacer",
            "Que consultas puedo hacerte",
            "Puedes orientarme con la plataforma"
        ],
        palabrasClave: "ayuda chatbot asistente oferta educativa usar sitio web procesos postulación instituciones"
    },
    {
        categoria: "Capacidades del chatbot",
        pregunta: "Tengo un problema con un trámite en mi universidad, ¿puedes ayudarme a resolverlo?",
        respuesta: "Lo siento, no realizo trámites administrativos personalizados ni resuelvo casos académicos específicos de las universidades. Mis respuestas se basan en la base de datos de nuestro sistema para orientarte.",
        variantes: [
            "Puedes resolver mi problema universitario",
            "Puedes hacer un tramite por mi",
            "Necesito solucionar un caso de mi universidad",
            "Puedes ayudarme con un problema administrativo",
            "Puedes intervenir en mi trámite"
        ],
        palabrasClave: "problema trámite administrativo académico universidad resolver caso personalizado sistema base datos orientación"
    },
    {
        categoria: "Capacidades del chatbot",
        pregunta: "¿Eres una persona real?",
        respuesta: "Soy un asistente virtual entrenado para resolver consultas frecuentes en tiempo real sobre instituciones y ofertas académicas dentro del Sistema de Orientación Vocacional.",
        variantes: [
            "Eres humano",
            "Hay una persona hablando conmigo",
            "Eres una inteligencia artificial",
            "Eres un robot",
            "Quien me responde"
        ],
        palabrasClave: "persona real humano chatbot asistente virtual inteligencia artificial robot consultas tiempo real"
    },
    {
        categoria: "Preguntas generales",
        pregunta: "¿Por qué se creó esta plataforma? / ¿Cuál es su objetivo?",
        respuesta: "Nacimos para solucionar el problema de la desinformación. Queremos centralizar la información de educación superior y técnica para que los bachilleres puedan comparar mallas curriculares y becas sin confundirse navegando por sitios aislados.",
        variantes: [
            "Por que hicieron SISVOV",
            "Cual es el objetivo del sistema",
            "Para que se creo la plataforma",
            "Que problema quieren solucionar",
            "Que busca lograr SISVOV"
        ],
        palabrasClave: "objetivo plataforma SISVOV crear desinformación centralizar educación superior técnica bachilleres comparar mallas becas"
    },
    {
        categoria: "Preguntas generales",
        pregunta: "¿La página funciona sin internet?",
        respuesta: "No, el sistema, mi asistencia (el chatbot) y el test vocacional requieren estrictamente de una conexión activa a Internet para funcionar en tiempo real.",
        variantes: [
            "Puedo usar la pagina sin internet",
            "El chatbot funciona offline",
            "Necesito internet para usar SISVOV",
            "Se puede usar sin conexion",
            "La plataforma necesita datos móviles o wifi"
        ],
        palabrasClave: "página sistema chatbot test internet conexión activa online offline tiempo real"
    }
];

function quitarAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizarTexto(texto) {
    return quitarAcentos(String(texto).toLowerCase())
        .replace(/[^a-z0-9ñ\s]/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function tokenizar(texto) {
    return normalizarTexto(texto)
        .split(" ")
        .map(palabra => palabra.trim())
        .filter(palabra => palabra.length > 1 && !PALABRAS_VACIAS.has(palabra));
}

function buscarCanonico(palabra) {
    for (const grupo of GRUPOS_SIMILITUD) {
        const grupoNormalizado = grupo.map(item => quitarAcentos(item.toLowerCase()));
        if (grupoNormalizado.includes(palabra)) {
            return grupoNormalizado[0];
        }
    }
    return palabra;
}

function tokensCanonicos(texto) {
    return tokenizar(texto).map(buscarCanonico);
}

function crearFrecuencias(tokens) {
    const frecuencias = {};
    for (const token of tokens) {
        frecuencias[token] = (frecuencias[token] || 0) + 1;
    }
    return frecuencias;
}

function distanciaLevenshtein(a, b) {
    const fila = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        let anterior = fila[0];
        fila[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const temporal = fila[j];
            const costo = a[i - 1] === b[j - 1] ? 0 : 1;
            fila[j] = Math.min(
                fila[j] + 1,
                fila[j - 1] + 1,
                anterior + costo
            );
            anterior = temporal;
        }
    }
    return fila[b.length];
}

function equivalenciaFuzzy(tokenA, tokenB) {
    if (tokenA === tokenB) return 1;
    if (tokenA.length < 4 || tokenB.length < 4) return 0;
    const distancia = distanciaLevenshtein(tokenA, tokenB);
    const mayor = Math.max(tokenA.length, tokenB.length);
    const similitud = 1 - distancia / mayor;
    return similitud >= 0.76 ? similitud : 0;
}

function cosenoSimilitud(textoA, textoB) {
    const tokensA = tokensCanonicos(textoA);
    const tokensB = tokensCanonicos(textoB);
    if (!tokensA.length || !tokensB.length) return 0;
    const frecuenciaA = crearFrecuencias(tokensA);
    const frecuenciaB = crearFrecuencias(tokensB);
    const vocabulario = new Set([...Object.keys(frecuenciaA), ...Object.keys(frecuenciaB)]);
    let producto = 0;
    let normaA = 0;
    let normaB = 0;
    for (const palabra of vocabulario) {
        const valorA = frecuenciaA[palabra] || 0;
        const valorB = frecuenciaB[palabra] || 0;
        producto += valorA * valorB;
        normaA += valorA * valorA;
        normaB += valorB * valorB;
    }
    if (normaA === 0 || normaB === 0) return 0;
    return producto / (Math.sqrt(normaA) * Math.sqrt(normaB));
}

function coincidenciaFuzzy(textoUsuario, textoBase) {
    const usuario = [...new Set(tokensCanonicos(textoUsuario))];
    const base = [...new Set(tokensCanonicos(textoBase))];
    if (!usuario.length || !base.length) return 0;
    let coincidencias = 0;
    for (const tokenUsuario of usuario) {
        let mejor = 0;
        for (const tokenBase of base) {
            mejor = Math.max(mejor, equivalenciaFuzzy(tokenUsuario, tokenBase));
            if (mejor === 1) break;
        }
        coincidencias += mejor;
    }
    return coincidencias / usuario.length;
}

function calcularSimilitud(preguntaUsuario, item) {
    const corpusItem = [item.pregunta, ...item.variantes, item.palabrasClave].join(" ");
    const coseno = cosenoSimilitud(preguntaUsuario, corpusItem);
    const fuzzy = coincidenciaFuzzy(preguntaUsuario, corpusItem);
    let puntuacion = (coseno * 0.70) + (fuzzy * 0.30);
    const preguntaNormalizada = normalizarTexto(preguntaUsuario);
    const palabrasClave = tokensCanonicos(item.palabrasClave);
    if (palabrasClave.some(palabra => preguntaNormalizada.includes(palabra))) {
        puntuacion += 0.05;
    }
    return Math.min(puntuacion, 1);
}

function encontrarRespuesta(preguntaUsuario) {
    const cortesia = respuestaCortesia(preguntaUsuario);
    if (cortesia) {
        return { categoria: "Conversación", respuesta: cortesia, similitud: 1 };
    }
    let mejorItem = null;
    let mejorPuntuacion = 0;
    for (const item of BASE_CONOCIMIENTO) {
        const puntuacion = calcularSimilitud(preguntaUsuario, item);

        if (puntuacion > mejorPuntuacion) {
            mejorPuntuacion = puntuacion;
            mejorItem = item;
        }
    }
    if (!mejorItem || mejorPuntuacion < SIMILITUD_MINIMA) {
        return {
            categoria: "No encontrada",
            respuesta: "No encontré una respuesta suficientemente relacionada con tu pregunta. Puedes preguntarme sobre el test vocacional, universidades e institutos, becas, trámites y el funcionamiento de SISVOV."
        };
    }
    return {
        categoria: mejorItem.categoria,
        respuesta: mejorItem.respuesta,
        similitud: mejorPuntuacion
    };
}

function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function agregarMensaje(texto, tipo) {
    const chatBody = document.getElementById("chatBody");
    const fila = document.createElement("div");
    fila.className = `message-row ${tipo === "user" ? "user-row" : "bot-row"}`;

    const mensaje = document.createElement("div");
    mensaje.className = `message ${tipo === "user" ? "user-message" : "bot-message"}`;

    if (tipo === "bot") {
        mensaje.innerHTML = `<div class="message-label">SISVOV</div><p>${escaparHTML(texto)}</p>`;
    } else {
        mensaje.innerHTML = `<p>${escaparHTML(texto)}</p>`;
    }

    fila.appendChild(mensaje);
    chatBody.appendChild(fila);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function mostrarEscribiendo() {
    const chatBody = document.getElementById("chatBody");
    const fila = document.createElement("div");
    fila.id = "typingMessage";
    fila.className = "message-row bot-row";
    fila.innerHTML = `
        <div class="message bot-message">
            <div class="message-label">SISVOV</div>
            <div class="typing" aria-label="Escribiendo">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatBody.appendChild(fila);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function quitarEscribiendo() {
    const typing = document.getElementById("typingMessage");
    if (typing) typing.remove();
}

function procesarPregunta(pregunta) {
    const texto = pregunta.trim();
    if (!texto) return;

    agregarMensaje(texto, "user");
    document.getElementById("userInput").value = "";
    mostrarEscribiendo();

    setTimeout(() => {
        const resultado = encontrarRespuesta(texto);
        quitarEscribiendo();
        agregarMensaje(resultado.respuesta, "bot");
    }, 350);
}

document.getElementById("chatForm").addEventListener("submit", event => {
    event.preventDefault();
    procesarPregunta(document.getElementById("userInput").value);
});

document.querySelectorAll(".quick-btn").forEach(boton => {
    boton.addEventListener("click", () => {
        procesarPregunta(boton.dataset.question);
    });
});