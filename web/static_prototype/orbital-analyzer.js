(function exposeOrbitalAnalyzer(global) {
  'use strict';

  const VECTORS = ['tecnocracia', 'mesianismo', 'paternalismo'];
  const SHORT = { tecnocracia: 'TEC', mesianismo: 'MES', paternalismo: 'PAT' };

  const ATTRIBUTION = /\b(?:gobierno|gestion|administracion|regimen|modelo|politica|sistema)\s+(?:anterior|precedente|pasad[oa])\b|\b(?:heredamos|heredado|heredada|nos\s+dejaron|recibimos|segun|dijo|decian|sostenian|pretendian)\b/;
  const REJECTION = /\b(?:fracaso|fracasad[oa]|quebrad[oa]|irresponsable|botin|robo|roban|saqueo|despilfarro|corrupcion|privilegio|estafa|mentira|falso|nefasta|desastre|inviable|ineficiente|ineficacia|clientel|intermedia|adoctrin|casta|desorden)\w*\b/;
  const OWN_ACTION = /\b(?:nuestro|nuestra|vamos\s+a|hemos|logramos|conseguimos|creamos|impulsamos|garantizamos|protegemos|aumentamos|redujimos|eliminamos|implementamos|presentamos|decidimos|proponemos|promovemos|sostenemos|auditamos|llevamos\s+adelante|esta\s+gestion|este\s+gobierno|mi\s+gobierno)\b/;
  const PROTECTED_SUBJECT = /\b(?:vulnerables|humildes|pobres|necesitados|jubilados|trabajadores|familias|ninos|ninas|embarazadas|beneficiarios|discapacitados|desocupados|pacientes)\b/;
  const PROTECTION_ACTION = /\b(?:proteger|protegimos|protegemos|cuidar|garantizar|garantizamos|asistir|acompanar|contener|incluir|mejorar|aumentar|incrementar|universalizar|derecho|derechos|cobertura|prestacion|asignacion|ayuda|beneficio)\w*\b/;
  const PROOF = /\b(?:resultado|resultados|logramos|cumplimos|redujimos|aumentamos|crecio|disminuyo|superavit|record|meta|evidencia|datos|cifras|alcanzamos)\b|\b\d+(?:[.,]\d+)?\s*(?:%|por\s+ciento|puntos?|millones?)\b/;
  const MEANS = /\b(?:plan|programa|politica|ley|presupuesto|inversion|infraestructura|acuerdo|sistema|fondo|medida|gestion|administracion|financiamiento|licitacion|credito|reforma|implementar|instrumentar|crear|promulgar|reglamentar|obra)\w*\b/;
  const PROBLEM = /\b(?:crisis|decadencia|fracaso|injusticia|corrupcion|exclusion|abandono|emergencia|herencia|deuda|desigualdad|pobreza|inflacion|deficit|desempleo|violencia|desorden|quiebra|problema)\w*\b/;
  const TIME = /\b(?:nueva\s+era|nueva\s+argentina|momento\s+historico|punto\s+de\s+inflexion|cambio\s+de\s+epoca|fin\s+de\s+una\s+epoca|renacimiento|refundacion|historia|pasado|porvenir|destino)\b/;
  const AUTHORITY = /\b(?:mandato|voluntad\s+popular|urnas|eleccion|legitimidad|constitucion|dios|cielo|providencia|posteridad|mision|juramento|deber\s+historico)\b/;
  const SUBJECT = /\b(?:pueblo|trabajadores|argentinos|ciudadanos|familias|humildes|vulnerables|jubilados|ninos|jovenes|casta|privilegiados|enemigos|corporaciones|oligarquia|dirigencia|comunidad|nacion)\b/;
  const TELOS = /\b(?:justicia\s+social|prosperidad|bienestar|libertad|igualdad|equidad|dignidad|desarrollo|grandeza|futuro|porvenir|nuevo\s+orden|paz|progreso|inclusion|felicidad|reconstruccion|causa\s+sagrada|era\s+dorada|redencion|salvacion)\b/;
  const SACRIFICE = /\b(?:sacrificio|esfuerzo|dolor|costo|precio|renuncia|no\s+hay\s+alternativa|no\s+hay\s+vuelta\s+atras|batalla|lucha|resistencia|dificil|duro|irreversible)\b/;

  const ROLE_REGEX = {
    tiempo: TIME,
    problema: PROBLEM,
    autoridad: AUTHORITY,
    sujeto_enemigo: SUBJECT,
    telos: TELOS,
    sacrificio: SACRIFICE,
    medios: MEANS,
    prueba: PROOF,
  };

  const CANONICAL = {
    'MES-01': 'telos', 'MES-02': 'autoridad', 'MES-03': 'tiempo',
    'MES-04': 'tiempo', 'MES-05': 'tiempo', 'MES-06': 'sujeto_enemigo',
    'MES-07': 'sujeto_enemigo', 'MES-08': 'problema', 'MES-09': 'tiempo',
    'MES-10': 'autoridad', 'MES-11': 'telos', 'MES-12': 'autoridad',
    'MES-13': 'tiempo', 'MES-14': 'sacrificio', 'MES-15': 'autoridad',
    'MES-16': 'sujeto_enemigo', 'MES-17': 'sacrificio', 'MES-18': 'tiempo',
    'MES-19': 'telos', 'MES-20': 'telos',
    'PAT-01': 'telos', 'PAT-02': 'medios', 'PAT-03': 'sujeto_enemigo',
    'PAT-04': 'medios', 'PAT-05': 'telos', 'PAT-06': 'sujeto_enemigo',
    'PAT-08': 'telos', 'PAT-10': 'medios', 'PAT-11': 'medios',
    'PAT-12': 'medios', 'PAT-13': 'medios', 'PAT-14': 'medios',
    'PAT-15': 'sujeto_enemigo', 'PAT-16': 'telos', 'PAT-17': 'sujeto_enemigo',
    'PAT-18': 'medios', 'PAT-19': 'medios', 'PAT-20': 'autoridad',
  };
  for (let index = 1; index <= 20; index += 1) CANONICAL[`TEC-${String(index).padStart(2, '0')}`] = 'medios';

  function normalize(value) {
    return String(value ?? '')
      .toLocaleLowerCase('es')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function countWords(text) {
    return (String(text ?? '').toLocaleLowerCase('es').match(/[\p{L}\p{N}_]+/gu) || []).length;
  }

  function segmentDocument(source, minCharacters = 80) {
    const text = String(source ?? '').replace(/-\s*\d+\s*-/g, ' ').replace(/\r\n/g, '\n');
    const primary = text.split(/\n\s*\n/);
    const segments = [];
    for (const rawBlock of primary) {
      const block = rawBlock.trim();
      if (!block) continue;
      if (block.length <= 800) {
        if (block.length >= minCharacters) segments.push(block);
        continue;
      }
      const sentences = block.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ"«])/u);
      let buffer = [];
      let bufferLength = 0;
      for (const sentence of sentences) {
        buffer.push(sentence);
        bufferLength += sentence.length;
        if (bufferLength >= 300) {
          const merged = buffer.join(' ').trim();
          if (merged.length >= minCharacters) segments.push(merged);
          buffer = [];
          bufferLength = 0;
        }
      }
      const merged = buffer.join(' ').trim();
      if (merged.length >= minCharacters) segments.push(merged);
    }
    if (!segments.length && text.trim().length >= minCharacters) segments.push(text.trim());
    return segments;
  }

  function localWindow(segment, matched, radius = 260) {
    const text = normalize(segment);
    const needle = normalize(matched);
    const start = text.indexOf(needle);
    if (start < 0) return text.slice(0, radius * 2);
    return text.slice(Math.max(0, start - radius), Math.min(text.length, start + needle.length + radius));
  }

  function classifyPolarity(vector, patternId, window) {
    const attributed = ATTRIBUTION.test(window);
    const rejected = REJECTION.test(window);
    const own = OWN_ACTION.test(window);
    const protectedPayload = PROTECTED_SUBJECT.test(window) && PROTECTION_ACTION.test(window);

    if (vector === 'tecnocracia' && PROBLEM.test(window)) {
      if (attributed && !own && /\b(?:politica|gestion|administracion|obra|sistema)\b/.test(window)) {
        return ['atribuida', 'exterior', 'marco técnico atribuido a gestión ajena'];
      }
      if (rejected && ['TEC-15', 'TEC-17'].includes(patternId) && !own) {
        return ['negada_rechazada', 'exterior', 'instrumento técnico rechazado'];
      }
      return ['afirmada', 'operacion', 'diagnóstico causal técnico adoptado'];
    }

    if (vector === 'paternalismo' && (protectedPayload || ['PAT-06', 'PAT-11'].includes(patternId))) {
      if (attributed && !own && !protectedPayload) return ['atribuida', 'exterior', 'protección atribuida a otra gestión'];
      if (rejected && protectedPayload) return ['subordinada', 'payload_beneficiario', 'beneficiario preservado; mediación rechazada'];
      if (rejected && patternId === 'PAT-11' && PROTECTED_SUBJECT.test(window)) {
        return ['subordinada', 'payload_beneficiario', 'asistencia preservada bajo crítica de captura'];
      }
      if (rejected && !own) return ['negada_rechazada', 'exterior', 'mecanismo tutelar rechazado'];
      return [own ? 'afirmada' : 'subordinada', 'payload_beneficiario', 'protección material positiva'];
    }

    // En MES, condenar al antagonista o rechazar la resignación constituye la
    // función detectada; no equivale a negar el vector. Sólo queda afuera si la
    // formulación está atribuida a otra voz sin apropiación de quien habla.
    if (vector === 'mesianismo' && ['MES-06', 'MES-07', 'MES-08', 'MES-13', 'MES-16'].includes(patternId)) {
      if (attributed && !own) return ['atribuida', 'exterior', 'antagonismo o ruptura atribuidos a otra voz'];
      return ['afirmada', '', 'antagonismo o ruptura adoptados por la voz del documento'];
    }

    if (attributed && !own) return ['atribuida', 'exterior', 'señal atribuida a otra voz o gestión'];
    if (rejected && !own) return ['negada_rechazada', 'exterior', 'función vectorial rechazada'];
    if (own) return ['afirmada', '', 'señal integrada al programa propio'];
    return ['afirmada', '', 'función adoptada por la voz del documento'];
  }

  function classifyFunction(patternId, window) {
    const canonical = CANONICAL[patternId] || 'medios';
    const candidates = Object.entries(ROLE_REGEX).filter(([, regex]) => regex.test(window)).map(([role]) => role);
    if (patternId.startsWith('TEC-')) {
      if (candidates.includes('prueba')) return ['prueba', 'resultado verificable en el contexto'];
      if (candidates.includes('problema') && !/\b(?:vamos\s+a|plan|programa|ley|reforma)\b/.test(window)) {
        return ['problema', 'diagnóstico causal en el contexto'];
      }
      return ['medios', 'instrumento técnico o regla operativa'];
    }
    const priority = patternId.startsWith('MES-')
      ? [canonical, 'tiempo', 'autoridad', 'sujeto_enemigo', 'telos', 'sacrificio', 'problema']
      : [canonical, 'sacrificio', 'sujeto_enemigo', 'telos', 'medios', 'problema', 'prueba'];
    const role = priority.find(item => candidates.includes(item) || item === canonical) || canonical;
    return [role, `función contextual; base ${canonical}`];
  }

  function classifySignal(signal) {
    const window = localWindow(signal.segmentText, signal.matchedText);
    const [polarity, initialPosition, polarityTrace] = classifyPolarity(signal.vector, signal.patternId, window);
    const [functionName, functionTrace] = classifyFunction(signal.patternId, window);
    let position = initialPosition;
    if (['atribuida', 'negada_rechazada'].includes(polarity)) position = 'exterior';
    else if (!position) position = functionName === 'prueba' ? 'prueba' : functionName === 'medios' ? 'operacion' : 'encuadre';
    const ambiguous = (ATTRIBUTION.test(window) && OWN_ACTION.test(window))
      || (REJECTION.test(window) && PROTECTION_ACTION.test(window));
    const confidence = ambiguous ? 'baja' : polarity === 'subordinada' ? 'media' : 'alta';
    return {
      ...signal,
      polarity,
      function: functionName,
      position,
      confidence,
      polarityTrace,
      functionTrace,
      reviewRequired: confidence === 'baja',
    };
  }

  function detectSignals(text, registry) {
    const segments = segmentDocument(text);
    const signals = [];
    for (const [segmentIndex, segmentText] of segments.entries()) {
      for (const entry of registry.patterns || []) {
        const regex = new RegExp(entry.regex, 'giu');
        for (const match of segmentText.matchAll(regex)) {
          signals.push(classifySignal({
            segmentIndex,
            segmentText,
            vector: entry.vector,
            patternId: entry.patternId,
            patternLabel: entry.label,
            signalStrength: Math.min(3, Number(entry.signalStrength || 0)),
            matchedText: match[0],
            matchIndex: match.index || 0,
          }));
        }
      }
    }
    return { segments, signals };
  }

  function excerpt(signal, radius = 150) {
    const source = signal.segmentText.replace(/\s+/g, ' ').trim();
    const start = Math.max(0, signal.matchIndex - radius);
    const end = Math.min(source.length, signal.matchIndex + signal.matchedText.length + radius);
    return `${start ? '…' : ''}${source.slice(start, end).trim()}${end < source.length ? '…' : ''}`;
  }

  function aggregate(signals, registry) {
    const positiveWeights = registry.weights.positive;
    const positionWeights = registry.weights.position;
    const functionWeights = registry.weights.function;
    const functionWeightTotal = Object.values(functionWeights).reduce((sum, value) => sum + Number(value), 0);
    const vectors = {};

    for (const vector of VECTORS) {
      const subset = signals.filter(signal => signal.vector === vector);
      const bestByFunction = new Map();
      let totalStrength = 0;
      let positiveStrength = 0;
      let positiveSignals = 0;
      let exteriorSignals = 0;
      let lowConfidence = 0;
      for (const signal of subset) {
        const positiveWeight = Number(positiveWeights[signal.polarity] || 0);
        const positionWeight = Number(positionWeights[signal.position] || 0);
        const functionWeight = Number(functionWeights[signal.function] || 0);
        const strength = Math.min(3, signal.signalStrength);
        const leadershipContribution = positiveWeight * positionWeight * functionWeight;
        totalStrength += strength;
        positiveStrength += strength * positiveWeight;
        if (positiveWeight > 0) positiveSignals += 1;
        if (signal.position === 'exterior') exteriorSignals += 1;
        if (signal.reviewRequired) lowConfidence += 1;
        bestByFunction.set(signal.function, Math.max(bestByFunction.get(signal.function) || 0, leadershipContribution));
      }
      const leadership = [...bestByFunction.values()].reduce((sum, value) => sum + value, 0) / functionWeightTotal;
      vectors[vector] = {
        totalSignals: subset.length,
        totalStrength: Number(totalStrength.toFixed(4)),
        positiveStrength: Number(positiveStrength.toFixed(4)),
        positiveSignals,
        exteriorSignals,
        lowConfidence,
        positiveRetention: totalStrength ? Number((positiveStrength / totalStrength).toFixed(6)) : 0,
        leadership: Number(leadership.toFixed(6)),
      };
    }
    return vectors;
  }

  function distance(a, b) {
    return Math.sqrt(VECTORS.reduce((sum, vector) => sum + ((a[vector] || 0) - (b[vector] || 0)) ** 2, 0));
  }

  function compareReferences(weights, density, reference) {
    const documents = reference?.documents || [];
    const nearest = documents
      .map(document => ({
        actor: document.actor,
        caseUnit: document.caseUnit,
        year: document.year,
        genre: document.genre,
        weights: document.weights,
        distance: Number(distance(weights, document.weights).toFixed(6)),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
    const percentile = documents.length
      ? Math.round(documents.filter(document => Number(document.positiveDensityPer1000) <= density).length / documents.length * 100)
      : null;
    return { nearest, densityPercentile: percentile, referenceCount: documents.length };
  }

  function analyze(text, options = {}) {
    const registry = options.registry;
    const reference = options.reference || { documents: [] };
    if (!registry?.patterns?.length) throw new Error('El registro de análisis no está disponible.');
    const source = String(text ?? '');
    const words = countWords(source);
    if (source.length > registry.limits.maxCharacters) {
      throw new RangeError(`El texto supera el máximo de ${registry.limits.maxCharacters.toLocaleString('es-AR')} caracteres.`);
    }
    if (words < registry.limits.minWords) {
      throw new RangeError(`El análisis necesita al menos ${registry.limits.minWords} palabras; recibió ${words}.`);
    }

    const { segments, signals } = detectSignals(source, registry);
    const vectorMetrics = aggregate(signals, registry);
    const totalPositiveStrength = VECTORS.reduce((sum, vector) => sum + vectorMetrics[vector].positiveStrength, 0);
    const positiveSignals = VECTORS.reduce((sum, vector) => sum + vectorMetrics[vector].positiveSignals, 0);
    const positiveVectorCount = VECTORS.filter(vector => vectorMetrics[vector].positiveStrength > 0).length;
    if (totalPositiveStrength <= 0 || positiveSignals < 3 || positiveVectorCount < 2) {
      throw new RangeError('No hay señales positivas suficientes en al menos dos cuerpos para ubicar este texto de manera responsable.');
    }

    const weights = Object.fromEntries(VECTORS.map(vector => [
      vector,
      Number((vectorMetrics[vector].positiveStrength / totalPositiveStrength).toFixed(6)),
    ]));
    const rankedMass = [...VECTORS].sort((a, b) => vectorMetrics[b].positiveStrength - vectorMetrics[a].positiveStrength);
    const pair = rankedMass.slice(0, 2);
    const leaders = [...pair].sort((a, b) => vectorMetrics[b].leadership - vectorMetrics[a].leadership);
    const leadershipMargin = Math.abs(vectorMetrics[leaders[0]].leadership - vectorMetrics[leaders[1]].leadership);
    const directed = leadershipMargin >= Number(registry.weights.directionMargin);
    const notation = directed
      ? `${SHORT[leaders[0]]}→${SHORT[leaders[1]]}`
      : `${SHORT[pair[0]]}↔${SHORT[pair[1]]}`;
    const density = Number((totalPositiveStrength / words * 1000).toFixed(4));
    const genre = registry.genres.find(item => item.id === options.genre) || registry.genres.at(-1);
    const lowConfidence = VECTORS.reduce((sum, vector) => sum + vectorMetrics[vector].lowConfidence, 0);
    const coverage = segments.length
      ? new Set(signals.filter(signal => Number(registry.weights.positive[signal.polarity] || 0) > 0).map(signal => signal.segmentIndex)).size / segments.length
      : 0;
    const confidence = genre.domain !== 'hcdn_comparable' || positiveSignals < 8 || lowConfidence / Math.max(signals.length, 1) > 0.25
      ? 'exploratoria'
      : 'comparable_provisional';
    const evidence = Object.fromEntries(VECTORS.map(vector => [vector, signals
      .filter(signal => signal.vector === vector)
      .sort((a, b) => {
        const aPositive = Number(registry.weights.positive[a.polarity] || 0);
        const bPositive = Number(registry.weights.positive[b.polarity] || 0);
        return bPositive - aPositive || b.signalStrength - a.signalStrength || a.segmentIndex - b.segmentIndex;
      })
      .slice(0, 5)
      .map(signal => ({
        patternId: signal.patternId,
        patternLabel: signal.patternLabel,
        matchedText: signal.matchedText,
        excerpt: excerpt(signal),
        polarity: signal.polarity,
        function: signal.function,
        position: signal.position,
        confidence: signal.confidence,
        strength: signal.signalStrength,
      }))]));
    const comparison = compareReferences(weights, density, reference);

    return {
      analyzerVersion: registry.version,
      methodology: registry.methodology,
      metadata: {
        title: String(options.title || '').trim(),
        author: String(options.author || '').trim(),
        date: String(options.date || '').trim(),
        genre: genre.id,
        genreLabel: genre.label,
        domain: genre.domain,
      },
      diagnostics: {
        wordCount: words,
        characterCount: source.length,
        segmentCount: segments.length,
        signalCount: signals.length,
        positiveSignals,
        positiveVectorCount,
        positiveDensityPer1000: density,
        segmentCoverage: Number(coverage.toFixed(4)),
        lowConfidenceSignals: lowConfidence,
        confidence,
      },
      weights,
      vectorMetrics,
      configuration: {
        pair,
        dominantByMass: rankedMass[0],
        third: rankedMass[2],
        leadershipOrder: leaders,
        leadershipMargin: Number(leadershipMargin.toFixed(6)),
        directionStatus: directed ? 'directed' : 'indeterminate',
        notation,
      },
      evidence,
      comparison,
      caveats: [
        'El resultado describe el texto ingresado, no la identidad ni la conducta futura de su autoría.',
        genre.domain === 'hcdn_comparable'
          ? 'El género permite una comparación provisional con el corpus HCDN, pero la codificación automática no sustituye adjudicación humana.'
          : 'El género está fuera del dominio HCDN: la ubicación es exploratoria y la comparación sólo sirve como referencia formal.',
        'Citas, negaciones, ironía y cambios de voz pueden requerir revisión humana.',
      ],
      privacy: {
        processedLocally: true,
        storedBySite: false,
        fullTextIncludedInResult: false,
      },
    };
  }

  const api = Object.freeze({ analyze, aggregate, countWords, detectSignals, normalize, segmentDocument, vectors: VECTORS });
  global.OrbitalAnalyzer = api;
})(globalThis);
