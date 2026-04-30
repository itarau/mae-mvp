import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ARQUETIPOS = [
  {
    id: "ejecutor",
    titulo: "El Ejecutor Sofisticado",
    icono: "⚙️",
    descripcion:
      "Usas todas las herramientas disponibles con maestría. Eres el primero en adoptar nuevas tecnologías y produces resultados impresionantes. Pero a veces te preguntas: ¿cuándo fue la última vez que tomaste una decisión importante sin consultar algo o a alguien primero?",
    dolor: "Ejecutas muy bien. Pero ya no sabes bien qué piensas tú solo.",
  },
  {
    id: "experto",
    titulo: "El Experto Desorientado",
    icono: "🧭",
    descripcion:
      "Tienes años de experiencia y conocimiento profundo en tu área. Eres respetado, te consultan, resuelves problemas complejos. Pero el mercado cambió y ahora no sabes qué parte de lo que sabes sigue siendo tu ventaja real.",
    dolor: "Sabes mucho. Pero no sabes qué parte de lo que sabes sigue valiendo.",
  },
  {
    id: "estratega",
    titulo: "El Estratega sin Mapa",
    icono: "🗺️",
    descripcion:
      "Tienes visión y criterio. Puedes leer situaciones complejas y tomar posición. Pero en este momento estás en una encrucijada — un cambio de rol, industria o modelo de trabajo — y tu brújula interna no te da una dirección clara.",
    dolor: "Tienes criterio. Pero perdiste la brújula de hacia dónde.",
  },
  {
    id: "fundador",
    titulo: "El Fundador en la Niebla",
    icono: "🔦",
    descripcion:
      "Estás construyendo algo. Tienes energía, propósito y una idea que crees que importa. Pero las decisiones se acumulan, la incertidumbre es constante, y a veces no sabes si confiar en tu criterio o en el feedback de afuera.",
    dolor: "Estás construyendo. Pero no sabes cuándo confiar en ti y cuándo escuchar.",
  },
];

const PREGUNTAS = [
  // DIMENSIÓN 1: Autonomía Cognitiva
  {
    id: "ac1",
    dimension: "autonomia_cognitiva",
    contexto: "Imagina que tienes que decidir si aceptar un nuevo proyecto importante. Aún no has hablado con nadie al respecto.",
    texto: "¿Cuál es tu patrón más frecuente antes de decidir?",
    opciones: [
      { valor: 2, texto: "Consulto a personas clave antes de decidir qué pienso" },
      { valor: 4, texto: "Formo mi posición primero y luego la contrasto con otros" },
      { valor: 1, texto: "Busco consenso — me incomoda decidir sin validación" },
      { valor: 3, texto: "Recopilo información de varias fuentes antes de formarme una opinión" },
    ],
  },
  {
    id: "ac2",
    dimension: "autonomia_cognitiva",
    contexto: "Estás en una reunión importante. Te piden tu opinión sobre un tema que conoces bien, pero nadie más ha hablado aún.",
    texto: "¿Qué haces habitualmente en ese momento?",
    opciones: [
      { valor: 1, texto: "Espero a escuchar a otros primero para no quedar fuera de lugar" },
      { valor: 3, texto: "Doy mi opinión con algunas reservas, dependiendo de quién esté presente" },
      { valor: 4, texto: "Doy mi posición directamente — es mi patrón habitual" },
      { valor: 2, texto: "Prefiero preguntar antes para asegurarme de que mi lectura es correcta" },
    ],
  },
  {
    id: "ac3",
    dimension: "autonomia_cognitiva",
    contexto: "Usas ChatGPT o Claude para analizar una situación compleja. El output suena muy razonable y bien argumentado.",
    texto: "¿Cómo describes tu relación con ese output?",
    opciones: [
      { valor: 3, texto: "Lo tomo como un punto de vista más, lo contrasto con lo que pienso" },
      { valor: 1, texto: "Siento que el output generalmente es mejor que mi propio análisis" },
      { valor: 4, texto: "Lo uso como insumo — a veces lo ignoro si no coincide con mi criterio" },
      { valor: 2, texto: "Tiendo a aceptarlo si suena razonable, sin cuestionarlo mucho" },
    ],
  },
  {
    id: "ac4",
    dimension: "autonomia_cognitiva",
    contexto: "Acabas de dar tu posición en una reunión. Un directivo senior dice que no está de acuerdo y propone algo diferente.",
    texto: "¿Qué haces habitualmente?",
    opciones: [
      { valor: 4, texto: "Evalúo si su argumento tiene mérito real y mantengo o cambio según eso" },
      { valor: 2, texto: "Me cuesta mantener mi posición — tiendo a ceder ante la autoridad" },
      { valor: 3, texto: "Escucho con atención y reconsidero si el argumento es sólido" },
      { valor: 1, texto: "Si alguien con autoridad discrepa, asumo que probablemente estaba equivocado/a" },
    ],
  },
  {
    id: "ac5",
    dimension: "autonomia_cognitiva",
    contexto: "Alguien te pregunta directamente: '¿Tú qué harías en mi lugar?' sobre una decisión importante.",
    texto: "¿Qué tan seguido sientes que no tienes una posición propia clara antes de responder?",
    opciones: [
      { valor: 2, texto: "Con cierta frecuencia — a veces me doy cuenta que no tengo posición propia" },
      { valor: 4, texto: "Raramente — casi siempre sé lo que pienso, aunque no siempre lo diga" },
      { valor: 1, texto: "Con frecuencia — me cuesta distinguir lo que pienso yo de lo que me dijeron" },
      { valor: 3, texto: "Ocasionalmente — en temas muy complejos o con mucha presión" },
    ],
  },
  // DIMENSIÓN 2: Capacidad Estratégica
  {
    id: "ce1",
    dimension: "capacidad_estrategica",
    contexto: "Tienes que decidir entre dos caminos profesionales. Ambos tienen ventajas, pero la información disponible es incompleta y el contexto sigue cambiando.",
    texto: "¿Qué haces?",
    opciones: [
      { valor: 3, texto: "Espero a tener más datos, pero tengo claro hasta cuándo esperar" },
      { valor: 1, texto: "La incertidumbre me paraliza — necesito más claridad antes de moverme" },
      { valor: 4, texto: "Tomo posición con la información disponible y ajusto si aparece nueva evidencia" },
      { valor: 2, texto: "Me cuesta decidir — prefiero esperar aunque eso tenga costo" },
    ],
  },
  {
    id: "ce2",
    dimension: "capacidad_estrategica",
    contexto: "Piensa en tu situación profesional hoy. Han pasado 6 meses desde que te planteaste por última vez hacia dónde quieres ir.",
    texto: "¿Qué tan claro tienes adónde quieres llegar en los próximos 2-3 años?",
    opciones: [
      { valor: 1, texto: "No tengo claridad — estoy respondiendo más que eligiendo" },
      { valor: 4, texto: "Muy claro — tengo una dirección definida y estoy tomando decisiones hacia ahí" },
      { valor: 2, texto: "Parcialmente — tengo algunas ideas pero no una dirección clara" },
      { valor: 3, texto: "Bastante claro — tengo una dirección pero algunos elementos siguen abiertos" },
    ],
  },
  {
    id: "ce3",
    dimension: "capacidad_estrategica",
    contexto: "Sabes que la decisión correcta va a generar fricción con alguien importante — un jefe, un cliente, un socio.",
    texto: "¿Con qué frecuencia igual la tomas?",
    opciones: [
      { valor: 2, texto: "Pocas veces — tiendo a evitar esas situaciones" },
      { valor: 4, texto: "Con regularidad — es parte de lo que implica tener criterio propio" },
      { valor: 1, texto: "Casi nunca — prefiero el consenso antes que la fricción" },
      { valor: 3, texto: "Ocasionalmente — cuando la evidencia es muy clara" },
    ],
  },
  {
    id: "ce4",
    dimension: "capacidad_estrategica",
    contexto: "Un proyecto que llevas meses desarrollando empieza a mostrar señales de que algo no está funcionando — métricas bajas, feedback negativo, resistencia interna.",
    texto: "¿Cuál es tu respuesta más frecuente?",
    opciones: [
      { valor: 4, texto: "Lo enfrento directo — ajusto el plan o lo detengo si es necesario" },
      { valor: 1, texto: "Tiendo a seguir adelante esperando que mejore" },
      { valor: 3, texto: "Lo evalúo cuidadosamente antes de hacer cambios significativos" },
      { valor: 2, texto: "Espero más señales antes de concluir que hay un problema real" },
    ],
  },
  // DIMENSIÓN 3: Conciencia Contextual
  {
    id: "cc1",
    dimension: "conciencia_contextual",
    contexto: "Estás en una reunión donde todos dicen estar de acuerdo, pero algo en el ambiente se siente tenso. Nadie está expresando lo que realmente piensa.",
    texto: "¿Qué tan bien lees ese tipo de situaciones?",
    opciones: [
      { valor: 1, texto: "Me cuesta leer entre líneas — me quedo con lo que se dice explícitamente" },
      { valor: 3, texto: "Lo hago bien — con tiempo y atención puedo leer bien la sala" },
      { valor: 2, texto: "A veces — pero me pierdo cosas que otros captan mejor" },
      { valor: 4, texto: "Es una de mis fortalezas — capto dinámicas que otros no ven" },
    ],
  },
  {
    id: "cc2",
    dimension: "conciencia_contextual",
    contexto: "Alguien te pregunta: '¿Qué es lo que tú haces que una IA no puede hacer igual?' Tienes 30 segundos para responder.",
    texto: "¿Qué tan claro tienes esa respuesta hoy?",
    opciones: [
      { valor: 4, texto: "Muy claro — sé exactamente qué aporto que la IA no puede replicar" },
      { valor: 2, texto: "Con dificultad — me cuesta separar lo que es genuinamente mío" },
      { valor: 3, texto: "Bastante bien — tengo una idea clara, aunque con algunas dudas" },
      { valor: 1, texto: "No tengo claridad — esa es precisamente mi pregunta más urgente" },
    ],
  },
  {
    id: "cc3",
    dimension: "conciencia_contextual",
    contexto: "Un proyecto importante no está dando los resultados esperados. Tu equipo cree que el problema es la ejecución, pero algo te dice que el problema es más profundo.",
    texto: "¿Qué tan rápido sueles identificar la causa real versus los síntomas?",
    opciones: [
      { valor: 3, texto: "Lo hago bien — con algo de reflexión llego a la causa" },
      { valor: 1, texto: "Me cuesta — generalmente necesito que otros me ayuden a ver la causa" },
      { valor: 4, texto: "Generalmente lo veo rápido — distingo síntomas de causas con facilidad" },
      { valor: 2, texto: "A veces — me quedo en los síntomas más de lo que quisiera" },
    ],
  },
  {
    id: "cc4",
    dimension: "conciencia_contextual",
    contexto: "Tu industria está cambiando aceleradamente. Nuevos jugadores, nuevas tecnologías, roles que desaparecen y otros que emergen.",
    texto: "¿Cuán bien estás leyendo hacia dónde se mueve tu campo y qué implica para ti?",
    opciones: [
      { valor: 2, texto: "Con dificultad — el contexto está muy cambiante y me cuesta leerlo" },
      { valor: 4, texto: "Muy bien — tengo una lectura clara y estoy tomando decisiones en consecuencia" },
      { valor: 1, texto: "No lo estoy haciendo bien — estoy más reactivo/a que anticipando" },
      { valor: 3, texto: "Bastante bien — veo la dirección aunque algunos aspectos siguen inciertos" },
    ],
  },
  // DIMENSIÓN 4: Arquitectura Energética
  {
    id: "ae1",
    dimension: "arquitectura_energetica",
    contexto: "Piensa en tu semana típica. Tienes que tomar decisiones importantes, hacer análisis complejos y mantener el foco en lo estratégico.",
    texto: "¿Cómo describes tu capacidad actual para sostener ese tipo de pensamiento de forma consistente?",
    opciones: [
      { valor: 4, texto: "Alta — puedo hacer trabajo de pensamiento complejo de forma consistente" },
      { valor: 1, texto: "Muy baja — estoy en modo reactivo casi todo el tiempo" },
      { valor: 3, texto: "Moderada — tengo buenos momentos pero también mucha dispersión" },
      { valor: 2, texto: "Baja — la fatiga y las interrupciones afectan mucho mi calidad de análisis" },
    ],
  },
  // DIMENSIÓN 5: Adaptabilidad Evolutiva
  {
    id: "ad1",
    dimension: "adaptabilidad_evolutiva",
    contexto: "Piensa en algo que creías firmemente hace 1-2 años — una forma de trabajar, una creencia sobre tu industria, un modelo mental sobre cómo funcionan las cosas.",
    texto: "¿Con qué frecuencia has cambiado significativamente ese tipo de creencias cuando la evidencia lo exigía?",
    opciones: [
      { valor: 1, texto: "Casi nunca — mis modelos mentales son bastante estables" },
      { valor: 3, texto: "Ocasionalmente — ocurre pero no con mucha frecuencia" },
      { valor: 4, texto: "Con regularidad — desaprender es parte de cómo opero" },
      { valor: 2, texto: "Pocas veces — me cuesta soltar lo que ya sé hacer bien" },
    ],
  },
];

// ─── UTILS// ─── UTILS ───────────────────────────────────────────────────────────────────

function calcularScores(respuestas) {
  const dimensiones = {
    autonomia_cognitiva: [],
    capacidad_estrategica: [],
    conciencia_contextual: [],
    arquitectura_energetica: [],
    adaptabilidad_evolutiva: [],
  };
  Object.entries(respuestas).forEach(([id, valor]) => {
    const pregunta = PREGUNTAS.find((p) => p.id === id);
    if (pregunta) dimensiones[pregunta.dimension].push(valor);
  });
  const scores = {};
  Object.entries(dimensiones).forEach(([dim, vals]) => {
    scores[dim] = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  });
  return scores;
}

function buildPrompt(arquetipo, respuestas, scores, nombre) {
  const arq = ARQUETIPOS.find((a) => a.id === arquetipo);
  const scoreTexto = Object.entries(scores)
    .map(([k, v]) => `${k}: ${v.toFixed(2)}/4`)
    .join(", ");

  const respuestasTexto = PREGUNTAS.map((p) => {
    const val = respuestas[p.id];
    const opcion = p.opciones.find((o) => o.valor === val);
    return `${p.texto}\nRespuesta: ${opcion?.texto || "Sin respuesta"} (valor: ${val}/4)`;
  }).join("\n\n");

  return `Eres el sistema de diagnóstico MAE (Marco de Autonomía Estratégica). Tu rol es generar un diagnóstico honesto, preciso y útil basado en las respuestas del usuario.

CONTEXTO:
- Nombre: ${nombre || "el usuario"}
- Arquetipo elegido: ${arq?.titulo} — "${arq?.dolor}"
- Scores por dimensión: ${scoreTexto}

RESPUESTAS COMPLETAS:
${respuestasTexto}

INSTRUCCIONES PARA EL DIAGNÓSTICO:
Genera un diagnóstico estructurado en JSON con exactamente este formato (responde SOLO con el JSON, sin texto adicional):

{
  "patron_dominante": {
    "titulo": "nombre corto del patrón (ej: 'El Analista que no Decide')",
    "descripcion": "2-3 frases que describan el patrón central de forma incómoda y precisa. Debe sentirse como un espejo."
  },
  "lo_que_realmente_pasa": "1 párrafo de revelación. No lo que el usuario cree que le pasa, sino lo que el diagnóstico revela. Debe ser directo e incómodo.",
  "fortaleza_dominante": {
    "titulo": "nombre de la fortaleza principal",
    "descripcion": "2 frases describiendo la fortaleza real que muestran los datos"
  },
  "friccion_critica": {
    "titulo": "nombre del limitante principal",
    "descripcion": "2 frases describiendo el patrón que más lo limita hoy"
  },
  "ventajas_irreemplazables": [
    {
      "titulo": "Nombre de la ventaja",
      "descripcion": "1 frase describiendo la ventaja",
      "con_ia": "1 frase de cómo amplificarla con IA sin perderla"
    },
    {
      "titulo": "Nombre de la ventaja",
      "descripcion": "1 frase describiendo la ventaja",
      "con_ia": "1 frase de cómo amplificarla con IA sin perderla"
    },
    {
      "titulo": "Nombre de la ventaja",
      "descripcion": "1 frase describiendo la ventaja",
      "con_ia": "1 frase de cómo amplificarla con IA sin perderla"
    }
  ],
  "uso_actual_ia": "1 párrafo describiendo cómo el usuario probablemente está usando mal la IA basado en su perfil",
  "accionable": {
    "titulo": "Nombre del experimento (ej: 'El Experimento de la Posición Primero')",
    "instruccion": "Instrucción concreta de qué hacer en los próximos 7 días. Específico, incómodo, medible.",
    "que_revela": "1 frase de qué va a aprender sobre sí mismo/a"
  },
  "cierre": "2 frases de cierre. La primera nombra la fortaleza central. La segunda, el próximo paso más importante."
}

PRINCIPIOS:
- Sé directo/a. No suavices. El valor está en la incomodidad productiva.
- Habla en segunda persona, en español.
- Basa TODO en los datos reales de las respuestas, no en generalidades.
- El "patrón dominante" debe ser único para este perfil específico, no genérico.`;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${pct}%` }} />
      <span className="progress-label">{current} / {total}</span>
    </div>
  );
}

function PantallaInicio({ onStart }) {
  return (
    <div className="pantalla pantalla-inicio">
      <div className="inicio-content">
        <div className="mae-badge">MAE</div>
        <h1 className="inicio-titulo">Marco de<br />Autonomía<br />Estratégica</h1>
        <p className="inicio-subtitulo">
          En la era de la IA, lo que diferencia a un profesional no es lo que sabe.<br />
          Es la calidad de su criterio.
        </p>
        <p className="inicio-desc">
          Descubre dónde está tu criterio real, qué lo frena, y qué capacidades ninguna IA puede reemplazar.
        </p>
        <div className="inicio-meta">
          <span>⏱ 8–10 minutos</span>
          <span>🔒 Confidencial</span>
          <span>📊 Resultado inmediato</span>
        </div>
        <button className="btn-primary" onClick={onStart}>
          Comenzar diagnóstico →
        </button>
      </div>
    </div>
  );
}

function PantallaNombre({ onNext }) {
  const [nombre, setNombre] = useState("");
  return (
    <div className="pantalla pantalla-nombre">
      <div className="form-content">
        <p className="pregunta-label">Antes de empezar</p>
        <h2 className="pregunta-titulo">¿Cómo te llamas?</h2>
        <p className="pregunta-desc">Solo tu nombre. El diagnóstico lo usará para hablar contigo directamente.</p>
        <input
          className="input-nombre"
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && nombre.trim() && onNext(nombre.trim())}
          autoFocus
        />
        <button
          className="btn-primary"
          disabled={!nombre.trim()}
          onClick={() => onNext(nombre.trim())}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}

function PantallaArquetipo({ onNext }) {
  const [seleccionado, setSeleccionado] = useState(null);
  return (
    <div className="pantalla pantalla-arquetipo">
      <div className="arquetipo-content">
        <p className="pregunta-label">Paso 1 de 3 — Contexto</p>
        <h2 className="pregunta-titulo">¿Cuál de estos perfiles te representa mejor ahora mismo?</h2>
        <p className="pregunta-desc">Elige el que más resuena, aunque no sea perfecto.</p>
        <div className="arquetipos-grid">
          {ARQUETIPOS.map((arq) => (
            <button
              key={arq.id}
              className={`arquetipo-card ${seleccionado === arq.id ? "selected" : ""}`}
              onClick={() => setSeleccionado(arq.id)}
            >
              <span className="arq-icono">{arq.icono}</span>
              <h3 className="arq-titulo">{arq.titulo}</h3>
              <p className="arq-desc">{arq.descripcion}</p>
              <p className="arq-dolor">"{arq.dolor}"</p>
            </button>
          ))}
        </div>
        <button
          className="btn-primary"
          disabled={!seleccionado}
          onClick={() => onNext(seleccionado)}
        >
          Continuar →
        </button>
      </div>
    </div>
  );
}

function PantallaDiagnostico({ onComplete }) {
  const [indice, setIndice] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [seleccionActual, setSeleccionActual] = useState(null);
  const pregunta = PREGUNTAS[indice];
  const total = PREGUNTAS.length;

  const handleOpcion = (valor) => setSeleccionActual(valor);

  const handleSiguiente = () => {
    const nuevasRespuestas = { ...respuestas, [pregunta.id]: seleccionActual };
    if (indice < total - 1) {
      setRespuestas(nuevasRespuestas);
      setSeleccionActual(null);
      setIndice(indice + 1);
    } else {
      onComplete(nuevasRespuestas);
    }
  };

  const DIMENSION_LABELS = {
    autonomia_cognitiva: "Autonomía Cognitiva",
    capacidad_estrategica: "Capacidad Estratégica",
    conciencia_contextual: "Conciencia Contextual",
    arquitectura_energetica: "Arquitectura Energética",
    adaptabilidad_evolutiva: "Adaptabilidad Evolutiva",
  };

  return (
    <div className="pantalla pantalla-diagnostico">
      <div className="diag-content">
        <ProgressBar current={indice + 1} total={total} />
        <p className="dimension-badge">{DIMENSION_LABELS[pregunta.dimension]}</p>
        <h2 className="pregunta-titulo">{pregunta.texto}</h2>
        {pregunta.contexto && (
          <div className="contexto-box">
            💭 {pregunta.contexto}
          </div>
        )}
        <div className="opciones-lista">
          {pregunta.opciones.map((op, i) => (
            <button
              key={i}
              className={`opcion-btn ${seleccionActual === op.valor ? "selected" : ""}`}
              onClick={() => handleOpcion(op.valor)}
            >
              <span className="opcion-check">{seleccionActual === op.valor ? "●" : "○"}</span>
              <span className="opcion-texto">{op.texto}</span>
            </button>
          ))}
        </div>
        <button
          className="btn-primary"
          disabled={seleccionActual === null}
          onClick={handleSiguiente}
        >
          {indice < total - 1 ? "Siguiente →" : "Ver mi diagnóstico →"}
        </button>
      </div>
    </div>
  );
}

function PantallaCargando() {
  const [fase, setFase] = useState(0);
  const fases = [
    "Analizando tus patrones de criterio...",
    "Identificando tu arquitectura de autonomía...",
    "Detectando tus ventajas irreemplazables...",
    "Construyendo tu diagnóstico...",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setFase((f) => (f < fases.length - 1 ? f + 1 : f));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="pantalla pantalla-cargando">
      <div className="cargando-content">
        <div className="spinner" />
        <p className="cargando-texto">{fases[fase]}</p>
      </div>
    </div>
  );
}

function ScoreDimensiones({ scores }) {
  const dimensiones = {
    autonomia_cognitiva: {
      label: "Autonomía Cognitiva",
      sub: "Tu capacidad de pensar y decidir con criterio propio, sin depender de validación externa"
    },
    capacidad_estrategica: {
      label: "Capacidad Estratégica",
      sub: "Tu habilidad de mantener dirección y tomar decisiones cuando la información es incompleta"
    },
    conciencia_contextual: {
      label: "Conciencia Contextual",
      sub: "Tu capacidad de leer situaciones complejas, detectar lo no dicho y anticipar movimientos"
    },
    arquitectura_energetica: {
      label: "Arquitectura Energética",
      sub: "Tu capacidad de sostener pensamiento de alta calidad de forma consistente durante la semana"
    },
    adaptabilidad_evolutiva: {
      label: "Adaptabilidad Evolutiva",
      sub: "Tu velocidad para actualizar creencias y modelos mentales cuando el contexto cambia"
    },
  };
  return (
    <div className="scores-container">
      {Object.entries(scores).map(([dim, val]) => (
        <div key={dim} className="score-row">
          <div className="score-label-group">
            <span className="score-label">{dimensiones[dim].label}</span>
            <span className="score-sublabel">{dimensiones[dim].sub}</span>
          </div>
          <div className="score-bar-bg">
            <div className="score-bar-fill" style={{ width: `${(val / 4) * 100}%` }} />
          </div>
          <span className="score-num">{val.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}

function PantallaResultado({ resultado, scores, nombre, arquetipo, onReiniciar }) {
  const arq = ARQUETIPOS.find((a) => a.id === arquetipo);
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [email, setEmail] = useState("");

  if (!resultado) return null;

  return (
    <div className="pantalla pantalla-resultado">
      <div className="resultado-content">
        {/* Header */}
        <div className="resultado-header">
          <div className="mae-badge-small">MAE · Diagnóstico</div>
          <h1 className="resultado-patron">{resultado.patron_dominante?.titulo}</h1>
          <p className="resultado-patron-desc">{resultado.patron_dominante?.descripcion}</p>
        </div>

        {/* Scores */}
        <div className="seccion">
          <h3 className="seccion-titulo">Tu arquitectura de autonomía</h3>
          <ScoreDimensiones scores={scores} />
        </div>

        {/* Lo que realmente pasa */}
        <div className="seccion seccion-revelacion">
          <h3 className="seccion-titulo">Lo que realmente está pasando</h3>
          <p className="texto-revelacion">{resultado.lo_que_realmente_pasa}</p>
        </div>

        {/* Fortaleza + Fricción */}
        <div className="seccion-grid-2">
          <div className="card-fortaleza">
            <span className="card-icon">💪</span>
            <h4>{resultado.fortaleza_dominante?.titulo}</h4>
            <p>{resultado.fortaleza_dominante?.descripcion}</p>
          </div>
          <div className="card-friccion">
            <span className="card-icon">⚠️</span>
            <h4>{resultado.friccion_critica?.titulo}</h4>
            <p>{resultado.friccion_critica?.descripcion}</p>
          </div>
        </div>

        {/* Ventajas irreemplazables */}
        <div className="seccion">
          <h3 className="seccion-titulo">Tus ventajas irreemplazables</h3>
          <p className="seccion-subtitulo">Lo que es genuinamente tuyo — y cómo amplificarlo con IA sin perderlo</p>
          <div className="ventajas-lista">
            {resultado.ventajas_irreemplazables?.map((v, i) => (
              <div key={i} className="ventaja-card">
                <div className="ventaja-numero">{i + 1}</div>
                <div className="ventaja-content">
                  <h4>{v.titulo}</h4>
                  <p>{v.descripcion}</p>
                  <div className="con-ia">
                    <span className="ia-label">Con IA →</span>
                    <span>{v.con_ia}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uso actual IA */}
        <div className="seccion seccion-ia">
          <h3 className="seccion-titulo">Cómo estás usando la IA hoy</h3>
          <p>{resultado.uso_actual_ia}</p>
        </div>

        {/* Accionable */}
        <div className="seccion seccion-accionable">
          <h3 className="seccion-titulo">Tu experimento de los próximos 7 días</h3>
          <div className="accionable-card">
            <h4>{resultado.accionable?.titulo}</h4>
            <p className="accionable-instruccion">{resultado.accionable?.instruccion}</p>
            <p className="accionable-revela">
              <strong>Qué vas a descubrir:</strong> {resultado.accionable?.que_revela}
            </p>
          </div>
        </div>

        {/* Cierre */}
        <div className="seccion seccion-cierre">
          <p className="cierre-texto">{resultado.cierre}</p>
        </div>

        {/* Seguimiento */}
        {!emailEnviado ? (
          <div className="seccion seccion-email">
            <h3 className="seccion-titulo">¿Quieres el seguimiento a 48 horas?</h3>
            <p>En 2 días te preguntaré una sola cosa: ¿cambió algo en cómo estás pensando tu situación?</p>
            <div className="email-form">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-email"
              />
              <button
                className="btn-secondary"
                onClick={() => setEmailEnviado(true)}
                disabled={!email.includes("@")}
              >
                Sí, quiero el seguimiento
              </button>
            </div>
          </div>
        ) : (
          <div className="seccion seccion-email confirmado">
            <p>✓ Te escribiremos en 48 horas. Mientras tanto, haz el experimento.</p>
          </div>
        )}

        <button className="btn-ghost" onClick={onReiniciar}>
          Hacer nuevo diagnóstico
        </button>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [paso, setPaso] = useState("inicio"); // inicio | nombre | arquetipo | diagnostico | cargando | resultado
  const [nombre, setNombre] = useState("");
  const [arquetipo, setArquetipo] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [scores, setScores] = useState({});
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const handleDiagnosticoCompleto = async (resp) => {
    setRespuestas(resp);
    const sc = calcularScores(resp);
    setScores(sc);
    setPaso("cargando");

    const prompt = buildPrompt(arquetipo, resp, sc, nombre);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 4000,
          system: "Eres el sistema de diagnóstico MAE. Respondes SOLO con JSON válido, sin markdown, sin texto adicional.",
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      console.log("API response:", JSON.stringify(data));
      if (data.error) {
        setError("Error API: " + data.error.message + " (tipo: " + data.error.type + ")");
        setPaso("diagnostico");
        return;
      }
      const texto = data.content?.find((b) => b.type === "text")?.text || "";
      console.log("Texto recibido:", texto.substring(0, 200));
      const clean = texto.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResultado(parsed);
      setPaso("resultado");
    } catch (err) {
      console.error("Error completo:", err);
      setError("Error: " + err.message);
      setPaso("diagnostico");
    }
  };

  const reiniciar = () => {
    setPaso("inicio");
    setNombre("");
    setArquetipo(null);
    setRespuestas({});
    setScores({});
    setResultado(null);
    setError(null);
  };

  return (
    <div className="app">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}
      {paso === "inicio" && <PantallaInicio onStart={() => setPaso("nombre")} />}
      {paso === "nombre" && <PantallaNombre onNext={(n) => { setNombre(n); setPaso("arquetipo"); }} />}
      {paso === "arquetipo" && <PantallaArquetipo onNext={(a) => { setArquetipo(a); setPaso("diagnostico"); }} />}
      {paso === "diagnostico" && <PantallaDiagnostico onComplete={handleDiagnosticoCompleto} />}
      {paso === "cargando" && <PantallaCargando />}
      {paso === "resultado" && (
        <PantallaResultado
          resultado={resultado}
          scores={scores}
          nombre={nombre}
          arquetipo={arquetipo}
          onReiniciar={reiniciar}
        />
      )}
    </div>
  );
}
