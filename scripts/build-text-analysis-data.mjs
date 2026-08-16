import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repository = resolve(here, '..');
const workspace = resolve(repository, '../../../..');
const corpus = resolve(workspace, 'argentina_tres_cuerpos_corpus');
const research = resolve(workspace, 'tres_cuerpos_argentos');

const sources = {
  signals: resolve(corpus, 'notebooks/NB04_propositional_segment_signals.py'),
  rules: resolve(corpus, 'notebooks/HCDN_NB18_symmetric_rule_engine_v0_1.py'),
  aggregation: resolve(corpus, 'notebooks/HCDN_NB19_symmetric_candidate_map_v0_1.py'),
  calibration: resolve(repository, 'scripts/text-analysis-calibration.v0.1.1.json'),
  analyzer: resolve(repository, 'web/static_prototype/orbital-analyzer.js'),
  documents: resolve(research, 'empirical/mapa_orbital_v0_4/tables/MAPA_ORBITAL_DOCUMENTS_v0_4.csv'),
  aggregates: resolve(research, 'empirical/mapa_orbital_v0_4/tables/MAPA_ORBITAL_SIGNAL_AGGREGATES_v0_4.csv'),
};

const sha256 = path => createHash('sha256').update(readFileSync(path)).digest('hex');

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      if (row.some(value => value !== '')) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [headers, ...body] = rows;
  return body.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function extractPatterns(source) {
  const start = source.indexOf('PATTERNS = [');
  const end = source.indexOf('COMPILED_PATTERNS', start);
  if (start < 0 || end < 0) throw new Error('No se encontró el registro PATTERNS de NB04.');
  const block = source.slice(start, end);
  const pattern = /dict\(vector="([^"]+)",\s*pattern_id="([^"]+)",\s*signal_strength=(\d+),\s*pattern_label="([^"]+)",\s*regex=r"([^"]+)"\)/g;
  return [...block.matchAll(pattern)].map(match => ({
    vector: match[1],
    patternId: match[2],
    signalStrength: Number(match[3]),
    label: match[4],
    regex: match[5],
  }));
}

function wordCount(text) {
  return (String(text).toLocaleLowerCase('es').match(/[\p{L}\p{N}_]+/gu) || []).length;
}

const nb04 = readFileSync(sources.signals, 'utf8');
const patterns = extractPatterns(nb04);
if (patterns.length !== 60) throw new Error(`Se esperaban 60 patrones; se extrajeron ${patterns.length}.`);
const calibration = JSON.parse(readFileSync(sources.calibration, 'utf8'));
const calibrationByPattern = new Map(calibration.patternExtensions.map(extension => [extension.patternId, extension]));
if (calibrationByPattern.size !== calibration.patternExtensions.length) throw new Error('La calibración contiene patternId duplicados.');
for (const extension of calibration.patternExtensions) {
  const pattern = patterns.find(item => item.patternId === extension.patternId);
  if (!pattern) throw new Error(`La calibración refiere a un patrón inexistente: ${extension.patternId}.`);
  pattern.regex = `(?:${pattern.regex})|(?:${extension.regex})`;
}

const registry = {
  version: 'ORBITAL_TEXT_ANALYZER_v0_1_1',
  publishedAt: '2026-08-15',
  language: 'es-AR',
  execution: 'client_side_only',
  methodology: {
    signalRegistry: 'NB04_propositional_segment_signals.py',
    symmetricRuleEngine: 'HCDN_NB18_symmetric_rule_engine_v0_1.py',
    aggregation: 'HCDN_NB19_symmetric_candidate_map_v0_1.py',
    calibration: calibration.version,
    statement: 'La masa positiva selecciona la pareja; las funciones ordenan la relación. El resultado automático no reemplaza adjudicación humana.',
  },
  sourceHashes: Object.fromEntries(['signals', 'rules', 'aggregation', 'calibration', 'analyzer'].map(key => [key, sha256(sources[key])])),
  limits: {
    minWords: 120,
    maxCharacters: 120000,
    maxFileBytes: 1048576,
    acceptedFileExtensions: ['.txt', '.md'],
  },
  genres: [
    { id: 'apertura_legislativa', label: 'Apertura legislativa', domain: 'hcdn_comparable' },
    { id: 'asuncion', label: 'Discurso de asunción', domain: 'hcdn_comparable' },
    { id: 'acto_campana', label: 'Acto o lanzamiento de campaña', domain: 'out_of_domain' },
    { id: 'debate_entrevista', label: 'Debate o entrevista', domain: 'out_of_domain' },
    { id: 'documento_programatico', label: 'Documento programático', domain: 'out_of_domain' },
    { id: 'otro', label: 'Otro género', domain: 'out_of_domain' },
  ],
  weights: {
    positive: { afirmada: 1, subordinada: 0.55, descriptiva: 0.2, atribuida: 0, negada_rechazada: 0 },
    position: { encuadre: 1, operacion: 0.67, prueba: 0.67, payload_beneficiario: 0.35, exterior: 0 },
    function: { tiempo: 1.25, problema: 1.1, autoridad: 1.25, sujeto_enemigo: 1.1, telos: 1.25, sacrificio: 1.1, medios: 0.8, prueba: 0.8 },
    directionMargin: 0.055,
  },
  patterns,
};

const documents = parseCsv(readFileSync(sources.documents, 'utf8'));
const vectors = ['tecnocracia', 'mesianismo', 'paternalismo'];
await import('../web/static_prototype/orbital-analyzer.js');
const analyzer = globalThis.OrbitalAnalyzer;
const referenceDocuments = documents.map(document => {
  const sourcePath = resolve(corpus, document.source_path);
  const sourceText = readFileSync(sourcePath, 'utf8');
  const words = wordCount(sourceText);
  const { signals } = analyzer.detectSignals(sourceText, registry);
  const vectorMetrics = analyzer.aggregate(signals, registry);
  const positive = Object.fromEntries(vectors.map(vector => [vector, vectorMetrics[vector].positiveStrength]));
  const leadership = Object.fromEntries(vectors.map(vector => [vector, vectorMetrics[vector].leadership]));
  const total = Object.values(positive).reduce((sum, value) => sum + value, 0);
  if (total <= 0) throw new Error(`${document.filename}: la referencia recalculada no contiene masa positiva.`);
  return {
    filename: document.filename,
    actor: document.actor,
    caseUnitId: document.case_unit_id,
    caseUnit: document.case_unit,
    year: Number(document.year),
    genre: document.genre,
    analysisWindow: document.analysis_window,
    wordCount: words,
    positiveStrength: Number(total.toFixed(4)),
    positiveDensityPer1000: Number((total / words * 1000).toFixed(4)),
    weights: Object.fromEntries(vectors.map(vector => [vector, Number((positive[vector] / total).toFixed(6))])),
    leadership,
    reviewRequired: document.review_required === 'True',
  };
});

const reference = {
  version: 'ORBITAL_TEXT_REFERENCE_v0_1_1',
  analyzerVersion: registry.version,
  corpus: 'HCDN_NB17_v0_3',
  map: 'MAPA_ORBITAL_ARGENTINO_v0_4',
  scope: '52 discursos presidenciales; capa diagnóstica automática v0.1.1 recalculada con el mismo motor y calibración usados para textos nuevos.',
  caveat: 'La cercanía sólo compara perfiles de señales automáticas. No traslada la adjudicación histórica del mapa v0.4 al texto ingresado.',
  sourceHashes: {
    documents: sha256(sources.documents),
    aggregates: sha256(sources.aggregates),
    calibration: sha256(sources.calibration),
    analyzer: sha256(sources.analyzer),
  },
  documents: referenceDocuments,
};

for (const [name, data] of [
  ['text_analysis_registry.v0.1.json', registry],
  ['text_analysis_reference.v0.1.json', reference],
]) {
  const serialized = `${JSON.stringify(data, null, 2)}\n`;
  writeFileSync(resolve(repository, 'web/static_prototype/data', name), serialized);
  writeFileSync(resolve(repository, 'data_public', name), serialized);
}

console.log(`Motor publicado: ${patterns.length} patrones y ${referenceDocuments.length} documentos de referencia.`);
