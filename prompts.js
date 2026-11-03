(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const library = $('prompt-library');
  if (!library) return;
  const prompts = Array.isArray(window.MARKETING_PROMPTS) ? window.MARKETING_PROMPTS.filter(item => item && typeof item.id === 'string' && typeof item.prompt === 'string') : [];
  if (!prompts.length) {
    $('prompt-results').textContent = 'Die Vorlagen konnten nicht geladen werden. Bitte lade die Seite neu.';
    $('prompt-detail').hidden = true;
    return;
  }
  const key = 'pulse-marketing-prompts-v1';
  const drafts = Object.create(null);
  let selected = (prompts.find(item => item.dashboardContext || item.contextKey === 'dashboard') || prompts[0]).id;
  let category = 'Alle';
  let canStore = true;
  const categories = ['Alle', ...new Set(prompts.map(item => item.category))];
  const sourceURL = value => {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch (_) { return null; }
  };
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && saved.version === 1) {
      if (prompts.some(item => item.id === saved.selected)) selected = saved.selected;
      if (saved.drafts && typeof saved.drafts === 'object' && !Array.isArray(saved.drafts)) prompts.forEach(item => {
        if (Object.hasOwn(saved.drafts, item.id) && typeof saved.drafts[item.id] === 'string' && saved.drafts[item.id].length <= 50000) drafts[item.id] = saved.drafts[item.id];
      });
    }
  } catch (_) { canStore = false; }
  const current = () => prompts.find(item => item.id === selected);
  const draft = item => Object.hasOwn(drafts, item.id) ? drafts[item.id] : item.prompt;
  function save() {
    try { localStorage.setItem(key, JSON.stringify({version:1, selected, drafts})); canStore = true; } catch (_) { canStore = false; }
    $('prompt-storage-note').textContent = canStore ? 'Deine Änderungen bleiben nur in diesem Browser gespeichert. Geteilte Links enthalten keine Prompt-Texte.' : 'Deine Änderungen bleiben für diese Sitzung erhalten; dieser Browser erlaubt gerade keine lokale Speicherung.';
  }
  function status(message) { $('prompt-copy-status').textContent = message; }
  function updateDraftState() {
    const edited = $('prompt-editor').value !== current().prompt;
    $('prompt-reset').disabled = !edited;
    $('prompt-draft-state').textContent = edited ? 'Dein Entwurf' : 'Originalvorlage';
  }
  function storeEditor() {
    const item = current(), value = $('prompt-editor').value;
    if (value === item.prompt) delete drafts[item.id]; else drafts[item.id] = value;
    updateDraftState();
    save();
  }
  function sourceLink(source) {
    const link = document.createElement('a');
    link.href = sourceURL(source.url);
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.textContent = source.label;
    return link;
  }
  function renderDetail() {
    const item = current();
    $('prompt-detail-category').textContent = item.category;
    $('prompt-detail-title').textContent = item.title;
    $('prompt-use-when').textContent = item.useWhen || item.description;
    $('prompt-inputs').replaceChildren(...(item.inputs || []).map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    $('prompt-output').textContent = item.output;
    $('prompt-editor').value = draft(item);
    $('prompt-next-step').textContent = item.nextStep || 'Ergebnis prüfen, konkrete Rückfragen stellen und den Entwurf gemeinsam verfeinern.';
    $('prompt-context-tools').hidden = !(item.dashboardContext || item.contextKey === 'dashboard');
    const source = item.source || {label:'Eigene Vorlage'};
    const sourceNode = $('prompt-source');
    sourceNode.replaceChildren(document.createTextNode('Vorlage: '));
    sourceNode.append(sourceURL(source.url) ? sourceLink(source) : document.createTextNode(source.label));
    const note = source.provenance || source.note;
    if (note) sourceNode.append(document.createTextNode(' · ' + note));
    status(''); updateDraftState(); save();
  }
  function updateSelectedCard() {
    $('prompt-list').querySelectorAll('[data-prompt-id]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.promptId === selected)));
  }
  function select(id, focusDetail) {
    selected = id; updateSelectedCard(); renderDetail();
    if (focusDetail && matchMedia('(max-width: 760px)').matches) $('prompt-detail-title').focus();
  }
  function renderList() {
    const query = $('prompt-search').value.trim().toLocaleLowerCase('de');
    const visible = prompts.filter(item => (category === 'Alle' || item.category === category) && [item.title,item.category,item.description,item.useWhen,...(item.inputs || [])].join(' ').toLocaleLowerCase('de').includes(query));
    const list = $('prompt-list');
    list.replaceChildren(...visible.map(item => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'prompt-card'; button.dataset.promptId = item.id;
      button.setAttribute('aria-pressed', String(item.id === selected));
      button.setAttribute('aria-controls', 'prompt-detail');
      const tag = document.createElement('span'); tag.className = 'prompt-card-category'; tag.textContent = item.category;
      const title = document.createElement('strong'); title.textContent = item.title;
      const description = document.createElement('span'); description.className = 'prompt-card-description'; description.textContent = item.description;
      const action = document.createElement('span'); action.className = 'prompt-card-action'; action.textContent = 'Vorlage öffnen';
      const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden','true'); action.append(arrow);
      button.append(tag,title,description,action);
      return button;
    }));
    $('prompt-results').textContent = visible.length + ' von ' + prompts.length + ' Vorlagen';
    $('prompt-empty').hidden = visible.length > 0;
    // Leave the editor available even when a search has no results; it may contain a draft.
    if (visible.length && !visible.some(item => item.id === selected)) select(visible[0].id, false);
  }
  categories.forEach(name => {
    const button = document.createElement('button');
    button.type = 'button'; button.dataset.promptCategory = name;
    button.setAttribute('aria-pressed', String(name === category));
    button.textContent = name;
    $('prompt-categories').append(button);
  });
  $('prompt-categories').addEventListener('click', event => {
    const button = event.target.closest('[data-prompt-category]'); if (!button) return;
    category = button.dataset.promptCategory;
    $('prompt-categories').querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderList();
  });
  $('prompt-search').addEventListener('input', renderList);
  $('prompt-list').addEventListener('click', event => { const button = event.target.closest('[data-prompt-id]'); if (button) select(button.dataset.promptId, true); });
  $('prompt-clear-filters').addEventListener('click', () => {
    category = 'Alle'; $('prompt-search').value = '';
    $('prompt-categories').querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.promptCategory === category)));
    renderList(); $('prompt-search').focus();
  });
  $('prompt-editor').addEventListener('input', () => { storeEditor(); status(''); });
  $('prompt-reset').addEventListener('click', () => {
    $('prompt-editor').value = current().prompt; storeEditor();
    status('Originalvorlage wiederhergestellt.');
  });
  $('prompt-copy').addEventListener('click', async () => {
    const value = $('prompt-editor').value;
    if (!value.trim()) { status('Ergänze zuerst einen Prompt-Text.'); $('prompt-editor').focus(); return; }
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(value); status('Prompt kopiert. Jetzt im KI-Tool deiner Wahl einfügen.');
    } catch (_) {
      $('prompt-editor').focus(); $('prompt-editor').select();
      status('Automatisches Kopieren ist hier nicht verfügbar. Der Text ist markiert: mit Strg+C bzw. ⌘C kopieren.');
    }
  });
  $('prompt-insert-context').addEventListener('click', () => {
    if (typeof window.pulseGetPromptContext !== 'function') { status('Der Dashboard-Vergleich ist gerade nicht verfügbar. Bitte lade die Seite neu.'); return; }
    const context = window.pulseGetPromptContext();
    const startMarker = '--- Dashboard-Vergleich (fiktive Beispieldaten) ---', endMarker = '--- Ende Dashboard-Vergleich ---';
    let text = $('prompt-editor').value;
    const start = text.indexOf(startMarker), end = start < 0 ? -1 : text.indexOf(endMarker, start);
    if (text.includes('[DASHBOARD_KONTEXT]')) text = text.replace('[DASHBOARD_KONTEXT]', context);
    else if (start >= 0 && end >= start) text = text.slice(0, start) + context + text.slice(end + endMarker.length);
    else text += '\n\n' + context;
    $('prompt-editor').value = text; storeEditor();
    status('Fiktive Zahlen und angewendete Zeiträume eingefügt. Erneutes Einfügen aktualisiert diesen Vergleich.');
  });
  const sources = Array.isArray(window.MARKETING_PROMPT_SOURCES) ? window.MARKETING_PROMPT_SOURCES : [];
  sources.filter(source => source && sourceURL(source.url)).forEach(source => {
    const block = document.createElement('p'); block.append(sourceLink(source));
    const note = source.note || source.provenance; if (note) { const small = document.createElement('span'); small.textContent = note; block.append(small); }
    $('prompt-source-links').append(block);
  });
  $('prompt-total').textContent = prompts.length;
  renderDetail(); renderList();
})();
