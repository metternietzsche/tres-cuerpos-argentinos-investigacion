'use strict';

// ─── Constants ─────────────────────────────────────────────────────────────────

const DATA_PATH = 'data/';
const PUBLICATION_CACHE_KEY = '20260818e';
const OFFICIAL_HCDN_ARCHIVE = 'https://www.hcdn.gob.ar/secparl/dgral_info_parlamentaria/mensajes_presidenciales/index.html';
const RESEARCH_REPOSITORY = 'https://github.com/metternietzsche/tres-cuerpos-argentinos-investigacion';

const DATA_FILES = [
  'site_meta.json',
  'game_meta.json',
  'vectors.json',
  'configurations.json',
  'case_units.json',
  'actors_hcdn.json',
  'actor_publication.json',
  'documents_hcdn.json',
  'orbital_documents.json',
  'orbital_case_units.json',
  'peron_phase_cards.json',
  'caveat_badges.json',
  'roadmap.json',
  'evidence_excerpts.json',
  'legend_gameplay_translation.v0.2.json',
  'text_analysis_registry.v0.1.json',
  'text_analysis_reference.v0.1.json',
];

const REQUIRED_DATA_FILES = new Set(['site_meta.json', 'vectors.json', 'caveat_badges.json']);
const WHITEPAPER_FILE = 'WHITEPAPER_FULL_DRAFT_v0_4.md';

const VECTOR_COLORS = {
  tecnocracia:  '#50b5ff',
  mesianismo:   '#f05f8e',
  paternalismo: '#efb64b',
};

const LOGO_PATH     = 'assets/logo.webp?v=20260815';
const FIGURES_PATH  = 'assets/figures/';

// Known corpus gaps: actor_id → list of { year, note }
const CORPUS_GAPS = {
  milei:    [{ year: 2023, note: 'La asunción está leída en NB12, pero todavía no integra la misma serie cuantitativa HCDN.' }],
  cfk:      [{ year: 2009, note: 'Sin documentos codificados en el corpus para este período.' }],
  albertof: [{ year: 2023, note: 'Sin documentos codificados en el corpus para este período.' }],
};

const SEVERITY_CSS = {
  info:     'badge-info',
  caution:  'badge-caution',
  high:     'badge-high',
  blocking: 'badge-blocking',
};

// ─── State ─────────────────────────────────────────────────────────────────────

let D        = {};  // data store: key (filename without .json) → parsed JSON
let badgeMap = {};  // badge_id → badge object
let actorMap = {};  // actor_id → actor object
let whitepaperPromise = null;
let routeEpoch = 0;

const LABORATORY_SAMPLE = `Este es un texto sintético preparado para mostrar el laboratorio. Nuestro gobierno propone un plan de desarrollo con inversión pública, infraestructura energética y una reforma del Estado que publique datos oficiales. Vamos a sostener una gestión transparente, una política económica verificable y un presupuesto nacional capaz de financiar ciencia y tecnología. La planificación estratégica debe aumentar la capacidad productiva sin ocultar sus costos.

También afirmamos que vivimos un momento histórico. La voluntad popular nos dio un mandato popular para abrir una nueva etapa histórica y superar el viejo orden. Asumimos una causa nacional que convoque a la ciudadanía, renueve el deber democrático y haga visible el destino de nuestro país.

Ese rumbo sólo vale si produce justicia social. Nuestro gobierno va a garantizar seguridad social, salud pública, educación pública y vivienda digna. Vamos a proteger los derechos de los trabajadores, fortalecer el salario mínimo y ampliar la protección social de las familias más vulnerables. El Estado debe garantizar que la modernización no abandone a quienes necesitan cuidado. Este ejemplo no pertenece a una candidatura real y no debe leerse como evidencia histórica.`;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function vectorColor(v) {
  return VECTOR_COLORS[v] || 'var(--text-2)';
}

// Renders a directed configuration label with full readable names.
// First vector capitalized, rest lowercase. Separator " + " with spaces.
// Handles both "tecnocracia+paternalismo" (full names) and "pat_tec" (short ids).
function colorConfig(label) {
  if (!label) return '<span class="muted">—</span>';
  if (label === 'indeterminate') return '<span class="config-indeterminate">indeterminate</span>';

  // Full name map for display (full readable labels, not abbreviations)
  const fullName = {
    tecnocracia: 'tecnocracia', mesianismo: 'mesianismo', paternalismo: 'paternalismo', none: 'none',
    // short-id → full name for the "_" format
    tec: 'tecnocracia', mes: 'mesianismo', pat: 'paternalismo',
  };
  const cls = {
    tecnocracia: 'config-tec', mesianismo: 'config-mes', paternalismo: 'config-pat', none: 'config-none',
    tec: 'config-tec', mes: 'config-mes', pat: 'config-pat',
  };

  const parts = label.includes('+') ? label.split('+') : label.split('_');

  return parts.map((p, i) => {
    const pt   = p.trim();
    const name = fullName[pt] || pt;
    // First vector: capitalize; rest: lowercase
    const display = i === 0 ? name.charAt(0).toUpperCase() + name.slice(1) : name;
    const c       = cls[pt] || '';
    const sep     = i < parts.length - 1 ? '<span class="config-plus"> + </span>' : '';
    return `<span class="${esc(c)}">${esc(display)}</span>${sep}`;
  }).join('');
}

function buildBadge(badgeId) {
  const b = badgeMap[badgeId];
  if (!b) return `<span class="badge badge-unknown" title="${esc(badgeId)}">${esc(badgeId)}</span>`;
  const cls = SEVERITY_CSS[b.severity] || 'badge-caution';
  const tip = esc(b.required_microcopy || b.meaning || b.badge_id);
  return `<span class="badge ${cls}" title="${tip}">${esc(b.label || b.badge_id)}</span>`;
}

function buildBadgeGroup(badgeIds) {
  if (!badgeIds || !badgeIds.length) return '';
  return `<span class="badge-group">${badgeIds.map(buildBadge).join('')}</span>`;
}

function actorPublicationEntry(actorId) {
  return (D.actor_publication?.actors || []).find(item => item.actor_id === actorId) || {};
}

function actorLegends(actorId) {
  const entry = actorPublicationEntry(actorId);
  const ids = new Set(entry.legend_ids || []);
  return (D.actor_publication?.legends || []).filter(legend => ids.has(legend.id));
}

function legendById(legendId) {
  return (D.actor_publication?.legends || []).find(legend => legend.id === legendId) || null;
}

function legendTranslation(legendId) {
  return (D['legend_gameplay_translation.v0.2']?.translations || [])
    .find(item => item.legendId === legendId) || null;
}

function translationStatusLabel(item) {
  return {
    recalibrated: 'Recalibrada con v0.4',
    adjudicated_unchanged: 'Compatible, sin cambio',
    editorial_hold: 'Puntaje editorial en revisión',
  }[item?.scoreStatus] || item?.statusLabel || 'Estado no informado';
}

function translationStatusClass(item) {
  if (item?.scoreStatus === 'recalibrated') return 'is-recalibrated';
  if (item?.scoreStatus === 'editorial_hold') return 'is-hold';
  return 'is-compatible';
}

function actorInitials(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

function publicCautionLabel(actor) {
  if ((actor.n_documents || 0) <= 1) return 'caso de un documento';
  if (actor.caution_level === 'low') return 'base documental amplia';
  if (actor.caution_level === 'high' || actor.caution_level === 'BLOQUEADO') return 'lectura con cautela alta';
  return 'lectura cautelosa';
}

function publicStabilityLabel(actor) {
  if ((actor.n_documents || 0) <= 1) return 'no evaluable con un documento';
  return {
    stable: 'continuidad relativa',
    moderate: 'variación moderada',
    unstable: 'trayectoria cambiante',
  }[actor.stability_label] || 'no determinada';
}

function legendVectorLabel(vector) {
  return {
    TEC: 'Tecnocracia',
    MES: 'Mesianismo',
    PAT: 'Paternalismo',
  }[vector] || vector || '—';
}

function buildActorVisual(actor, legends, detail = false) {
  const hasActorPortrait = !legends.length && Boolean(actor.portrait);
  const visualClass = legends.length > 1
    ? 'is-multiple'
    : legends.length === 1
      ? 'is-single'
      : hasActorPortrait
        ? 'is-single is-corpus-only has-documentary-portrait'
        : 'is-corpus-only';
  const art = legends.length
    ? legends.slice(0, 2).map(legend =>
        `<img src="${esc(legend.portrait)}" alt="Retrato lúdico de ${esc(legend.incarnation)}" loading="lazy">`
      ).join('')
    : hasActorPortrait
      ? `<img src="${esc(actor.portrait)}" alt="${esc(actor.portrait_alt || `Retrato documental de ${actor.display_name}`)}" loading="lazy">`
      : `<span class="actor-monogram" aria-hidden="true">${esc(actorInitials(actor.display_name))}</span>`;
  const label = legends.length
    ? `${legends.length} ${legends.length === 1 ? 'Leyenda' : 'Leyendas'} en el juego`
    : hasActorPortrait
      ? 'Actor del corpus · sin Leyenda jugable'
      : 'Sólo en el corpus';
  return `<div class="actor-visual ${visualClass} ${detail ? 'is-detail' : ''}">
    <div class="actor-visual-art">${art}</div>
    <span class="actor-visual-caption">${esc(label)}</span>
  </div>`;
}

function buildActorLegendBridge(actor, legends) {
  if (!legends.length) {
    return `<div class="actor-legend-bridge is-empty">
      <span class="actor-legend-bridge-label">Correspondencia con el videojuego</span>
      <p>Este actor integra el corpus HCDN, pero no tiene una Leyenda jugable en la beta pública.</p>
    </div>`;
  }
  return `<div class="actor-legend-bridge">
    <span class="actor-legend-bridge-label">Correspondencia con el videojuego</span>
    <div class="actor-legend-bridge-items">
      ${legends.map(legend => `<a href="#leyendas/${esc(legend.id)}" class="actor-legend-chip">
        <img src="${esc(legend.portrait)}" alt="" loading="lazy">
        <span><strong>${esc(legend.incarnation)}</strong><small>Leyenda · ${esc(legend.year_ref)}</small></span>
      </a>`).join('')}
    </div>
  </div>`;
}

function buildLegendRosterCard(legend) {
  const vectorClass = String(legend.dominant_vector || '').toLowerCase();
  const translation = legendTranslation(legend.id);
  const scores = translation?.scores || {};
  return `<a href="#leyendas/${esc(legend.id)}" class="legend-roster-card" aria-label="Abrir trazabilidad de ${esc(legend.incarnation)}">
    <img src="${esc(legend.portrait)}" alt="Retrato lúdico de ${esc(legend.incarnation)}" loading="lazy">
    <span class="legend-roster-copy">
      <span class="legend-roster-kicker">LEYENDA · ${esc(legend.year_ref)}</span>
      <strong>${esc(legend.incarnation)}</strong>
      <small>${esc(legend.name)}</small>
      ${translation ? `<small class="legend-roster-score">TEC ${esc(scores.TEC)} · MES ${esc(scores.MES)} · PAT ${esc(scores.PAT)}</small>` : ''}
    </span>
    <span class="legend-vector-token vector-${esc(vectorClass)}" title="Vector conductor: ${esc(legendVectorLabel(legend.dominant_vector))}">${esc(legend.dominant_vector)}</span>
  </a>`;
}

// ─── Data loading ───────────────────────────────────────────────────────────────

async function loadData() {
  const results = await Promise.allSettled(DATA_FILES.map(async file => {
    const response = await fetch(`${DATA_PATH}${file}?v=${PUBLICATION_CACHE_KEY}`);
    if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${file}`);
    return { file, key: file.replace('.json', ''), data: await response.json() };
  }));

  D.load_warnings = [];
  results.forEach((result, index) => {
    const file = DATA_FILES[index];
    if (result.status === 'fulfilled') {
      D[result.value.key] = result.value.data;
      return;
    }
    if (REQUIRED_DATA_FILES.has(file)) throw result.reason;
    D.load_warnings.push(`${file}: ${String(result.reason?.message || result.reason)}`);
  });

  if (Array.isArray(D.caveat_badges)) {
    for (const b of D.caveat_badges) {
      if (b.badge_id) badgeMap[b.badge_id] = b;
    }
  }

  if (Array.isArray(D.actors_hcdn)) {
    for (const a of D.actors_hcdn) {
      if (a.actor_id) actorMap[a.actor_id] = a;
    }
  }

  applyGlobalSiteMeta();
}

async function ensureWhitepaperLoaded() {
  if (typeof D.whitepaper_v0_4 === 'string') return;
  if (!whitepaperPromise) {
    whitepaperPromise = fetch(`${DATA_PATH}${WHITEPAPER_FILE}?v=${PUBLICATION_CACHE_KEY}`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status} al cargar ${WHITEPAPER_FILE}`);
        return response.text();
      })
      .then(markdown => { D.whitepaper_v0_4 = markdown; })
      .catch(error => {
        D.whitepaper_v0_4 = '';
        D.load_warnings.push(`${WHITEPAPER_FILE}: ${String(error.message || error)}`);
      });
  }
  await whitepaperPromise;
}

function applyGlobalSiteMeta() {
  const meta = D.site_meta || {};
  document.documentElement.dataset.publicationVersion = meta.version || '';
}

// ─── Navigation ─────────────────────────────────────────────────────────────────

function initNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('mobile-open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('mobile-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  window.addEventListener('hashchange', updateActiveNav);
  updateActiveNav();
}

function enhancePrerenderedLinks() {
  const basePath = location.pathname.endsWith('/')
    ? location.pathname
    : location.pathname.replace(/[^/]+$/, '');
  document.querySelectorAll('a[data-client-route]').forEach(link => {
    const route = link.dataset.clientRoute;
    if (route?.startsWith('#')) link.setAttribute('href', `${basePath}${route}`);
  });
}

function updateActiveNav() {
  const rawSection = currentRouteValue().split('/')[0];
  const section = ['figuras', 'peron', 'roadmap'].includes(rawSection)
    ? 'evidencia'
    : rawSection === 'leyendas'
      ? 'actores'
      : rawSection;
  document.querySelectorAll('.nav-link').forEach(link => {
    const s = link.dataset.section || '';
    const active = s === section;
    link.classList.toggle('active', active);
    link.setAttribute('aria-current', active ? 'page' : 'false');
  });
}

const ROUTE_META = {
  inicio: {
    title: 'El problema de los tres cuerpos argentinos',
    description: 'Investigación doctrinaria sobre tecnocracia, mesianismo y paternalismo en el discurso presidencial argentino, con mapa empírico y videojuego.'
  },
  tesis: { title: 'La idea central', description: 'Por qué la política argentina no se reduce a un péndulo y cómo interactúan sus tres cuerpos.' },
  recorrido: { title: 'Empezá acá', description: 'Un recorrido breve por la idea central, el mapa, la evidencia, las Leyendas y el videojuego.' },
  'mapa-orbital': { title: 'Mapa orbital', description: 'Campo ternario interactivo con 52 discursos, doce unidades de mandato y los tres vectores simultáneos del corpus presidencial democrático argentino.' },
  laboratorio: { title: 'Analizá un discurso', description: 'Laboratorio orbital local para explorar señales de tecnocracia, mesianismo y paternalismo en un texto político.' },
  actores: { title: 'Actores y Leyendas', description: 'Actores del corpus presidencial y su correspondencia explícita con las Leyendas jugables.' },
  leyendas: { title: 'Trazabilidad de Leyendas', description: 'Cómo se traducen fuentes, cautelas y configuraciones del mapa orbital a los puntajes del videojuego.' },
  buscar: { title: 'Buscar', description: 'Buscar conceptos, actores, Leyendas, fuentes y secciones dentro de la publicación.' },
  evidencia: { title: 'Cómo leemos un discurso', description: 'Método, ejemplos, fuentes y límites para reconstruir relaciones entre los tres vectores.' },
  whitepaper: { title: 'Whitepaper v0.4', description: 'Recalibración funcional simétrica de los tres vectores, con polaridad, función, posición, sensibilidad y trayectoria publicadas.' },
  figuras: { title: 'Figuras', description: 'Galería guiada de figuras empíricas del corpus HCDN.' },
  videojuego: { title: 'Videojuego', description: 'Tres Cuerpos: República inestable, una traducción jugable del marco doctrinario desarrollada por Arca Gaucha.' },
  licencia: { title: 'Licencia', description: 'Licencias, atribución y condiciones de uso del sitio, los datos y el videojuego.' },
};

const ROUTE_PUBLIC_FILES = {
  inicio: 'index.html',
  recorrido: 'empeza-aca.html',
  tesis: 'tesis.html',
  'mapa-orbital': 'mapa-orbital.html',
  laboratorio: 'laboratorio.html',
  actores: 'actores.html',
  leyendas: 'leyendas.html',
  evidencia: 'evidencia.html',
  whitepaper: 'whitepaper.html',
  figuras: 'figuras.html',
  videojuego: 'videojuego.html',
  licencia: 'licencia.html',
};

function currentRouteValue() {
  return location.hash.replace(/^#/, '') || document.body?.dataset.prerenderRoute || 'inicio';
}

function canonicalPathForRoute(section, param = '') {
  if (section === 'actores' && param) return `/actor-${encodeURIComponent(param)}.html`;
  if (section === 'leyendas' && param) return `/leyenda-${encodeURIComponent(param)}.html`;
  const file = ROUTE_PUBLIC_FILES[section] || ROUTE_PUBLIC_FILES.inicio;
  return file === 'index.html' ? '/' : `/${file}`;
}

function updateDocumentMeta(section, param = '') {
  const meta = ROUTE_META[section] || ROUTE_META.inicio;
  let title = meta.title;
  if (section === 'actores' && param && actorMap[param]) title = actorMap[param].display_name;
  if (section === 'leyendas' && param && legendById(param)) title = `Por qué ${legendById(param).incarnation} tiene ese puntaje`;
  document.title = section === 'inicio'
    ? title
    : `${title} · El problema de los tres cuerpos argentinos`;
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  const canonicalBase = (D.site_meta?.canonical_url || 'https://lore.trescuerpos.arcagaucha.com').replace(/\/$/, '');
  const canonicalUrl = `${canonicalBase}${canonicalPathForRoute(section, param)}`;
  if (description) description.setAttribute('content', meta.description);
  if (ogTitle) ogTitle.setAttribute('content', document.title);
  if (ogDescription) ogDescription.setAttribute('content', meta.description);
  if (canonicalLink) canonicalLink.setAttribute('href', canonicalUrl);
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
  if (twitterTitle) twitterTitle.setAttribute('content', document.title);
  if (twitterDescription) twitterDescription.setAttribute('content', meta.description);
}

// ─── Router ─────────────────────────────────────────────────────────────────────

function renderLoadWarnings() {
  if (!D.load_warnings?.length) return '';
  return `<div class="partial-load-warning" role="status">
    <strong>Parte del archivo no pudo cargarse.</strong> El resto del sitio sigue disponible.
    <details><summary>Ver detalle técnico</summary><ul>${D.load_warnings.map(item => `<li>${esc(item)}</li>`).join('')}</ul></details>
  </div>`;
}

async function router() {
  const currentEpoch = ++routeEpoch;
  const raw              = currentRouteValue();
  const [section, ...rest] = raw.split('/');
  const param            = rest.join('/');
  const app              = document.getElementById('app');
  if (!app) return;

  window.scrollTo({ top: 0, behavior: 'auto' });
  app.setAttribute('aria-busy', 'true');

  if (section === 'whitepaper') await ensureWhitepaperLoaded();
  if (currentEpoch !== routeEpoch) return;

  switch (section) {
    case 'recorrido':    app.innerHTML = renderRecorrido();                 break;
    case 'tesis':        app.innerHTML = renderTesis();                     break;
    case 'tres-cuerpos': location.replace('#tesis'); return;
    case 'mapa-orbital': app.innerHTML = renderMapaOrbital();               break;
    case 'laboratorio':  app.innerHTML = renderLaboratory();                break;
    case 'actores':
      app.innerHTML = param ? renderActorDetail(param) : renderActores();
      break;
    case 'leyendas':
      app.innerHTML = param ? renderLegendTrace(param) : renderTrazabilidad();
      break;
    case 'buscar':       app.innerHTML = renderSearchPage(param);           break;
    case 'peron':        location.replace('#evidencia/peron'); return;
    case 'evidencia':    app.innerHTML = renderEvidencia();                 break;
    case 'roadmap':      location.replace('#evidencia/roadmap'); return;
    case 'whitepaper':   app.innerHTML = renderWhitepaper();                break;
    case 'figuras':      app.innerHTML = renderFiguras();                   break;
    case 'videojuego':   app.innerHTML = renderVideojuego();                break;
    case 'licencia':     app.innerHTML = renderLicencia();                  break;
    default:             app.innerHTML = renderInicio();                    break;
  }

  if (D.load_warnings?.length) app.insertAdjacentHTML('afterbegin', renderLoadWarnings());
  app.setAttribute('aria-busy', 'false');

  updateDocumentMeta(section, param);
  updateActiveNav();
  bindAccordions();
  if (section === 'whitepaper') bindWpToc();
  if (section === 'mapa-orbital') bindOrbitalMap();
  if (section === 'laboratorio') bindLaboratory();
  if (section === 'evidencia' && param) scrollEvidenceSubsection(param);
  if (section === 'buscar') bindSearchPage(param);
}

function scrollEvidenceSubsection(param) {
  const targets = {
    metodologia: 'evidencia-metodologia',
    'ejemplo-menem': 'evidencia-ejemplo-menem',
    casos: 'evidencia-casos',
    'ficha-tecnica': 'evidencia-ficha-tecnica',
    peron: 'evidencia-peron',
    'milei-2026': 'evidencia-milei-2026',
    roadmap: 'evidencia-roadmap',
  };
  const id = targets[param];
  if (!id) return;
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
}

// ─── Accordion binding ───────────────────────────────────────────────────────────

function bindAccordions() {
  const pairs = [
    ['.vector-card-header',       '.vector-card'],
    ['.config-card-header',       '.config-card'],
    ['.peron-card-header',        '.peron-card'],
    ['.roadmap-item-header',      '.roadmap-item'],
    ['.evidence-drawer-toggle',   '.evidence-drawer'],
  ];
  for (const [triggerSel, parentSel] of pairs) {
    document.querySelectorAll(triggerSel).forEach(trigger => {
      if (trigger.classList.contains('peron-card-header-blocked')) return;
      trigger.addEventListener('click', () => {
        const parent = trigger.closest(parentSel);
        if (parent) {
          const open = parent.classList.toggle('open');
          trigger.setAttribute('aria-expanded', String(open));
        }
      });
    });
  }
}

// ─── Whitepaper TOC scroll binding ───────────────────────────────────────────────

function bindWpToc() {
  document.querySelectorAll('.wp-toc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scrollTarget);
      if (!target) return;
      const toc = btn.closest('.wp-toc');
      const headerHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
      const tocHeight = toc?.getBoundingClientRect().height || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - tocHeight - 8;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    });
  });
}

function bindOrbitalMap() {
  const root = document.querySelector('[data-orbital-map]');
  if (!root) return;
  const inspector = root.querySelector('.orbital-inspector');
  const timeline = root.querySelector('.orbital-timeline');

  const update = (actorId = 'all', documentId = '') => {
    const filtered = actorId !== 'all';
    root.classList.toggle('is-filtered', filtered);
    root.dataset.selectedActor = actorId;
    root.dataset.selectedDocument = documentId;

    root.querySelectorAll('.orbital-actor-button').forEach(button => {
      const active = button.dataset.orbitalActor === actorId;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    root.querySelectorAll('.orbital-path').forEach(path => {
      path.classList.toggle('is-active', filtered && path.dataset.orbitalActor === actorId);
    });
    root.querySelectorAll('.orbital-point').forEach(point => {
      const activeActor = filtered && point.dataset.orbitalActor === actorId;
      const selected = activeActor && point.dataset.orbitalDocument === documentId;
      point.classList.toggle('is-active', activeActor);
      point.classList.toggle('is-selected', selected);
      point.setAttribute('aria-pressed', String(selected));
    });

    if (inspector) inspector.innerHTML = actorId === 'all'
      ? renderOrbitalOverview()
      : renderOrbitalActorInspector(actorId, documentId);
    if (timeline) timeline.innerHTML = renderOrbitalTimeline(actorId, documentId);
  };

  root.addEventListener('click', event => {
    const actorButton = event.target.closest('.orbital-actor-button');
    if (actorButton) {
      update(actorButton.dataset.orbitalActor || 'all', '');
      return;
    }
    const timelineButton = event.target.closest('.orbital-timeline-doc');
    if (timelineButton) {
      update(timelineButton.dataset.orbitalActor || 'all', timelineButton.dataset.orbitalDocument || '');
      const point = [...root.querySelectorAll('.orbital-point')]
        .find(item => item.dataset.orbitalDocument === timelineButton.dataset.orbitalDocument);
      point?.focus({ preventScroll: true });
      return;
    }
    const point = event.target.closest('.orbital-point');
    if (point) update(point.dataset.orbitalActor || 'all', point.dataset.orbitalDocument || '');
  });

  root.addEventListener('keydown', event => {
    const point = event.target.closest('.orbital-point');
    if (!point || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    update(point.dataset.orbitalActor || 'all', point.dataset.orbitalDocument || '');
  });

  update('all', '');
}

// ─── Laboratory: local text analysis ──────────────────────────────────────────

function laboratoryVectorName(vector) {
  return ORBITAL_VECTOR_LABELS[vector] || vector;
}

function laboratoryPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(1).replace('.', ',')}%`;
}

function normalizeLaboratoryDate(value) {
  const input = String(value || '').trim();
  if (!input) return '';
  const match = input.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) throw new RangeError('Ingresá la fecha como DD/MM/AAAA.');
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  const isValid = parsed.getUTCFullYear() === year
    && parsed.getUTCMonth() === month - 1
    && parsed.getUTCDate() === day;
  if (!isValid) throw new RangeError('Ingresá una fecha válida en formato DD/MM/AAAA.');
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function renderLaboratory() {
  const registry = D['text_analysis_registry.v0.1'];
  const reference = D['text_analysis_reference.v0.1'];
  if (!registry?.patterns?.length || !reference?.documents?.length) {
    return `<section class="page-section error-panel"><h1>El laboratorio no está disponible</h1><p>Falta cargar el registro de señales o el corpus de referencia. El resto de la publicación sigue funcionando.</p></section>`;
  }
  const genreOptions = registry.genres.map(genre => `<option value="${esc(genre.id)}">${esc(genre.label)}</option>`).join('');
  return `<section class="page-section laboratory-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Laboratorio orbital</div>
    <header class="laboratory-hero">
      <div>
        <span class="section-kicker">LABORATORIO ORBITAL · DIAGNÓSTICO AUTOMÁTICO V0.1</span>
        <h1>¿Qué tres cuerpos aparecen en este discurso?</h1>
        <p class="hero-sub">Pegá un texto político o abrí un archivo <code>.txt</code>/<code>.md</code>. El motor localiza señales de tecnocracia, mesianismo y paternalismo, muestra la evidencia y ubica el texto en el mismo campo formal que el corpus HCDN.</p>
      </div>
      <aside class="laboratory-privacy-card" aria-label="Privacidad del análisis">
        <span aria-hidden="true">LOCAL</span>
        <strong>El texto no sale de tu dispositivo</strong>
        <p>No se envía al servidor ni se guarda en el sitio. El texto y el diagnóstico sólo permanecen en esta vista: desaparecen al recargar o cerrar la página.</p>
      </aside>
    </header>

    <div class="laboratory-boundary" role="note">
      <strong>Qué responde:</strong> qué señales contiene este texto y cómo se distribuyen. <strong>Qué no responde:</strong> quién “es” su autoría, qué hará en el gobierno o si una candidatura pertenece para siempre a un vector.
    </div>

    <form id="laboratory-form" class="laboratory-form" novalidate>
      <div class="laboratory-meta-grid">
        <label><span>Título o identificación <small>opcional</small></span><input id="laboratory-title" name="title" maxlength="160" placeholder="Ej.: discurso de lanzamiento"></label>
        <label><span>Autoría <small>opcional</small></span><input id="laboratory-author" name="author" maxlength="120" placeholder="Ej.: nombre de la candidatura"></label>
        <label><span>Fecha <small>opcional</small></span><input id="laboratory-date" name="date" type="text" inputmode="numeric" maxlength="10" autocomplete="off" placeholder="DD/MM/AAAA" aria-describedby="laboratory-date-format"><small id="laboratory-date-format">Formato argentino: día/mes/año.</small></label>
        <label><span>Género del texto</span><select id="laboratory-genre" name="genre">${genreOptions}</select></label>
      </div>

      <label class="laboratory-text-field" for="laboratory-text"><span>Texto a analizar</span></label>
      <textarea id="laboratory-text" name="text" rows="16" maxlength="${esc(registry.limits.maxCharacters)}" aria-describedby="laboratory-counter laboratory-file-status laboratory-privacy-copy" placeholder="Pegá acá el discurso completo. Para una lectura responsable hacen falta al menos ${esc(registry.limits.minWords)} palabras…"></textarea>
      <div class="laboratory-input-meta">
        <span id="laboratory-counter">0 palabras · 0 caracteres</span>
        <span id="laboratory-file-status" aria-live="polite">Sin archivo abierto</span>
      </div>
      <p id="laboratory-privacy-copy" class="laboratory-privacy-copy">El selector sólo lee el archivo en tu navegador. Límite: 1 MB y ${Number(registry.limits.maxCharacters).toLocaleString('es-AR')} caracteres.</p>

      <div class="laboratory-form-actions">
        <label class="btn btn-secondary laboratory-file-button">Abrir .txt o .md<input id="laboratory-file" type="file" accept=".txt,.md,text/plain,text/markdown" hidden></label>
        <button type="button" class="btn btn-secondary" id="laboratory-sample">Cargar ejemplo</button>
        <button type="button" class="btn btn-quiet" id="laboratory-clear">Limpiar</button>
        <button type="submit" class="btn btn-primary laboratory-submit">Analizar discurso →</button>
      </div>
      <div id="laboratory-error" class="laboratory-error" role="alert" hidden></div>
    </form>

    <div id="laboratory-result" class="laboratory-result-root" aria-live="polite"></div>

    <section class="laboratory-method-bridge">
      <span class="field-label">Cómo funciona</span>
      <h2>Un primer diagnóstico reproducible, no una sentencia</h2>
      <div class="laboratory-method-steps">
        <article><b>01</b><h3>Detecta</h3><p>${registry.patterns.length} patrones proposicionales simétricos: 20 por cuerpo.</p></article>
        <article><b>02</b><h3>Lee contexto</h3><p>Distingue afirmación, subordinación, atribución, rechazo y posición en el argumento.</p></article>
        <article><b>03</b><h3>Agrega</h3><p>La masa positiva selecciona la pareja; las funciones intentan ordenar su dirección.</p></article>
        <article><b>04</b><h3>Explica</h3><p>Devuelve fragmentos, cautelas y cercanía diagnóstica con ${reference.documents.length} discursos.</p></article>
      </div>
      <p><a href="#evidencia/metodologia">Leer metodología y límites →</a> · <a href="data/text_analysis_registry.v0.1.json" target="_blank" rel="noopener">Abrir registro del motor ↗</a></p>
    </section>
  </section>`;
}

function renderLaboratoryOrbital(result) {
  const documents = D['text_analysis_reference.v0.1']?.documents || [];
  const nearestKeys = new Set((result.comparison?.nearest || []).map(item => `${item.actor}|${item.year}`));
  const referencePoints = documents.map(document => {
    const point = orbitalPoint(document);
    const nearest = nearestKeys.has(`${document.actor}|${document.year}`);
    return `<circle class="laboratory-reference-point ${nearest ? 'is-nearest' : ''}" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${nearest ? 4 : 2.25}"><title>${esc(document.actor)} · ${esc(document.year)} · referencia automática</title></circle>`;
  }).join('');
  const userPoint = orbitalPoint({ weights: result.weights });
  return `<div class="laboratory-orbital-frame">
    <svg class="orbital-field laboratory-field" viewBox="0 0 720 620" role="img" aria-labelledby="laboratory-field-title laboratory-field-desc">
      <title id="laboratory-field-title">Ubicación diagnóstica del texto en el mapa orbital</title>
      <desc id="laboratory-field-desc">Los puntos pequeños representan 52 discursos procesados por la misma capa automática. El punto grande representa el texto ingresado.</desc>
      <polygon class="orbital-field-plane" points="360,54 76,548 644,548" />
      ${renderOrbitalGrid()}
      <line class="orbital-axis axis-tec-mes" x1="360" y1="54" x2="76" y2="548" />
      <line class="orbital-axis axis-mes-pat" x1="76" y1="548" x2="644" y2="548" />
      <line class="orbital-axis axis-pat-tec" x1="644" y1="548" x2="360" y2="54" />
      <g class="orbital-vertex orbital-vertex-tec"><circle cx="360" cy="54" r="7" /><text x="360" y="25" text-anchor="middle">TECNOCRACIA</text></g>
      <g class="orbital-vertex orbital-vertex-mes"><circle cx="76" cy="548" r="7" /><text x="62" y="584" text-anchor="start">MESIANISMO</text></g>
      <g class="orbital-vertex orbital-vertex-pat"><circle cx="644" cy="548" r="7" /><text x="658" y="584" text-anchor="end">PATERNALISMO</text></g>
      <g class="laboratory-reference-cloud">${referencePoints}</g>
      <g class="laboratory-user-point" transform="translate(${userPoint.x.toFixed(2)} ${userPoint.y.toFixed(2)})">
        <circle class="laboratory-user-halo" r="17" />
        <circle class="laboratory-user-core" r="9" />
        <text x="0" y="-24" text-anchor="middle">TU TEXTO</text>
      </g>
    </svg>
    <p><span class="laboratory-dot is-user"></span> Tu texto <span class="laboratory-dot is-reference"></span> ${documents.length} referencias automáticas <span class="laboratory-dot is-nearest"></span> Más cercanas</p>
  </div>`;
}

function renderLaboratoryEvidence(result, vector) {
  const items = result.evidence?.[vector] || [];
  if (!items.length) return `<article class="laboratory-evidence-column is-${esc(vector)}"><h3>${esc(laboratoryVectorName(vector))}</h3><p class="muted">No aparecieron fragmentos de este cuerpo.</p></article>`;
  const polarityNames = {
    afirmada: 'afirmada', subordinada: 'subordinada', descriptiva: 'descriptiva',
    atribuida: 'atribuida a otra voz', negada_rechazada: 'negada o rechazada',
  };
  return `<article class="laboratory-evidence-column is-${esc(vector)}">
    <h3>${esc(laboratoryVectorName(vector))}</h3>
    ${items.slice(0, 3).map(item => `<div class="laboratory-evidence-item">
      <div><code>${esc(item.patternId)}</code><strong>${esc(item.patternLabel)}</strong></div>
      <blockquote>“${esc(item.excerpt)}”</blockquote>
      <p>${esc(polarityNames[item.polarity] || item.polarity)} · función ${esc(item.function)} · ${esc(item.position)}</p>
    </div>`).join('')}
  </article>`;
}

function renderLaboratoryResult(result) {
  const confidenceTitle = result.diagnostics.confidence === 'comparable_provisional'
    ? 'Comparación provisional dentro del dominio HCDN'
    : 'Lectura exploratoria fuera del dominio HCDN';
  const confidenceCopy = result.diagnostics.confidence === 'comparable_provisional'
    ? 'El género es comparable con el corpus de aperturas y asunciones, pero la pasada automática todavía requiere adjudicación humana.'
    : 'El formato puede cambiar el uso de las señales. La posición sirve para explorar el texto, no para equipararlo históricamente con una apertura presidencial.';
  const vectorCards = ['tecnocracia', 'mesianismo', 'paternalismo'].map(vector => {
    const metrics = result.vectorMetrics[vector];
    return `<article class="laboratory-score is-${esc(vector)}" data-vector="${esc(vector)}" data-weight="${esc(result.weights[vector])}">
      <span>${esc(laboratoryVectorName(vector))}</span><strong>${laboratoryPercent(result.weights[vector])}</strong>
      <div aria-hidden="true"><i style="width:${Math.max(2, Number(result.weights[vector]) * 100).toFixed(2)}%"></i></div>
      <p>${esc(metrics.positiveSignals)} señales positivas · retención ${laboratoryPercent(metrics.positiveRetention)}</p>
    </article>`;
  }).join('');
  const nearest = (result.comparison?.nearest || []).map((item, index) => `<li><b>${index + 1}</b><span><strong>${esc(item.actor)} · ${esc(item.year)}</strong><small>${esc(item.caseUnit)} · distancia ${Number(item.distance).toFixed(3).replace('.', ',')}</small></span></li>`).join('');
  const title = result.metadata.title || 'Texto sin título';
  const byline = [result.metadata.author, result.metadata.date].filter(Boolean).join(' · ');
  const massPair = result.configuration.pair.map(laboratoryVectorName);
  const leadershipPair = result.configuration.leadershipOrder.map(laboratoryVectorName);
  const massLeader = laboratoryVectorName(result.configuration.dominantByMass);
  const leadershipMatchesMass = result.configuration.leadershipOrder[0] === result.configuration.dominantByMass;
  const directionExplanation = result.configuration.directionStatus === 'directed'
    ? `Los porcentajes eligen la pareja ${massPair.join('–')}. La flecha se calcula aparte: en este texto, ${leadershipPair[0]} ocupa más funciones de conducción que ${leadershipPair[1]}. ${leadershipMatchesMass ? 'La dirección coincide con el cuerpo de mayor volumen.' : `Por eso la dirección automática es ${result.configuration.notation}, aunque ${massLeader} tenga más volumen.`}`
    : `Los porcentajes eligen la pareja ${massPair.join('–')}. La flecha se calcula aparte, comparando funciones de conducción; como la diferencia no alcanza el umbral, el orden queda indeterminado.`;
  return `<section class="laboratory-output" tabindex="-1">
    <header class="laboratory-output-header">
      <div><span class="section-kicker">RESULTADO · ${esc(result.analyzerVersion)}</span><h2>${esc(title)}</h2>${byline ? `<p>${esc(byline)}</p>` : ''}</div>
      <div class="laboratory-result-stamp"><span>PAREJA Y DIRECCIÓN</span><strong>${esc(result.configuration.notation)}</strong><small>${result.configuration.directionStatus === 'directed' ? 'dirección automática' : 'orden indeterminado'}</small></div>
    </header>
    <div class="laboratory-confidence is-${esc(result.diagnostics.confidence)}" role="status"><strong>${esc(confidenceTitle)}</strong><p>${esc(confidenceCopy)}</p></div>
    <div class="laboratory-score-grid">${vectorCards}</div>
    <div class="laboratory-direction-explanation" role="note"><strong>Cómo leer la flecha</strong><p>${esc(directionExplanation)}</p></div>
    <div class="laboratory-result-main">
      <div>${renderLaboratoryOrbital(result)}</div>
      <aside class="laboratory-diagnostics">
        <span class="field-label">Lectura técnica</span>
        <dl>
          <div><dt>Palabras</dt><dd>${Number(result.diagnostics.wordCount).toLocaleString('es-AR')}</dd></div>
          <div><dt>Segmentos</dt><dd>${esc(result.diagnostics.segmentCount)}</dd></div>
          <div><dt>Señales</dt><dd>${esc(result.diagnostics.signalCount)}</dd></div>
          <div><dt>Positivas</dt><dd>${esc(result.diagnostics.positiveSignals)}</dd></div>
          <div><dt>Cobertura</dt><dd>${laboratoryPercent(result.diagnostics.segmentCoverage)}</dd></div>
          <div><dt>Densidad</dt><dd>percentil ${esc(result.comparison.densityPercentile)}</dd></div>
        </dl>
        <h3>Referencias más cercanas</h3>
        <ol class="laboratory-nearest">${nearest}</ol>
        <p class="muted">La cercanía usa la misma capa automática, no la adjudicación histórica final del mapa v0.4.</p>
      </aside>
    </div>
    <section class="laboratory-evidence">
      <span class="field-label">Por qué aparece cada cuerpo</span>
      <h2>Fragmentos auditables</h2>
      <div class="laboratory-evidence-grid">${['tecnocracia', 'mesianismo', 'paternalismo'].map(vector => renderLaboratoryEvidence(result, vector)).join('')}</div>
    </section>
    <div class="laboratory-caveats">
      <strong>Leé el resultado con estas cautelas</strong>
      <ul>${result.caveats.map(caveat => `<li>${esc(caveat)}</li>`).join('')}</ul>
    </div>
    <div class="laboratory-output-actions">
      <button type="button" class="btn btn-secondary" data-laboratory-print>Imprimir resultado</button>
      <a href="#mapa-orbital" class="btn btn-quiet">Comparar con el mapa adjudicado →</a>
    </div>
  </section>`;
}

function bindLaboratory() {
  const form = document.getElementById('laboratory-form');
  const textInput = document.getElementById('laboratory-text');
  const fileInput = document.getElementById('laboratory-file');
  const fileStatus = document.getElementById('laboratory-file-status');
  const counter = document.getElementById('laboratory-counter');
  const error = document.getElementById('laboratory-error');
  const resultRoot = document.getElementById('laboratory-result');
  const registry = D['text_analysis_registry.v0.1'];
  const reference = D['text_analysis_reference.v0.1'];
  if (!form || !textInput || !registry || !reference || !globalThis.OrbitalAnalyzer) return;

  const setError = message => {
    error.textContent = message || '';
    error.hidden = !message;
  };
  const updateCounter = () => {
    const words = globalThis.OrbitalAnalyzer.countWords(textInput.value);
    counter.textContent = `${words.toLocaleString('es-AR')} ${words === 1 ? 'palabra' : 'palabras'} · ${textInput.value.length.toLocaleString('es-AR')} caracteres`;
  };
  const resetOutput = () => {
    resultRoot.innerHTML = '';
    setError('');
  };

  textInput.addEventListener('input', () => { updateCounter(); setError(''); });
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    if (!registry.limits.acceptedFileExtensions.includes(extension)) {
      fileInput.value = '';
      fileStatus.textContent = 'Archivo rechazado';
      setError('Usá un archivo de texto con extensión .txt o .md.');
      return;
    }
    if (file.size > registry.limits.maxFileBytes) {
      fileInput.value = '';
      fileStatus.textContent = 'Archivo rechazado';
      setError('El archivo supera el límite de 1 MB.');
      return;
    }
    const contents = await file.text();
    if (contents.length > registry.limits.maxCharacters) {
      fileInput.value = '';
      fileStatus.textContent = 'Archivo rechazado';
      setError(`El texto supera el límite de ${Number(registry.limits.maxCharacters).toLocaleString('es-AR')} caracteres.`);
      return;
    }
    textInput.value = contents;
    fileStatus.textContent = `${file.name} · ${(file.size / 1024).toFixed(1).replace('.', ',')} KB · leído localmente`;
    resetOutput();
    updateCounter();
    textInput.focus();
  });
  document.getElementById('laboratory-sample')?.addEventListener('click', () => {
    textInput.value = LABORATORY_SAMPLE;
    document.getElementById('laboratory-title').value = 'Ejemplo sintético del laboratorio';
    document.getElementById('laboratory-author').value = 'Texto de demostración';
    document.getElementById('laboratory-genre').value = 'documento_programatico';
    fileInput.value = '';
    fileStatus.textContent = 'Ejemplo sintético · no pertenece al corpus';
    resetOutput();
    updateCounter();
    textInput.focus();
  });
  document.getElementById('laboratory-clear')?.addEventListener('click', () => {
    form.reset();
    fileStatus.textContent = 'Sin archivo abierto';
    textInput.value = '';
    resetOutput();
    updateCounter();
    textInput.focus();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    setError('');
    try {
      const dateInput = document.getElementById('laboratory-date');
      const normalizedDate = normalizeLaboratoryDate(dateInput.value);
      dateInput.value = normalizedDate;
      const result = globalThis.OrbitalAnalyzer.analyze(textInput.value, {
        registry,
        reference,
        title: document.getElementById('laboratory-title').value,
        author: document.getElementById('laboratory-author').value,
        date: normalizedDate,
        genre: document.getElementById('laboratory-genre').value,
      });
      resultRoot.innerHTML = renderLaboratoryResult(result);
      requestAnimationFrame(() => {
        const output = resultRoot.querySelector('.laboratory-output');
        output?.focus({ preventScroll: true });
        output?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (analysisError) {
      resetOutput();
      setError(analysisError.message || 'No pudimos analizar este texto.');
      error.focus?.();
    }
  });
  resultRoot.addEventListener('click', event => {
    if (event.target.closest('[data-laboratory-print]')) {
      window.print();
    }
  });
  updateCounter();
}

// ─── Guided reading, search and Legend traceability ───────────────────────────

function renderRecorrido() {
  const game = D.game_meta || {};
  const gameUrl = resolveGameUrl(game);
  const directPlay = gameUrl
    ? `<a href="${esc(gameUrl)}" class="btn btn-primary" target="_blank" rel="noopener">Jugar ${esc(game.display_version || 'la beta pública')} →</a>`
    : `<span class="btn btn-primary" aria-disabled="true">Publicación web pendiente</span>`;
  return `<section class="page-section guided-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Empezá acá</div>
    <div class="guided-hero">
      <span class="section-kicker">UNA INVESTIGACIÓN · CUATRO PUERTAS</span>
      <h1>¿Qué querés hacer?</h1>
      <p class="hero-sub">No necesitás conocer el proyecto de antemano. Elegí una entrada: entender la idea, comparar presidencias, analizar un discurso o jugar.</p>
    </div>
    <nav class="guided-choice-grid" aria-label="Elegí qué querés hacer">
      <article class="guided-choice guided-choice-thesis" aria-labelledby="guided-thesis-title">
        <div class="guided-choice-topline"><span>01</span><b>LA IDEA · 4 MIN</b></div>
        <h2 id="guided-thesis-title">Entender por qué no alcanza el péndulo</h2>
        <p>Tecnocracia, mesianismo y paternalismo no se alternan de a dos: se combinan, compiten y dejan trayectorias.</p>
        <a href="#tesis" class="guided-choice-link">Entender la idea central <span aria-hidden="true">→</span></a>
      </article>
      <article class="guided-choice guided-choice-map" aria-labelledby="guided-map-title">
        <div class="guided-choice-topline"><span>02</span><b>MAPA · 52 DISCURSOS</b></div>
        <h2 id="guided-map-title">Comparar presidencias</h2>
        <p>Ubicá discursos y mandatos en el campo de los tres cuerpos. Compará posiciones sin convertirlas en diagnósticos personales.</p>
        <a href="#mapa-orbital" class="guided-choice-link">Explorar el mapa <span aria-hidden="true">→</span></a>
      </article>
      <article class="guided-choice guided-choice-lab" aria-labelledby="guided-lab-title">
        <div class="guided-choice-topline"><span>03</span><b>LABORATORIO · PRIVADO</b></div>
        <h2 id="guided-lab-title">Analizar un discurso</h2>
        <p>Pegá un texto y mirá qué señales TEC, MES y PAT aparecen. El análisis ocurre en tu navegador: no se envía ni se guarda.</p>
        <a href="#laboratorio" class="guided-choice-link">Abrir el laboratorio <span aria-hidden="true">→</span></a>
      </article>
      <article class="guided-choice guided-choice-game" aria-labelledby="guided-game-title">
        <div class="guided-choice-topline"><span>04</span><b>VIDEOJUEGO · CARRERA + LEYENDA</b></div>
        <h2 id="guided-game-title">Jugar una república inestable</h2>
        <p>Tomá doce decisiones, atravesá tres campañas y descubrí qué autoridad construiste. La partida usa la doctrina; no reemplaza la evidencia histórica.</p>
        <div class="guided-game-actions">${directPlay}<a href="#videojuego" class="btn btn-secondary">Cómo se conecta con la investigación</a></div>
      </article>
    </nav>
    <section class="guided-deeper" aria-labelledby="guided-deeper-title">
      <div>
        <span class="section-kicker">PARA PROFUNDIZAR</span>
        <h2 id="guided-deeper-title">¿Querés revisar cómo llegamos a estas conclusiones?</h2>
        <p>Acá viven las fuentes, las reglas de lectura y los límites. No hace falta recorrerlos antes de usar el mapa, el laboratorio o el juego.</p>
      </div>
      <div class="guided-deeper-links">
        <a href="#evidencia"><b>Evidencia y método</b><span>Corpus, codificación y cautelas</span></a>
        <a href="#leyendas"><b>Por qué puntúa así cada Leyenda</b><span>Fuentes, traducción y cambios</span></a>
        <a href="#whitepaper"><b>Whitepaper completo</b><span>Argumento, tablas y referencias</span></a>
      </div>
    </section>
  </section>`;
}

function normalizedSearchText(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function searchEntries() {
  const routes = [
    ['#recorrido', 'Empezá acá', 'Recorrido guiado por la idea central, el mapa, la evidencia, las Leyendas y el videojuego'],
    ['#tesis', 'La idea central', 'Tecnocracia, mesianismo, paternalismo, configuración y trayectoria'],
    ['#mapa-orbital', 'Mapa orbital', '52 discursos, doce unidades de mandato y campo ternario'],
    ['#laboratorio', 'Analizá un discurso', 'Laboratorio local para detectar señales TEC, MES y PAT y ubicar un texto en el campo orbital'],
    ['#actores', 'Actores y Leyendas', 'Personas del corpus y encarnaciones jugables'],
    ['#leyendas', 'Trazabilidad de Leyendas', 'Fuentes, puntajes, regla T1 y cautelas'],
    ['#evidencia', 'Evidencia y método', 'Corpus HCDN, codificación, fuentes, límites y roadmap'],
    ['#whitepaper', 'Whitepaper v0.4', 'Texto completo, tablas, figuras y cita'],
    ['#videojuego', 'Videojuego', 'Tres Cuerpos República Inestable, Carrera y Modo Leyenda'],
  ].map(([href, title, description]) => ({ href, title, description, kind: 'Sección' }));
  const actors = (D.actors_hcdn || []).filter(actor => actor.include_in_actor_map !== false)
    .map(actor => ({
      href: `#actores/${actor.actor_id}`,
      title: actor.display_name,
      description: `${actor.period || ''} · ${actor.adjudicated_notation || actor.directed_configuration || ''} · ${actor.main_hypothesis || ''}`,
      kind: 'Actor del corpus',
    }));
  const legends = (D.actor_publication?.legends || []).map(legend => {
    const trace = legendTranslation(legend.id);
    return {
      href: `#leyendas/${legend.id}`,
      title: legend.incarnation,
      description: `${legend.name} · ${trace?.formula || legend.year_ref} · ${trace?.evidence?.summary || ''}`,
      kind: 'Leyenda jugable',
    };
  });
  return [...routes, ...actors, ...legends];
}

function renderSearchResults(query) {
  const needle = normalizedSearchText(query).trim();
  const matches = searchEntries().filter(entry => !needle || normalizedSearchText(`${entry.title} ${entry.description} ${entry.kind}`).includes(needle));
  if (!matches.length) return '<p class="search-empty">No encontramos coincidencias. Probá con un apellido, un vector o “puntaje”.</p>';
  return `<div class="search-results" aria-label="Resultados de búsqueda">${matches.slice(0, 40).map(entry => `<a href="${esc(entry.href)}" class="search-result">
    <span>${esc(entry.kind)}</span><strong>${esc(entry.title)}</strong><p>${esc(entry.description)}</p>
  </a>`).join('')}</div>`;
}

function renderSearchPage(param = '') {
  const query = decodeURIComponent(param || '');
  return `<section class="page-section search-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Buscar</div>
    <span class="section-kicker">ÍNDICE DEL PROYECTO</span>
    <h1>Buscar en Lore</h1>
    <label class="search-field"><span class="sr-only">Buscar conceptos, actores o Leyendas</span><input id="site-search-input" type="search" value="${esc(query)}" placeholder="Ej.: Kirchner, PAT→TEC, evidencia…" autocomplete="off"></label>
    <p class="search-count" id="search-count" aria-live="polite"></p>
    <div id="search-results-root">${renderSearchResults(query)}</div>
  </section>`;
}

function bindSearchPage() {
  const input = document.getElementById('site-search-input');
  const root = document.getElementById('search-results-root');
  const count = document.getElementById('search-count');
  if (!input || !root || !count) return;
  const update = () => {
    root.innerHTML = renderSearchResults(input.value);
    const total = root.querySelectorAll('.search-result').length;
    count.textContent = input.value.trim() ? `${total} ${total === 1 ? 'resultado' : 'resultados'}` : 'Explorá el índice completo o escribí para filtrar.';
  };
  input.addEventListener('input', update);
  update();
  requestAnimationFrame(() => input.focus({ preventScroll: true }));
}

function sourceHref(source) {
  if (!source?.ref) return '';
  if (/^https?:\/\//.test(source.ref)) return source.ref;
  if (source.id === 'translation_method_v02') return `${RESEARCH_REPOSITORY}/blob/main/docs/videojuego/legend-methodology-v0.2.md`;
  return `${RESEARCH_REPOSITORY}/blob/main/${source.ref}`;
}

function renderTrazabilidad() {
  const translations = D['legend_gameplay_translation.v0.2']?.translations || [];
  const legends = D.actor_publication?.legends || [];
  const counts = translations.reduce((acc, item) => {
    acc[item.scoreStatus] = (acc[item.scoreStatus] || 0) + 1;
    return acc;
  }, {});
  return `<section class="page-section trace-index-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Trazabilidad de Leyendas</div>
    <span class="section-kicker">INVESTIGACIÓN → TRADUCCIÓN LÚDICA</span>
    <h1>Por qué cada Leyenda tiene ese puntaje</h1>
    <p class="hero-sub">La estrella TEC/MES/PAT no es una medición literal de poder histórico. Es una traducción discreta y provisional de una ventana jugable, con fuente, alcance, regla y cautela publicados.</p>
    <div class="trace-summary" aria-label="Estado de las quince traducciones">
      <div><strong>${translations.length}</strong><span>Leyendas trazadas</span></div>
      <div><strong>${counts.recalibrated || 0}</strong><span>recalibradas</span></div>
      <div><strong>${counts.adjudicated_unchanged || 0}</strong><span>compatibles</span></div>
      <div><strong>${counts.editorial_hold || 0}</strong><span>en hold editorial</span></div>
    </div>
    <div class="notice notice-amber">
      <strong>Regla T1.</strong> Fija el alcance, identifica la pareja funcional y, sólo cuando el tercer cuerpo empata o supera al miembro menor, transfiere un punto. Conserva la suma, limita cada cambio a ±1 y no convierte dirección, estabilidad o feedback en bonus.
    </div>
    <div class="legend-roster-grid trace-roster-grid">${legends.map(buildLegendRosterCard).join('')}</div>
    <div class="trace-method-links">
      <a href="${RESEARCH_REPOSITORY}/blob/main/docs/videojuego/legend-methodology-v0.2.md" target="_blank" rel="noopener">Leer método de traducción v0.2 ↗</a>
      <a href="data/legend_gameplay_translation.v0.2.json" target="_blank" rel="noopener">Abrir artefacto JSON ↗</a>
    </div>
  </section>`;
}

function renderScoreDelta(item, vector) {
  const before = Number(item.priorScores?.[vector]);
  const after = Number(item.scores?.[vector]);
  const delta = after - before;
  const deltaText = delta > 0 ? `+${delta}` : String(delta);
  return `<div class="trace-score trace-score-${vector.toLowerCase()}">
    <span>${vector}</span><strong>${esc(after)}</strong>
    <small>${delta ? `${esc(before)} → ${esc(after)} · ${esc(deltaText)}` : `se conserva en ${esc(after)}`}</small>
  </div>`;
}

function renderLegendTrace(legendId) {
  const legend = legendById(legendId);
  const item = legendTranslation(legendId);
  if (!legend || !item) return `<section class="page-section error-panel"><h1>Leyenda no encontrada</h1><p>No hay una ficha de trazabilidad publicada para <code>${esc(legendId)}</code>.</p><a href="#leyendas">← Ver las quince Leyendas</a></section>`;
  const sourceCatalog = D['legend_gameplay_translation.v0.2']?.sources || [];
  const sources = item.sourceIds.map(id => sourceCatalog.find(source => source.id === id)).filter(Boolean);
  const actorHref = legend.actor_id ? `#actores/${legend.actor_id}` : '#evidencia/peron';
  return `<section class="page-section legend-trace-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span><a href="#leyendas">Trazabilidad</a> <span>›</span>${esc(legend.incarnation)}</div>
    <header class="legend-trace-hero">
      <img src="${esc(legend.portrait)}" alt="Retrato lúdico de ${esc(legend.incarnation)}">
      <div>
        <span class="section-kicker">LEYENDA JUGABLE · ${esc(item.scopeLabel)}</span>
        <h1>Por qué ${esc(legend.incarnation)} tiene este puntaje</h1>
        <p>${esc(item.formula)}</p>
        <span class="trace-status ${translationStatusClass(item)}">${esc(translationStatusLabel(item))}</span>
      </div>
    </header>

    <div class="trace-chain" aria-label="Cadena de trazabilidad">
      <a href="${actorHref}">Actor o fase</a><b>→</b><span>${esc(item.sourceWindow)}</span><b>→</b><span>${esc(item.functionalPair)}</span><b>→</b><strong>TEC/MES/PAT jugable</strong>
    </div>

    <div class="trace-score-grid" aria-label="Puntaje de la Leyenda">
      ${['TEC', 'MES', 'PAT'].map(vector => renderScoreDelta(item, vector)).join('')}
    </div>

    <section class="trace-section">
      <span class="field-label">Cómo se llegó a la estrella</span>
      <h2>${esc(item.evidence?.summary || item.statusLabel)}</h2>
      <dl class="trace-facts">
        <div><dt>Alcance</dt><dd>${esc(item.scopeLabel)}</dd></div>
        <div><dt>Pareja funcional</dt><dd>${esc(item.functionalPair)}</dd></div>
        <div><dt>Dirección</dt><dd>${esc(item.structuralDirection)} · ${esc(item.directionStatus)}</dd></div>
        <div><dt>Trayectoria</dt><dd>${esc(item.trajectoryStatus)}</dd></div>
        <div><dt>Documentos</dt><dd>${esc(item.documentCount)} · ${esc(item.evidenceTier)}</dd></div>
        <div><dt>Confianza</dt><dd>${esc(item.confidence)}</dd></div>
      </dl>
      <div class="trace-rule"><strong>Regla aplicada:</strong> ${esc(item.translationRule)} <span>${esc(item.mechanicalDeltaSummary)}</span></div>
    </section>

    <section class="trace-section">
      <span class="field-label">Evidencia por cuerpo</span>
      <div class="trace-vector-evidence">
        ${['TEC', 'MES', 'PAT'].map(vector => `<article class="trace-vector-${vector.toLowerCase()}"><h3>${vector}</h3><p>${esc(item.evidence?.vectorEvidence?.[vector] || 'Sin nota publicada.')}</p></article>`).join('')}
      </div>
    </section>

    <section class="trace-section">
      <span class="field-label">Fuentes utilizadas</span>
      <div class="trace-sources">${sources.map(source => `<article><h3>${esc(source.label)}</h3><p>${esc(source.note)}</p>${sourceHref(source) ? `<a href="${esc(sourceHref(source))}" target="_blank" rel="noopener">Abrir fuente ↗</a>` : ''}</article>`).join('')}</div>
    </section>

    <div class="required-caveat-block">
      <div class="required-caveat-label">QUÉ NO SIGNIFICA ESTE PUNTAJE</div>
      <p class="required-caveat-text">${esc(item.caveat)}</p>
      <p class="required-caveat-text">No clasifica una esencia personal, no predice conducta, no mide poder histórico y no convierte una partida en evidencia.</p>
    </div>

    <div class="cta-group mt-4">
      <a href="#leyendas" class="btn btn-secondary">← Las quince Leyendas</a>
      <a href="${esc(D.game_meta?.public_url || '#videojuego')}" class="btn btn-primary" ${D.game_meta?.public_url ? 'target="_blank" rel="noopener"' : ''}>Jugar esta Leyenda →</a>
    </div>
  </section>`;
}

// ─── Page: Inicio ───────────────────────────────────────────────────────────────

function renderInicio() {
  const meta    = D.site_meta || {};
  const game    = D.game_meta || {};
  const vectors = D.vectors   || [];
  const gameUrl = resolveGameUrl(game);
  const heroPlay = gameUrl
    ? `<a href="${esc(gameUrl)}" class="btn btn-primary" target="_blank" rel="noopener">Jugar videojuego →</a>`
    : `<a href="#videojuego" class="btn btn-primary">Conocer el videojuego →</a>`;

  const contribs = {
    tecnocracia:  'Aporta legitimidad técnica. El discurso de la modernización justifica la transformación institucional.',
    mesianismo:   'Aporta intensidad rupturista. El mandato trascendente justifica decisiones que rompen el statu quo.',
    paternalismo: 'Aporta legitimidad de cuidado. El Estado tutelar justifica la intervención y la presencia.',
  };
  const vectorCards = ['tecnocracia', 'mesianismo', 'paternalismo'].map(vid => {
    const v     = vectors.find(x => x.vector_id === vid) || {};
    const color = vectorColor(vid);
    return `<div class="inicio-vec-card inicio-vec-${esc(vid)}">
      <span class="inicio-vec-dot" style="background:${color};" aria-hidden="true"></span>
      <div class="inicio-vec-name" style="color:${color};">${esc(v.name || vid)}</div>
      <p class="inicio-vec-def">${esc(v.short_definition || '')}</p>
      <p class="inicio-vec-contrib">${esc(contribs[vid] || '')}</p>
      <a href="#tesis" class="inicio-vec-link">Ver la idea central →</a>
    </div>`;
  }).join('');

  return `<div id="inicio-page">

    <!-- ═══ HERO ════════════════════════════════════════════════════════════════ -->
    <div id="inicio-hero">
      <div class="inicio-hero-inner">
        <!-- Logo column -->
        <div class="inicio-hero-logo-col">
          <div class="inicio-hero-logo-wrap">
            <img src="${LOGO_PATH}" alt="Logo del proyecto El problema de los tres cuerpos argentinos"
                 class="inicio-hero-logo" loading="eager"
                 onerror="this.style.display='none';this.nextElementSibling.hidden=false;">
            <div class="inicio-hero-logo-fallback" hidden aria-hidden="true">◈</div>
          </div>
        </div>
        <!-- Content column -->
        <div class="inicio-hero-content-col">
          <div class="inicio-hero-eyebrow">PUBLICACIÓN ${esc(meta.site_release || 'v0.6.6')} · MAPA ${esc(meta.version || 'v0.4')} · CORPUS HCDN 1983–2026</div>
          <h1 class="inicio-hero-headline">${esc(meta.site_title || 'El problema de los tres cuerpos argentinos')}</h1>
          <p class="inicio-hero-sub">Argentina no es un péndulo. Es un problema de tres cuerpos.</p>
          <nav class="cta-group inicio-hero-cta inicio-hero-nav" aria-label="Accesos principales del proyecto">
            <a href="#recorrido" class="btn btn-primary" data-hero-section="recorrido">Empezá acá</a>
            <a href="#tesis" class="btn btn-primary" data-hero-section="tesis">Entender la idea central</a>
            <a href="#mapa-orbital" class="btn btn-primary" data-hero-section="mapa-orbital">Explorar mapa orbital</a>
            <a href="#laboratorio" class="btn btn-primary" data-hero-section="laboratorio">Analizá un discurso →</a>
            <a href="#whitepaper" class="btn btn-primary" data-hero-section="whitepaper">Leer whitepaper</a>
            ${heroPlay}
          </nav>
          <div class="inicio-hero-synthesis">
            <p>El problema de los tres cuerpos argentinos es un prototipo de investigación teórico-empírica que lee el discurso presidencial argentino a través de tres vectores político-históricos: modernización tecnocrática, mesianismo redentor y paternalismo conservador. No clasifica actores como tipos fijos; reconstruye configuraciones, trayectorias y atractores temporales.</p>
            <p>El péndulo entre apertura/endeudamiento y protección/mercado interno describe una alternancia visible, pero no alcanza para explicar la gramática con la que el liderazgo presidencial argentino organiza legitimidad. La hipótesis es que una órbita política estable suele requerir al menos dos cuerpos: un vector dominante y otro secundario o modulador.</p>
          </div>
          <div class="inicio-hero-author">Por Alexandra Bustos Frati, PhD</div>
          <div class="inicio-hero-badges" role="note">
            ${buildBadgeGroup(['PROVISIONAL', 'HCDN_ONLY'])}
            <span class="muted inicio-hero-badges-note">Corpus parcial · Ver <a href="#evidencia">§ Evidencia y método</a></span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ BODY ═════════════════════════════════════════════════════════════════ -->
    <div class="inicio-body">

      <!-- ── LA DOCTRINA ───────────────────────────────────────────────────────── -->
      <section class="inicio-section">
        <div class="section-sep-label">LA DOCTRINA</div>
        <div class="doctrine-block">
          <blockquote class="doctrine-statement">
            <p>El péndulo explica la alternancia. No explica por qué el presidente que ejecutó la mayor privatización del siglo XX habló durante toda su presidencia en registro de justicia social y protección popular.</p>
          </blockquote>
          <div class="doctrine-grid">
            <div class="doctrine-item">
              <div class="doctrine-num">01</div>
              <p><strong>El péndulo es superficie.</strong> La alternancia entre apertura y protección, deuda y mercado interno, es documentable. Pero es síntoma, no gramática.</p>
            </div>
            <div class="doctrine-item">
              <div class="doctrine-num">02</div>
              <p><strong>La gramática tiene tres cuerpos.</strong> Tecnocracia, mesianismo, paternalismo. El campo retórico se configura entre estos tres vectores — no oscila entre dos polos.</p>
            </div>
            <div class="doctrine-item">
              <div class="doctrine-num">03</div>
              <p><strong>Un solo cuerpo rara vez estabiliza.</strong> La configuración monomodal es inestable en el corpus. La estabilización tiende a requerir al menos dos cuerpos en combinación dirigida sostenida.</p>
            </div>
            <div class="doctrine-item">
              <div class="doctrine-num">04</div>
              <p><strong>La dirección importa.</strong> <span class="config-pat">Paternalismo</span><span class="config-plus"> + </span><span class="config-tec">tecnocracia</span> no equivale a <span class="config-tec">tecnocracia</span><span class="config-plus"> + </span><span class="config-pat">paternalismo</span>. El orden expresa qué vector encuadra y qué vector modula.</p>
            </div>
            <div class="doctrine-item">
              <div class="doctrine-num">05</div>
              <p><strong>Los actores son trayectorias, no tipos.</strong> Alfonsín recorre cinco configuraciones distintas en ocho documentos. No existe clasificación tipológica final en este marco.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── LOS TRES VECTORES ─────────────────────────────────────────────────── -->
      <section class="inicio-section">
        <div class="section-sep-label">LOS TRES VECTORES</div>
        <div class="inicio-vec-grid">
          ${vectorCards}
        </div>
      </section>

      <!-- ── QUÉ MUESTRA LA EVIDENCIA ──────────────────────────────────────────── -->
      <section class="inicio-section">
        <div class="section-sep-label">QUÉ MUESTRA LA EVIDENCIA LIMPIA</div>
        <h3>Hallazgos del corpus democrático HCDN 1983–2026</h3>
        <p class="muted" style="font-size:.88rem;margin-bottom:1.25rem;">52 documentos · 10 personas · 12 unidades actor × mandato</p>
        <div class="evidence-findings-list">
          <div class="ef-item">
            <div class="ef-label">Configuración modal</div>
            <div class="ef-value">${colorConfig('paternalismo+tecnocracia')} — 58% del corpus</div>
            <div class="ef-note">Reúne a Menem y CFK, a De la Rúa y Kirchner. No es el sello de ninguna corriente política.</div>
          </div>
          <div class="ef-item">
            <div class="ef-label">Núcleo dominante</div>
            <div class="ef-value">${colorConfig('tecnocracia')} / ${colorConfig('paternalismo')} — 83% del mapa adjudicado</div>
            <div class="ef-note">Aparece en gobiernos con programas opuestos. El discurso y el programa son dimensiones separables.</div>
          </div>
          <div class="ef-item">
            <div class="ef-label">Perón 1946–1954</div>
            <div class="ef-value">${colorConfig('mesianismo+paternalismo')} — contrapunto separado</div>
            <div class="ef-note">Pipeline metodológica independiente. No numéricamente comparable al corpus HCDN. MES &gt; PAT &gt; TEC en ambos documentos disponibles.</div>
          </div>
          <div class="ef-item">
            <div class="ef-label">Milei 2026 · prueba temporal</div>
            <div class="ef-value">${colorConfig('mesianismo+tecnocracia')} · MES→TEC↺</div>
            <div class="ef-note">La pantalla léxica marca PAT–TEC; la comparación funcional favorece MES–TEC en 8/8 controles. La discrepancia queda visible.</div>
          </div>
          <div class="ef-item ef-item-blocked">
            <div class="ef-label">Perón 1973</div>
            <div class="ef-value">${buildBadgeGroup(['BLOQUEADO'])} Sin análisis posible</div>
            <div class="ef-note">Fuente primaria no verificada. Ver <a href="#evidencia/roadmap">§ Roadmap</a> para estado de condición P1.</div>
          </div>
        </div>
        <div class="notice notice-amber mt-2">
          ${buildBadgeGroup(['PROVISIONAL', 'HCDN_ONLY'])}
          Este es un mapa de trabajo: cada ficha distingue cobertura, nivel de evidencia y decisiones metodológicas. No describe personalidades políticas.
        </div>
      </section>

      <!-- ── EXPLORAR EL PROYECTO ──────────────────────────────────────────────── -->
      <section class="inicio-section">
        <div class="section-sep-label">TAMBIÉN EN EL PROYECTO</div>
        <div class="entry-card-grid">
          <a href="#actores" class="entry-card">
            <div class="entry-card-icon" aria-hidden="true">⬡</div>
            <div class="entry-card-title">Actores y Leyendas</div>
            <div class="entry-card-desc">Diez actores del corpus y su correspondencia con las quince Leyendas jugables, sin confundir investigación y diseño lúdico.</div>
          </a>
          <a href="#leyendas" class="entry-card">
            <div class="entry-card-icon" aria-hidden="true">↗</div>
            <div class="entry-card-title">Por qué cada Leyenda tiene ese puntaje</div>
            <div class="entry-card-desc">Quince fichas conectan alcance histórico, fuentes, cautelas, regla de traducción y estrella TEC/MES/PAT.</div>
          </a>
          <a href="#evidencia/peron" class="entry-card">
            <div class="entry-card-icon" aria-hidden="true">◌</div>
            <div class="entry-card-title">En el método: Perón</div>
            <div class="entry-card-desc">Contrapunto cualitativo dentro de Evidencia y método. Dos documentos limpios (1946, 1954), otra pipeline y el caso 1973 bloqueado.</div>
          </a>
          <a href="#videojuego" class="entry-card entry-card-vj">
            <div class="entry-card-icon" aria-hidden="true">▶</div>
            <div class="entry-card-title">Videojuego</div>
            <div class="entry-card-desc">${esc(game.display_version || 'Beta pública')} jugable: el final distingue el cuerpo que conduce, el que lo obliga a negociar y el límite que ninguno resolvió.</div>
          </a>
          <a href="#evidencia/roadmap" class="entry-card">
            <div class="entry-card-icon" aria-hidden="true">→</div>
            <div class="entry-card-title">Pendientes de evidencia</div>
            <div class="entry-card-desc">El roadmap cierra Evidencia y método: siete condiciones hacia v1 y la fuente de 1973 como nodo crítico.</div>
          </a>
        </div>
      </section>

      <!-- ── VIDEOJUEGO TEASER ──────────────────────────────────────────────────── -->
      <section class="inicio-section">
        <div class="section-sep-label">EL EXPERIMENTO LÚDICO</div>
        <div class="vj-teaser">
          <div class="vj-teaser-logo-wrap">
            <img src="${LOGO_PATH}" alt="Logo del proyecto"
                 class="vj-teaser-logo" loading="lazy"
                 onerror="this.style.display='none';">
          </div>
          <div class="vj-teaser-content">
            <h3 class="vj-teaser-title">Una teoría que se puede jugar</h3>
            <p><em>Tres Cuerpos: República Inestable</em> ya tiene una ${esc(game.display_version || 'beta pública')} jugable: Carrera desde tres escalas y Modo Leyenda con quince Leyendas frente a conflictos contemporáneos.</p>
            <p>Las decisiones TEC, MES y PAT distribuyen capacidad, legitimidad, cohesión y costos. Las nuevas familias de acontecimientos traducen deep research a conflictos lúdicos sin convertir la partida en evidencia histórica.</p>
            <div class="cta-group mt-2">
              ${heroPlay}
              <a href="#mapa-orbital" class="btn btn-secondary">Ver mapa orbital</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── CAVEAT STRIP ───────────────────────────────────────────────────────── -->
      <div class="inicio-caveat-strip" role="note">
        <div class="cs-item">${buildBadgeGroup(['PROVISIONAL'])} v0.4 de trabajo — con fuentes, linaje y límites publicados</div>
        <div class="cs-sep" aria-hidden="true">·</div>
        <div class="cs-item">Discurso ≠ gobierno — el marco mide registro retórico, no política de Estado</div>
        <div class="cs-sep" aria-hidden="true">·</div>
        <div class="cs-item">Perón no es numéricamente comparable al corpus HCDN — pipeline distinta</div>
        <div class="cs-sep" aria-hidden="true">·</div>
        <div class="cs-item">Las unidades describen discursos y mandatos; no convierten personas en tipos</div>
      </div>

    </div><!-- /.inicio-body -->
  </div><!-- /#inicio-page -->`;
}

// ─── Page: La idea central ──────────────────────────────────────────────────────

function renderTesisLegacyV02() {
  return `<section class="page-section">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> La idea central</div>
    <h1>La idea central</h1>
    <p class="hero-sub">Por qué la política argentina no es un péndulo — y qué estructura tiene en cambio.</p>

    <div class="tesis-hero-block">
      <p class="tesis-statement">Argentina no es un péndulo.<br>Es un problema de tres cuerpos.</p>
    </div>

    <hr class="light">

    <h3>Del péndulo al problema de tres cuerpos</h3>
    <p>El péndulo existe. La alternancia entre apertura financiera y proteccionismo, entre endeudamiento y mercado interno, es documentable. Pero el péndulo captura el movimiento, no la gramática. No explica por qué el presidente que ejecutó la mayor privatización del siglo XX habló en términos de justicia social y protección popular a lo largo de toda su presidencia. No explica por qué la misma crisis institucional produjo el mismo registro mesiánico en tres presidentes con trayectorias radicalmente distintas.</p>
    <p>El péndulo no tiene instrumento para eso. El modelo de tres cuerpos sí. Lo que propone es que el campo retórico del presidencialismo argentino está organizado por la interacción entre tres vectores: modernización tecnocrática, mesianismo redentor y paternalismo conservador. El sistema no oscila entre dos polos: se configura entre tres. De ahí la metáfora —tomada de la física como heurística de lectura, no como ley.</p>

    <hr class="light">

    <h3>Los tres vectores</h3>
    <p>Los vectores no son tipos de actor ni identidades políticas. Son fuerzas que el discurso presidencial activa en combinaciones y con jerarquías variables.</p>
    <div class="tesis-vector-grid">
      <div class="tesis-vector-card tesis-tec">
        <div class="tesis-vector-label" style="color:var(--tec);">Modernización tecnocrática</div>
        <p>El lenguaje de la reforma técnica del Estado. Modernización, eficiencia, gestión, racionalización. El discurso de quien gobierna presentando sus decisiones como respuestas técnicas a problemas objetivos. No es sinónimo de neoliberalismo — aparece en gobiernos de distinto signo cuando la transformación técnico-institucional encuadra el discurso.</p>
      </div>
      <div class="tesis-vector-card tesis-mes">
        <div class="tesis-vector-label" style="color:var(--mes);">Mesianismo redentor</div>
        <p>El lenguaje de la ruptura histórica, la misión y el destino. Puede responder a una crisis terminal, pero también presentar el gobierno ordinario como transición civilizatoria. Milei 2026 obliga a mirar cambio de era, posteridad y grandeza, no sólo vocabulario religioso.</p>
      </div>
      <div class="tesis-vector-card tesis-pat">
        <div class="tesis-vector-label" style="color:var(--pat);">Paternalismo conservador</div>
        <p>El lenguaje de la tutela social. El Estado que protege, conduce y se responsabiliza por el bienestar del pueblo. No la ruptura ni la técnica: el cuidado como eje del discurso. No describe el programa — describe el registro retórico. La paradoja Menem lo ilustra con mayor robustez que cualquier otro caso del corpus.</p>
      </div>
    </div>

    <hr class="light">

    <h3>El campo tiene tres cuerpos; cada mandato suele articular dos</h3>
    <p>La inestabilidad pertenece al conjunto de tres fuerzas, no a una pareja miserablemente aislada. Una presidencia no necesita encarnar los tres vectores a la vez. En el corpus suele poner dos en primer plano, normalmente con uno más organizador que el otro; el tercero conserva presión, límite o exterior polémico.</p>
    <p>El 83% del mapa adjudicado (1983–2026) deja a tecnocracia y paternalismo en primer plano. Eso describe una inercia del campo, no una conciliación estable ni una identidad común de los gobiernos. En Milei, la relación principal es MES–TEC y PAT sigue presente como masa y frontera.</p>
    <p>Por eso v0.4 separa tres preguntas: cuánto aparece cada vector, qué pareja organiza el texto y qué dirección tiene esa relación. Las respuestas pueden coincidir; en 2026, no coinciden.</p>

    <hr class="light">

    <h3>Combinaciones dirigidas</h3>
    <p>La dirección importa. <code>paternalismo + tecnocracia</code> y <code>tecnocracia + paternalismo</code> comparten los mismos dos vectores pero no son equivalentes:</p>
    <ul class="tesis-comparison-list">
      <li><span class="config-pat">paternalismo</span> <span class="config-plus">+</span> <span class="config-tec">tecnocracia</span>: El lenguaje de protección social encuadra el discurso; la tecnocracia lo instrumenta. La reforma técnica sirve al programa social. Caso más robusto: Menem durante las privatizaciones.</li>
      <li><span class="config-tec">tecnocracia</span> <span class="config-plus">+</span> <span class="config-pat">paternalismo</span>: La modernización técnica domina; el paternalismo acompaña como horizonte de justificación. El bienestar futuro legitima la transformación técnica presente. Caso más robusto: CFK (6 de 9 documentos con atractor fuerte).</li>
      <li><span class="config-mes">mesianismo</span> <span class="config-plus">→</span> <span class="config-tec">tecnocracia</span><span class="config-plus">↺</span>: MES encuadra cambio de era, misión y destino; TEC ejecuta y prueba; sus resultados vuelven como validación. Milei 2026 confirma esta relación dentro de una prueba temporal todavía autoral.</li>
      <li><span class="config-pat">paternalismo</span> <span class="config-plus">+</span> <span class="config-mes">mesianismo</span>: Registros de ruptura institucional aguda. Aparece en inauguraciones de emergencia: Rodríguez Saá (2001), Duhalde (2002). El mesianismo es situacional, no rasgo estable.</li>
    </ul>
    <p class="muted">El orden no es intercambiable: el primer vector domina, el segundo acompaña. Esa diferencia tiene contenido analítico propio.</p>

    <hr class="light">

    <h3>Qué muestra la evidencia limpia</h3>
    <p>Los hallazgos centrales del corpus democrático HCDN 1983–2026 (52 documentos, 10 personas, 12 unidades de mandato):</p>
    <ol class="tesis-findings-list">
      <li><strong>La pareja tecnocracia/paternalismo domina (83%).</strong> Aparece en gobiernos de coaliciones radicalmente distintas: no es el sello de ninguna corriente política.</li>
      <li><strong>La configuración dirigida modal es paternalismo → tecnocracia (58%).</strong> Reúne documentos de gobiernos con programas opuestos.</li>
      <li><strong>Los actores son trayectorias, no tipos.</strong> Alfonsín recorre 5 configuraciones en 8 documentos. El mesianismo aparece en los 3 momentos de crisis institucional, no en los demás.</li>
      <li><strong>La disociación discurso/gobierno es documentable.</strong> Menem: registro paternalista más alto del corpus durante la mayor reforma de mercado. El discurso y el programa son dimensiones separables.</li>
    </ol>
    <div class="notice notice-amber">
      ${buildBadgeGroup(['PROVISIONAL', 'HCDN_ONLY'])}
      Perón (1946–1954) muestra MES &gt; PAT &gt; TEC en los dos documentos disponibles y no es comparable numéricamente con el corpus democrático. El caso de 1973 permanece bloqueado. Milei reúne n=3 HCDN y cuatro discursos leídos; <code>MES→TEC↺</code> supera la prueba temporal, pero todavía necesita réplica ciega.
    </div>

    <hr class="light">

    <h3>Qué no afirma el modelo</h3>
    <ul class="tesis-negations-list">
      <li><strong>No dice que el discurso sea equivalente al gobierno.</strong> El caso Menem lo prueba en sentido contrario: registro paternalista dominante durante la mayor reforma de mercado.</li>
      <li><strong>No dice que las trayectorias sean predecibles.</strong> El modelo registra, no pronostica.</li>
      <li><strong>No clasifica corrientes políticas ni partidos.</strong> paternalismo + tecnocracia aparece en peronistas y radicales, en reformistas y populistas.</li>
      <li><strong>No produce clasificaciones históricas definitivas.</strong> Todos los perfiles de actor son hipótesis provisionales. No existe campo <code>final_type</code>.</li>
      <li><strong>No es una analogía física literal.</strong> Los "tres cuerpos" son una heurística de lectura — no una ley de la política argentina.</li>
    </ul>

    <div class="cta-group mt-4">
      <a href="#mapa-orbital" class="btn btn-primary">Ver mapa orbital →</a>
      <a href="#whitepaper"   class="btn btn-secondary">Leer whitepaper</a>
      <a href="#actores"      class="btn btn-secondary">Actores</a>
    </div>
  </section>`;
}

function renderTesis() {
  return `<section class="page-section tesis-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> La idea central</div>
    <div class="section-kicker">IDEA CENTRAL · MAPA ORBITAL 1983–2026</div>
    <h1>La idea central</h1>
    <p class="hero-sub">Tres fuerzas ordenan el campo; cada mandato resuelve, casi siempre, una relación entre dos.</p>

    <div class="tesis-hero-block">
      <p class="tesis-statement">Argentina no es un péndulo.<br>Es un problema de tres cuerpos.</p>
    </div>

    <h3>El péndulo describe el movimiento, no su gramática</h3>
    <p>La alternancia entre apertura y protección, ajuste y distribución, es real. Pero no alcanza para explicar por qué gobiernos con programas opuestos recurren a registros semejantes, ni por qué una misma presidencia cambia de combinación entre una etapa y otra.</p>
    <p>El modelo propone otra unidad de lectura: el discurso presidencial organiza autoridad mediante tres vectores. La metáfora física es una heurística, no una ley. Sirve para observar configuraciones que un eje de dos polos deja fuera.</p>

    <hr class="light">
    <h3>Los tres cuerpos</h3>
    <p>No son personalidades, partidos ni programas de gobierno. Son modos de construir legitimidad en un discurso.</p>
    <div class="tesis-vector-grid">
      <div class="tesis-vector-card tesis-tec">
        <div class="tesis-vector-label" style="color:var(--tec);">Tecnocracia · TEC</div>
        <p>Convierte el problema político en problema de diseño, gestión o cálculo. La autoridad proviene del saber experto, la eficiencia, la reforma institucional y la capacidad de producir resultados verificables.</p>
      </div>
      <div class="tesis-vector-card tesis-mes">
        <div class="tesis-vector-label" style="color:var(--mes);">Mesianismo · MES</div>
        <p>Presenta la acción política como ruptura de época, misión o ingreso a otro orden. No se limita a religión o crisis: también aparece en relatos de transición civilizatoria, destino, posteridad y grandeza.</p>
      </div>
      <div class="tesis-vector-card tesis-pat">
        <div class="tesis-vector-label" style="color:var(--pat);">Paternalismo · PAT</div>
        <p>Legitima mediante protección, tutela y responsabilidad por el bienestar colectivo. Puede ordenar el discurso o quedar como obligación social, restricción moral o frontera frente a la cual otro vector se define.</p>
      </div>
    </div>

    <hr class="light">
    <h3>Tres niveles de lectura</h3>
    <p>La versión v0.4 evita pedirle a una sola cifra que responda preguntas distintas.</p>
    <div class="tesis-reading-grid">
      <div class="tesis-reading-card">
        <span class="tesis-reading-n">1</span>
        <div><strong>Masa</strong><p>¿Qué vector deja más señales en el texto? Es una pantalla cuantitativa, no una sentencia sobre la arquitectura del discurso.</p></div>
      </div>
      <div class="tesis-reading-card">
        <span class="tesis-reading-n">2</span>
        <div><strong>Pareja funcional</strong><p>¿Qué dos vectores hacen falta para explicar cómo el discurso formula el problema, autoriza la acción y define su horizonte?</p></div>
      </div>
      <div class="tesis-reading-card">
        <span class="tesis-reading-n">3</span>
        <div><strong>Dirección</strong><p>¿Cuál encuadra y cuál instrumenta? La flecha puede ser simple o recursiva cuando los resultados vuelven para validar el marco inicial.</p></div>
      </div>
    </div>

    <div class="notice notice-blue tesis-field-note">
      <strong>El sistema inestable es el campo de tres cuerpos.</strong> Eso no obliga a que un presidente active los tres con la misma intensidad. En una unidad de mandato suelen jugar dos, con uno más organizador que el otro; el tercero conserva presión, límite o exterior polémico. Una díada es una configuración local dentro del campo, no el sistema completo.
    </div>

    <hr class="light">
    <section class="tesis-milei" aria-labelledby="tesis-milei-title">
      <div class="section-kicker">TRAYECTORIA 2024–2026 · MILEI</div>
      <h3 id="tesis-milei-title">Tres años, una misma relación: MES organiza; TEC realiza</h3>
      <p>Las tres aperturas legislativas comparables de Milei cambian de énfasis, pero no de arquitectura. MES define la época, la misión y el horizonte. TEC convierte ese marco en diagnóstico, instrumentos y resultados. Con el tiempo, esos resultados regresan como prueba de que la ruptura anunciada era verdadera: <code>MES→TEC↺</code>.</p>

      <div class="tesis-evolution-grid" aria-label="Evolución de la relación MES–TEC en Milei entre 2024 y 2026">
        <article class="tesis-evolution-card">
          <div class="tesis-evolution-year">2024</div>
          <div class="tesis-evolution-stage">Fundar el corte</div>
          <p>La decadencia secular y la “crisis de horizonte” convierten el ajuste en sacrificio de una misión. TEC aporta déficit, reforma y Pacto de Mayo como medios para fundar otro orden.</p>
          <div class="tesis-evolution-config"><span class="config-mes">MES</span><span>→</span><span class="config-tec">TEC</span></div>
        </article>
        <article class="tesis-evolution-card">
          <div class="tesis-evolution-year">2025</div>
          <div class="tesis-evolution-stage">Probar la promesa</div>
          <p>El balance fiscal y las reformas ya no son sólo programa: el discurso los usa para demostrar que el cambio de época comenzó. La técnica gana autonomía, pero también retrovalida la misión.</p>
          <div class="tesis-evolution-config"><span class="config-mes">MES</span><span>→</span><span class="config-tec">TEC</span><span>↺</span></div>
        </article>
        <article class="tesis-evolution-card">
          <div class="tesis-evolution-year">2026</div>
          <div class="tesis-evolution-stage">Ampliar la escala</div>
          <p>La transformación se proyecta sobre energía, minerales críticos, inteligencia artificial, centros de datos y posición nacional. La misión se vuelve civilizatoria y TEC construye su estrategia material.</p>
          <div class="tesis-evolution-config"><span class="config-mes">MES</span><span>→</span><span class="config-tec">TEC</span><span>↺</span></div>
        </article>
      </div>

      <div class="tesis-evolution-synthesis">
        <span>MES nombra el tiempo histórico</span><b>→</b><span>TEC ejecuta la transformación</span><b>→</b><span>los resultados confirman el relato MES</span>
      </div>

      <p>La evolución no consiste en reemplazar un vector por otro. Consiste en pasar de la promesa de ruptura a su alegada verificación y, después, a la proyección de un orden futuro. Por eso la relación distintiva de Milei no es una fotografía anual: es el acoplamiento sostenido entre mesianismo y tecnocracia.</p>
      <div class="notice notice-amber">
        <strong>El contrapunto de 2026:</strong> ese año aumenta mucho la masa lexical PAT, pero la comparación funcional sigue favoreciendo MES–TEC en ocho de ocho controles. Es una prueba exigente de la trayectoria, no su tema principal. La serie describe tres discursos formales; no agota la comunicación ni el gobierno.
      </div>
      <p class="tesis-source-line"><a href="#mapa-orbital">Seguir la trayectoria documental en el mapa →</a> · <a href="#evidencia/milei-2026">Ver prueba temporal, fuente y límites</a></p>
    </section>

    <hr class="light">
    <h3>Qué muestra el mapa v0.4</h3>
    <p>El corpus democrático reúne 52 documentos, 10 personas y 12 unidades de actor por mandato. La separación por mandato es decisiva: Menem I y II, y CFK I y II, no se funden en una biografía única.</p>
    <ol class="tesis-findings-list">
      <li><strong>TEC y PAT forman la pareja de primer plano en el 83% del mapa adjudicado.</strong> Es una inercia del campo, no una identidad política compartida.</li>
      <li><strong>PAT→TEC es la configuración dirigida modal (58%).</strong> Reúne documentos de gobiernos con programas contrarios y confirma que discurso y programa no son equivalentes.</li>
      <li><strong>Los actores son trayectorias.</strong> Alfonsín atraviesa cinco configuraciones en ocho documentos; los mandatos largos muestran desplazamientos que una etiqueta personal ocultaría.</li>
      <li><strong>Milei amplía el catálogo.</strong> Entre 2024 y 2026, <code>MES→TEC↺</code> evoluciona desde la ruptura y el sacrificio hacia la prueba por resultados y la proyección civilizatoria.</li>
    </ol>

    <hr class="light">
    <h3>Qué no afirma el modelo</h3>
    <ul class="tesis-negations-list">
      <li><strong>No clasifica presidentes como esencias.</strong> Describe documentos, secuencias y unidades de mandato.</li>
      <li><strong>No confunde discurso con gobierno.</strong> Un registro protector puede acompañar una política de mercado; una retórica técnica puede servir a proyectos distintos.</li>
      <li><strong>No exige tres vectores simultáneos.</strong> El campo tiene tres cuerpos; una presidencia suele organizar una pareja y negociar con el tercero.</li>
      <li><strong>No pronostica.</strong> Reconstruye configuraciones con evidencia disponible y declara dónde la cobertura no alcanza.</li>
      <li><strong>No vuelve literal la física.</strong> “Órbita”, “atractor” y “tres cuerpos” son herramientas de lectura.</li>
    </ul>

    <div class="cta-group mt-4">
      <a href="#mapa-orbital" class="btn btn-primary">Explorar el mapa v0.4 →</a>
      <a href="#whitepaper" class="btn btn-secondary">Leer whitepaper v0.4</a>
      <a href="#evidencia/metodologia" class="btn btn-secondary">Ver método</a>
    </div>
  </section>`;
}

// ─── Page: Los tres cuerpos (deprecated — router redirects to #tesis) ───────────

function renderTresCuerpos() {
  const vectors = D.vectors || [];
  return `<section class="page-section">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Los tres cuerpos</div>
    <h1>Los tres cuerpos</h1>
    <p class="hero-sub">Los vectores de legitimación epistémica de la política argentina.</p>
    <div class="vector-grid">
      ${vectors.map(v => buildVectorCard(v)).join('')}
    </div>
    ${vectors.length === 0 ? '<p class="muted">Sin datos de vectores disponibles.</p>' : ''}
    <div class="notice notice-amber mt-2">
      <strong>PROVISIONAL:</strong> Las definiciones operacionales de cada vector son provisionales
      y están sujetas a revisión conforme avance la codificación del corpus.
    </div>
    <div class="cta-group mt-4">
      <a href="#mapa-orbital" class="btn btn-primary">Mapa orbital →</a>
    </div>
  </section>`;
}

function buildVectorCard(v) {
  const color   = vectorColor(v.vector_id);
  const signals = Array.isArray(v.discourse_signals)
    ? v.discourse_signals.join('; ')
    : (v.discourse_signals || '');

  return `<div class="vector-card">
    <button type="button" class="vector-card-header" aria-expanded="false">
      <span class="vector-icon" style="background:${color};" aria-hidden="true"></span>
      <span class="vector-card-name" style="color:${color};">${esc(v.name || v.vector_id)}</span>
      <span class="vector-expand-icon" aria-hidden="true">›</span>
    </button>
    <p class="vector-def-short">${esc(v.short_definition || '')}</p>
    <div class="vector-card-body">
      ${signals ? `<div class="vector-section-label">Señales discursivas</div>
        <p class="vector-body-text">${esc(signals)}</p>` : ''}
      ${v.what_it_is_not ? `<div class="vector-section-label">No es</div>
        <p class="vector-body-text">${esc(v.what_it_is_not)}</p>` : ''}
      ${v.over_detection_warning ? `<div class="vector-section-label">Riesgo de sobredetección</div>
        <p class="vector-body-text">${esc(v.over_detection_warning)}</p>` : ''}
    </div>
  </div>`;
}

// ─── Page: Mapa orbital ──────────────────────────────────────────────────────────

const ORBITAL_VERTICES = {
  tecnocracia:  { x: 360, y: 54 },
  mesianismo:   { x: 76,  y: 548 },
  paternalismo: { x: 644, y: 548 },
};

const ORBITAL_VECTOR_LABELS = {
  tecnocracia: 'Tecnocracia',
  mesianismo: 'Mesianismo',
  paternalismo: 'Paternalismo',
};

function orbitalPoint(doc) {
  const weights = doc.weights || {};
  const total = ['tecnocracia', 'mesianismo', 'paternalismo']
    .reduce((sum, vector) => sum + Number(weights[vector] || 0), 0) || 1;
  return ['tecnocracia', 'mesianismo', 'paternalismo'].reduce((point, vector) => {
    const weight = Number(weights[vector] || 0) / total;
    point.x += ORBITAL_VERTICES[vector].x * weight;
    point.y += ORBITAL_VERTICES[vector].y * weight;
    return point;
  }, { x: 0, y: 0 });
}

function orbitalGridPoint(weights) {
  return orbitalPoint({ weights });
}

function renderOrbitalGrid() {
  const vectors = Object.keys(ORBITAL_VERTICES);
  const lines = [];
  for (const vector of vectors) {
    const others = vectors.filter(item => item !== vector);
    for (const share of [.25, .5, .75]) {
      const first = orbitalGridPoint({ [vector]: share, [others[0]]: 1 - share, [others[1]]: 0 });
      const second = orbitalGridPoint({ [vector]: share, [others[0]]: 0, [others[1]]: 1 - share });
      lines.push(`<line class="orbital-grid-line orbital-grid-${esc(vector)}" x1="${first.x.toFixed(2)}" y1="${first.y.toFixed(2)}" x2="${second.x.toFixed(2)}" y2="${second.y.toFixed(2)}" />`);
    }
  }
  return lines.join('');
}

function orbitalDocsForActor(caseUnitId) {
  return (D.orbital_documents || [])
    .filter(doc => doc.case_unit_id === caseUnitId || (!doc.case_unit_id && doc.actor_id === caseUnitId))
    .sort((a, b) => (a.sequence ?? 999) - (b.sequence ?? 999) || a.year - b.year);
}

function orbitalStrengthRadius(strength) {
  return { strong: 9, medium: 7, weak: 5, indeterminate: 9 }[strength] || 6;
}

function orbitalStrengthLabel(strength) {
  return {
    strong: 'Atractor fuerte · separación marcada',
    medium: 'Atractor medio · predominio legible',
    weak: 'Atractor débil · fuerzas próximas',
    indeterminate: 'Atractor indeterminado · sin orden concluyente',
  }[strength] || 'Fuerza no determinada';
}

function orbitalShortConfig(label) {
  const names = { tecnocracia: 'TEC', mesianismo: 'MES', paternalismo: 'PAT', none: '—' };
  if (!label || label === 'indeterminate') return 'SIN ORDEN';
  return label.split('+').map(part => names[part] || part.toUpperCase()).join(' › ');
}

function renderOrbitalSvg(documents, units) {
  const paths = units.map(unit => {
    const docs = orbitalDocsForActor(unit.case_unit_id);
    const points = docs.map(doc => {
      const point = orbitalPoint(doc);
      return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    }).join(' ');
    return points
      ? `<polyline class="orbital-path" data-orbital-actor="${esc(unit.case_unit_id)}" points="${points}" />`
      : '';
  }).join('');

  const points = documents.map((doc, index) => {
    const point = orbitalPoint(doc);
    const radius = orbitalStrengthRadius(doc.attractor_strength);
    const color = vectorColor(doc.dominant_vector);
    const yearDx = index % 2 ? 9 : -9;
    const yearAnchor = index % 2 ? 'start' : 'end';
    const title = `${doc.actor_display_name} · ${doc.year} · ${orbitalShortConfig(doc.configuration)} · ${orbitalStrengthLabel(doc.attractor_strength)}`;
    return `<g class="orbital-point ${doc.is_indeterminate ? 'is-indeterminate' : ''}"
      data-orbital-actor="${esc(doc.case_unit_id || doc.actor_id)}" data-orbital-document="${esc(doc.document_id)}"
      role="button" tabindex="0" aria-label="${esc(title)}"
      transform="translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})"
      style="--orbital-point-color:${esc(color)};">
      <title>${esc(title)}</title>
      <circle class="orbital-point-halo" r="${radius + 5}" />
      <circle class="orbital-point-core" r="${radius}" />
      <text class="orbital-year-label" x="${yearDx}" y="-11" text-anchor="${yearAnchor}">${esc(doc.year)}</text>
    </g>`;
  }).join('');

  return `<svg class="orbital-field" viewBox="0 0 720 620" role="group" aria-labelledby="orbital-field-title orbital-field-desc">
    <title id="orbital-field-title">Campo orbital de tecnocracia, mesianismo y paternalismo</title>
    <desc id="orbital-field-desc">Cada punto es un discurso. Su posición usa simultáneamente el peso relativo de los tres vectores. Las líneas unen los documentos de cada unidad de mandato en orden temporal.</desc>
    <defs>
      <linearGradient id="orbital-field-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#50b5ff" stop-opacity=".12" />
        <stop offset=".52" stop-color="#f05f8e" stop-opacity=".08" />
        <stop offset="1" stop-color="#efb64b" stop-opacity=".12" />
      </linearGradient>
      <linearGradient id="orbital-line-gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#50b5ff" />
        <stop offset=".52" stop-color="#f05f8e" />
        <stop offset="1" stop-color="#efb64b" />
      </linearGradient>
    </defs>
    <polygon class="orbital-field-plane" points="360,54 76,548 644,548" />
    ${renderOrbitalGrid()}
    <line class="orbital-axis axis-tec-mes" x1="360" y1="54" x2="76" y2="548" />
    <line class="orbital-axis axis-mes-pat" x1="76" y1="548" x2="644" y2="548" />
    <line class="orbital-axis axis-pat-tec" x1="644" y1="548" x2="360" y2="54" />
    <g class="orbital-vertex orbital-vertex-tec"><circle cx="360" cy="54" r="7" /><text x="360" y="25" text-anchor="middle">TECNOCRACIA</text></g>
    <g class="orbital-vertex orbital-vertex-mes"><circle cx="76" cy="548" r="7" /><text x="62" y="584" text-anchor="start">MESIANISMO</text></g>
    <g class="orbital-vertex orbital-vertex-pat"><circle cx="644" cy="548" r="7" /><text x="658" y="584" text-anchor="end">PATERNALISMO</text></g>
    <g class="orbital-paths">${paths}</g>
    <g class="orbital-points">${points}</g>
  </svg>`;
}

function renderOrbitalOverview() {
  const documents = D.orbital_documents || [];
  const units = D.orbital_case_units || [];
  const tecPat = documents.filter(doc => {
    const notation = String(doc.adjudicated_notation || '');
    return notation.includes('TEC') && notation.includes('PAT');
  }).length;
  return `<div class="orbital-inspector-kicker">CORPUS COMPLETO · HCDN 1983–2026</div>
    <h3>El campo antes que la etiqueta</h3>
    <p>Cada punto usa los <strong>tres cuerpos al mismo tiempo</strong>. La cercanía a un vértice indica qué fuerza pesa más; la posición interior conserva la presión de las otras dos.</p>
    <div class="orbital-overview-metrics">
      <div><strong>${documents.length}</strong><span>discursos</span></div>
      <div><strong>${units.length || 12}</strong><span>unidades de mandato</span></div>
      <div><strong>${tecPat}</strong><span>con TEC y PAT al frente</span></div>
    </div>
    <p class="orbital-inspector-prompt">Elegí una unidad de mandato para aislar su órbita. También podés activar cualquier punto.</p>`;
}

function renderOrbitalActorInspector(caseUnitId, documentId = '') {
  const unit = (D.orbital_case_units || []).find(item => item.case_unit_id === caseUnitId);
  if (!unit) return renderOrbitalOverview();
  const actor = actorMap[unit.actor_id] || {};
  const publication = actorPublicationEntry(unit.actor_id);
  const doc = orbitalDocsForActor(caseUnitId).find(item => item.document_id === documentId);
  if (!doc) {
    return `<div class="orbital-inspector-kicker">UNIDAD ACTOR × MANDATO</div>
      <h3>${esc(unit.display_name)}</h3>
      <div class="orbital-actor-meta">
        <span>${esc(unit.document_coverage || unit.mandate_period || '')}</span>
        <span>${unit.n_documents || 0} documentos</span>
        <span>${esc(unit.evidence_tier || '')}</span>
      </div>
      <div class="orbital-actor-config">Base: ${esc(unit.baseline_notation || '—')} · v0.4: <strong>${esc(unit.adjudicated_notation || '—')}</strong></div>
      <p>${esc(publication.summary_es || 'La línea une sus documentos en orden temporal. La posición de cada punto conserva los tres vectores.')}</p>
      <div class="orbital-reading-condition"><strong>Estado:</strong> ${esc(unit.direction_status_es || unit.direction_status || '')} · ${esc(unit.pair_review_status || '')}</div>
      <p class="orbital-inspector-prompt">Activá un año en el campo o en la cronología para leer los tres cuerpos de ese documento.</p>`;
  }

  const ranked = Object.entries(doc.weights || {}).sort((a, b) => Number(b[1]) - Number(a[1]));
  const bars = ranked.map(([vector, weight], index) => `<div class="orbital-weight-row">
    <span class="orbital-weight-rank">${index + 1}</span>
    <span class="orbital-weight-name" style="color:${vectorColor(vector)};">${esc(ORBITAL_VECTOR_LABELS[vector] || vector)}</span>
    <span class="orbital-weight-track" aria-hidden="true"><span style="width:${Math.max(2, Number(weight) * 100).toFixed(2)}%;background:${vectorColor(vector)};"></span></span>
  </div>`).join('');
  const flags = [
    doc.has_ambiguity ? 'casi co-dominancia' : '',
    doc.is_low_weight ? 'documento de bajo peso' : '',
    doc.is_indeterminate ? 'orden indeterminado' : '',
    doc.is_corrected ? 'metadatos corregidos' : '',
    doc.recursive_feedback ? 'retroalimentación MES→TEC↺' : '',
  ].filter(Boolean);
  const screenConflict = doc.screen_configuration && doc.adjudicated_configuration
    && doc.screen_configuration !== doc.adjudicated_configuration;
  return `<div class="orbital-inspector-kicker">${esc(unit.short_label || actor.display_name)} · DOCUMENTO</div>
    <h3>${esc(doc.year)}</h3>
    <div class="orbital-document-config">Adjudicación v0.4: ${colorConfig(doc.adjudicated_configuration || doc.configuration)}${doc.adjudicated_notation ? ` · <strong>${esc(doc.adjudicated_notation)}</strong>` : ''}</div>
    ${screenConflict ? `<div class="notice notice-amber"><p><strong>La masa y la función discrepan.</strong> La pantalla léxica marca ${colorConfig(doc.screen_configuration)}; NB15 adjudica ${colorConfig(doc.adjudicated_configuration)}. El punto conserva los pesos de pantalla y la ficha publica la decisión funcional.</p></div>` : ''}
    <p class="orbital-strength">${esc(orbitalStrengthLabel(doc.attractor_strength))}</p>
    <div class="orbital-weight-list" aria-label="Orden relativo de los tres vectores">${bars}</div>
    <p class="orbital-third-body"><strong>El tercer cuerpo no desaparece:</strong> ${esc(ORBITAL_VECTOR_LABELS[doc.third_vector] || doc.third_vector)} conserva una masa relativa y participa de la posición del punto, aunque no figure en la abreviatura de dos términos.</p>
    ${flags.length ? `<div class="orbital-flags">${flags.map(flag => `<span>${esc(flag)}</span>`).join('')}</div>` : ''}
    <p class="orbital-scale-note">Las barras expresan la masa relativa de pantalla. No equivalen a una escala ideológica ni sustituyen la adjudicación funcional.</p>`;
}

function renderOrbitalTimeline(caseUnitId, documentId = '') {
  if (!caseUnitId || caseUnitId === 'all') {
    return `<div class="orbital-timeline-empty">Elegí una trayectoria para ver cómo cambia la configuración documento por documento.</div>`;
  }
  const unit = (D.orbital_case_units || []).find(item => item.case_unit_id === caseUnitId) || {};
  const docs = orbitalDocsForActor(caseUnitId);
  const includeGaps = ['MILEI_2023_PRESENTE', 'CFK_I_2007_2011', 'ALBERTOF_2019_2023'].includes(caseUnitId);
  const gaps = (includeGaps ? (CORPUS_GAPS[unit.actor_id] || []) : []).map(gap => ({ ...gap, isGap: true, sequence: 999 }));
  const entries = [...docs, ...gaps].sort((a, b) => a.year - b.year || (a.sequence ?? 999) - (b.sequence ?? 999));
  return `<div class="orbital-timeline-track">${entries.map(entry => {
    if (entry.isGap) return `<div class="orbital-timeline-gap"><strong>${esc(entry.year)}</strong><span>sin documento</span></div>`;
    const active = entry.document_id === documentId;
    return `<button type="button" class="orbital-timeline-doc ${active ? 'is-selected' : ''}"
      data-orbital-actor="${esc(caseUnitId)}" data-orbital-document="${esc(entry.document_id)}"
      style="--timeline-color:${vectorColor(entry.dominant_vector)};" aria-pressed="${active}">
      <strong>${esc(entry.year)}</strong><span>${esc(orbitalShortConfig(entry.configuration))}</span>
    </button>`;
  }).join('')}</div>`;
}

function renderMapaOrbital() {
  const configs = D.configurations || [];
  const actors  = (D.actors_hcdn || []).filter(actor => actor.include_in_actor_map !== false);
  const units = (D.orbital_case_units || []).slice().sort((a, b) => (a.order || 99) - (b.order || 99));
  const documents = D.orbital_documents || [];
  return `<section class="page-section orbital-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Mapa orbital</div>
    <div class="orbital-page-header">
      <div class="section-kicker">52 DISCURSOS · 12 UNIDADES DE MANDATO · TRES FUERZAS SIMULTÁNEAS</div>
      <h1>Mapa orbital de los tres cuerpos</h1>
      <p class="hero-sub">Cada punto es un discurso presidencial. Su posición conserva tecnocracia, mesianismo y paternalismo; las líneas muestran cómo esa relación se desplaza en el tiempo.</p>
    </div>

    <div class="mapa-tc-intro">
      <div class="mapa-tc-grid">
        <div class="mapa-tc-item">
          <span class="mapa-tc-dot" style="background:var(--tec);" aria-hidden="true"></span>
          <strong style="color:var(--tec);">Modernización tecnocrática</strong>
          <span class="mapa-tc-note">Reforma técnica del Estado, gestión, racionalización. El lenguaje de la transformación objetiva.</span>
        </div>
        <div class="mapa-tc-item">
          <span class="mapa-tc-dot" style="background:var(--mes);" aria-hidden="true"></span>
          <strong style="color:var(--mes);">Mesianismo redentor</strong>
          <span class="mapa-tc-note">Ruptura histórica, misión, sacrificio y destino. Puede organizar una crisis o representar el gobierno como transición civilizatoria.</span>
        </div>
        <div class="mapa-tc-item">
          <span class="mapa-tc-dot" style="background:var(--pat);" aria-hidden="true"></span>
          <strong style="color:var(--pat);">Paternalismo conservador</strong>
          <span class="mapa-tc-note">Tutela social, cuidado, protección. El vector más frecuente como dominante en el corpus HCDN.</span>
        </div>
      </div>
      <div class="orbital-reading-rule">
        <span><strong>1.</strong> Los vértices son fuerzas, no ideologías.</span>
        <span><strong>2.</strong> Cada punto usa los tres pesos.</span>
        <span><strong>3.</strong> La línea temporal es la órbita del mandato.</span>
      </div>
      <p class="muted mapa-tc-footer"><code>PAT→TEC</code> indica que PAT encuadra y TEC opera o prueba; <code>PAT↔TEC</code> conserva una dirección indeterminada. El tercer cuerpo sigue dentro del cálculo y de la posición.</p>
    </div>

    <section class="orbital-map" data-orbital-map>
      <div class="orbital-toolbar">
        <div>
          <span class="orbital-control-label">AISLAR UNA UNIDAD ACTOR × MANDATO</span>
          <div class="orbital-actor-controls" role="group" aria-label="Seleccionar unidad de mandato del mapa orbital">
            <button type="button" class="orbital-actor-button is-active" data-orbital-actor="all" aria-pressed="true">Corpus completo</button>
            ${units.map(unit => `<button type="button" class="orbital-actor-button" data-orbital-actor="${esc(unit.case_unit_id)}" aria-pressed="false">${esc(unit.short_label)}</button>`).join('')}
          </div>
        </div>
        <div class="orbital-symbol-key" aria-label="Leyenda de tamaño de puntos">
          <span><i class="symbol-strong"></i>atractor fuerte</span>
          <span><i class="symbol-medium"></i>medio</span>
          <span><i class="symbol-weak"></i>débil</span>
          <span><i class="symbol-indeterminate"></i>indeterminado</span>
        </div>
      </div>
      <div class="orbital-stage">
        <div class="orbital-field-wrap"><span class="orbital-pan-hint">Deslizá el campo ↔</span>${renderOrbitalSvg(documents, units)}</div>
        <aside class="orbital-inspector" aria-live="polite">${renderOrbitalOverview()}</aside>
      </div>
      <div class="orbital-timeline" aria-live="polite">${renderOrbitalTimeline('all')}</div>
    </section>

    <section class="orbital-family-section">
      <div class="section-sep-label"><span>LEYENDA ESTADÍSTICA</span></div>
      <div class="orbital-family-heading">
        <div><span class="section-kicker">FAMILIAS DE PRIMER PLANO</span><h2>Cómo se abrevia lo que muestra el campo</h2></div>
        <p>Estas familias cuentan qué dos fuerzas ocupan el primer plano y en qué orden. Son una síntesis estadística del mapa, no órbitas independientes.</p>
      </div>
      <div class="config-cards">
        ${configs.map(c => buildConfigCard(c, actors)).join('')}
      </div>
      ${configs.length === 0 ? '<p class="muted">Sin datos de configuraciones disponibles.</p>' : ''}
    </section>

    <div class="orbital-boundary-note">
      <div class="orbital-boundary-main"><strong>Qué demuestra:</strong> masa relativa, adjudicación funcional y transiciones del lenguaje presidencial formal dentro del corpus HCDN.</div>
      <div><strong>Qué no demuestra:</strong> ideología, políticas ejecutadas, personalidad del actor ni una conciliación estable de los tres cuerpos.</div>
      <a href="#evidencia/peron">Perón se mantiene fuera de esta escala numérica →</a>
    </div>
    <div class="notice notice-amber mt-2">
      ${buildBadgeGroup(['PROVISIONAL', 'HCDN_ONLY'])}
      La proyección deriva de NB05/NB10, la auditoría NB13 y la prueba temporal NB15. En 2026, la posición conserva la masa de pantalla y la ficha muestra la pareja funcional adjudicada. Ninguna magnitud es comparable con la pipeline de Perón.
    </div>
    <div class="cta-group mt-4">
      <a href="#actores" class="btn btn-primary">Actores →</a>
      <a href="#tesis"   class="btn btn-secondary">Entender la idea central</a>
    </div>
  </section>`;
}

function buildConfigCard(c, allActors) {
  const associatedIds = new Set(c.associated_case_unit_ids || []);
  const assocActors = allActors.filter(a =>
    associatedIds.has(a.linked_case_unit_id) && a.include_in_actor_map !== false
  );
  const actorLinks = assocActors.map(a =>
    `<a href="#actores/${esc(a.actor_id)}">${esc(a.display_name)}</a>`
  ).join(', ');

  const statusLabel = { dominant: 'FRECUENTE', minor: 'MINORITARIA', marginal: 'CASO LÍMITE', indeterminate: 'SIN POSICIÓN' }[c.status]
    || esc(c.status || '');

  const caveatsHtml = Array.isArray(c.caveats) && c.caveats.length
    ? `<ul>${c.caveats.map(ct => `<li class="muted" style="font-size:.85rem;">${esc(ct)}</li>`).join('')}</ul>`
    : '';

  return `<div class="config-card">
    <button type="button" class="config-card-header" aria-expanded="false">
      <span class="config-label-large">${colorConfig(c.directed_label || c.configuration_id)}</span>
      <span class="config-stats">${statusLabel} · ${c.document_count || 0} DOC · ${c.actor_count || 0} ACTORES</span>
      <span class="config-card-expand" aria-hidden="true">›</span>
    </button>
    <div class="config-card-body">
      <div class="config-card-inner">
        ${c.plain_language_definition ? `<p>${esc(c.plain_language_definition)}</p>` : ''}
        ${actorLinks ? `<p class="text-2"><strong>Actores:</strong> ${actorLinks}</p>` : ''}
        ${caveatsHtml}
      </div>
    </div>
  </div>`;
}

// ─── Page: Actores ─────────────────────────────────────────────────────────────

function renderActores() {
  const actors = (D.actors_hcdn || []).filter(a => a.include_in_actor_map !== false);
  const peronPhases = D.peron_phase_cards || [];
  const publication = D.actor_publication || {};
  const layers = publication.layers || {};
  const legends = publication.legends || [];
  const peronLegends = legends.filter(legend => String(legend.id || '').startsWith('peron_'));
  return `<section class="page-section">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Actores y Leyendas</div>
    <div class="actor-page-header">
      <div class="actor-page-kicker">DOS CAPAS · UNA CORRESPONDENCIA EXPLÍCITA</div>
      <h1>Actores medidos y Leyendas del juego</h1>
      <p class="hero-sub">La investigación agrupa documentos por persona y conserva visible cuándo cambia la fuente. El videojuego construye encarnaciones jugables de momentos políticos.</p>
    </div>

    <div class="actor-layer-explainer" aria-label="Diferencia entre actores y Leyendas">
      <article>
        <span class="actor-layer-number">11</span>
        <div><h2>${esc(layers.research_title || 'Actores del corpus')}</h2><p>${esc(layers.research_description || '')}</p></div>
      </article>
      <article>
        <span class="actor-layer-number">15</span>
        <div><h2>${esc(layers.game_title || 'Leyendas jugables')}</h2><p>${esc(layers.game_description || '')}</p></div>
      </article>
      <p class="actor-layer-difference">${esc(layers.difference_note || '')} <a href="#evidencia/peron">Ver la separación metodológica de Perón.</a></p>
    </div>

    <nav class="actor-layer-jump" aria-label="Capas de actores y Leyendas">
      <a href="#actor-peron">Perón histórico</a>
      <a href="#actores-corpus">Actores HCDN</a>
      <a href="#leyendas-jugables">Leyendas jugables</a>
    </nav>

    <section id="actor-peron" class="actor-layer-section actor-historical-section">
      <div class="actor-section-heading">
        <div><span class="section-kicker">INVESTIGACIÓN · PIPELINE HISTÓRICA 1946–1954</span><h2>El primer actor medido</h2></div>
        <p>Fuente y escala separadas del corpus HCDN; la diferencia impide mezclar cifras, no excluir al actor.</p>
      </div>
      <div class="actor-grid actor-grid-historical">
        ${buildPeronActorCard(peronPhases, peronLegends)}
      </div>
    </section>

    <section id="actores-corpus" class="actor-layer-section">
      <div class="actor-section-heading">
        <div><span class="section-kicker">INVESTIGACIÓN · HCDN 1983–2026</span><h2>Diez personas · doce unidades de mandato</h2></div>
        <p>Las fechas indican <strong>cobertura documental</strong>, no una cronología completa del mandato.</p>
      </div>
      <div class="actor-grid">
        ${actors.map(a => buildActorCard(a)).join('')}
      </div>
      ${actors.length === 0 ? '<p class="muted">Sin datos de actores disponibles.</p>' : ''}
      <p class="context-method-link">Los límites de cada lectura aparecen dentro de su ficha. El método completo está en <a href="#evidencia">Evidencia y método</a>.</p>
    </section>

    <section id="leyendas-jugables" class="actor-layer-section legend-roster-section">
      <div class="actor-section-heading">
        <div><span class="section-kicker">VIDEOJUEGO · MODO LEYENDA</span><h2>Quince Leyendas jugables</h2></div>
        <p>Cada tarjeta abre su puntaje, fuente, regla de traducción y cautela. Una persona puede ocupar más de una.</p>
      </div>
      <div class="legend-roster-grid">${legends.map(buildLegendRosterCard).join('')}</div>
      <div class="legend-roster-cta">
        <p>Las Leyendas llevan esa configuración al presente y enfrentan conflictos contemporáneos; no vuelven a una vida histórica.</p>
        <a href="#leyendas" class="btn btn-primary">Ver trazabilidad completa →</a>
      </div>
    </section>
  </section>`;
}

function buildActorCard(a) {
  const legends = actorLegends(a.actor_id);
  const cautionCls = a.caution_level === 'BLOQUEADO' ? 'high-caution' : '';
  return `<article class="actor-card ${cautionCls}">
    ${buildActorVisual(a, legends)}
    <div class="actor-card-copy">
      <div class="actor-kind">ACTOR DEL CORPUS HCDN</div>
      <div class="actor-name">${esc(a.display_name)}</div>
      <div class="actor-period"><span>Cobertura documental</span>${esc(a.period || '')}</div>
      <div class="actor-config-label">Síntesis del corpus</div>
      <div class="actor-config-line"><code>${esc(a.adjudicated_notation || a.directed_configuration || '—')}</code></div>
      <div class="actor-meta-row">
        ${a.n_documents || 0} ${a.n_documents === 1 ? 'documento' : 'documentos'} · ${esc(publicCautionLabel(a))}
      </div>
      <div class="actor-game-status ${legends.length ? '' : 'is-empty'}">
        ${legends.length
          ? `${legends.length} ${legends.length === 1 ? 'correspondencia jugable' : 'correspondencias jugables'}`
          : 'Sin Leyenda jugable en la beta pública'}
      </div>
      <a href="#actores/${esc(a.actor_id)}" class="actor-card-link">Abrir ficha del corpus →</a>
    </div>
  </article>`;
}

function buildPeronActorCard(phases, legends) {
  const measured = phases.filter(phase => !phase.blocked && phase.configuration_hypothesis);
  const measuredYears = measured.map(phase => phase.year).filter(Boolean);
  const coverage = measuredYears.length ? measuredYears.join(' · ') : 'Sin fases disponibles';
  const peronActor = { display_name: 'Juan Domingo Perón' };
  return `<article class="actor-card actor-card-historical tier-3">
    ${buildActorVisual(peronActor, legends)}
    <div class="actor-card-copy">
      <div class="actor-kind">ACTOR MEDIDO · PIPELINE HISTÓRICA</div>
      <div class="actor-name">Juan Domingo Perón</div>
      <div class="actor-period"><span>Cobertura documental medida</span>${esc(coverage)}</div>
      <div class="actor-config-label">Síntesis de fases</div>
      <div class="actor-config-line"><code>MES + PAT</code> <span class="actor-config-caveat">escala propia</span></div>
      <div class="actor-meta-row">
        ${measured.length} documentos medidos · fuente separada de HCDN
      </div>
      <div class="actor-game-status is-empty">1973 · fuente primaria bloqueada</div>
      <div class="actor-game-status">${legends.length} correspondencias jugables</div>
      <a href="#evidencia/peron" class="actor-card-link">Abrir evidencia histórica →</a>
    </div>
  </article>`;
}

// ─── Page: Actor detail ─────────────────────────────────────────────────────────

function renderActorDetail(actorId) {
  const actor = actorMap[actorId];
  if (!actor) {
    return `<section class="page-section error-panel">
      <h1>Actor no encontrado</h1>
      <p>Actor no encontrado: <code>${esc(actorId)}</code>. <a href="#actores">← Volver a actores</a></p>
    </section>`;
  }

  const docs = (D.documents_hcdn || []).filter(d =>
    d.actor_id === actorId && d.include_in_timeline !== false
  );
  const gaps      = CORPUS_GAPS[actorId] || [];
  const publication = actorPublicationEntry(actorId);
  const legends = actorLegends(actorId);
  const hypothesis = publication.summary_es || actor.main_hypothesis || '(no disponible en esta versión)';
  const caveat = publication.caveat_es || actor.required_caveat || 'Lectura provisional basada en el corpus HCDN disponible.';

  return `<section class="page-section">
    <div class="breadcrumb">
      <a href="#inicio">Inicio</a> <span>›</span>
      <a href="#actores">Actores y Leyendas</a> <span>›</span>
      ${esc(actor.display_name)}
    </div>

    <div class="actor-detail-hero">
      ${buildActorVisual(actor, legends, true)}
      <div class="actor-detail-header">
        <div class="actor-kind">ACTOR DEL CORPUS · UNIDAD DE INVESTIGACIÓN</div>
        <h1 class="actor-detail-name">${esc(actor.display_name)}</h1>
        <div class="actor-detail-meta">
          <span>Cobertura documental ${esc(actor.period || '')}</span>
          <span>${actor.n_documents || 0} ${actor.n_documents === 1 ? 'documento' : 'documentos'}</span>
        </div>
        <div class="actor-detail-config">Mapa v0.4 · <code>${esc(actor.adjudicated_notation || actor.directed_configuration || '—')}</code></div>
      </div>
    </div>

    ${buildActorLegendBridge(actor, legends)}

    <div class="field-block">
      <div class="field-label">Lectura de la trayectoria documental</div>
      <div class="hypothesis-text">${esc(hypothesis)}</div>
    </div>

    <div class="required-caveat-block">
      <div class="required-caveat-label">LÍMITES DE ESTA LECTURA</div>
      <p class="required-caveat-text">${esc(caveat)}</p>
    </div>

    <div class="field-block">
      <div class="field-label">Perfil del corpus</div>
      <table class="stability-table">
        <thead><tr><th>Campo</th><th>Valor</th></tr></thead>
        <tbody>
          <tr>
            <td>Masa dominante histórica</td>
            <td style="color:${vectorColor(actor.dominant_vector)};">${esc(actor.dominant_vector || '—')}</td>
          </tr>
          <tr>
            <td>Masa secundaria histórica</td>
            <td style="color:${vectorColor(actor.secondary_vector)};">${esc(actor.secondary_vector || '—')}</td>
          </tr>
          <tr><td>Adjudicación funcional v0.4</td><td><code>${esc(actor.adjudicated_notation || '—')}</code></td></tr>
          <tr><td>Cambios entre documentos</td><td>${actor.transition_count != null ? actor.transition_count : '—'}</td></tr>
          <tr><td>Trayectoria</td><td>${esc(publicStabilityLabel(actor))}</td></tr>
          <tr><td>Condición de lectura</td><td>${esc(publicCautionLabel(actor))}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="field-block">
      <div class="field-label">Documentos en el corpus</div>
      ${buildTimeline(docs, gaps)}
      <p class="timeline-source-link"><a href="${OFFICIAL_HCDN_ARCHIVE}" target="_blank" rel="noopener">Consultar archivo oficial de mensajes presidenciales HCDN ↗</a></p>
    </div>

    ${buildCaseUnitBlock(actor)}

    <div class="cta-group mt-4">
      <a href="#actores" class="btn btn-secondary">← Volver a Actores y Leyendas</a>
      ${legends.length ? `<a href="#leyendas/${esc(legends[0].id)}" class="btn btn-primary">Ver por qué tiene ese puntaje →</a>` : ''}
    </div>
  </section>`;
}

function buildTimeline(docs, gaps) {
  const entries = [];
  for (const d of docs) entries.push({ type: 'doc', year: Number(d.year) || 0, data: d });
  for (const g of gaps)  entries.push({ type: 'gap', year: g.year, data: g });
  entries.sort((a, b) => a.year - b.year);

  if (!entries.length) return '<p class="muted">Sin documentos registrados en el corpus.</p>';

  return `<div class="timeline">
    <p class="timeline-intro">
      Documentos codificados · Los años con brecha indican períodos sin cobertura en el corpus actual.
    </p>
    ${entries.map(e => {
      if (e.type === 'gap') {
        return `<div class="timeline-gap">
          <span class="timeline-year">${e.data.year}</span>
          <span class="timeline-gap-note">BRECHA — ${esc(e.data.note)}</span>
        </div>`;
      }
      const d = e.data;
      return `<div class="timeline-item">
        <span class="timeline-year">${Math.round(d.year) || '—'}</span>
        <div class="timeline-config" title="ID del corpus: ${esc(d.document_id || '(sin id)')}">
          <span class="timeline-document-title">${esc(documentPublicTitle(d))}</span>
          ${d.is_corrected ? `<span class="tl-flag corrected">corregido</span>` : ''}
          ${d.has_nb05_ambiguity_flag ? `<span class="tl-flag ambiguous">ambiguo</span>` : ''}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function documentPublicTitle(document) {
  const id = String(document.document_id || '').toLowerCase();
  if (id.includes('extraordinaria')) return 'Asamblea legislativa extraordinaria';
  if (id.includes('asunc')) return 'Discurso de asunción presidencial';
  return 'Mensaje de apertura de sesiones';
}

function buildCaseUnitBlock(actor) {
  return `<div class="actor-source-note">
    <span class="field-label">Procedencia de la ficha</span>
    <p>Corpus presidencial HCDN · agrupación por actor y cobertura documental · matriz interpretativa NB10.</p>
    <a href="#evidencia">Ver fuentes, comparabilidad y método →</a> ·
    <a href="${RESEARCH_REPOSITORY}/blob/main/data_public/actor_publication.json" target="_blank" rel="noopener">Abrir ficha pública JSON ↗</a>
  </div>`;
}

// ─── Sección metodológica: Perón ─────────────────────────────────────────────

function renderPeronMethodSection() {
  const cards = D.peron_phase_cards || [];
  return `<section id="evidencia-peron" class="ev-embedded-section">
    <hr class="light">
    <div class="section-kicker">CONTRAPUNTO · FUERA DE LA SERIE 1983–2026</div>
    <h3>§3.1 — Perón: otra fuente, otra escala</h3>
    <p>Perón es un actor medido mediante una pipeline histórica propia. No constituye un punto adicional del mapa democrático porque su fuente y su escala no son numéricamente comparables; esa separación metodológica no lo excluye del registro de actores.</p>
    <div class="notice notice-red">
      <p><strong>Separación estructural:</strong> Los períodos peronistas (1946–1955 y 1973–1974)
         son anteriores a la transición democrática de 1983. El HCDN no constituyó el corpus
         primario de legitimación. Los perfiles que siguen son <em>hipótesis exploratorias</em>,
         no comparables con los actores de la grilla democrática.</p>
    </div>

    <div class="peron-lane-sep" role="separator">
      <div class="peron-lane-sep-title">ZONA SEPARADA · NO COMPARABLE · PRE-1983</div>
      <div class="peron-lane-sep-text">
        El análisis de Perón no comparte la escala ni el corpus de los actores democráticos.
        Ver <a href="#evidencia">§ Evidencia y método</a> para tratamiento metodológico completo.
      </div>
    </div>

    <div class="peron-cards">
      ${cards.map(c => c.blocked ? buildPeronBlockedCard(c) : buildPeronPhaseCard(c)).join('')}
    </div>
    ${cards.length === 0 ? '<p class="muted">Sin datos de Perón disponibles.</p>' : ''}

    <div class="notice notice-red mt-4">
      ${buildBadgeGroup(['BLOQUEADO', 'SOURCE_FAILURE'])}
      El análisis de Perón 1973 está bloqueado por falta de fuente primaria verificable.
      Ver <a href="#evidencia/roadmap">§ Roadmap de investigación</a> para el estado de adquisición.
    </div>
  </section>`;
}

function buildPeronPhaseCard(c) {
  const caveats = Array.isArray(c.caveats) ? c.caveats : [];
  return `<div class="peron-card">
    <button type="button" class="peron-card-header" aria-expanded="false">
      <span class="peron-card-year">${esc(c.title || String(c.year || c.phase_id))}</span>
      ${c.configuration_hypothesis
        ? `<span class="config-label">${colorConfig(c.configuration_hypothesis)}</span>`
        : ''}
      <span class="peron-card-expand" aria-hidden="true">›</span>
    </button>
    <div class="peron-card-body">
      <div class="peron-card-inner">
        ${c.phase_interpretation ? `<p>${esc(c.phase_interpretation)}</p>` : ''}
        ${caveats.length ? `<ul>${caveats.map(ct => `<li class="muted" style="font-size:.85rem;">${esc(ct)}</li>`).join('')}</ul>` : ''}
        ${buildBadgeGroup(c.caveat_badges || [])}
        <p class="muted" style="font-size:.75rem;margin-top:.75rem;">
          Las puntuaciones vectoriales de este período no se exponen en la interfaz pública.
        </p>
      </div>
    </div>
  </div>`;
}

function buildPeronBlockedCard(c) {
  const caveats = Array.isArray(c.caveats) ? c.caveats : [];
  return `<div class="peron-card blocked" aria-label="Perón 1973 — Bloqueado">
    <div class="peron-card-header peron-card-header-blocked">
      <span class="peron-card-year">${esc(c.title || String(c.year || c.phase_id))}</span>
      ${buildBadgeGroup(['BLOQUEADO', 'SOURCE_FAILURE'])}
    </div>
    <div class="peron-card-inner" style="border-top:1px solid rgba(198,71,54,.2);padding:1rem 1.25rem;">
      <p class="blocked-reason-text">${esc(c.blocked_reason || 'Fuente primaria no disponible.')}</p>
      ${caveats.length ? `<ul>${caveats.map(ct => `<li style="font-size:.85rem;">${esc(ct)}</li>`).join('')}</ul>` : ''}
      ${c.next_action ? `<p class="blocked-next-action"><strong>Próxima acción:</strong> ${esc(c.next_action)}</p>` : ''}
      <p class="blocked-next-action">
        Ver <a href="#evidencia/roadmap">§ Roadmap de investigación</a> para el estado de adquisición de fuente.
      </p>
    </div>
  </div>`;
}

// ─── Page: Evidencia y método ────────────────────────────────────────────────

const EVIDENCIA_NOTEBOOKS = [
  { id: 'NB01', name: 'Inventario y calidad',         purpose: 'Catalogación de fuentes por actor y período; evaluación de calidad de OCR y cobertura del corpus.',                                               status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB02', name: 'Línea de base léxica',         purpose: 'Frecuencias léxicas brutas por documento. Output pre-calibración. Supersedido por NB05.',                                                         status: 'completado', sharing: 'internal_only' },
  { id: 'NB03', name: 'Léxico ponderado',             purpose: 'Señales ponderadas por subtipo (TM/TCM/AGN). Pre-calibración. Supersedido por NB05.',                                                              status: 'completado', sharing: 'internal_only' },
  { id: 'NB04', name: 'Señales proposicionales',      purpose: 'Extracción y clasificación de patrones proposicionales por documento. Versiones múltiples; v0.12 es la definitiva.',                               status: 'completado', sharing: 'internal_only' },
  { id: 'NB05', name: 'Calibración de base',          purpose: 'Scores calibrados (TM×1.00 / TCM×0.50 / AGN×0.00) para los 51 documentos de la base 1983–2025. NB15 aplica el mismo instrumento a 2026.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB06', name: 'Auditoría',                    purpose: 'Verificación de coherencia interna y correcciones de metadatos (parche METADATA_CORREGIDA v0.2, 2026-04-29).',                                    status: 'completado', sharing: 'internal_only' },
  { id: 'NB07', name: 'Perfiles de actor (v. ant.)',  purpose: 'Iteración de perfiles anterior a NB10. Incluido por continuidad documental. Sus figuras están promovidas en la galería.',                          status: 'completado', sharing: 'internal_only' },
  { id: 'NB08', name: 'Perfiles democráticos',        purpose: 'Configuraciones dirigidas dos-cuerpos, niveles de cautela, transiciones, flags de ambigüedad por actor.',                                          status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB09', name: 'Paquetes de caso cualitativos',purpose: 'Extractos representativos por actor (cinco prioritarios: CFK, Menem, Alfonsín, Macri, Milei). Base empírica de afirmaciones hipotéticas.',        status: 'parcial',    sharing: 'internal_only', note: 'Ejemplo Menem 1999 promovido; parseo integral pendiente' },
  { id: 'NB10', name: 'Síntesis interpretiva',        purpose: 'Matriz de actor, mapa de configuraciones, hipótesis controladas. Fuente canónica de todos los perfiles y configuraciones del sitio.',             status: 'completado', sharing: 'needs_cleanup', note: 'Figuras promovidas disponibles' },
  { id: 'NB12', name: 'Caos Milei',                   purpose: 'Formula abductivamente la relación MES–TEC en la asunción 2023 y las aperturas 2024–2025. Distingue encuadre, instrumento y prueba.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB13', name: 'Auditoría de dirección',       purpose: 'Reabre la flecha del corpus base por actor × mandato mediante tiempo, problema, autoridad, sujeto, telos, sacrificio y medios/prueba.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB14', name: 'Mapa orbital v0.2',            purpose: 'Separa Menem I/II y CFK I/II y publica las doce unidades de mandato.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB15', name: 'Prueba temporal Milei 2026',   purpose: 'Incorpora la apertura oficial de 2026, conserva la pantalla heredada y adjudica el conflicto masa/función entre cuatro parejas rivales.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB16', name: 'Mapa orbital v0.3',            purpose: 'Agrega el documento 52, actualiza Milei a MES→TEC↺ y cierra la etapa abductiva anterior.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB17', name: 'Calibrador longitudinal',      purpose: 'Codifica exhaustivamente 72 señales de Milei 2024–2026 por polaridad, función y posición y congela el corpus de 52 documentos.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB18', name: 'Recalibración simétrica',      purpose: 'Aplica el mismo instrumento a TEC, MES y PAT en 1.048 señales. La primera pasada automática se conserva como stress test, no como verdad de terreno.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB19', name: 'Mapa candidato v0.4',          purpose: 'Separa masa, pareja, dirección y trayectoria para las doce unidades actor × mandato.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB20', name: 'Sensibilidad',                 purpose: 'Ejecuta LODO sobre ocho funciones y 2.000 remuestreos documentales por unidad.', status: 'completado', sharing: 'needs_cleanup' },
  { id: 'NB21', name: 'Mapa orbital v0.4',            purpose: 'Promueve doce adjudicaciones, cinco cambios de notación y ninguna alteración de pareja; publica límites de réplica.', status: 'completado', sharing: 'needs_cleanup' },
];

const EVIDENCIA_PERON_NOTEBOOKS = [
  { id: 'PERON_NB01', name: 'Inventario Perón',       purpose: 'Catalogación y evaluación de fuentes. Identificación de PERON_SRC_015 como Diario de Sesiones de Allende — no discurso de Perón. Bloqueo BLQ-02c.', status: 'completado', sharing: 'internal_only' },
  { id: 'PERON_NB02', name: 'Proposicional Perón',    purpose: 'Patrones proposicionales sobre segmentos extraídos manualmente de los documentos de asunción 1946 y apertura 1954.',                                status: 'completado', sharing: 'internal_only' },
  { id: 'PERON_NB03', name: 'Contraste 1946–1954',    purpose: 'Hipótesis de trayectoria: MES+PAT como configuración dirigida sostenida en ambos documentos. TEC terciario con debilitamiento entre 1946 y 1954.',  status: 'completado', sharing: 'needs_cleanup' },
];

const EVIDENCIA_DATASETS = [
  { name: 'UNIFIED_CLEAN_CASE_MATRIX_v0_1.csv', contains: 'Matriz unificada de casos: actor, período, configuración dirigida, nivel de cautela, flags y correcciones de metadatos.', lineage: 'NB08 + NB10 + parche v0.2', shareable: false, note: 'Contiene scores calibrados. Requiere data dictionary.' },
  { name: 'NB10 — actor_avg matrix',            contains: 'Perfil nivel-actor: directed_configuration, caution_level, attractor_strength, avg vectoriales.', lineage: 'NB05 → NB10',           shareable: false, note: 'Requiere limpieza de nomenclatura.' },
  { name: 'NB10 — document table',              contains: 'Scores nivel-documento y configuración por período.',                                               lineage: 'NB05 → NB10',           shareable: false, note: 'Requiere limpieza.' },
  { name: 'NB10 — configuration map',           contains: 'Distribución de configuraciones: n actores, n documentos, porcentaje del corpus.',                 lineage: 'NB10_configuration_map', shareable: true,  note: 'Publicable. Figuras promovidas disponibles.' },
  { name: 'JSON static data (web/data/*.json)', contains: 'Archivos JSON versionados: corpus, unidades de mandato, mapa orbital, vectores, configuraciones, Perón, roadmap y metadatos editoriales.', lineage: 'NB10 → NB21 + exportación web v0.4', shareable: true, note: 'Publicados actualmente en este sitio.' },
  { name: 'Registro Perón + contraste de fase', contains: 'Registro PERON_SRC_015/BLQ-02c; tablas de conteo proposicional 1946 vs 1954 (MES/PAT/TEC).',    lineage: 'PERON_ALT_PIPELINE',     shareable: false, note: 'Requiere nota metodológica antes de publicar.' },
];

function sharingBadge(s, shareable) {
  if (shareable) return '<span class="ev-badge ev-badge-ok">publicable</span>';
  if (s === 'needs_cleanup') return '<span class="ev-badge ev-badge-warn">requiere limpieza</span>';
  return '<span class="ev-badge ev-badge-block">solo interno</span>';
}

function buildNotebookRow(nb, shareKey) {
  const badge = (shareKey === 'dataset')
    ? sharingBadge(null, nb.shareable)
    : sharingBadge(nb.sharing, false);
  return `<tr class="ev-nb-row">
    <td class="ev-nb-id">${esc(nb.id)}</td>
    <td class="ev-nb-name">${esc(nb.name)}</td>
    <td class="ev-nb-purpose">${esc(nb.purpose)}${nb.note ? `<span class="ev-nb-note"> · ${esc(nb.note)}</span>` : ''}</td>
    <td class="ev-nb-sharing">${badge}</td>
  </tr>`;
}

function renderMenemWorkedExample() {
  return `<section id="evidencia-ejemplo-menem" class="ev-embedded-section ev-method-example">
    <hr class="light">
    <div class="section-kicker">EJEMPLO COMPLETO · MENEM 1999</div>
    <h3>§2 — Un discurso, paso a paso</h3>
    <p>Elegimos este mensaje porque aparecen los tres vectores. Eso permite ver la diferencia entre <strong>encontrar una señal</strong> y <strong>decidir qué relación organiza el discurso</strong>.</p>

    <div class="ev-method-docline">
      <strong>Carlos Menem · apertura de sesiones · 1 de marzo de 1999</strong>
      <span>8.296 palabras · una sola pieza discursiva</span>
    </div>

    <div class="ev-phrase-grid" aria-label="Frases detectadas por vector">
      <article class="ev-phrase-lane ev-phrase-pat">
        <div class="ev-phrase-vector">PAT · Paternalismo</div>
        <div class="ev-phrase-item">
          <span class="ev-phrase-pattern">PAT-01 · justicia social</span>
          <q>democracia plena de justicia social</q>
        </div>
        <div class="ev-phrase-item">
          <span class="ev-phrase-pattern">PAT-02 · seguridad social</span>
          <q>legítimos beneficios de la seguridad social</q>
        </div>
        <div class="ev-phrase-item">
          <span class="ev-phrase-pattern">PAT-02 · protección</span>
          <q>la protección de la tercera edad debe ser uno de nuestros capitales como Nación</q>
        </div>
        <p>Estas señales se repiten en pasajes distintos: justicia social, derechos y obligación estatal de protección.</p>
      </article>

      <article class="ev-phrase-lane ev-phrase-tec">
        <div class="ev-phrase-vector">TEC · Tecnocracia</div>
        <div class="ev-phrase-item">
          <span class="ev-phrase-pattern">TEC-03 · reforma estructural · TM</span>
          <q>reforma tributaria progresiva y equitativa</q>
        </div>
        <div class="ev-context-block">
          <span class="ev-phrase-pattern">Contexto del mismo segmento</span>
          <q>apertura de la economía</q>
          <q>autonomía del Banco Central</q>
          <q>Presupuesto Nacional, como instrumento central en la fijación de prioridades</q>
        </div>
        <p>El conteo registra «reforma tributaria». Las otras expresiones no suman puntos por separado: confirman que el pasaje habla de medios, instituciones e instrumentos.</p>
      </article>

      <article class="ev-phrase-lane ev-phrase-mes">
        <div class="ev-phrase-vector">MES · Mesianismo</div>
        <div class="ev-phrase-item">
          <span class="ev-phrase-pattern">MES-05 · nueva era</span>
          <q>los desafíos de una nueva era histórica</q>
        </div>
        <p>La señal existe. Pero su sola presencia no vuelve mesianista al documento ni obliga a incluir MES en la pareja principal.</p>
        <div class="ev-control-label">CONTROL NEGATIVO · PRESENCIA ≠ DOMINANCIA</div>
      </article>
    </div>

    <div class="ev-method-steps" aria-label="Secuencia de adjudicación">
      <div class="ev-method-step"><span>1</span><p><strong>Encontrar.</strong> Una frase abre una posibilidad; todavía no define el resultado.</p></div>
      <div class="ev-method-step"><span>2</span><p><strong>Leer.</strong> Se comprueba quién habla, qué afirma y para qué usa esa frase.</p></div>
      <div class="ev-method-step"><span>3</span><p><strong>Comparar.</strong> Se evitan repeticiones falsas y se compara cuánto aparece cada vector.</p></div>
      <div class="ev-method-step"><span>4</span><p><strong>Interpretar.</strong> Se decide qué pareja organiza el texto y si uno de los dos vectores conduce al otro.</p></div>
    </div>

    <div class="ev-worked-result">
      <div>
        <span class="ev-result-label">1 · Qué aparece más</span>
        <strong>PAT 21,7 &gt; TEC 10,2 &gt; MES 3,6</strong>
        <p>El conteo calibrado deja a MES en tercer lugar.</p>
      </div>
      <div>
        <span class="ev-result-label">2 · Qué pareja organiza</span>
        <strong>PAT–TEC · relación clara</strong>
        <p>Describe este mensaje de 1999, no una esencia personal de Menem.</p>
      </div>
      <div>
        <span class="ev-result-label">3 · Quién conduce a quién</span>
        <strong>PAT↔TEC · no se puede decidir</strong>
        <p>Los dos cumplen funciones demasiado próximas como para imponer una flecha.</p>
      </div>
    </div>

    <div class="notice notice-amber">
      <strong>Qué enseña el caso:</strong> «nueva era» confirma que MES está presente, pero no que conduzca el discurso. La repetición de PAT y la función instrumental de TEC sostienen la pareja PAT–TEC. Aun así, la relación no permite afirmar cuál de los dos manda. <strong>Presencia, pareja y dirección son tres respuestas diferentes.</strong>
    </div>
    <p class="ev-source-links"><a href="https://www2.hcdn.gob.ar/export/hcdn/secparl/dgral_info_parlamentaria/dip/archivos/1999-03-01_Mensaje_Presidencial_Menem.pdf" target="_blank" rel="noopener noreferrer">Leer la fuente primaria HCDN (.pdf) ↗</a> · Ficha técnica: NB01 → NB05 → NB09 → NB13.</p>
  </section>`;
}

function renderEvidenceTechnicalAppendix(badges, hcdnNbRows, peronNbRows, dsRows) {
  return `<section id="evidencia-ficha-tecnica" class="ev-embedded-section ev-tech-appendix">
    <hr class="light">
    <div class="section-kicker">TRAZABILIDAD · CONSULTA OPCIONAL</div>
    <h3>§4 — Ficha técnica</h3>
    <p>Esta parte documenta fuentes, procesamiento y límites. No hace falta leerla para comprender el método; sí para auditarlo o citarlo.</p>

    <details class="ev-tech-details">
      <summary><span>4.1 · Corpus y exclusiones</span><small>Qué documentos entran y cuáles no</small></summary>
      <div class="ev-tech-details-body">
        <div class="ev-tier-grid">
          <div class="ev-tier-card ev-tier-ok">
            <div class="ev-tier-label">BASE COMPARABLE</div>
            <p><strong>52 discursos ante el Congreso · 1983–2026.</strong> Aperturas de sesiones y asunciones presidenciales de la serie democrática HCDN.</p>
            <ul>
              <li>Una pieza discursiva es la unidad mínima de análisis.</li>
              <li>Los resultados por presidencia agrupan documentos sin borrar los cambios entre años.</li>
              <li>La apertura de Milei 2026 fue incorporada desde el PDF oficial.</li>
            </ul>
            <p class="muted ev-tier-caveat">Brechas conocidas: posible ausencia de CFK 2009; asunción Milei 2023 leída cualitativamente pero fuera de la serie cuantitativa; apertura Alberto Fernández 2023 ausente.</p>
          </div>
          <div class="ev-tier-card ev-tier-sep">
            <div class="ev-tier-label">PERÓN · SERIE SEPARADA</div>
            <p>Asunción 1946 y apertura 1954. Comparten el marco conceptual, pero no la escala numérica del corpus democrático.</p>
            <ul>
              <li>Extracción manual de diarios con diseño a dos columnas.</li>
              <li>Sirven como contraste cualitativo.</li>
              <li>No se ubican como puntos equivalentes en el mapa de 1983–2026.</li>
            </ul>
          </div>
          <div class="ev-tier-card ev-tier-blocked">
            <div class="ev-tier-label">NO CUENTA COMO EVIDENCIA</div>
            <ul>
              <li><strong>Perón 1973:</strong> la fuente hallada contiene el discurso de Allende, no el de Perón.</li>
              <li>OCR crudo sin revisar, fragmentos piloto y fuentes de baja calidad.</li>
              <li>Resultados preliminares anteriores a la calibración definitiva.</li>
              <li>Un memo sintético no canónico que contiene errores.</li>
            </ul>
          </div>
        </div>
      </div>
    </details>

    <details class="ev-tech-details">
      <summary><span>4.2 · Pipeline completo</span><small>Cómo se construyó y auditó el instrumento</small></summary>
      <div class="ev-tech-details-body">
        <div class="ev-pipeline">
          <div class="ev-pipeline-step"><span class="ev-ps-num">1</span><div><strong>Inventario (NB01)</strong> — Fuentes, cobertura, calidad de OCR y brechas.</div></div>
          <div class="ev-pipeline-step"><span class="ev-ps-num">2–4</span><div><strong>Exploración (NB02–NB04)</strong> — Del conteo léxico a patrones proposicionales. Son etapas de construcción, no resultados finales.</div></div>
          <div class="ev-pipeline-step ev-ps-key"><span class="ev-ps-num">5</span><div><strong>Calibración (NB05 + NB15)</strong> — TEC distingue modernización sustantiva (TM×1), catálogo técnico (TCM×0,5) y administración genérica (AGN×0). Los valores se normalizan por extensión.</div></div>
          <div class="ev-pipeline-step"><span class="ev-ps-num">6</span><div><strong>Auditoría de base (NB06)</strong> — Coherencia interna y corrección de metadatos.</div></div>
          <div class="ev-pipeline-step ev-ps-key"><span class="ev-ps-num">7–10</span><div><strong>Del documento al mapa (NB07–NB10)</strong> — Perfiles, configuraciones, cambios entre discursos y síntesis interpretativa.</div></div>
          <div class="ev-pipeline-step ev-ps-key"><span class="ev-ps-num">12–16</span><div><strong>Capa abductiva</strong> — Compara hipótesis rivales y distingue presencia, pareja funcional, dirección y retroalimentación.</div></div>
          <div class="ev-pipeline-step ev-ps-key"><span class="ev-ps-num">17–21</span><div><strong>Recalibración simétrica</strong> — Aplica polaridad, función y posición a TEC, MES y PAT; ejecuta LODO y bootstrap; NB21 publica el mapa orbital v0.4.</div></div>
        </div>
        <p class="muted" style="font-size:.84rem;">Perón usa una pipeline alternativa sobre segmentos extraídos manualmente. La comparación con HCDN es conceptual, no numérica.</p>
      </div>
    </details>

    <details class="ev-tech-details">
      <summary><span>4.3 · Notebooks y datasets</span><small>Linaje y estado de publicación</small></summary>
      <div class="ev-tech-details-body">
        <p class="muted" style="font-size:.84rem;">Estado al 2026-08-11. El whitepaper, el codebook, la metodología y los resultados v0.4 están publicados; la doble codificación humana permanece pendiente.</p>
        <div class="ev-table-wrap">
          <table class="ev-table">
            <thead><tr><th>ID</th><th>Nombre</th><th>Propósito</th><th>Estado</th></tr></thead>
            <tbody class="ev-section-header-row">
              <tr><td colspan="4" class="ev-nb-section">Pipeline HCDN</td></tr>
              ${hcdnNbRows}
              <tr><td colspan="4" class="ev-nb-section">Pipeline Perón</td></tr>
              ${peronNbRows}
            </tbody>
          </table>
        </div>
        <div class="ev-sharing-legend">
          <span class="ev-badge ev-badge-ok">publicable</span> disponible;
          <span class="ev-badge ev-badge-warn">requiere limpieza</span> usable con documentación pendiente;
          <span class="ev-badge ev-badge-block">solo interno</span> no publicable todavía.
        </div>
        <h4>Productos de datos</h4>
        <div class="ev-table-wrap">
          <table class="ev-table">
            <thead><tr><th>Dataset</th><th>Contenido · Linaje</th><th>Estado</th></tr></thead>
            <tbody>${dsRows}</tbody>
          </table>
        </div>
      </div>
    </details>

    <details class="ev-tech-details">
      <summary><span>4.4 · Publicación y reproducibilidad</span><small>Qué está publicado y qué falta</small></summary>
      <div class="ev-tech-details-body">
        <div class="ev-tech-columns">
          <div>
            <h4>Ya visible</h4>
            <ul>
              <li>Mapa orbital v0.4 y figuras canónicas NB21.</li>
              <li><a href="data/METHOD_PIPELINE_v0_2.md" target="_blank" rel="noopener noreferrer">Metodología funcional simétrica v0.2 ↗</a>.</li>
              <li><a href="data/CODEBOOK_FUNCIONAL_SIMETRICO_v0_3.md" target="_blank" rel="noopener noreferrer">Codebook de polaridad, función y posición ↗</a>.</li>
              <li>Fuentes y límites junto a los resultados principales.</li>
              <li>Ejemplo cualitativo Menem 1999.</li>
              <li>Whitepaper descargable en PDF.</li>
            </ul>
          </div>
          <div>
            <h4>Falta para una réplica completa</h4>
            <ul>
              <li>Doble codificación humana y adjudicación de desacuerdos.</li>
              <li>Integración cuantitativa de la asunción Milei 2023.</li>
              <li>Cierre de las brechas documentales del corpus.</li>
              <li>Nota puente antes de cualquier comparación numérica con Perón.</li>
            </ul>
          </div>
          <div>
            <h4>No se publica todavía</h4>
            <ul>
              <li>OCR crudo, logs internos y vault de trabajo.</li>
              <li>Scores intermedios como producto interpretativo.</li>
              <li>Outputs supersedidos y fragmentos piloto.</li>
            </ul>
          </div>
        </div>
        <div class="badge-legend">
          ${badges.map(b => {
            const cls = SEVERITY_CSS[b.severity] || 'badge-caution';
            return `<div class="badge-legend-item">
              <span class="badge ${cls}">${esc(b.label || b.badge_id)}</span>
              <div class="badge-legend-meaning"><strong>${esc(b.meaning || b.badge_id)}</strong>${b.required_microcopy ? `<br><span class="muted">${esc(b.required_microcopy)}</span>` : ''}</div>
            </div>`;
          }).join('')}
        </div>
        <div class="cta-group mt-2"><a href="#figuras" class="btn btn-primary">Abrir galería de figuras →</a></div>
      </div>
    </details>
  </section>`;
}

function renderEvidencia() {
  const badges = D.caveat_badges || [];
  const hcdnNbRows = EVIDENCIA_NOTEBOOKS.map(nb => buildNotebookRow(nb, 'nb')).join('');
  const peronNbRows = EVIDENCIA_PERON_NOTEBOOKS.map(nb => buildNotebookRow(nb, 'nb')).join('');
  const dsRows = EVIDENCIA_DATASETS.map(ds => `<tr class="ev-nb-row">
    <td class="ev-nb-name">${esc(ds.name)}</td>
    <td class="ev-nb-purpose">${esc(ds.contains)}<span class="ev-nb-note"> · ${esc(ds.lineage)}</span></td>
    <td class="ev-nb-sharing">${sharingBadge(null, ds.shareable)}${ds.note ? `<span class="ev-nb-note"> ${esc(ds.note)}</span>` : ''}</td>
  </tr>`).join('');

  return `<section class="page-section ev-page ev-readable-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Evidencia y método</div>
    <div class="section-kicker">MÉTODO · EVIDENCIA · LÍMITES</div>
    <h1>Cómo leemos un discurso</h1>
    <p class="hero-sub">Del texto a una relación entre dos vectores, sin convertir una frase suelta en una etiqueta sobre una persona.</p>

    <div class="ev-opening-statement">
      <strong>La idea en una línea</strong>
      <p>Los tres vectores pueden dejar huellas en un discurso, pero <strong>no forman una configuración conjunta</strong>. Buscamos qué dos entran en relación, cuál de esos dos conduce y qué lugar ocupa el tercero.</p>
    </div>

    <nav class="ev-internal-nav" aria-label="Recorrido de Evidencia y método">
      <a href="#evidencia/metodologia">Cómo se lee</a>
      <a href="#evidencia/ejemplo-menem">Ejemplo completo</a>
      <a href="#evidencia/casos">Casos que tensionan</a>
      <a href="#evidencia/ficha-tecnica">Ficha técnica</a>
      <a href="#evidencia/roadmap">Roadmap</a>
    </nav>

    <section id="evidencia-metodologia" class="ev-scroll-target ev-simple-method">
      <hr class="light">
      <div class="section-kicker">PRIMERO, LA PREGUNTA</div>
      <h3>§1 — Tres preguntas, no una etiqueta</h3>
      <p>No preguntamos «¿qué tipo de presidente es?». Preguntamos qué hace este discurso, en esta fecha y ante este auditorio.</p>

      <div class="ev-question-grid">
        <article class="ev-question-card">
          <span class="ev-question-number">1</span>
          <div class="ev-question-name">Presencia</div>
          <h4>¿Qué lenguajes aparecen?</h4>
          <p>Localizamos familias de frases asociadas con MES, PAT y TEC. Una coincidencia abre una pista; no decide el resultado.</p>
          <span class="ev-question-answer">RESPUESTA · CUÁNTO APARECE CADA VECTOR</span>
        </article>
        <article class="ev-question-card">
          <span class="ev-question-number">2</span>
          <div class="ev-question-name">Pareja</div>
          <h4>¿Qué dos organizan el conflicto?</h4>
          <p>Comparamos reiteración, contexto y función. El tercer vector puede estar presente sin integrar la relación principal.</p>
          <span class="ev-question-answer">RESPUESTA · MES–TEC, PAT–TEC O MES–PAT</span>
        </article>
        <article class="ev-question-card">
          <span class="ev-question-number">3</span>
          <div class="ev-question-name">Dirección</div>
          <h4>¿Cuál encuadra y cuál realiza?</h4>
          <p>Uno puede definir el tiempo, el problema y el destino; el otro aportar medios, protección o prueba. Si no alcanza la evidencia, dejamos ↔.</p>
          <span class="ev-question-answer">RESPUESTA · A→B, B→A O A↔B</span>
        </article>
      </div>

      <div class="ev-abductive-note">
        <span>LECTURA ABDUCTIVA</span>
        <p>Las frases sugieren hipótesis. El contexto elimina lecturas débiles. Luego se comparan parejas rivales y se vuelve al texto para buscar qué explicación resiste mejor. Los números orientan; no reemplazan la interpretación.</p>
      </div>

      <div class="ev-corpus-strip" aria-label="Alcance del corpus principal">
        <div><strong>52</strong><span>discursos</span></div>
        <div><strong>1983–2026</strong><span>serie democrática</span></div>
        <div><strong>12</strong><span>unidades de mandato</span></div>
        <div><strong>HCDN</strong><span>fuente principal</span></div>
      </div>
      <p class="ev-plain-limit"><strong>Límite:</strong> el resultado describe documentos y trayectorias discursivas. No clasifica de una vez y para siempre a una persona.</p>
    </section>

    ${renderMenemWorkedExample()}

    <section id="evidencia-casos" class="ev-embedded-section ev-limit-cases">
      <hr class="light">
      <div class="section-kicker">CUANDO EL MÉTODO ENCUENTRA UN BORDE</div>
      <h3>§3 — Dos casos que obligan a distinguir</h3>
      <p>Perón prueba qué ocurre cuando cambia la fuente. Milei 2026 prueba qué ocurre cuando el conteo y la función no señalan la misma pareja.</p>
    </section>

    ${renderPeronMethodSection()}

    <section id="evidencia-milei-2026" class="ev-embedded-section ev-current-result">
      <hr class="light">
      <div class="section-kicker">§3.2 · MILEI 2026 · CONTEO Y FUNCIÓN DIVERGEN</div>
      <h3>La pareja más numerosa no siempre es la que organiza</h3>
      <p>En la apertura de 2026, PAT ocupa más espacio. Sin embargo, al preguntar qué vector encuadra el mundo y cuál aporta instrumentos y prueba, la relación MES–TEC explica mejor el discurso.</p>
      <div class="ev-result-grid">
        <div class="ev-result-card">
          <span class="ev-result-label">1 · Presencia</span>
          <strong>PAT 20,856 · TEC 16,322 · MES 6,347</strong>
          <p>La cantidad de señales propone PAT–TEC como primera pantalla.</p>
        </div>
        <div class="ev-result-card">
          <span class="ev-result-label">2 · Pareja funcional</span>
          <strong>MES–TEC</strong>
          <p>Es la hipótesis que mejor resiste ocho pruebas de sensibilidad.</p>
        </div>
        <div class="ev-result-card">
          <span class="ev-result-label">3 · Dirección</span>
          <strong>MES→TEC↺</strong>
          <p>MES encuadra; TEC realiza y sus resultados retrovalidan el encuadre.</p>
        </div>
      </div>
      <div class="notice notice-amber"><strong>Límite:</strong> es un discurso, no el tercer año completo de gobierno. Más presencia de PAT no equivale a conducción paternalista del mandato.</div>
      <p class="ev-source-links"><a href="https://www3.hcdn.gob.ar/dependencias/secparl/dgral_info_parlamentaria/dip/mensajes-presidenciales/apertura-de-sesiones/2026-Asamblea-Legislativa-Milei.pdf" target="_blank" rel="noopener noreferrer">Fuente primaria HCDN (.pdf) ↗</a> · Ficha técnica: NB05 → NB12 → NB13 → NB15 → NB16.</p>
    </section>

    ${renderEvidenceTechnicalAppendix(badges, hcdnNbRows, peronNbRows, dsRows)}

    ${renderRoadmapMethodSection()}

    <div class="cta-group mt-4">
      <a href="#mapa-orbital" class="btn btn-primary">Ver el mapa orbital →</a>
      <a href="#whitepaper" class="btn btn-secondary">Leer el whitepaper</a>
    </div>
  </section>`;
}

function buildExcerptDrawer(e) {
  return `<div class="evidence-drawer">
    <button type="button" class="evidence-drawer-toggle" aria-expanded="false">
      <span>
        ${esc(e.actor_id || e.actor || '—')} · ${esc(e.year || '—')}
        ${e.vector ? ` · <span style="color:${vectorColor(e.vector)};">${esc(e.vector)}</span>` : ''}
      </span>
      <span class="evidence-drawer-icon" aria-hidden="true">›</span>
    </button>
    <div class="evidence-drawer-body">
      <div class="evidence-drawer-inner">
        ${e.text ? `<blockquote class="hypothesis-text">"${esc(e.text)}"</blockquote>` : ''}
        ${e.annotation ? `<p class="text-2">${esc(e.annotation)}</p>` : ''}
        ${e.source ? `<p class="mono muted" style="font-size:.78rem;">${esc(e.source)}</p>` : ''}
        <p class="evidence-caveat">
          Extracto provisional. Sujeto a revisión conforme avance la codificación.
        </p>
      </div>
    </div>
  </div>`;
}

// ─── Sección metodológica: Roadmap ──────────────────────────────────────────────

function renderRoadmapMethodSection() {
  const items = D.roadmap || [];

  const isPending = s => ['pendiente', 'pending'].includes(s);
  const isBlocked = s => ['bloqueado', 'blocked'].includes(s);
  const isDone    = s => ['completado', 'done', 'complete'].includes(s);

  const pending = items.filter(i => isPending((i.status || '').toLowerCase()));
  const blocked = items.filter(i => isBlocked((i.status || '').toLowerCase()));
  const done    = items.filter(i => isDone((i.status || '').toLowerCase()));
  const other   = items.filter(i => {
    const s = (i.status || '').toLowerCase();
    return !isPending(s) && !isBlocked(s) && !isDone(s);
  });

  function group(title, groupItems, headingCls) {
    if (!groupItems.length) return '';
    return `<div class="mb-4">
      <h4 class="${headingCls}">${esc(title)}</h4>
      <div class="roadmap-list">
        ${groupItems.map(buildRoadmapItem).join('')}
      </div>
    </div>`;
  }

  return `<section id="evidencia-roadmap" class="ev-embedded-section">
    <hr class="light">
    <div class="section-kicker">AGENDA ABIERTA · NO ES UNA VISTA PARALELA</div>
    <h3>§5 — Roadmap de investigación</h3>
    <div class="roadmap-intro">
      Este registro cierra la página de evidencia porque sus pendientes nacen de límites concretos del corpus: fuentes ausentes, comparabilidad todavía no resuelta y productos que aún no son reproducibles.
    </div>

    ${group('Completado', done, 'text-green')}
    ${group('Pendiente',  pending, 'text-2')}
    ${group('Bloqueado',  blocked, 'text-red')}
    ${group('Otros',      other, 'text-2')}
    ${items.length === 0 ? '<p class="muted">Sin datos de roadmap disponibles.</p>' : ''}

    <div class="notice notice-red mt-4">
      ${buildBadgeGroup(['SOURCE_FAILURE'])}
      Los items bloqueados requieren adquisición de fuentes adicionales antes de avanzar.
    </div>
  </section>`;
}

function buildRoadmapItem(item) {
  const status   = (item.status || 'pendiente').toLowerCase();
  const statusCls = {
    pendiente: 'status-pendiente', pending: 'status-pendiente',
    bloqueado: 'status-bloqueado', blocked: 'status-bloqueado',
    completado: 'status-completado', done: 'status-completado', complete: 'status-completado',
  }[status] || 'status-pendiente';
  const pillCls = {
    pendiente: '', pending: '',
    bloqueado: 'bloqueado', blocked: 'bloqueado',
    completado: 'completado', done: 'completado', complete: 'completado',
  }[status] || '';
  const id = item.roadmap_id || item.item_id || '';

  const deps = Array.isArray(item.depends_on)
    ? item.depends_on.join(', ')
    : (item.depends_on || '');

  return `<div class="roadmap-item ${statusCls}">
    <button type="button" class="roadmap-item-header" aria-expanded="false">
      ${id ? `<span class="roadmap-id">${esc(id)}</span>` : ''}
      <span class="roadmap-title">${esc(item.title || id || '—')}</span>
      <span class="roadmap-status-pill ${pillCls}">${esc(status.toUpperCase())}</span>
      <span class="roadmap-expand-icon" aria-hidden="true">›</span>
    </button>
    <div class="roadmap-item-body">
      <div class="roadmap-item-inner">
        ${item.description ? `<p>${esc(item.description)}</p>` : ''}
        ${deps ? `<p class="roadmap-deps">Depende de: ${esc(deps)}</p>` : ''}
        ${item.priority ? `<p><strong>Prioridad:</strong> ${esc(item.priority)}</p>` : ''}
        ${item.unlocks ? `<p class="muted" style="font-size:.85rem;">Desbloquea: ${esc(Array.isArray(item.unlocks) ? item.unlocks.join(', ') : item.unlocks)}</p>` : ''}
      </div>
    </div>
  </div>`;
}

// ─── Page: Whitepaper ────────────────────────────────────────────────────────────

// El contenido doctrinario se carga desde el Markdown versionado.

function buildWpFigure(fig) {
  if (!fig.file) return '';
  const imgContent = fig.file
    ? `<a href="${FIGURES_PATH}${esc(fig.file)}" target="_blank" rel="noopener" class="wp-figure-img-link" aria-label="Abrir figura: ${esc(fig.title)}">
        <img src="${FIGURES_PATH}${esc(fig.file)}" alt="${esc(fig.alt || fig.title)}" class="wp-figure-img" loading="lazy">
       </a>`
    : '';

  const tablaHtml = fig.tabla ? buildWpFigureTabla(fig.tabla, fig.tabla_nota) : '';
  const textoHtml = fig.texto_disponible
    ? `<div class="wp-figure-texto-disponible"><strong class="wp-figure-td-label">Lo que se puede leer ahora:</strong> ${esc(fig.texto_disponible)}</div>`
    : '';

  return `<div class="wp-figure ${fig.file ? 'wp-figure-embedded' : 'wp-figure-placeholder-card'}">
    <div class="wp-figure-label">Figura ${fig.n} — ${esc(fig.title)}</div>
    ${imgContent}
    <div class="wp-figure-meta">
      <span class="wp-figure-source">Fuente: ${esc(fig.source)}</span>
    </div>
    <p class="wp-figure-uso"><strong>Uso:</strong> ${esc(fig.uso)}</p>
    ${textoHtml}
    ${tablaHtml}
    <p class="wp-figure-caveat muted"><strong>Caveat:</strong> ${esc(fig.caveat)}</p>
  </div>`;
}

function buildWpFigureTabla(rows, nota) {
  if (!rows || !rows.length) return '';
  const header = rows[0].header ? rows[0] : null;
  const dataRows = header ? rows.slice(1) : rows;

  const headHtml = header
    ? `<thead><tr>${header.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>`
    : '';

  const bodyHtml = `<tbody>${dataRows.map(r =>
    `<tr>${r.cols.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`
  ).join('')}</tbody>`;

  const notaHtml = nota
    ? `<p class="wp-figure-tabla-nota muted">${esc(nota)}</p>`
    : '';

  return `<div class="wp-figure-tabla-wrap">
    <table class="wp-figure-tabla">${headHtml}${bodyHtml}</table>
    ${notaHtml}
  </div>`;
}

function buildWpSection(sec) {
  const badgePill = sec.badge
    ? `<div class="wp-actor-badge">${esc(sec.badge)}</div>`
    : '';

  const paras = (sec.paras || []).map(p => `<p>${esc(p)}</p>`).join('');

  const subs = (sec.subsections || []).map(sub => `
    <div class="wp-subsection">
      <h4 class="wp-subsection-title">${esc(sub.title)}</h4>
      ${sub.badge ? `<div class="wp-actor-badge">${esc(sub.badge)}</div>` : ''}
      ${(sub.paras || []).map(p => `<p>${esc(p)}</p>`).join('')}
    </div>`).join('');

  const list = sec.list
    ? `<ul class="wp-list">${sec.list.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`
    : '';

  const notice = sec.notice
    ? `<div class="notice notice-amber"><p>${esc(sec.notice)}</p></div>`
    : '';

  const figHtml = sec.figures
    ? sec.figures.map(f => buildWpFigure(f)).join('')
    : (sec.figure ? buildWpFigure(sec.figure) : '');

  return `<div class="wp-section" id="wp-sec-${sec.n}">
    <h3 class="wp-section-title"><span class="wp-section-num">${sec.n}.</span> ${esc(sec.title)}</h3>
    ${sec.n === 8 ? `<div class="notice notice-red"><p><strong>Separación estructural:</strong> Sección metodológicamente distinta. No se producen comparaciones numéricas Perón–HCDN. Perón no aparece en el mapa de actores democráticos. El caso de 1973 permanece bloqueado (BLQ-02c).</p></div>` : ''}
    ${notice}
    ${badgePill}
    ${paras}
    ${subs}
    ${list}
    ${figHtml}
  </div>`;
}

function renderWpInline(text) {
  return esc(text)
    .replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function wpFigureFromQuote(lines) {
  const clean = lines.map(line => line.replace(/^>\s?/, '').trim());
  const heading = clean[0].replace(/^\*\*|\*\*$/g, '');
  if (/^Figura sugerida\b/i.test(heading)) return '';
  const match = heading.match(/^Figura\s+(\d+)\.\s*(.+)$/i);
  if (!match) {
    return `<blockquote class="wp-pullquote">${clean.map(renderWpInline).join('<br>')}</blockquote>`;
  }

  const field = label => {
    const line = clean.find(item => item.toLowerCase().startsWith(`${label.toLowerCase()}:`));
    return line ? line.slice(line.indexOf(':') + 1).trim() : '';
  };
  const source = field('Fuente');
  const imageMatch = (field('Archivo') || source).match(/([A-Za-z0-9_.-]+\.png)/);
  const publishedFigures = new Set([
    'MAPA_ORBITAL_DIRECTION_MATRIX_v0_4.png',
    'MAPA_ORBITAL_DOCUMENT_TRAJECTORIES_v0_4.png',
    'MAPA_ORBITAL_COMPARABILITY_TIERS_v0_4.drawio.png',
  ]);
  const file = imageMatch && publishedFigures.has(imageMatch[1]) ? imageMatch[1] : '';

  return buildWpFigure({
    n: match[1],
    title: match[2],
    file,
    alt: match[2],
    source,
    uso: field('Uso'),
    caveat: field('Caveat'),
    pending_reason: file ? '' : 'La figura está especificada metodológicamente, pero todavía no existe como pieza visual publicada.',
  });
}

function renderWpTable(lines) {
  const rows = lines.map(line => line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim()));
  if (rows.length < 2) return '';
  const separator = rows[1].every(cell => /^:?-{3,}:?$/.test(cell));
  const bodyStart = separator ? 2 : 1;
  return `<div class="wp-figure-tabla-wrap"><table class="wp-figure-tabla">
    <thead><tr>${rows[0].map(cell => `<th>${renderWpInline(cell)}</th>`).join('')}</tr></thead>
    <tbody>${rows.slice(bodyStart).map(row => `<tr>${row.map(cell => `<td>${renderWpInline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;
}

function whitepaperToc(markdown) {
  const shortTitles = {
    1: 'Introducción',
    2: 'Tres cuerpos',
    3: 'Configuraciones',
    4: 'Corpus y método',
    5: 'Pareja TEC–PAT',
    6: 'Familias',
    7: 'Trayectorias',
    8: 'Perón 1946–1954',
    9: 'Mapa orbital',
    10: 'Límites',
    11: 'Roadmap',
    12: 'Conclusión',
  };
  return [...String(markdown || '').matchAll(/^###\s+(\d+)\.\s+(.+)$/gm)]
    .map(match => ({
      n: match[1],
      title: match[2].trim(),
      shortTitle: shortTitles[match[1]] || match[2].trim(),
    }));
}

function renderWhitepaperMarkdown(markdown) {
  const lines = String(markdown || '').replace(/\r/g, '').split('\n');
  const start = lines.findIndex(line => /^###\s+(?:Antes de leer: qué cambia en NB17–NB21|Resumen)\s*$/.test(line));
  const source = start >= 0 ? lines.slice(start) : lines;
  const html = [];
  let sectionOpen = false;

  const closeSection = () => {
    if (sectionOpen) html.push('</section>');
    sectionOpen = false;
  };

  for (let i = 0; i < source.length;) {
    const line = source[i].trim();
    if (!line || line === '---') { i += 1; continue; }

    const heading = line.match(/^(#{3,4})\s+(.+)$/);
    if (heading) {
      if (heading[1].length === 3) {
        closeSection();
        const numbered = heading[2].match(/^(\d+)\.\s+(.+)$/);
        const id = numbered
          ? `wp-sec-${numbered[1]}`
          : (heading[2].includes('NB17') ? 'wp-nb17' : 'wp-resumen');
        html.push(`<section class="wp-section" id="${id}"><h2 class="wp-section-title">${renderWpInline(heading[2])}</h2>`);
        sectionOpen = true;
      } else {
        html.push(`<h3 class="wp-subsection-title">${renderWpInline(heading[2])}</h3>`);
      }
      i += 1;
      continue;
    }

    if (line.startsWith('>')) {
      const quote = [];
      while (i < source.length && source[i].trim().startsWith('>')) quote.push(source[i++].trim());
      html.push(wpFigureFromQuote(quote));
      continue;
    }

    if (line.startsWith('|')) {
      const table = [];
      while (i < source.length && source[i].trim().startsWith('|')) table.push(source[i++].trim());
      html.push(renderWpTable(table));
      continue;
    }

    const paragraph = [];
    while (i < source.length) {
      const next = source[i].trim();
      if (!next || next === '---' || /^(#{3,4})\s+/.test(next) || next.startsWith('>') || next.startsWith('|')) break;
      paragraph.push(next);
      i += 1;
    }
    if (paragraph.length) html.push(`<p>${renderWpInline(paragraph.join(' '))}</p>`);
    else i += 1;
  }

  closeSection();
  return html.join('');
}

function splitWhitepaperMethodNote(markdown) {
  const lines = String(markdown || '').replace(/\r/g, '').split('\n');
  const start = lines.findIndex(line => /^###\s+Antes de leer: qué cambia en NB17–NB21\s*$/.test(line));
  if (start < 0) return { reading: markdown, methodNote: '' };
  const nextSection = lines.findIndex((line, index) => index > start && /^###\s+/.test(line));
  const end = nextSection >= 0 ? nextSection : lines.length;
  return {
    reading: [...lines.slice(0, start), ...lines.slice(end)].join('\n'),
    methodNote: lines.slice(start, end).join('\n'),
  };
}

function renderWhitepaperMethodNote(markdown) {
  if (!markdown) return '';
  const rendered = renderWhitepaperMarkdown(markdown);
  const contents = rendered
    .replace(/^<section class="wp-section" id="wp-nb17"><h2 class="wp-section-title">[\s\S]*?<\/h2>/, '')
    .replace(/<\/section>$/, '');
  return `<details class="wp-method-note">
    <summary>
      <span>Nota metodológica · qué cambia en NB17–NB21</span>
      <small>Calibración, sensibilidad y notación</small>
    </summary>
    <div class="wp-method-note-body" id="wp-nb17">${contents}</div>
  </details>`;
}

function renderWhitepaper() {
  const markdown = D.whitepaper_v0_4 || '';
  const toc = whitepaperToc(markdown);
  const { reading, methodNote } = splitWhitepaperMethodNote(markdown);
  const body = reading
    ? renderWhitepaperMarkdown(reading)
    : '<div class="notice notice-red"><p>No se pudo cargar el whitepaper v0.4.</p></div>';

  return `<section class="page-section wp-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Whitepaper v0.4</div>

    <div class="wp-header">
      <div class="wp-eyebrow">WHITEPAPER · v0.4 · AUTORA: ALEXANDRA BUSTOS FRATI, PhD</div>
      <h1 class="wp-title">El problema de los tres cuerpos argentinos:<br>una lectura orbital del presidencialismo argentino</h1>
      ${buildBadgeGroup(['HCDN_ONLY'])}
      <div class="wp-release-actions">
        <a class="btn btn-primary" href="data/EL_PROBLEMA_DE_LOS_TRES_CUERPOS_ARGENTINOS_WHITEPAPER_v0_4.pdf" download>Descargar whitepaper (.pdf)</a>
        <a class="btn btn-secondary" href="#mapa-orbital">Abrir mapa orbital v0.4</a>
      </div>
      <div class="wp-abstract">
        <div class="wp-abstract-label">Abstract</div>
        <p>Este whitepaper propone que el discurso presidencial argentino no se organiza como un péndulo entre dos polos, sino como un campo de interacción entre modernización tecnocrática, mesianismo redentor y paternalismo conservador.</p>
        <p>Analiza 52 discursos de apertura y asunción ante la HCDN (1983–2026), agrupados en 12 unidades actor × mandato, y usa masa, función y trayectoria para distinguir qué cuerpos aparecen, cuál encuadra y cuál instrumenta. El mapa orbital v0.4 conserva las trayectorias y cautelas: no convierte personas en tipos, no equipara discurso con gobierno y mantiene a Perón en una pipeline cualitativa separada.</p>
      </div>
    </div>

    <nav class="wp-toc" aria-label="Contenido del whitepaper">
      <h2 class="wp-toc-title">Contenido</h2>
      <ol class="wp-toc-list">
        ${toc.map(item => `<li class="wp-toc-item"><button class="wp-toc-link wp-toc-btn" data-scroll-target="wp-sec-${esc(item.n)}" type="button" aria-label="${esc(item.n)}. ${esc(item.title)}"><span class="wp-toc-num" aria-hidden="true">${esc(item.n)}</span>${esc(item.shortTitle)}</button></li>`).join('')}
      </ol>
    </nav>

    <article class="wp-body wp-markdown-body">
      ${body}
    </article>

    <div class="notice notice-amber mt-4">
      Los tres vectores describen el campo general. No se exige que una presidencia juegue los tres: las unidades suelen articular dos, con una dirección más o menos determinable.
    </div>

    <div class="cta-group mt-4">
      <a href="#mapa-orbital" class="btn btn-primary">Explorar el mapa v0.4</a>
      <a href="#evidencia" class="btn btn-secondary">Evidencia y método</a>
      <a href="#evidencia/roadmap" class="btn btn-secondary">Roadmap →</a>
    </div>

    ${renderWhitepaperMethodNote(methodNote)}

    <footer class="wp-backmatter" aria-labelledby="wp-backmatter-title">
      <div class="section-kicker">FICHA EDITORIAL</div>
      <h2 id="wp-backmatter-title">Método, autoría y cita</h2>
      <div class="notice notice-amber mt-2">
        <p><strong>NB17 calibra; NB18 aplica el instrumento simétrico; NB19–NB20 miden sensibilidad; NB21 publica el mapa.</strong> La versión v0.4 separa masa, función, posición y trayectoria, y publica también dónde la automatización no alcanza.</p>
      </div>
      <dl class="wp-provenance" aria-label="Autoría, origen y datos editoriales del whitepaper">
        <dt>Autora</dt><dd>Alexandra Bustos Frati, PhD</dd>
        <dt>Origen</dt><dd>Mensajes presidenciales de los Diarios de Sesiones de la HCDN, 1983–2026; Perón 1946 y 1954 en una pipeline documental separada.</dd>
        <dt>Corpus</dt><dd>52 documentos · 10 personas · 12 unidades actor × mandato.</dd>
        <dt>Linaje</dt><dd>NB10 → NB12–NB16 → NB17 → NB18 → NB19–NB20 → NB21.</dd>
        <dt>Cita</dt><dd>Bustos Frati, Alexandra (2026). <em>El problema de los tres cuerpos argentinos: una lectura orbital del presidencialismo argentino.</em> Whitepaper v0.4.</dd>
        <dt>Licencia</dt><dd>Texto y figuras: CC BY-NC 4.0.</dd>
      </dl>
    </footer>
  </section>`;
}

// ─── Page: Figuras ───────────────────────────────────────────────────────────────

const FIGURES_DATA = [
  {
    category: 'Corpus democrático',
    figures: [
      {
        id: 'NB07_attractor_counts',
        title: 'Conteos de fuerza atractora (NB07)',
        file: 'NB07_attractor_strength_counts.png',
        notebook: 'NB07',
        status: 'promoted',
        version_note: 'Iteración anterior a NB10. Incluida por continuidad documental.',
        caption: 'Distribución de la fuerza atractora en el corpus democrático HCDN según análisis NB07. Recuento de documentos por nivel de fuerza atractora (high, medium, low).',
        alt: 'Gráfico de barras mostrando la distribución de fuerza atractora (high, medium, low) en el corpus HCDN según NB07.',
        como_leer: 'Cada barra indica cuántos documentos del corpus tienen fortaleza atractora alta, media o baja según NB07. Una fortaleza alta indica que una configuración domina de manera clara y sostenida en ese documento. Fortaleza baja indica co-dominancia o empate entre vectores.',
        no_prueba: 'No establece tipos de actor. No indica incoherencia en actores con documentos de baja fortaleza: la fortaleza atractora es una propiedad del documento, no del actor.',
        caveat: 'Figura derivada del análisis NB07, versión anterior a NB10. Los valores finales están en NB10. Provisional.',
      },
    ],
  },
  {
    category: 'Perfiles de actor',
    figures: [
      {
        id: 'NB10_actor_interp_map',
        title: 'Mapa interpretativo de actores — NB10 v0.1',
        file: 'NB10_actor_interpretive_map_v0_1.png',
        notebook: 'NB10',
        status: 'promoted',
        version_note: 'Versión más reciente — análisis NB10 v0.1.',
        caption: 'Mapa interpretativo de los 10 actores democráticos del corpus HCDN según análisis NB10 v0.1. Cada actor aparece posicionado según su perfil vectorial provisional.',
        alt: 'Mapa de posicionamiento de los 10 actores democráticos en el espacio de los tres vectores según NB10 v0.1.',
        como_leer: 'Los actores aparecen posicionados según sus perfiles vectoriales derivados del corpus HCDN v0.1. La posición no indica una esencia fija del actor: refleja el registro retórico del corpus disponible. Actores más cercanos entre sí comparten configuraciones discursivas similares. Perón no aparece en este mapa: su análisis es metodológicamente separado.',
        no_prueba: 'No establece clasificaciones tipológicas finales. No predice comportamiento político fuera del corpus. La posición es sensible al n de documentos por actor: actores con menos documentos tienen perfiles menos robustos.',
        caveat: 'Figura provisional — NB10 v0.1. Los perfiles son hipótesis de trabajo. No existen tipos finales de actor. Macri y Alberto Fernández son TIER_3 (corrección patch pendiente de re-run).',
      },
      {
        id: 'NB08_dem_actor_vector_map',
        title: 'Mapa vectorial de actores democráticos (NB08)',
        file: 'NB08_democratic_actor_vector_map.png',
        notebook: 'NB08',
        status: 'promoted',
        version_note: 'Iteración anterior a NB10. Los perfiles finales están en NB10.',
        caption: 'Mapa vectorial de actores democráticos del corpus HCDN según análisis NB08. Versión intermedia entre NB07 y NB10.',
        alt: 'Diagrama de posicionamiento vectorial de actores democráticos según NB08.',
        como_leer: 'Versión intermedia del mapa de actores, producida antes de la corrección de metadatos de Macri/Alberto Fernández (2026-04-29). Las posiciones en NB08 incluyen el error de atribución del documento 2019. Comparar con NB10 para observar el impacto de la corrección.',
        no_prueba: 'No muestra el perfil corregido de Macri ni de Alberto Fernández. Las posiciones NB08 para esos dos actores no son válidas como referencia interpretativa.',
        caveat: 'Figura de NB08. Versión previa a la corrección de metadatos. Usar NB10 como referencia para perfiles finales.',
      },
      {
        id: 'NB07_actor_heatmap',
        title: 'Heatmap dominante/secundario por actor (NB07)',
        file: 'NB07_actor_dominant_secondary_heatmap.png',
        notebook: 'NB07',
        status: 'promoted',
        version_note: 'Iteración anterior a NB10.',
        caption: 'Mapa de calor de vectores dominante y secundario por actor democrático según análisis NB07.',
        alt: 'Mapa de calor con actores en filas y vectores en columnas, mostrando la intensidad relativa de tecnocracia, mesianismo y paternalismo por actor.',
        como_leer: 'Cada celda indica la intensidad relativa de un vector (tecnocracia, mesianismo, paternalismo) para cada actor. Los colores más intensos indican mayor peso del vector en el corpus de ese actor. Este gráfico muestra intensidades, no configuraciones dirigidas.',
        no_prueba: 'No muestra configuraciones dirigidas (qué vector domina vs. acompaña). Los valores son de NB07, versión anterior a la calibración y correcciones de NB10.',
        caveat: 'Figura de NB07. Los valores finales están en NB10. Versión anterior a la corrección de metadatos y a la calibración definitiva.',
      },
      {
        id: 'NB07_actor_vector_map',
        title: 'Mapa vectorial de actores (NB07)',
        file: 'NB07_actor_vector_map.png',
        notebook: 'NB07',
        status: 'promoted',
        version_note: 'Iteración anterior a NB10.',
        caption: 'Visualización del espacio vectorial de actores democráticos según análisis NB07.',
        alt: 'Diagrama de dispersión con actores posicionados en el espacio de los tres vectores según NB07.',
        como_leer: 'Versión temprana del mapa de actores, producida en NB07 antes de la síntesis NB10. Útil para comparar la trayectoria del análisis. Las posiciones son aproximadas y anteriores a la corrección de metadatos.',
        no_prueba: 'No refleja la corrección de metadatos de 2026-04-29. Los perfiles de Macri y Alberto Fernández en NB07 incluyen el error de atribución del documento 2019.',
        caveat: 'Figura de NB07. Iteración temprana. Ver NB10 para perfiles finales.',
      },
    ],
  },
  {
    category: 'Configuraciones',
    figures: [
      {
        id: 'NB10_config_dist',
        title: 'Distribución de configuraciones — NB10 v0.1',
        file: 'NB10_configuration_distribution_v0_1.png',
        notebook: 'NB10',
        status: 'promoted',
        version_note: 'Versión más reciente — análisis NB10 v0.1.',
        caption: 'Figura histórica de la base NB10 v0.1: paternalismo + tecnocracia reunía 49% y la pareja TEC–PAT 86% en los 51 documentos 1983–2025. El mapa vigente v0.4 aplica la recodificación funcional simétrica y deja la pareja TEC–PAT en 43 de 52 documentos (83%).',
        alt: 'Gráfico de barras de frecuencia de configuraciones dirigidas en el corpus HCDN. La barra más alta corresponde a paternalismo + tecnocracia.',
        como_leer: 'Cada barra representa una configuración dirigida de la base NB10. La dirección importa: paternalismo + tecnocracia y tecnocracia + paternalismo son distintas. Esta figura se conserva para documentar el linaje; no sustituye el conteo adjudicado v0.4.',
        no_prueba: 'No prueba que todos los presidentes hayan implementado las mismas políticas. Es una figura de base de 51 documentos, no la distribución vigente de 52.',
        caveat: 'Artefacto histórico NB10 — consultar el mapa orbital v0.4 para el documento 2026 y la adjudicación masa/función.',
      },
      {
        id: 'NB08_dem_config_counts',
        title: 'Conteos de configuraciones democráticas (NB08)',
        file: 'NB08_democratic_configuration_counts.png',
        notebook: 'NB08',
        status: 'promoted',
        version_note: 'Iteración anterior a NB10. Los conteos finales están en NB10.',
        caption: 'Distribución de configuraciones dirigidas en el corpus democrático según análisis NB08.',
        alt: 'Gráfico de barras de frecuencia de configuraciones dirigidas según NB08.',
        como_leer: 'Versión intermedia de la distribución de configuraciones. Comparable con la figura NB10 para observar cambios producidos por la corrección de metadatos y la calibración final.',
        no_prueba: 'No refleja la corrección de metadatos de Macri/Alberto Fernández. Los conteos finales están en NB10.',
        caveat: 'Figura de NB08. Versión anterior a la corrección de metadatos. Usar NB10 como referencia.',
      },
    ],
  },
  {
    category: 'Transiciones',
    figures: [
      {
        id: 'NB10_transition_counts',
        title: 'Conteos de transición configuracional — NB10 v0.1',
        file: 'NB10_transition_counts_v0_1.png',
        notebook: 'NB10',
        status: 'promoted',
        version_note: 'Versión más reciente — análisis NB10 v0.1.',
        caption: 'Número de transiciones configuracionales por actor según NB10 v0.1. Alfonsín registra el mayor número (5 transiciones en 8 documentos). Un número alto indica mayor variación del registro discursivo a lo largo del mandato.',
        alt: 'Gráfico de barras horizontales con actores en filas y número de transiciones configuracionales en el eje horizontal. Alfonsín tiene la barra más larga.',
        como_leer: 'Una transición ocurre cuando la configuración dominante de un actor cambia de un documento al siguiente. Un actor con 5 transiciones en 8 documentos (Alfonsín) cambió de registro discursivo 5 veces. Esto no indica incoherencia política: indica que el discurso presidencial respondió a contextos distintos con registros distintos. El conteo de transiciones es sensible al N de documentos por actor: actores con más documentos tienen más oportunidades de transición.',
        no_prueba: 'No indica que los actores con más transiciones sean políticamente inconsistentes. No mide cambios en política de Estado. Las transiciones son propiedades del discurso formal de apertura legislativa, no del gobierno completo.',
        caveat: 'Figura histórica NB10 v0.1. Milei tenía n=2 en esa base; v0.4 ya publica n=3 HCDN. Rodríguez Saá permanece n=1.',
      },
      {
        id: 'NB08_config_timeline',
        title: 'Línea de tiempo de configuraciones por actor (NB08)',
        file: 'NB08_actor_configuration_timeline.png',
        notebook: 'NB08',
        status: 'promoted',
        version_note: 'Iteración anterior a NB10.',
        caption: 'Evolución temporal de configuraciones por actor democrático según análisis NB08. Muestra cómo cambia la configuración dominante de cada actor entre documentos y años.',
        alt: 'Diagrama de línea de tiempo con actores en filas y años en columnas. Cada punto indica la configuración dominante del actor en ese año.',
        como_leer: 'Cada fila corresponde a un actor. Cada punto indica la configuración dominante en ese documento/año. Los cambios de símbolo o color a lo largo de la fila de un actor indican transiciones configuracionales. La línea horizontal muestra la trayectoria discursiva del actor a lo largo del mandato.',
        no_prueba: 'No refleja la corrección de metadatos de 2026-04-29. Las trayectorias de Macri y Alberto Fernández en NB08 son pre-corrección y no válidas como referencia interpretativa.',
        caveat: 'Figura de NB08. Versión anterior a la corrección de metadatos. Las trayectorias finales están en NB10.',
      },
    ],
  },
  {
    category: 'Perón',
    figures: [
      {
        id: 'peron_blocked',
        title: 'Figuras de Perón — sin figuras promovidas disponibles',
        file: null,
        notebook: 'PERON_ALT_PIPELINE',
        status: 'blocked',
        blocked_reason: 'No existen figuras promovidas de la PERON_ALT_PIPELINE en v0.1. El análisis de Perón 1946 y 1954 está documentado en PERON_INTERIM_MEMO_1946_1954_v0_1.md como memo de texto. El caso de 1973 permanece bloqueado (BLQ-02c). Las visualizaciones de Perón no están en el alcance de v0.1.',
        como_leer: 'No hay figura disponible. El análisis de Perón usa la PERON_ALT_PIPELINE con extracción manual y registro de patrones adaptado al período histórico. Los resultados son conteos cualitativos de patrones proposicionales, no scores calibrados. No son comparables numéricamente con las figuras del corpus HCDN.',
        no_prueba: 'No existe puente numérico entre la pipeline Perón y el corpus HCDN. Cualquier figura futura de Perón requerirá bridge note metodológica antes de ser presentada junto con figuras HCDN.',
        caveat: 'Sin figuras promovidas de Perón en v0.1. Ver PERON_INTERIM_MEMO_1946_1954_v0_1.md para el análisis en formato de memo.',
        alt: '',
        caption: '',
      },
    ],
  },
];

function renderFiguras() {
  return `<section class="page-section figuras-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Figuras</div>
    <h1>Figuras</h1>
    <p class="hero-sub">Galería de figuras empíricas extraídas del corpus HCDN.</p>
    <div class="notice notice-amber">
      ${buildBadgeGroup(['PROVISIONAL', 'HCDN_ONLY'])}
      Todas las figuras son provisionales. Las figuras de NB07 y NB08 son iteraciones
      anteriores al análisis NB10 — incluidas por continuidad documental. Las figuras NB10
      son las más recientes. Ninguna figura mezcla datos HCDN y Perón en la misma escala.
    </div>

    ${FIGURES_DATA.map(cat => `
      <div class="fig-category">
        <h3 class="fig-category-title">${esc(cat.category)}</h3>
        <div class="fig-grid">
          ${cat.figures.map(f => buildFigureCard(f)).join('')}
        </div>
      </div>`
    ).join('')}

    <div class="section-note notice notice-amber mt-4" role="note">
      9 figuras promovidas disponibles · 1 categoría bloqueada (Perón) · 1 diagrama de roadmap pendiente<br>
      Rutas de figuras: <code>empirical/corpus_presidencial_hcdn/figures_promoted/</code>
    </div>
  </section>`;
}

function buildFigureCard(f) {
  const statusBadge = {
    promoted: '<span class="fig-status-badge fig-status-available">disponible</span>',
    pending:  '<span class="fig-status-badge fig-status-pending">pendiente</span>',
    blocked:  '<span class="fig-status-badge fig-status-blocked">bloqueada</span>',
  }[f.status] || '';

  if (f.status === 'blocked') {
    return `<div class="fig-card fig-card-blocked">
      ${statusBadge}
      <div class="fig-title">${esc(f.title)}</div>
      <div class="fig-pending-state">
        <span class="fig-pending-icon" aria-hidden="true">⊘</span>
        <span class="fig-pending-label">Figura no disponible</span>
      </div>
      <div class="fig-source">${esc(f.notebook)}</div>
      <p class="fig-blocked-reason">${esc(f.blocked_reason)}</p>
      ${f.como_leer ? `<div class="fig-como-leer"><strong class="fig-como-leer-label">Cómo leer / contexto:</strong><p>${esc(f.como_leer)}</p></div>` : ''}
      ${f.no_prueba ? `<p class="fig-no-prueba"><strong>No prueba:</strong> ${esc(f.no_prueba)}</p>` : ''}
      <p class="fig-caveat-text muted">${esc(f.caveat)}</p>
      <p><a href="#evidencia/roadmap" class="fig-roadmap-link">Ver § Roadmap →</a></p>
    </div>`;
  }

  const src = FIGURES_PATH + f.file;
  return `<div class="fig-card">
    ${statusBadge}
    <a href="${esc(src)}" target="_blank" rel="noopener" class="fig-img-link" aria-label="Abrir figura: ${esc(f.title)}">
      <img src="${esc(src)}" alt="${esc(f.alt)}" class="fig-img" loading="lazy">
    </a>
    <div class="fig-meta">
      <div class="fig-title">${esc(f.title)}</div>
      <div class="fig-source">
        <span class="fig-notebook">${esc(f.notebook)}</span>
        ${buildBadgeGroup(['PROVISIONAL'])}
      </div>
      ${f.version_note ? `<p class="fig-version-note muted">${esc(f.version_note)}</p>` : ''}
      <p class="fig-caption">${esc(f.caption)}</p>
      ${f.como_leer ? `<div class="fig-como-leer"><strong class="fig-como-leer-label">Cómo leer esta figura:</strong><p>${esc(f.como_leer)}</p></div>` : ''}
      ${f.no_prueba ? `<p class="fig-no-prueba"><strong>No prueba:</strong> ${esc(f.no_prueba)}</p>` : ''}
      ${f.caveat ? `<p class="fig-caveat-text muted"><strong>Caveat:</strong> ${esc(f.caveat)}</p>` : ''}
    </div>
  </div>`;
}

// ─── Page: Videojuego ────────────────────────────────────────────────────────────

function resolveGameUrl(game) {
  if (game.public_url) return game.public_url;
  const localHosts = ['localhost', '127.0.0.1', '0.0.0.0'];
  return localHosts.includes(location.hostname) ? game.local_url : '';
}

function renderVideojuego() {
  const game = D.game_meta || {};
  const metrics = game.metrics || {};
  const civilizationalFamilies = game.civilizational_families || [];
  const gameUrl = resolveGameUrl(game);
  const jointlyPublished = Boolean(game.public_url);
  const playCta = gameUrl
    ? `<a href="${esc(gameUrl)}" class="btn btn-primary vj-play-cta" data-game-cta target="_blank" rel="noopener">Jugar ${esc(game.display_version || 'la beta pública')} →</a>`
    : `<span class="btn btn-primary" aria-disabled="true" title="Falta configurar game_meta.public_url">Publicación web pendiente</span>`;
  const releaseCopy = jointlyPublished
    ? `El build forma parte de este mismo paquete editorial y se abre sin cuenta ni descarga.`
    : `El build local se abre sin cuenta ni descarga. La URL pública todavía debe configurarse en <code>game_meta.json</code> antes del despliegue externo.`;
  const publicationStatus = jointlyPublished
    ? `<div class="vj-status-item vj-status-done">
        <span class="vj-status-icon" aria-hidden="true">✓</span>
        <div><strong>Publicación conjunta preparada</strong><p class="muted">El sitio doctrinario y el videojuego comparten paquete, origen y control de versión.</p></div>
      </div>`
    : `<div class="vj-status-item vj-status-progress">
        <span class="vj-status-icon" aria-hidden="true">→</span>
        <div><strong>Despliegue público pendiente</strong><p class="muted">El artefacto local es jugable. Falta asignar dominio, URL canónica y política de distribución del código y los assets.</p></div>
      </div>`;

  return `<section class="page-section vj-page">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Videojuego</div>

    <div class="vj-header">
      <div class="vj-logo-wrap">
        <img src="${LOGO_PATH}" alt="" class="vj-logo" loading="eager"
             onerror="this.style.display='none';this.nextElementSibling.hidden=false;">
        <div class="vj-logo-placeholder" hidden aria-hidden="true"><span class="vj-logo-placeholder-icon">◈</span></div>
      </div>
      <div class="vj-header-text">
        <div class="vj-eyebrow">VIDEOJUEGO · ${esc(game.display_version || 'BETA PÚBLICA')} · ${esc(game.status_label || 'BETA JUGABLE')}</div>
        <h1 class="vj-title">Tres cuerpos, una república inestable</h1>
        <p class="vj-subtitle">Ganar no alcanza para representar este tiempo. <em>${esc(game.title || 'Tres Cuerpos: República Inestable')}</em> vuelve sobre lo que hiciste: un cuerpo conduce, otro conserva fuerza propia y el tercero queda como práctica lateral o capacidad ausente. No los reconcilia.</p>
        <div class="cta-group vj-primary-actions">
          ${playCta}
          <a href="#evidencia" class="btn btn-secondary">Cómo se investigó</a>
        </div>
      </div>
    </div>

    <div class="notice notice-green vj-release-note">
      <strong>${esc(game.display_version || 'Beta pública')} publicada el ${esc(game.updated || 'fecha no informada')}.</strong>
      ${releaseCopy}
    </div>

    <div class="vj-metrics" aria-label="Alcance del videojuego">
      <div><strong>${esc(metrics.situations || 320)}</strong><span>situaciones</span></div>
      <div><strong>${esc(metrics.decisions_per_run || 12)}</strong><span>decisiones por partida</span></div>
      <div><strong>${esc(metrics.campaigns_per_run || 3)}</strong><span>campañas</span></div>
      <div><strong>${esc(metrics.playable_legends || 15)}</strong><span>leyendas jugables</span></div>
      <div><strong>${esc(metrics.signatures || 60)}</strong><span>firmas históricas</span></div>
    </div>

    <hr class="light">

    <h2>Dos maneras de entrar en la política</h2>
    <div class="vj-mode-grid">
      <article>
        <span class="vj-mode-kicker">MODO CARRERA</span>
        <h3>Construí una trayectoria</h3>
        <p>Elegís una procedencia, distribuís nueve puntos entre TEC, MES y PAT y empezás desde Municipio, Provincia o Nación. Cada decisión abre autoridad y también deja deuda, exposición o dependencia.</p>
        <ul>
          <li>${esc(metrics.municipalities || 7)} municipios de entrada.</li>
          <li>Escalas local, provincial y nacional.</li>
          <li>Biografía causal y árbol contrafáctico al final.</li>
        </ul>
      </article>
      <article>
        <span class="vj-mode-kicker">MODO LEYENDA</span>
        <h3>Elegí una Leyenda</h3>
        <p>Elegís una de quince Leyendas y recibís su configuración inicial y cuatro firmas propias. No reconstruís su vida ni regresás a su contexto: enfrentás doce conflictos contemporáneos y observás cómo esa Leyenda responde en el presente.</p>
        <ul>
          <li>15 Leyendas configuradas para el juego, no tipos históricos definitivos.</li>
          <li>60 firmas con memoria y uso limitado.</li>
          <li>Campañas, archivo sonoro y genealogía final.</li>
        </ul>
      </article>
    </div>

    <div class="vj-screenshot-grid">
      <figure>
        <img src="assets/game-legend-final-current.webp?v=20260815" alt="Apertura vigente del final del Modo Leyenda, con desenlace, lectura política y proyecto de época" loading="lazy">
        <figcaption>Leyenda: el desenlace electoral y la idea política se leen juntos, sin confundir victoria con representación.</figcaption>
      </figure>
      <figure>
        <img src="assets/game-legend-register-current.webp?v=20260815" alt="Registro vigente del final del Modo Leyenda con los tres cuerpos y resultados de la partida" loading="lazy">
        <figcaption>Registro: las dieciocho decisiones conservan cuerpo, resultado, ejes y deuda; la leyenda final se puede auditar.</figcaption>
      </figure>
    </div>

    <hr class="light">

    <h2>Del deep research a una escritura de época</h2>
    <p>La versión vigente conserva posiciones sobre humanidad, demografía, pertenencia, soberanía cognitiva, frontera planetaria y orden interdependiente; construye una biografía causal, separa autoridad electoral de representación y vuelve trazable la traducción de las quince Leyendas.</p>
    <p><a href="#leyendas">Ver por qué cada Leyenda tiene su puntaje →</a></p>
    <div class="vj-research-grid">
      <div><strong>${esc(metrics.career_civilizational_events || 16)}</strong><span>situaciones civilizatorias nuevas en Carrera</span><small>transhumanismo, demografía, identidad y Luna en las tres escalas</small></div>
      <div><strong>${esc(metrics.legend_civilizational_challenges || 4)}</strong><span>desafíos civilizatorios nuevos en Leyenda</span><small>integrados al presente, no a una recreación histórica</small></div>
      <div><strong>${esc(metrics.civilizational_families || 6)}</strong><span>familias que atraviesan todo el catálogo</span><small>cada una conserva tres posiciones de futuro</small></div>
    </div>

    <div class="vj-civilizational-grid">
      ${civilizationalFamilies.map(family => `<article><span>${esc(family.label)}</span><p>${esc(family.question)}</p></article>`).join('')}
    </div>

    <div class="notice notice-green mt-2">
      <strong>Ganar ya no equivale a representar.</strong>
      En 540 trayectorias legales aparecieron ${esc((game.audit || {}).victories_without_representation || 13)} victorias sin proyecto consolidado y ${esc((game.audit || {}).representation_without_victory || 193)} proyectos consolidados sin victoria. ${esc((game.audit || {}).divergent_same_seed_projects || 54)} contrafácticos de misma seed terminaron con lecturas de época distintas.
    </div>

    <div class="notice notice-green mt-2">
      <strong>La inestabilidad pertenece a los tres cuerpos.</strong>
      La auditoría recorrió ${esc((game.audit || {}).conflict_presentations_audited || 361)} aperturas y ${esc((game.audit || {}).final_narratives_audited || 540)} finales causales. Cuando hubo dos cuerpos más practicados, cada cierre conservó una tesis del conductor y otra del segundo; el tercero siguió actuando como presencia, límite o deuda del sistema. Fallas de lectura de los tres cuerpos: ${esc((game.audit || {}).three_body_final_failures ?? 0)}.
    </div>

    <h2>Cómo opera la doctrina dentro del juego</h2>
    <div class="vj-mechanics-grid">
      <div class="vj-mechanic-card">
        <div class="vj-mechanic-icon" aria-hidden="true">⊿</div>
        <h3>Tecnocracia · capacidad</h3>
        <p>Organiza información, reglas, instrumentos y ejecución. Puede crear autoridad técnica, pero también exposición, rigidez o dependencia.</p>
      </div>
      <div class="vj-mechanic-card">
        <div class="vj-mechanic-icon" aria-hidden="true">✦</div>
        <h3>Mesianismo · legitimidad</h3>
        <p>Construye identificación, mandato y ruptura. Puede movilizar apoyo, pero también personalizar el conflicto y elevar su precio.</p>
      </div>
      <div class="vj-mechanic-card">
        <div class="vj-mechanic-icon" aria-hidden="true">◎</div>
        <h3>Paternalismo · cohesión</h3>
        <p>Teje protección, mediación y lealtad. Puede sostener una comunidad, pero también acumular obligaciones y tutelas.</p>
      </div>
      <div class="vj-mechanic-card">
        <div class="vj-mechanic-icon" aria-hidden="true">⟳</div>
        <h3>Órbita · trayectoria</h3>
        <p>La órbita siempre pertenece a tres cuerpos. Uno puede conducir y otro conservar contrapoder, pero el tercero —practicado o ausente— sigue alterando lo que el conjunto puede hacer.</p>
      </div>
      <div class="vj-mechanic-card">
        <div class="vj-mechanic-icon" aria-hidden="true">◈</div>
        <h3>Proyecto de época · resonancia</h3>
        <p>Las decisiones compatibles vuelven legible una tesis; los cambios de posición acumulan contradicción. La campaña recibe ambas sin convertirlas en victoria automática.</p>
      </div>
    </div>

    <div class="vj-peron-note notice notice-red">
      <strong>Perón III no desbloquea Perón 1973.</strong> El personaje jugable es una reconstrucción lúdica autorada. El discurso de 1973 sigue bloqueado como evidencia primaria en la investigación; ninguna partida, firma o archivo sonoro reemplaza esa fuente ausente.
    </div>

    <div class="notice notice-amber mt-2">
      <strong>Juego ≠ evidencia.</strong> ${esc(game.evidence_boundary || 'Las situaciones y consecuencias son construcciones lúdicas autoradas y no constituyen evidencia empírica.')}
      El juego no simula ni predice la política argentina y no clasifica definitivamente a sus actores.
    </div>

    <div class="vj-status-list mt-4">
      <div class="vj-status-item vj-status-done">
        <span class="vj-status-icon" aria-hidden="true">✓</span>
        <div><strong>Motor e interfaz auditados</strong><p class="muted">${esc((game.audit || {}).engine_options_inspected || (game.audit || {}).options_inspected || 58895)} opciones de motor y ${esc((game.audit || {}).browser_options_inspected || 10044)} opciones de navegador examinadas; ${esc((game.audit || {}).vitest_tests || 126)} pruebas unitarias y cero fallas de aceptación.</p></div>
      </div>
      <div class="vj-status-item vj-status-done">
        <span class="vj-status-icon" aria-hidden="true">✓</span>
        <div><strong>Build reproducible</strong><p class="muted">Versión visible, package y actas sincronizados en ${esc(game.version || 'la versión publicada')}.</p></div>
      </div>
      ${publicationStatus}
    </div>

    <div class="cta-group mt-4">
      ${playCta}
      <a href="#mapa-orbital" class="btn btn-secondary">Ver mapa orbital</a>
      <a href="#whitepaper" class="btn btn-secondary">Leer whitepaper</a>
      <a href="#licencia" class="btn btn-secondary">Licencia y límites</a>
    </div>
  </section>`;
}

// ─── Page: Licencia ──────────────────────────────────────────────────────────────

function renderLicencia() {
  return `<div class="page-section">
    <div class="breadcrumb"><a href="#inicio">Inicio</a> <span>›</span> Licencia</div>
    <h1 class="page-title">Licencia</h1>
    <div class="notice notice-amber" style="margin-bottom:2rem;">
      <span class="badge badge-caution">PROTOTIPO</span>
      Los <em>datos</em> son provisionales y no aptos para cita académica formal.
      Los <em>términos de licencia</em> que siguen están definidos y son vigentes para el sitio v0.4, el mapa orbital v0.4 y el whitepaper v0.4.
    </div>

    <div class="lic-section">
      <h2>Contenido público — CC BY-NC 4.0</h2>
      <p>Los textos, el whitepaper, el mapa orbital, las figuras empíricas, las páginas de método y todo el contenido explicativo público de este sitio están licenciados bajo
      <strong>Creative Commons Atribución–NoComercial 4.0 Internacional (CC BY-NC 4.0)</strong>.</p>
      <p>Esto significa que podés compartir y adaptar el material para usos no comerciales, siempre que se cite correctamente a la autora.</p>
    </div>

    <div class="lic-section">
      <h2>Atribución requerida</h2>
      <p>Toda reproducción, cita o adaptación debe atribuirse a:</p>
      <blockquote class="lic-quote"><strong>Alexandra Bustos Frati, PhD</strong></blockquote>
      <p style="margin-top:.75rem;">Cita sugerida:</p>
      <blockquote class="lic-quote">Bustos Frati, Alexandra. <em>El problema de los tres cuerpos argentinos: una lectura orbital del presidencialismo argentino.</em> Sitio doctrinario y whitepaper v0.4; mapa orbital v0.4.</blockquote>
    </div>

    <div class="lic-section">
      <h2>Uso comercial — licencia escrita separada</h2>
      <p>El uso comercial de cualquier contenido de este proyecto está <strong>prohibido</strong> salvo que esté cubierto por una licencia comercial escrita y separada otorgada por Alexandra Bustos Frati, PhD.</p>
      <p>Para consultas de licenciamiento comercial, escribir a través de los canales de contacto al pie de esta página.</p>
    </div>

    <div class="lic-section">
      <h2>Tipos de contenido y estado de licencia</h2>
      <div class="lic-table">
        <div class="lic-row">
          <div class="lic-type">Textos, whitepaper, mapa, figuras y contenido explicativo público</div>
          <div class="lic-status"><strong>CC BY-NC 4.0</strong> — uso no comercial con atribución. Uso comercial requiere licencia escrita separada.</div>
        </div>
        <div class="lic-row">
          <div class="lic-type">Código del prototipo web</div>
          <div class="lic-status"><strong>Todos los derechos reservados</strong> salvo indicación explícita en contrario. No licenciado para reutilización todavía.</div>
        </div>
        <div class="lic-row">
          <div class="lic-type">Datasets, notebooks y corpus OCR/primario</div>
          <div class="lic-status"><strong>No cubiertos automáticamente.</strong> Publicación y licencia pendientes de revisión separada. No disponibles todavía.</div>
        </div>
        <div class="lic-row">
          <div class="lic-type">Logo, marca e identidad visual</div>
          <div class="lic-status"><strong>Todos los derechos reservados.</strong> No autorizado para uso externo.</div>
        </div>
        <div class="lic-row">
          <div class="lic-type">Videojuego publicado, código y assets</div>
          <div class="lic-status"><strong>Todos los derechos reservados / UNLICENSED.</strong> El acceso al build publicado no concede permiso de copia, redistribución, adaptación ni uso comercial. El archivo sonoro conserva además sus atribuciones y licencias por pieza.</div>
        </div>
      </div>
    </div>

    <div class="lic-section">
      <h2>Publicación conjunta</h2>
      <p>El sitio doctrinario enlaza la beta pública del videojuego, desplegada por separado. Esa relación editorial no mezcla el juego con el corpus ni cambia su licencia: los textos públicos conservan CC BY-NC 4.0 y el código, arte y audio del juego siguen reservados según sus condiciones propias.</p>
    </div>

    <div class="lic-section" style="border-bottom:none;padding-bottom:0;">
      <h2>Uso provisional de este prototipo</h2>
      <p>Este prototipo está disponible para consulta académica y de investigación en su estado actual. Los datos son provisionales. No están autorizados para cita académica formal. El banner de caveat visible en todas las páginas refleja el estado de los datos.</p>
    </div>

    <div class="notice notice-amber" style="margin-top:2rem;">
      <strong>Contacto:</strong>
      <span class="lic-contact-links">
        <a href="https://www.instagram.com/arcagaucha/" target="_blank" rel="noopener noreferrer">Instagram · @arcagaucha</a> ·
        <a href="https://www.linkedin.com/in/lexbustosfrati/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        · <a href="https://github.com/metternietzsche" target="_blank" rel="noopener noreferrer">GitHub</a>
        · <a href="https://www.threads.net/@lexy.futura" target="_blank" rel="noopener noreferrer">Threads</a>
        · <a href="https://alexandrabustosfrati.substack.com" target="_blank" rel="noopener noreferrer">Substack</a>
        · <a href="https://www.researchgate.net/profile/Alexandra-Bustos-Frati" target="_blank" rel="noopener noreferrer">ResearchGate</a>
      </span>
    </div>
  </div>`;
}

// ─── CORS / load error ──────────────────────────────────────────────────────────

function buildCorsError(err) {
  return `<div class="error-panel">
    <h1>Error al cargar datos</h1>
    <p>Los archivos JSON no se pueden cargar desde <code>file://</code>
       debido a restricciones de CORS del navegador.</p>
    <p><strong>Solución:</strong> Ejecutar con un servidor estático local:</p>
    <pre>python3 -m http.server 8000</pre>
    <p>Luego abrir por <code>http://localhost:8000/</code> la misma ruta de este sitio. Las instrucciones exactas están en el README del prototipo.</p>
    <p class="error-detail">${esc(String(err))}</p>
  </div>`;
}

// ─── Init ─────────────────────────────────────────────────────────────────────────

async function init() {
  const loading = document.getElementById('loading');
  const app     = document.getElementById('app');

  try {
    await loadData();
    if (loading) loading.hidden = true;
    if (app)     app.hidden     = false;

    enhancePrerenderedLinks();
    initNav();
    window.addEventListener('hashchange', router);
    await router();
    document.documentElement.dataset.clientEnhanced = 'true';
  } catch (err) {
    if (loading) loading.hidden = true;
    if (app) {
      app.hidden    = false;
      if (app.dataset.prerendered === 'true' && app.textContent.trim()) {
        app.insertAdjacentHTML('afterbegin', `<div class="partial-load-warning" role="status"><strong>La mejora interactiva no pudo iniciarse.</strong> El contenido documental prerenderizado sigue disponible.</div>`);
      } else {
        app.innerHTML = buildCorsError(err);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
