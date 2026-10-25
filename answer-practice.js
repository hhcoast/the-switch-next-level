(() => {
  'use strict';
  const root = document.getElementById('answer-practice');
  if (!root) return;
  const de = document.documentElement.lang === 'de';
  const copy = de ? {
    sample: 'Antwort', question: 'Welche Aussage ist durch die angezeigten Unterlagen höchstens gestützt?',
    labels: ['Eingang bestätigt', 'Absicht angekündigt', 'Beschluss dokumentiert', 'Umsetzung dokumentiert', 'Wirkung untersucht'],
    choose: 'Prüfe die Unterlagen und wähle eine Aussage. Du kannst jede Antwort erneut untersuchen.',
    yes: 'Passend eingeordnet.', no: 'Prüfe den Unterschied noch einmal.',
    draft: 'Meine eigene Nachfrage', draftHint: 'Was fehlt dir, um die Antwort beurteilen zu können? Dein Entwurf bleibt während dieser Sitzung auf dieser Seite. Er wird weder versendet noch dauerhaft gespeichert. Beim Sprachwechsel oder Neuladen geht er verloren.',
    clear: 'Entwurf löschen', note: 'Fiktive Übungsunterlagen. Keine realen Verwaltungsdokumente.',
    record: 'Angezeigte Unterlage', limit: 'Offen bleibt', reset: 'Eigene Einordnung und Feedback werden beim Wechsel zurückgesetzt.',
    items: [
      {text: 'Wir haben Ihren Vorschlag erhalten. Er wurde unter CRF-DEMO-001 erfasst.', doc: 'Fiktive Eingangsbestätigung vom 2. Dezember 2026 mit Fallnummer. Es liegt keine inhaltliche Entscheidung bei.', why: 'Die Bestätigung dokumentiert den Eingang. Sie sagt noch nichts über Prüfung, Annahme oder Umsetzung.', missing: 'Wer prüft den Beitrag, nach welchen Kriterien und bis wann gibt es eine inhaltliche Antwort?'},
      {text: 'Wir möchten alternative Maßnahmen zur Querung prüfen. Die Mittel und der Termin sind noch offen.', doc: 'Fiktive Mitteilung vom 9. Dezember 2026. Keine Bewilligung, kein Auftrag und keine Abschlussdokumentation.', why: 'Eine angekündigte Prüfung ist eine Absicht. Daraus folgt weder ein Beschluss noch eine durchgeführte Maßnahme.', missing: 'Welche Stelle klärt Mittel und Termin? Wann wird der Stand erneut veröffentlicht?'},
      {text: 'Die Alternative zur abgelehnten Querungsstelle wurde beschlossen. Die Ausführung ist für das Frühjahr vorgesehen.', doc: 'Fiktiver Beschluss vom 6. Jänner 2027: Alternative freigegeben, Zuständigkeit und Budget zugeordnet. Kein Abschlussbericht.', why: 'Der datierte Beschluss stützt die Entscheidung. Der geplante Ausführungstermin belegt noch keine Umsetzung.', missing: 'Wann wird die Ausführung dokumentiert? Wie werden Verzögerungen und Änderungen begründet?'},
      {text: 'Die alternative Querungshilfe ist fertiggestellt. Die Abschlussdokumentation liegt vor.', doc: 'Fiktiver Abschlussvermerk vom 3. März 2027 mit Ortsangabe und datierten Vorher-Nachher-Fotos. Keine Untersuchung zur Nutzung oder Sicherheit.', why: 'Die Unterlagen dokumentieren im erfundenen Fall die Ausführung. Sie belegen noch keine Verbesserung der Sicherheit oder gleichberechtigten Nutzung.', missing: 'Wer hat die Ausführung überprüft? Wie werden Nutzung, Barrieren und mögliche Nebenwirkungen untersucht?'},
      {text: 'Wir haben die Nutzung vor und nach der Veränderung untersucht. Die beobachteten Wartezeiten sind kürzer.', doc: 'Fiktiver Evaluationsvermerk vom 7. Juni 2027: zwei Beobachtungstage vor und zwei nach der Maßnahme; keine Vergleichsstelle. Wetter und Verkehr unterschieden sich.', why: 'Eine Wirkung wurde untersucht. Der einfache Vorher-Nachher-Vergleich beweist jedoch nicht, dass die Maßnahme die Veränderung verursacht hat. Zur Sicherheit lässt sich daraus nichts ableiten.', missing: 'Wie wurden Messzeiten gewählt? Welche Alternativerklärungen, Erfahrungen unterschiedlicher Menschen und längerfristigen Folgen wurden berücksichtigt?'}
    ]
  } : {
    sample: 'Reply', question: 'What is the strongest claim supported by the records shown?',
    labels: ['Receipt confirmed', 'Intention announced', 'Decision documented', 'Implementation documented', 'Effects examined'],
    choose: 'Read the records and choose a claim. You can examine every reply again.',
    yes: 'Appropriate classification.', no: 'Check the distinction again.',
    draft: 'My own follow-up question', draftHint: 'What is missing for you to assess this reply? Your draft stays on this page during this session. It is neither sent nor saved permanently. Switching language or reloading clears it.',
    clear: 'Clear draft', note: 'Fictional practice records. These are not real administrative documents.',
    record: 'Record shown', limit: 'Still unresolved', reset: 'Your classification and feedback reset when you switch replies.',
    items: [
      {text: 'We have received your proposal and recorded it as CRF-DEMO-001.', doc: 'Fictional receipt dated 2 December 2026 with a reference number. No substantive decision is attached.', why: 'The receipt documents arrival. It does not establish review, acceptance or implementation.', missing: 'Who will review the contribution, using which criteria, and when will a substantive response be provided?'},
      {text: 'We intend to examine alternatives for crossing the road. Funding and timing remain open.', doc: 'Fictional notice dated 9 December 2026. No approval, work order or completion record.', why: 'An announced review is an intention. It does not establish a decision or completed action.', missing: 'Which office will resolve funding and timing? When will an updated status be published?'},
      {text: 'An alternative to the declined crossing location has been approved. Construction is planned for spring.', doc: 'Fictional decision dated 6 January 2027: alternative approved, responsible office and budget assigned. No completion record.', why: 'The dated record supports the decision. A planned construction date does not establish implementation.', missing: 'When will implementation be documented? How will delays and changes be explained?'},
      {text: 'The alternative crossing aid is complete. The completion record is available.', doc: 'Fictional completion note dated 3 March 2027 with a location and dated before-and-after photos. No study of use or safety.', why: 'The records document construction in the invented case. They do not establish improved safety or equal access.', missing: 'Who checked completion? How will use, barriers and possible side effects be examined?'},
      {text: 'We examined use before and after the change. Observed waiting times were shorter.', doc: 'Fictional evaluation note dated 7 June 2027: two observation days before and two after; no comparison site. Weather and traffic differed.', why: 'Effects have been examined. This simple before-and-after comparison does not establish that the intervention caused the change. It supports no conclusion about safety.', missing: 'How were observation times selected? Which alternative explanations, experiences of different people and longer-term consequences were considered?'}
    ]
  };
  const el = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const panel = el('div', '', 'panel');
  panel.append(el('p', copy.note, 'source-note'));
  const samples = el('fieldset'); samples.append(el('legend', de ? '1. Eine Antwort untersuchen' : '1. Examine a reply'));
  const sampleButtons = el('div', '', 'answer-tabs'); samples.append(sampleButtons);
  const excerpt = el('blockquote'); excerpt.id = 'reply-excerpt';
  const records = el('div', '', 'evidence-record');
  const recordTitle = el('strong', copy.record); const recordText = el('p'); records.append(recordTitle, recordText);
  const claims = el('fieldset'); claims.append(el('legend', copy.question));
  const claimButtons = el('div', '', 'claim-options'); claims.append(claimButtons);
  const feedback = el('div', copy.choose, 'feedback'); feedback.id = 'reply-feedback'; feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
  const missing = el('p');
  let active = 0;
  const chooseReply = index => {
    active = index;
    Array.from(sampleButtons.children).forEach((button, n) => button.setAttribute('aria-pressed', String(n === index)));
    Array.from(claimButtons.children).forEach(button => button.setAttribute('aria-pressed', 'false'));
    excerpt.textContent = copy.items[index].text;
    recordText.textContent = copy.items[index].doc;
    feedback.textContent = copy.choose;
    feedback.removeAttribute('data-state');
    missing.textContent = '';
  };
  copy.items.forEach((item, i) => {
    const button = el('button', `${copy.sample} ${String.fromCharCode(65 + i)}`);
    button.type = 'button'; button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => chooseReply(i)); sampleButtons.append(button);
  });
  copy.labels.forEach((label, i) => {
    const button = el('button', label); button.type = 'button'; button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      Array.from(claimButtons.children).forEach((b, n) => b.setAttribute('aria-pressed', String(n === i)));
      feedback.textContent = `${i === active ? copy.yes : copy.no} ${copy.items[active].why}`;
      feedback.dataset.state = i === active ? 'correct' : 'retry';
      missing.textContent = `${copy.limit}: ${copy.items[active].missing}`;
    });
    claimButtons.append(button);
  });
  const label = el('label', copy.draft); label.htmlFor = 'followup-draft';
  const hint = el('p', copy.draftHint, 'source-note'); hint.id = 'draft-hint';
  const draft = el('textarea'); draft.id = 'followup-draft'; draft.maxLength = 1200; draft.setAttribute('aria-describedby', 'draft-hint');
  const clear = el('button', copy.clear); clear.type = 'button'; clear.addEventListener('click', () => { draft.value = ''; draft.focus(); });
  panel.append(samples, excerpt, records, claims, feedback, missing, label, hint, draft, clear);
  root.insertBefore(panel, root.querySelector('details')); chooseReply(0);
})();
