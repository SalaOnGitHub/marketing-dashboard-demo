
(() => {
  const root = document.getElementById('marketing-views');
  const state = { trend: 'revenue', channel: 'google', efficiency: 'roas', social: 'impressions' };
  const channels = {
    google: { name:'Google Ads', roas:'5,00×', cpl:'50,00 €', spend:'46,7 %', revenue:'58,3 %', target:'Ziel um 25 % übertroffen' },
    meta: { name:'Meta Ads', roas:'3,00×', cpl:'40,00 €', spend:'33,3 %', revenue:'25,0 %', target:'25 % unter dem Ziel' },
    linkedin: { name:'LinkedIn Ads', roas:'3,33×', cpl:'85,71 €', spend:'20,0 %', revenue:'16,7 %', target:'16,7 % unter dem Ziel' }
  };
  function renderTrend() {
    const data = state.trend === 'leads' ? { values:[220,270,330,380], max:400, unit:'Neue Leads je Wochenabschnitt · Anzahl', total:'Gesamt 1.200 Leads', label:'Leads im Oktober: 220, 270, 330 und 380 in vier Wochenabschnitten' } : { values:[32,40,48,60], max:60, unit:'Umsatz je Wochenabschnitt · Tsd. €', total:'Gesamt 180.000 €', label:'Umsatz im Oktober: 32, 40, 48 und 60 Tausend Euro in vier Wochenabschnitten' };
    root.querySelector('[data-trend-unit]').textContent = data.unit;
    root.querySelector('[data-trend-total]').textContent = data.total;
    root.querySelector('[data-top-axis]').textContent = data.max;
    root.querySelector('[data-mid-axis]').textContent = data.max / 2;
    root.querySelector('.mk-weekchart').setAttribute('aria-label', data.label);
    root.querySelectorAll('[data-bar]').forEach((el,i) => { const pct = data.values[i]/data.max*100; el.style.height = pct+'%'; el.parentElement.style.setProperty('--bar-pct',pct+'%'); });
    root.querySelectorAll('[data-bar-value]').forEach((el,i) => el.textContent = data.values[i]);
    root.querySelectorAll('[data-trend]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.trend===state.trend)));
  }
  function renderChannel() {
    const item = channels[state.channel];
    ['name','roas','cpl','spend','revenue','target'].forEach(key => root.querySelector('[data-channel-'+key+']').textContent = item[key]);
    root.querySelectorAll('[data-channel]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.channel===state.channel)));
    root.querySelectorAll('[data-channel-row]').forEach(el => el.classList.toggle('mk-row-selected',el.dataset.channelRow===state.channel));
  }
  function renderEfficiency() {
    const isRoas = state.efficiency==='roas';
    const values = isRoas ? [5,3,10/3] : [50,40,6000/70];
    const max = Math.max(...values);
    root.querySelector('[data-efficiency-caption]').textContent = isRoas ? 'Umsatz je Euro Werbeausgaben · höher ist besser' : 'Werbeausgaben je Lead · niedriger ist besser';
    root.querySelectorAll('[data-efficiency-bar]').forEach((el,i) => el.style.width = values[i]/max*100+'%');
    root.querySelectorAll('[data-efficiency-value]').forEach((el,i) => el.textContent = values[i].toLocaleString('de-AT',{minimumFractionDigits:2,maximumFractionDigits:2})+(isRoas?'×':' €'));
    root.querySelectorAll('[data-efficiency]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.efficiency===state.efficiency)));
  }
  function renderSocial() {
    const isLeads = state.social==='leads';
    const values = isLeads ? [128,36,76] : [180000,220000,80000];
    const max = Math.max(...values);
    root.querySelector('[data-social-caption]').textContent = isLeads ? 'Zugeordnete Leads · organisch' : 'Impressionen · organisch';
    root.querySelectorAll('[data-social-value]').forEach((el,i) => el.textContent = values[i].toLocaleString('de-AT'));
    root.querySelectorAll('[data-social-bar]').forEach((el,i) => el.style.width = values[i]/max*100+'%');
    root.querySelectorAll('[data-social]').forEach(el => el.setAttribute('aria-pressed',String(el.dataset.social===state.social)));
  }
  function renderAll(){renderTrend();renderChannel();renderEfficiency();renderSocial();}
  const storageKey = 'pulse-marketing-demo-v1';
  function restore() {
    try {
      const s = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if(!s || typeof s !== 'object') return;
      if(['revenue','leads'].includes(s.trend)) state.trend=s.trend;
      if(Object.hasOwn(channels,s.channel)) state.channel=s.channel;
      if(['roas','cpl'].includes(s.efficiency)) state.efficiency=s.efficiency;
      if(['impressions','leads'].includes(s.social)) state.social=s.social;
    } catch (_) { /* The demo remains usable when storage is unavailable. */ }
    renderAll();
  }
  function save() {
    try { localStorage.setItem(storageKey,JSON.stringify(state)); } catch (_) {}
  }
  root.addEventListener('click',event => {
    const el = event.target.closest('button');
    if(!el || !root.contains(el)) return;
    if(el.dataset.trend) {state.trend=el.dataset.trend;renderTrend();save();}
    if(el.dataset.channel) {state.channel=el.dataset.channel;renderChannel();save();}
    if(el.dataset.efficiency) {state.efficiency=el.dataset.efficiency;renderEfficiency();save();}
    if(el.dataset.social) {state.social=el.dataset.social;renderSocial();save();}
  });
  renderAll();
  restore();
  const viewNames = {
    'management':'Management',
    'paid-performance':'Paid Performance',
    'b2b-funnel':'B2B-Funnel',
    'content-social':'Content & Social'
  };
  function showView() {
    const slug = location.hash.slice(1);
    const selected = Object.hasOwn(viewNames,slug) ? slug : 'management';
    root.querySelectorAll('[data-view]').forEach(panel => panel.hidden = panel.dataset.view !== selected);
    document.querySelectorAll('[data-view-link]').forEach(link => {
      if(link.dataset.viewLink === selected) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    document.title = viewNames[selected] + ' | Pulse Marketing-Dashboards';
  }
  window.addEventListener('hashchange',showView);
  showView();
  document.querySelectorAll('[data-tooltip]').forEach(el => el.title=el.dataset.tooltip);
  const shareButton = document.getElementById('share-view');
  const shareStatus = document.getElementById('share-status');
  let shareTimer;
  shareButton.addEventListener('click',async () => {
    const address = new URL(location.href);
    if(!address.hash) address.hash='management';
    try {
      await navigator.clipboard.writeText(address.href);
      shareStatus.textContent='Link zur Ansicht kopiert';
    } catch (_) {
      const field=document.getElementById('share-address');
      field.value=address.href;
      field.hidden=false;
      field.focus();
      field.select();
      shareStatus.textContent='Link auswählen und kopieren';
    }
    clearTimeout(shareTimer);
    shareTimer=setTimeout(()=>{shareStatus.textContent='';},4000);
  });
})();
