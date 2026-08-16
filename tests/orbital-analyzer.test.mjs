import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

await import('../web/static_prototype/orbital-analyzer.js');

const analyzer = globalThis.OrbitalAnalyzer;
const registry = JSON.parse(readFileSync(new URL('../web/static_prototype/data/text_analysis_registry.v0.1.json', import.meta.url), 'utf8'));
const reference = JSON.parse(readFileSync(new URL('../web/static_prototype/data/text_analysis_reference.v0.1.json', import.meta.url), 'utf8'));

const sample = `Nuestro gobierno propone un plan de desarrollo con inversión pública, infraestructura energética y una reforma del Estado. Vamos a sostener una gestión transparente, una política económica verificable y un presupuesto nacional que financie ciencia y tecnología. La planificación estratégica debe aumentar la capacidad productiva y publicar datos oficiales para que cada resultado pueda auditarse.

Vivimos un momento histórico. La voluntad popular nos dio un mandato popular para abrir una nueva etapa histórica y superar el viejo orden. Asumimos una causa nacional que convoque a la ciudadanía y haga visible el destino de nuestro país. Esta nueva Argentina exige una misión histórica compartida y una responsabilidad democrática concreta.

El rumbo sólo vale si produce justicia social. Nuestro gobierno va a garantizar seguridad social, salud pública, educación pública y vivienda digna. Vamos a proteger los derechos de los trabajadores, fortalecer el salario mínimo y ampliar la protección social. El Estado debe garantizar el bienestar social, la inclusión social y la dignidad del trabajador. La modernización debe cuidar a las familias y a los más vulnerables.`;

test('el registro conserva 60 patrones simétricos y compilables', () => {
  assert.equal(registry.version, 'ORBITAL_TEXT_ANALYZER_v0_1_1');
  assert.equal(registry.methodology.calibration, 'ORBITAL_TEXT_CALIBRATION_v0_1_1');
  assert.equal(registry.patterns.length, 60);
  for (const vector of analyzer.vectors) {
    assert.equal(registry.patterns.filter(item => item.vector === vector).length, 20);
  }
  for (const pattern of registry.patterns) assert.doesNotThrow(() => new RegExp(pattern.regex, 'giu'));
  assert.equal(new Set(registry.patterns.map(item => item.patternId)).size, 60);
});

test('la regresión Kicillof 2026 recupera antagonismo, ruptura y futuro mesiánicos', () => {
  const passage = `Hoy observamos que las extremas derechas están atacando la convivencia democrática y la Constitución. Una minoría repleta de privilegios pretende naturalizar la desigualdad mientras las mayorías pierden la esperanza. No hay que resignarse: no estamos condenados a este modelo ni obligados a aceptar que el daño sea inevitable.

  Hay otro camino hacia el futuro, sostenido por una comunidad que puede construir una alternativa política mejor. El futuro le pertenece al pueblo argentino y exige un proyecto nacional que reúna memoria, democracia y dignidad. Ese horizonte no elimina los problemas de gestión: requiere un plan de desarrollo, inversión pública, reglas verificables, presupuesto, infraestructura y capacidad estatal. También debe garantizar salud pública, educación, trabajo y protección social para las familias. La tarea combina instrumentos concretos con una causa colectiva y con amor a la patria. No alcanza con administrar cifras ni con enumerar derechos; el discurso también disputa quién puede abrir una etapa distinta, qué antagonismo debe enfrentar y qué futuro común busca autorizar.`;
  const { signals } = analyzer.detectSignals(passage, registry);
  const mesianismo = signals.filter(signal => signal.vector === 'mesianismo' && ['afirmada', 'subordinada', 'descriptiva'].includes(signal.polarity));
  assert.ok(mesianismo.length >= 6);
  assert.ok(mesianismo.some(signal => signal.patternId === 'MES-06' && signal.function === 'sujeto_enemigo'));
  assert.ok(mesianismo.some(signal => signal.patternId === 'MES-07' && signal.function === 'sujeto_enemigo'));
  assert.ok(mesianismo.some(signal => signal.patternId === 'MES-13' && signal.function === 'tiempo'));
  assert.ok(mesianismo.some(signal => signal.patternId === 'MES-19' && signal.function === 'telos'));
});

test('el diagnóstico es determinista, suma uno y nunca devuelve el texto completo', () => {
  const options = { registry, reference, genre: 'acto_campana', title: 'Prueba', author: 'Autoría' };
  const first = analyzer.analyze(sample, options);
  const second = analyzer.analyze(sample, options);
  assert.deepEqual(first, second);
  const sum = Object.values(first.weights).reduce((total, value) => total + value, 0);
  assert.ok(Math.abs(sum - 1) < 0.00001);
  assert.equal(first.diagnostics.positiveVectorCount, 3);
  assert.equal(first.diagnostics.confidence, 'exploratoria');
  assert.equal(first.metadata.domain, 'out_of_domain');
  assert.equal(first.privacy.processedLocally, true);
  assert.equal(first.privacy.storedBySite, false);
  assert.equal(first.privacy.fullTextIncludedInResult, false);
  assert.equal(JSON.stringify(first).includes(sample), false);
});

test('atribuciones y rechazos quedan fuera de la masa positiva', () => {
  const attributed = `${'Contexto público general. '.repeat(10)} Según el gobierno anterior, su plan de desarrollo y su inversión pública fueron un fracaso y una mentira. Nos dejaron ese sistema productivo quebrado.`;
  const { signals } = analyzer.detectSignals(attributed, registry);
  const technical = signals.filter(item => item.vector === 'tecnocracia');
  assert.ok(technical.length >= 2);
  assert.ok(technical.every(item => ['atribuida', 'negada_rechazada'].includes(item.polarity)));
  assert.ok(technical.every(item => item.position === 'exterior'));
});

test('rechaza textos cortos o sin diversidad mínima de cuerpos', () => {
  assert.throws(() => analyzer.analyze('Un texto demasiado corto.', { registry, reference, genre: 'otro' }), /al menos 120 palabras/);
  const mono = `${'Nuestro gobierno presenta un plan de desarrollo y una reforma del Estado con inversión pública. '.repeat(18)}`;
  assert.throws(() => analyzer.analyze(mono, { registry, reference, genre: 'otro' }), /al menos dos cuerpos/);
});

test('el corpus diagnóstico conserva 52 referencias válidas sin texto fuente', () => {
  assert.equal(reference.documents.length, 52);
  for (const document of reference.documents) {
    const sum = Object.values(document.weights).reduce((total, value) => total + value, 0);
    assert.ok(Math.abs(sum - 1) < 0.00001, document.filename);
    assert.equal(Object.hasOwn(document, 'text'), false);
    assert.equal(Object.hasOwn(document, 'fullText'), false);
  }
});
