/* ============================================================
   JARDÍN DE FLORES NEÓN
============================================================ */
const colores = ['rosa', 'lila', 'celeste', 'amarilla', 'naranja', 'verde'];
const tiposFlor = ['clasica', 'clasica', 'clasica', 'estrella', 'girasol']; // clásica es la más común
const mensajesFlores = [
  '¡Hola Katherine! 🌼',
  '¡Qué lindo día! ☀️',
  '¡Eres una grande! 💕',
  '¡Sigue siendo sensacional! 🌈',
  '¡Eres muy especial! ⭐',
  '¡ojala te encante este jardin! 🌿',
  '¡Brillas siemprecomo una estrella! ✨'
];

function crearFlor(izquierdaPct) {
  const flor = document.createElement('div');
  let tipo = tiposFlor[Math.floor(Math.random() * tiposFlor.length)];
  // El girasol siempre se ve amarillo/naranja, como un girasol real
  const color = tipo === 'girasol'
    ? (Math.random() < 0.5 ? 'amarilla' : 'naranja')
    : colores[Math.floor(Math.random() * colores.length)];

  flor.className = `flor tipo-${tipo} ${color}`;
  flor.style.left = izquierdaPct + '%';
  flor.style.animationDelay = (Math.random() * 2) + 's';
  flor.style.transform = `scale(${0.75 + Math.random() * 0.5})`;
  flor.setAttribute('tabindex', '0');
  flor.setAttribute('role', 'button');
  flor.setAttribute('aria-label', 'Flor, tócala para un mensaje de Katherine');

  const numPetalos = tipo === 'girasol'
    ? 11 + Math.floor(Math.random() * 3) // girasol: pétalos más numerosos y delgados
    : 5 + Math.floor(Math.random() * 2); // clásica/estrella: 5 u 6, como flores reales

  const generarCapa = () => {
    let html = '';
    for (let p = 0; p < numPetalos; p++) {
      const angulo = (360 / numPetalos) * p;
      html += `<div class="petalo" style="transform: rotate(${angulo}deg) translateY(-6px);"></div>`;
    }
    return html;
  };

  flor.innerHTML = `
    <div class="sombra-flor"></div>
    <div class="cabeza">
      <div class="petalos-capa trasera">${generarCapa()}</div>
      <div class="petalos-capa">${generarCapa()}</div>
      <div class="centro"></div>
    </div>
    <div class="tallo">
      <div class="hoja"></div>
      <div class="hoja derecha"></div>
    </div>
  `;

  const activarFlor = () => {
    flor.style.animation = 'none';
    flor.offsetHeight;
    flor.style.animation = 'mecer 0.4s ease-in-out 3';

    const texto = mensajesFlores[Math.floor(Math.random() * mensajesFlores.length)];
    mostrarMensajeFlotante(texto, flor);
  };

  flor.addEventListener('click', (e) => {
    e.stopPropagation();
    activarFlor();
  });

  // Accesibilidad: permite activar la flor con teclado (Enter o Espacio)
  flor.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      activarFlor();
    }
  });

  return flor;
}

const jardinFrente = document.getElementById('jardin-frente');
const jardinFondo = document.getElementById('jardin-fondo');
const totalFloresInicial = 12;

for (let i = 0; i < totalFloresInicial; i++) {
  const izquierda = 3 + (i * (94 / totalFloresInicial)) + (Math.random() * 3 - 1.5);
  jardinFrente.appendChild(crearFlor(izquierda));
}
for (let i = 0; i < 8; i++) {
  jardinFondo.appendChild(crearFlor(5 + Math.random() * 90));
}

// Mensaje flotante temporal al tocar una flor
let mensajeFlotanteTimeout;
function mostrarMensajeFlotante(texto, flor) {
  let globo = document.getElementById('globo-temporal');
  if (!globo) {
    globo = document.createElement('div');
    globo.id = 'globo-temporal';
    globo.style.position = 'fixed';
    globo.style.background = 'white';
    globo.style.color = '#ff2fb8';
    globo.style.padding = '6px 14px';
    globo.style.borderRadius = '20px';
    globo.style.fontWeight = 'bold';
    globo.style.fontSize = '0.85em';
    globo.style.boxShadow = '0 3px 12px rgba(0,0,0,0.3)';
    globo.style.zIndex = '30';
    globo.style.pointerEvents = 'none';
    globo.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(globo);
  }
  const rect = flor.getBoundingClientRect();
  globo.style.left = rect.left + rect.width / 2 + 'px';
  globo.style.top = (rect.top - 20) + 'px';
  globo.style.transform = 'translate(-50%, -100%)';
  globo.textContent = texto;
  globo.style.opacity = '1';

  clearTimeout(mensajeFlotanteTimeout);
  mensajeFlotanteTimeout = setTimeout(() => {
    globo.style.opacity = '0';
  }, 1500);
}

// Clic en el césped para hacer crecer más flores
let floresPlantadasCount = 0;
let estrellasTocadasCount = 0;

document.getElementById('pasto').addEventListener('click', (e) => {
  const scene = document.getElementById('scene');
  const rect = scene.getBoundingClientRect();
  const pctIzquierda = ((e.clientX - rect.left) / rect.width) * 100;
  const nuevaFlor = crearFlor(pctIzquierda);
  nuevaFlor.style.transform = 'scale(0)';
  jardinFrente.appendChild(nuevaFlor);
  requestAnimationFrame(() => {
    nuevaFlor.style.transition = 'transform 0.4s ease';
    nuevaFlor.style.transform = `scale(${0.85 + Math.random() * 0.4})`;
  });
  floresPlantadasCount++;
});

/* ============================================================
   MODAL DE CONTRASEÑA SECRETA
============================================================ */
const CONTRASENA_CORRECTA = 'katherine';

const modalPassword = document.getElementById('modalPassword');
const modalSecreto = document.getElementById('modalSecreto');
const btnPassword = document.getElementById('btnPassword');
const btnConfirmar = document.getElementById('btnConfirmar');
const inputPassword = document.getElementById('inputPassword');
const errorPassword = document.getElementById('errorPassword');

const mensajesSecretos = [
  'Katherine, este jardín y este universo existen para recordarte lo especial que eres. Cada flor, cada estrella, cada mensaje... todo fue pensado con muchísimo cariño para ti. 💖',
  'Katherine, eres como una flor que nunca deja de florecer: alegre, única y llena de luz propia. Nunca olvides lo maravillosa que eres. 🌸✨',
  'Katherine, en un jardín lleno de flores y un universo lleno de estrellas, tú sigues siendo lo más bonito que existe. 💫🌷'
];

btnPassword.addEventListener('click', () => {
  inputPassword.value = '';
  errorPassword.textContent = '';
  modalPassword.classList.add('activo');
  setTimeout(() => inputPassword.focus(), 100);
});

document.getElementById('cerrarModalPassword').addEventListener('click', () => {
  modalPassword.classList.remove('activo');
});

document.getElementById('cerrarModalSecreto').addEventListener('click', () => {
  modalSecreto.classList.remove('activo');
});

function intentarContrasena() {
  const valor = inputPassword.value.trim().toLowerCase();
  if (valor === CONTRASENA_CORRECTA) {
    modalPassword.classList.remove('activo');
    revelarMensajeSecreto();
  } else {
    errorPassword.textContent = 'Contraseña incorrecta, ¡inténtalo de nuevo! 🌷';
  }
}

btnConfirmar.addEventListener('click', intentarContrasena);
inputPassword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') intentarContrasena();
});

function revelarMensajeSecreto() {
  const texto = mensajesSecretos[Math.floor(Math.random() * mensajesSecretos.length)];
  document.getElementById('textoSecreto').textContent = texto;
  modalSecreto.classList.add('activo');
  lanzarCorazones();
}

function lanzarCorazones() {
  const contenedor = document.getElementById('corazonesFlotantes');
  contenedor.innerHTML = '';
  const emojis = ['💖', '💕', '✨', '🌸', '💫'];
  for (let i = 0; i < 16; i++) {
    const c = document.createElement('span');
    c.className = 'corazon-flotante';
    c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    c.style.left = Math.random() * 90 + '%';
    c.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    c.style.animationDelay = (Math.random() * 2) + 's';
    contenedor.appendChild(c);
  }
}

/* ============================================================
   CARTA COMPLETA
============================================================ */
const modalCarta = document.getElementById('modalCarta');
const btnCarta = document.getElementById('btnCarta');
const textoCarta = document.getElementById('textoCarta');

const parrafosCarta = [
  'Katherine, quise construirte algo que no se pudiera envolver en papel: un jardín que nunca se marchita, un cielo que nunca se acaba de explorar.',
  'Cada flor que plantaste aquí es una excusa para recordarte algo bonito, y cada estrella del universo guarda un mensaje distinto, porque contigo nunca me alcanzan las palabras para decirlo todo de una sola vez.',
  'Quiero que sepas que admiro tu forma de ver la vida, tu manera de encontrarle color a los días grises, y lo fácil que haces sentir a las personas que te rodean.',
  'Si algún día vuelves a este jardín y necesitas recordar algo, que sea esto: eres de las personas que hacen que el mundo valga más la pena.',
  'Gracias por ser tú, Katherine. Este pequeño rincón mágico siempre va a estar aquí para ti. 💖🌸'
];

btnCarta.addEventListener('click', () => {
  textoCarta.innerHTML = parrafosCarta.map(p => `<p>${p}</p>`).join('');
  modalCarta.classList.add('activo');
});

document.getElementById('cerrarModalCarta').addEventListener('click', () => {
  modalCarta.classList.remove('activo');
});

/* ============================================================
   MODAL DE RESPUESTA (para que Katherine responda si le gustó)
============================================================ */
// 👉 Personaliza estos datos con tu número de WhatsApp (con código de país,
// sin "+" ni espacios) y tu correo, para que las respuestas te lleguen a ti.
const NUMERO_WHATSAPP = '50375918382';
const CORREO_DESTINO = 'adrielitoesau@gmail.com';

const btnRespuesta = document.getElementById('btnRespuesta');
const modalRespuesta = document.getElementById('modalRespuesta');
const textoRespuesta = document.getElementById('textoRespuesta');
const reaccionesRapidas = document.getElementById('reaccionesRapidas');
const estadoRespuesta = document.getElementById('estadoRespuesta');

btnRespuesta.addEventListener('click', () => {
  modalRespuesta.classList.add('activo');
  estadoRespuesta.textContent = '';
});

document.getElementById('cerrarModalRespuesta').addEventListener('click', () => {
  modalRespuesta.classList.remove('activo');
});

reaccionesRapidas.querySelectorAll('.chip-reaccion').forEach((chip) => {
  chip.addEventListener('click', () => {
    reaccionesRapidas.querySelectorAll('.chip-reaccion').forEach(c => c.classList.remove('activo'));
    chip.classList.add('activo');
    textoRespuesta.value = chip.dataset.texto;
    textoRespuesta.focus();
  });
});

function obtenerTextoRespuesta() {
  const texto = textoRespuesta.value.trim();
  return texto || 'Me encantó mi jardín mágico 💕';
}

document.getElementById('btnEnviarWhatsapp').addEventListener('click', () => {
  const mensaje = `Respuesta desde El Jardín de Katherine 🌸: ${obtenerTextoRespuesta()}`;
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
  estadoRespuesta.textContent = 'Abriendo WhatsApp... ¡gracias por tu respuesta! 💌';
});

document.getElementById('btnEnviarEmail').addEventListener('click', () => {
  const asunto = 'Respuesta desde El Jardín de Katherine 🌸';
  const cuerpo = obtenerTextoRespuesta();
  const url = `mailto:${CORREO_DESTINO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  window.location.href = url;
  estadoRespuesta.textContent = 'Abriendo tu correo... ¡gracias por tu respuesta! 💌';
});

/* ============================================================
   UNIVERSO CON SATURNO Y MENSAJES INFINITOS
============================================================ */
const universo = document.getElementById('universo');
const btnUniverso = document.getElementById('btnUniverso');
const btnVolver = document.getElementById('btnVolver');
const canvas = document.getElementById('canvasUniverso');
const ctx = canvas.getContext('2d');
const tarjetaMensaje = document.getElementById('tarjetaMensaje');
const textoUniverso = document.getElementById('textoUniverso');
const contadorMensajes = document.getElementById('contadorMensajes');

let animando = false;
let particulas = [];
let estrellasFondo = [];
let cometas = [];
let proximoCometa = 0;
let anguloLuna = 0;
let anchoCanvas, altoCanvas, centroX, centroY;
let estrellasCorazon = [];
let anguloPlaneta2 = 0;
let planeta2Pos = null;

// Mensajes especiales del segundo planeta ("Venus")
const mensajesPlaneta2 = [
  '💜 Este pequeño planeta gira solo para recordarte que también hay lugar para más sueños por cumplir.',
  '💜 Cada planeta de este universo tiene una razón de existir, y este está aquí solo para hacerte sonreír un poco más.',
  '💜 Katherine, ojalá pudieras ver este universo como lo veo yo: con muchísimo espacio para todo lo bueno que te mereces.'
];

// Mensaje único de la estrella especial escondida en la constelación
const mensajeEstrellaEspecial =
  '✨ Encontraste la estrella especial. De todo este universo lleno de estrellas, esta es la que más brilla — igual que tú entre todo lo demás. Gracias por llegar hasta aquí, Katherine. 💖';

// Generador combinatorio: más de 2.5 millones de mensajes distintos posibles
const inicios = [
  'Katherine, eres', 'Katherine, tienes', 'Katherine, brillas como', 'Katherine, tu sonrisa es',
  'Katherine, tu corazón es', 'Katherine, tu forma de ser es', 'Katherine, cada día demuestras que eres',
  'Katherine, para quienes te queremos, eres', 'Katherine, el mundo es mejor porque eres',
  'Katherine, nunca olvides que eres'
];
const adjetivos = [
  'increíble', 'especial', 'única', 'radiante', 'valiente', 'brillante', 'maravillosa',
  'inolvidable', 'extraordinaria', 'talentosa', 'dulce', 'fuerte', 'luminosa', 'auténtica',
  'creativa', 'generosa', 'divertida', 'soñadora', 'inspiradora', 'preciosa'
];
const cualidades = [
  'una luz que ilumina todo a su paso', 'una estrella que nunca deja de brillar',
  'un tesoro para quienes te conocen', 'una razón para sonreír cada día',
  'capaz de lograr todo lo que te propongas', 'alguien que hace del mundo un lugar mejor',
  'digna de todo el cariño del universo', 'la protagonista de tu propia historia mágica',
  'un jardín que nunca deja de florecer', 'un cielo lleno de posibilidades'
];
const cierres = [
  'nunca lo olvides. 💖', 'y así seguirá siendo siempre. ✨', 'hoy, mañana y siempre. 🌸',
  'y eso es un regalo para el mundo. 🪐', 'porque así naciste tú. 🌟', 'y nada podrá cambiarlo. 💫',
  'así que sigue brillando. 🌈', 'y todo el universo lo sabe. 🌌'
];
const emojisFinal = ['💖', '✨', '🌸', '🪐', '🌟', '💫', '🌈', '🦋'];

const TOTAL_COMBINACIONES = inicios.length * adjetivos.length * cualidades.length * cierres.length * emojisFinal.length;

function generarMensajeUniverso() {
  const i = inicios[Math.floor(Math.random() * inicios.length)];
  const a = adjetivos[Math.floor(Math.random() * adjetivos.length)];
  const c = cualidades[Math.floor(Math.random() * cualidades.length)];
  const f = cierres[Math.floor(Math.random() * cierres.length)];
  const e = emojisFinal[Math.floor(Math.random() * emojisFinal.length)];
  return `${e} ${i} ${a}, ${c}, ${f}`;
}

function ajustarCanvas() {
  // Usamos devicePixelRatio para que el canvas se vea nítido en pantallas
  // de teléfono de alta densidad (retina), en vez de borroso.
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  anchoCanvas = window.innerWidth;
  altoCanvas = window.innerHeight;
  canvas.width = Math.round(anchoCanvas * dpr);
  canvas.height = Math.round(altoCanvas * dpr);
  canvas.style.width = anchoCanvas + 'px';
  canvas.style.height = altoCanvas + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  centroX = anchoCanvas / 2;
  centroY = altoCanvas / 2;
}

let ajusteCanvasTimeout;
function ajustarCanvasConDebounce() {
  clearTimeout(ajusteCanvasTimeout);
  ajusteCanvasTimeout = setTimeout(() => {
    if (universo.classList.contains('activo')) ajustarCanvas();
  }, 120);
}
window.addEventListener('resize', ajustarCanvasConDebounce);
window.addEventListener('orientationchange', ajustarCanvasConDebounce);

function crearParticulas() {
  particulas = [];
  const cantidad = 90;
  for (let i = 0; i < cantidad; i++) {
    particulas.push({
      radio: 90 + Math.random() * (Math.min(anchoCanvas, altoCanvas) / 2 - 100),
      angulo: Math.random() * Math.PI * 2,
      velocidad: (0.0025 + Math.random() * 0.004) * (Math.random() < 0.5 ? 1 : -1),
      tamano: 1.5 + Math.random() * 2.5,
      color: ['#ffffff', '#ffe066', '#ff9de2', '#a2e4ff', '#c9a8ff'][Math.floor(Math.random() * 5)],
      inclinacion: Math.random() * 0.5 - 0.25,
      brillo: Math.random()
    });
  }
}

function crearConstelacionCorazon() {
  estrellasCorazon = [];
  const puntos = 22;
  const escala = Math.min(anchoCanvas, altoCanvas) * 0.011;
  const cx = anchoCanvas * 0.22;
  const cy = altoCanvas * 0.26;
  const indiceEspecial = Math.floor(Math.random() * puntos);

  for (let i = 0; i < puntos; i++) {
    const t = (Math.PI * 2 * i) / puntos;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    estrellasCorazon.push({
      x: cx + hx * escala,
      y: cy + hy * escala,
      especial: i === indiceEspecial,
      fase: Math.random() * Math.PI * 2
    });
  }
}

function crearEstrellasFondo() {
  estrellasFondo = [];
  for (let i = 0; i < 160; i++) {
    estrellasFondo.push({
      x: Math.random() * anchoCanvas,
      y: Math.random() * altoCanvas,
      r: Math.random() * 1.4,
      fase: Math.random() * Math.PI * 2
    });
  }
}

function dibujarSaturno(t) {
  const radioPlaneta = Math.min(anchoCanvas, altoCanvas) * 0.09;

  // Anillo trasero
  ctx.save();
  ctx.translate(centroX, centroY);
  ctx.rotate(-0.25);
  ctx.scale(1, 0.35);
  ctx.beginPath();
  ctx.arc(0, 0, radioPlaneta * 2.1, Math.PI * 0.05, Math.PI * 0.95);
  ctx.strokeStyle = 'rgba(255, 224, 160, 0.55)';
  ctx.lineWidth = radioPlaneta * 0.28;
  ctx.stroke();
  ctx.restore();

  // Planeta
  const grad = ctx.createRadialGradient(
    centroX - radioPlaneta * 0.3, centroY - radioPlaneta * 0.3, radioPlaneta * 0.1,
    centroX, centroY, radioPlaneta
  );
  grad.addColorStop(0, '#ffe9b8');
  grad.addColorStop(0.6, '#f5c26b');
  grad.addColorStop(1, '#c98a3f');
  ctx.beginPath();
  ctx.arc(centroX, centroY, radioPlaneta, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.shadowColor = 'rgba(245, 194, 107, 0.6)';
  ctx.shadowBlur = 30;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Anillo delantero
  ctx.save();
  ctx.translate(centroX, centroY);
  ctx.rotate(-0.25);
  ctx.scale(1, 0.35);
  ctx.beginPath();
  ctx.arc(0, 0, radioPlaneta * 2.1, Math.PI * 1.05, Math.PI * 1.95);
  ctx.strokeStyle = 'rgba(255, 224, 160, 0.9)';
  ctx.lineWidth = radioPlaneta * 0.28;
  ctx.stroke();
  ctx.restore();

  // Lunita orbitando
  anguloLuna += 0.006;
  const radioOrbitaLuna = radioPlaneta * 3.1;
  const lx = centroX + Math.cos(anguloLuna) * radioOrbitaLuna;
  const ly = centroY + Math.sin(anguloLuna) * radioOrbitaLuna * 0.4;
  const escalaLuna = 0.6 + (Math.sin(anguloLuna) + 1) / 2 * 0.5;
  ctx.beginPath();
  ctx.arc(lx, ly, radioPlaneta * 0.16 * escalaLuna, 0, Math.PI * 2);
  const gradLuna = ctx.createRadialGradient(lx - 2, ly - 2, 1, lx, ly, radioPlaneta * 0.16);
  gradLuna.addColorStop(0, '#f5f5ff');
  gradLuna.addColorStop(1, '#b8b8d9');
  ctx.fillStyle = gradLuna;
  ctx.shadowColor = 'rgba(200,200,255,0.6)';
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;
}

function dibujarConstelacionCorazon(t) {
  estrellasCorazon.forEach(e => {
    const parpadeo = 0.55 + Math.abs(Math.sin(t / 700 + e.fase)) * 0.45;
    const radio = e.especial ? 3.4 : 1.8;
    ctx.beginPath();
    ctx.arc(e.x, e.y, radio, 0, Math.PI * 2);
    ctx.fillStyle = e.especial ? '#fffbe0' : '#ffc9ec';
    ctx.globalAlpha = parpadeo;
    ctx.shadowColor = e.especial ? '#ffe066' : '#ff6fd8';
    ctx.shadowBlur = e.especial ? 16 : 8;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  });
}

function dibujarPlaneta2(t) {
  anguloPlaneta2 += 0.0016;
  const radioOrbita = Math.min(anchoCanvas, altoCanvas) * 0.4;
  const px = anchoCanvas * 0.78 + Math.cos(anguloPlaneta2) * radioOrbita * 0.12;
  const py = altoCanvas * 0.72 + Math.sin(anguloPlaneta2) * radioOrbita * 0.06;
  const radioPlaneta2 = Math.min(anchoCanvas, altoCanvas) * 0.045;

  const grad = ctx.createRadialGradient(
    px - radioPlaneta2 * 0.3, py - radioPlaneta2 * 0.3, radioPlaneta2 * 0.1,
    px, py, radioPlaneta2
  );
  grad.addColorStop(0, '#e8d6ff');
  grad.addColorStop(0.6, '#a24bff');
  grad.addColorStop(1, '#5a1fa8');

  ctx.beginPath();
  ctx.arc(px, py, radioPlaneta2, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.shadowColor = 'rgba(162, 75, 255, 0.7)';
  ctx.shadowBlur = 22;
  ctx.fill();
  ctx.shadowBlur = 0;

  planeta2Pos = { x: px, y: py, r: radioPlaneta2 };
}

function dibujarCometas(t) {
  // Genera una estrella fugaz de vez en cuando
  if (t > proximoCometa) {
    cometas.push({
      x: Math.random() * anchoCanvas,
      y: Math.random() * altoCanvas * 0.4,
      angulo: Math.PI / 4 + Math.random() * 0.3,
      velocidad: 9 + Math.random() * 6,
      vida: 0,
      vidaMax: 40 + Math.random() * 20
    });
    proximoCometa = t + 2500 + Math.random() * 4500;
  }

  cometas = cometas.filter(c => c.vida < c.vidaMax);
  cometas.forEach(c => {
    c.vida++;
    c.x += Math.cos(c.angulo) * c.velocidad;
    c.y += Math.sin(c.angulo) * c.velocidad;
    const opacidad = 1 - c.vida / c.vidaMax;

    const largo = 70;
    const cola = ctx.createLinearGradient(
      c.x, c.y,
      c.x - Math.cos(c.angulo) * largo, c.y - Math.sin(c.angulo) * largo
    );
    cola.addColorStop(0, `rgba(255,255,255,${opacidad})`);
    cola.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.beginPath();
    ctx.strokeStyle = cola;
    ctx.lineWidth = 2;
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(c.x - Math.cos(c.angulo) * largo, c.y - Math.sin(c.angulo) * largo);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(c.x, c.y, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${opacidad})`;
    ctx.fill();
  });
}

function animarUniverso(t) {
  if (!animando) return;
  ctx.clearRect(0, 0, anchoCanvas, altoCanvas);

  // Estrellas de fondo titilando
  estrellasFondo.forEach(e => {
    const brillo = 0.4 + Math.abs(Math.sin(t / 800 + e.fase)) * 0.6;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${brillo})`;
    ctx.fill();
  });

  dibujarCometas(t);
  dibujarConstelacionCorazon(t);
  dibujarPlaneta2(t);
  dibujarSaturno(t);

  // Partículas orbitando (mensajes)
  particulas.forEach(p => {
    p.angulo += p.velocidad;
    const x = centroX + Math.cos(p.angulo) * p.radio;
    const y = centroY + Math.sin(p.angulo) * p.radio * (0.55 + p.inclinacion);

    p._x = x;
    p._y = y;

    const parpadeo = 0.6 + Math.abs(Math.sin(t / 500 + p.brillo * 10)) * 0.4;
    ctx.beginPath();
    ctx.arc(x, y, p.tamano, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = parpadeo;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(animarUniverso);
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 1) ¿Tocó una estrella de la constelación en forma de corazón?
  let estrellaCorazon = null;
  let distMinCorazon = 16;
  estrellasCorazon.forEach(es => {
    const d = Math.hypot(es.x - x, es.y - y);
    if (d < distMinCorazon) {
      distMinCorazon = d;
      estrellaCorazon = es;
    }
  });

  if (estrellaCorazon) {
    estrellasTocadasCount++;
    if (estrellaCorazon.especial) {
      textoUniverso.textContent = mensajeEstrellaEspecial;
      contadorMensajes.textContent = '💛 Estrella especial de la constelación';
    } else {
      const mensaje = generarMensajeUniverso();
      textoUniverso.textContent = mensaje;
      contadorMensajes.textContent = '💗 Estrella de la constelación para Katherine';
    }
    tarjetaMensaje.classList.add('activa');
    return;
  }

  // 2) ¿Tocó el segundo planeta?
  if (planeta2Pos) {
    const dPlaneta = Math.hypot(planeta2Pos.x - x, planeta2Pos.y - y);
    if (dPlaneta < planeta2Pos.r + 6) {
      const mensaje = mensajesPlaneta2[Math.floor(Math.random() * mensajesPlaneta2.length)];
      textoUniverso.textContent = mensaje;
      contadorMensajes.textContent = '🪐 Mensaje de tu segundo planeta';
      tarjetaMensaje.classList.add('activa');
      estrellasTocadasCount++;
      return;
    }
  }

  // 3) Partículas orbitando normales
  let masCercana = null;
  let distMin = 22;
  particulas.forEach(p => {
    const d = Math.hypot((p._x || 0) - x, (p._y || 0) - y);
    if (d < distMin) {
      distMin = d;
      masCercana = p;
    }
  });

  if (masCercana) {
    const mensaje = generarMensajeUniverso();
    const numeroFake = Math.floor(Math.random() * TOTAL_COMBINACIONES) + 1;
    textoUniverso.textContent = mensaje;
    contadorMensajes.textContent = `Mensaje #${numeroFake.toLocaleString('es-ES')} de más de ${TOTAL_COMBINACIONES.toLocaleString('es-ES')} para Katherine`;
    tarjetaMensaje.classList.add('activa');
    estrellasTocadasCount++;
  }
});

btnUniverso.addEventListener('click', () => {
  universo.classList.add('activo');
  ajustarCanvas();
  crearEstrellasFondo();
  crearParticulas();
  crearConstelacionCorazon();
  cometas = [];
  proximoCometa = performance.now() + 1200;
  animando = true;
  requestAnimationFrame(animarUniverso);
});

btnVolver.addEventListener('click', () => {
  animando = false;
  universo.classList.remove('activo');
  tarjetaMensaje.classList.remove('activa');
});
/* ============================================================
   PANTALLA DE CIERRE (DESPEDIDA)
============================================================ */
const btnCierre = document.getElementById('btnCierre');
const despedida = document.getElementById('despedida');
const statsDespedida = document.getElementById('statsDespedida');
const btnReiniciar = document.getElementById('btnReiniciar');

function lanzarCorazonesEn(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;
  contenedor.innerHTML = '';
  const emojis = ['💖', '💕', '✨', '🌸', '💫'];
  for (let i = 0; i < 20; i++) {
    const c = document.createElement('span');
    c.className = 'corazon-flotante';
    c.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    c.style.left = Math.random() * 90 + '%';
    c.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    c.style.animationDelay = (Math.random() * 2) + 's';
    contenedor.appendChild(c);
  }
}

btnCierre.addEventListener('click', () => {
  // Si estaba en el universo, lo cerramos primero
  animando = false;
  universo.classList.remove('activo');
  tarjetaMensaje.classList.remove('activa');

  const partesStats = [];
  if (floresPlantadasCount > 0) {
    partesStats.push(`🌸 Plantaste ${floresPlantadasCount} flor${floresPlantadasCount === 1 ? '' : 'es'} nueva${floresPlantadasCount === 1 ? '' : 's'}`);
  }
  if (estrellasTocadasCount > 0) {
    partesStats.push(`✨ Descubriste ${estrellasTocadasCount} mensaje${estrellasTocadasCount === 1 ? '' : 's'} entre las estrellas`);
  }
  statsDespedida.textContent = partesStats.join('  •  ');

  despedida.classList.add('activo');
  lanzarCorazonesEn('corazonesDespedida');
});

btnReiniciar.addEventListener('click', () => {
  despedida.classList.remove('activo');
});

/* ============================================================
   MENSAJE DE BIENVENIDA EVOLUTIVO (cambia según las visitas)
============================================================ */
(function actualizarBienvenida() {
  const elemento = document.getElementById('mensajeBienvenida');
  if (!elemento) return;

  const hoy = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  let ultimaVisita = null;
  let totalVisitas = 0;

  try {
    ultimaVisita = localStorage.getItem('jardinKatherine_ultimaVisita');
    totalVisitas = parseInt(localStorage.getItem('jardinKatherine_totalVisitas') || '0', 10);
  } catch (err) {
    // Si localStorage no está disponible, seguimos sin memoria de visitas
  }

  let mensaje;
  if (!ultimaVisita) {
    mensaje = '✨ ¡Bienvenida a tu jardín, Katherine! Este es tu primer paseo por aquí 💖';
  } else if (ultimaVisita === hoy) {
    mensaje = '🌸 ¿De vuelta tan pronto? Me encanta que sigas explorando 💕';
  } else {
    totalVisitas += 1;
    mensaje = `🌟 ¡Qué bueno tenerte de nuevo! Esta es tu visita número ${totalVisitas + 1} a tu jardín mágico 🌷`;
  }

  elemento.textContent = mensaje;

  try {
    localStorage.setItem('jardinKatherine_ultimaVisita', hoy);
    localStorage.setItem('jardinKatherine_totalVisitas', String(totalVisitas));
  } catch (err) {
    // Si no se puede guardar, el mensaje simplemente no evolucionará entre sesiones
  }
})();

/* ============================================================
   MARIPOSAS INTERACTIVAS Y ACCESIBLES (clic o teclado)
============================================================ */
const mensajesMariposa = [
  '¡Sígueme, Katherine! 🦋',
  '¡Qué bonito verte aquí! 🌸',
  '¡El jardín brilla más contigo! ✨'
];

document.querySelectorAll('.mariposa').forEach(mariposa => {
  const activarMariposa = () => {
    const texto = mensajesMariposa[Math.floor(Math.random() * mensajesMariposa.length)];
    mostrarMensajeFlotante(texto, mariposa);
  };
  mariposa.addEventListener('click', activarMariposa);
  mariposa.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      activarMariposa();
    }
  });
});