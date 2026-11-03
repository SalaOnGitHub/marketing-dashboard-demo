(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const root = $('marketing-views');
  const state = { period:'month', trend:'revenue', channel:'google', efficiency:'roas', social:'impressions', day:1 };
  const storageKey = 'pulse-marketing-demo-v2';
  const names = { management:'Management', 'paid-performance':'Paid Performance', 'b2b-funnel':'B2B-Funnel', 'content-social':'Content & Social' };
  const channelNames = ['Google Ads','Meta Ads','LinkedIn Ads'];
  const channelKeys = ['google','meta','linkedin'];
  const socialNames = ['LinkedIn','Instagram','YouTube'];
  const f = (v,d=0) => Number(v).toLocaleString('de-DE',{minimumFractionDigits:d,maximumFractionDigits:d});
  const fmt = (v,kind='int') => kind==='money' ? f(v)+' €' : kind==='money2' ? f(v,2)+' €' : kind==='ratio' ? f(v,2)+'×' : kind==='rate' ? f(v*100,1)+' %' : f(v);
  const sum = (rows,key) => rows.reduce((a,row)=>a+row[key],0);
  const escape = value => String(value).replace(/[&<>"']/g, ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const periods = {
    month:{current:'01.–31. Oktober 2026',previous:'01.–30. September 2026',short:'Oktober 2026',previousShort:'September 2026',start:'2026-10-01',prevStart:'2026-09-01',length:31,prevLength:30,target:{budget:65000,revenue:200000,leads:1250},
      now:{cost:60000,pipeline:720000,paid:[{spend:14000,revenue:70000,leads:280},{spend:10000,revenue:30000,leads:250},{spend:6000,revenue:20000,leads:70}],social:[{impressions:180000,interactions:10800,sessions:3200,leads:128},{impressions:220000,interactions:9900,sessions:1800,leads:36},{impressions:80000,interactions:2340,sessions:3000,leads:76}],organic:{leads:260,revenue:18000},crm:{leads:100,revenue:10000},socialRevenue:32000,posts:[{impressions:42000,leads:46},{impressions:28000,leads:31},{impressions:31000,leads:28}]},
      prev:{cost:55000,pipeline:640000,paid:[{spend:13000,revenue:60000,leads:240},{spend:9000,revenue:24000,leads:200},{spend:6000,revenue:16000,leads:60}],social:[{impressions:150000,interactions:8400,sessions:2600,leads:110},{impressions:180000,interactions:6480,sessions:1500,leads:30},{impressions:70000,interactions:1920,sessions:2400,leads:60}],organic:{leads:180,revenue:14000},crm:{leads:80,revenue:8000},socialRevenue:28000,posts:[{impressions:36000,leads:38},{impressions:24000,leads:24},{impressions:27000,leads:22}]}},
    week:{current:'26. Oktober–01. November 2026',previous:'19.–25. Oktober 2026',short:'26.10.–01.11.2026',previousShort:'19.–25.10.2026',start:'2026-10-26',prevStart:'2026-10-19',length:7,prevLength:7,target:{budget:17000,revenue:50000,leads:320},
      now:{cost:15000,pipeline:168000,paid:[{spend:3500,revenue:17500,leads:70},{spend:2500,revenue:7500,leads:62},{spend:1500,revenue:5000,leads:18}],social:[{impressions:45000,interactions:2700,sessions:800,leads:32},{impressions:55000,interactions:2475,sessions:450,leads:9},{impressions:20000,interactions:585,sessions:750,leads:19}],organic:{leads:65,revenue:4500},crm:{leads:25,revenue:2500},socialRevenue:8000,posts:[{impressions:10500,leads:12},{impressions:7000,leads:8},{impressions:7750,leads:7}]},
      prev:{cost:14500,pipeline:150000,paid:[{spend:3400,revenue:16500,leads:65},{spend:2400,revenue:6500,leads:55},{spend:1400,revenue:4000,leads:15}],social:[{impressions:42000,interactions:2352,sessions:720,leads:30},{impressions:50000,interactions:2000,sessions:400,leads:8},{impressions:18000,interactions:598,sessions:680,leads:16}],organic:{leads:58,revenue:4000},crm:{leads:23,revenue:2500},socialRevenue:7000,posts:[{impressions:9500,leads:10},{impressions:6500,leads:6},{impressions:7000,leads:6}]}}
  };
  function totals(data) {
    const paid = {spend:sum(data.paid,'spend'),revenue:sum(data.paid,'revenue'),leads:sum(data.paid,'leads')};
    paid.roas=paid.revenue/paid.spend; paid.cpl=paid.spend/paid.leads;
    const social={}; ['impressions','interactions','sessions','leads'].forEach(key=>social[key]=sum(data.social,key));
    social.engagement=social.interactions/social.impressions;
    return {paid,social,cost:data.cost,pipeline:data.pipeline,revenue:paid.revenue+data.socialRevenue+data.organic.revenue+data.crm.revenue,leads:paid.leads+social.leads+data.organic.leads+data.crm.leads};
  }
  Object.values(periods).forEach(p=>{p.nowTotals=totals(p.now);p.prevTotals=totals(p.prev);});
  function allocate(total,length,seed) {
    const weights=Array.from({length},(_,i)=>0.85+0.28*Math.sin((i+seed)*1.6)+i/length*0.5+((i+seed)%7<5?0.12:0));
    const weightSum=weights.reduce((a,b)=>a+b,0);
    const values=weights.map(w=>Math.floor(total*w/weightSum));
    let remaining=total-values.reduce((a,b)=>a+b,0);
    for(let i=0;remaining>0;i++,remaining--)values[(i+seed)%length]++;
    return values;
  }
  const atomPaths = ['cost','pipeline','socialRevenue','organic.leads','organic.revenue','crm.leads','crm.revenue'];
  for(let i=0;i<3;i++){
    ['spend','revenue','leads'].forEach(key=>atomPaths.push('paid.'+i+'.'+key));
    ['impressions','interactions','sessions','leads'].forEach(key=>atomPaths.push('social.'+i+'.'+key));
  }
  const getPath=(data,path)=>path.split('.').reduce((value,key)=>value[key],data);
  const ledger={};
  atomPaths.forEach((path,i)=>{
    const month=getPath(periods.month.now,path),currentWeek=getPath(periods.week.now,path),previousWeek=getPath(periods.week.prev,path),novemberFirst=Math.floor(currentWeek*.1),earlyMonth=month-previousWeek-currentWeek+novemberFirst;
    if(earlyMonth<0)throw new Error('Demo-Zeiträume sind nicht konsistent: '+path);
    ledger[path]={october:allocate(earlyMonth,18,i+1).concat(allocate(previousWeek,7,i+3),allocate(currentWeek-novemberFirst,6,i+5)),september:allocate(getPath(periods.month.prev,path),30,i+8),novemberFirst};
  });
  const allPaid=key=>[0,1,2].map(i=>'paid.'+i+'.'+key);
  const allSocial=key=>[0,1,2].map(i=>'social.'+i+'.'+key);
  const metricPaths={
    revenue:allPaid('revenue').concat(['socialRevenue','organic.revenue','crm.revenue']),
    leads:allPaid('leads').concat(allSocial('leads'),['organic.leads','crm.leads']),
    cost:['cost'],pipeline:['pipeline'],paidSpend:allPaid('spend'),paidRevenue:allPaid('revenue'),paidLeads:allPaid('leads'),
    socialImpressions:allSocial('impressions'),socialInteractions:allSocial('interactions'),socialSessions:allSocial('sessions'),socialLeads:allSocial('leads')
  };
  function series(metric,previous=false){
    const paths=metricPaths[metric],arrays=paths.map(path=>{
      const atom=ledger[path];
      if(state.period==='month')return previous?atom.september:atom.october;
      return previous?atom.october.slice(18,25):atom.october.slice(25).concat(atom.novemberFirst);
    });
    return arrays[0].map((_,i)=>arrays.reduce((total,values)=>total+values[i],0));
  }
  function ratioSeries(numerator,denominator,previous=false){const a=series(numerator,previous),b=series(denominator,previous);return a.map((value,i)=>b[i]?value/b[i]:0);}
  function linePath(values,w,h,pad,min=0,max=Math.max(...values),count=values.length) {
    const span=max-min||1;
    return values.map((v,i)=>(i?'L':'M')+fRaw(pad+i*(w-2*pad)/Math.max(1,count-1))+','+fRaw(h-pad-(v-min)/span*(h-2*pad))).join(' ');
  }
  const fRaw = v => Math.round(v*100)/100;
  function spark(values,previous,label) {
    const all=values.concat(previous),min=Math.min(...all)*0.85,max=Math.max(...all)*1.05,count=Math.max(values.length,previous.length);
    return '<svg class="kpi-spark" viewBox="0 0 200 42" role="img" aria-label="'+escape(label)+'">'+(previous.length?'<path class="spark-previous" d="'+linePath(previous,200,42,4,min,max,count)+'"></path>':'')+'<path class="spark-current" d="'+linePath(values,200,42,4,min,max,count)+'"></path></svg>';
  }
  const help = {
    revenue:['Zugeordneter Umsatz','Umsatz aus neuen Kundinnen und Kunden, den wir einem Marketingkanal zuordnen.','Die dem Kanal zugeordneten Bestell- oder Vertragswerte werden addiert.','Mehr zugeordneter Umsatz bedeutet nicht automatisch mehr Gewinn. Die Zuordnung zeigt einen Zusammenhang, keinen Beweis, dass Marketing den Kauf verursacht hat.'],
    pipeline:['Neue Pipeline','Der mögliche Wert neu entstandener Verkaufschancen. Das Geld ist noch nicht sicher verdient.','Werte aller neu erfassten Opportunities im Zeitraum addieren.','Eine größere Pipeline ist interessant, wenn die Chancen realistisch sind. Manche Deals gehen später verloren.'],
    leads:['Leads','Menschen oder Unternehmen, die Interesse gezeigt und ihre Kontaktdaten hinterlassen haben.','Neue, eindeutige Kontakte im ausgewählten Zeitraum zählen.','Mehr Leads sind nur dann hilfreich, wenn sie zur Zielgruppe passen. Ein Lead ist noch kein Kunde.'],
    cost:['Marketingausgaben','Alle hier erfassten Marketingkosten: Werbung, Content, organische Suche und CRM.','Die erfassten Kosten im Zeitraum addieren.','Mehr Ausgaben sind weder automatisch gut noch schlecht. Schau dazu auf Umsatz, Leadqualität und Ziele.'],
    spend:['Werbeausgaben','Das Budget, das direkt an Werbeplattformen wie Google, Meta oder LinkedIn geflossen ist.','Medienkosten der drei Werbekanäle addieren; Agenturhonorare sind in dieser Demo nicht enthalten.','Ein höheres Budget kann mehr Reichweite bringen. Entscheidend ist, welche Ergebnisse damit erreicht werden.'],
    roas:['ROAS','Return on Ad Spend: Wie viel zugeordneter Umsatz auf einen Euro Werbeausgaben entfällt.','Zugeordneter Umsatz ÷ Werbeausgaben. 4,00× bedeutet 4 € Umsatz pro 1 € Werbung.','ROAS ist kein Gewinn: Produktkosten, Personal und andere Kosten fehlen. Ob ein Wert gut ist, hängt unter anderem von der Marge ab.'],
    cpl:['Kosten je Lead','Wie viel Werbebudget durchschnittlich für einen neuen Lead nötig war. Auch CPL genannt.','Werbeausgaben ÷ Anzahl der Leads. 3.000 € für 60 Leads entsprechen 50 € je Lead.','Weniger ist oft günstiger – aber nur bei vergleichbarer Leadqualität. Billige, unpassende Kontakte helfen wenig.'],
    impressions:['Impressionen','Wie oft Inhalte oder Anzeigen eingeblendet wurden. Eine Person kann mehrere Einblendungen erzeugen.','Alle Einblendungen der ausgewählten Kanäle addieren.','Das ist Sichtbarkeit, nicht die Anzahl einzelner Menschen. Viele Einblendungen garantieren keine Nachfrage.'],
    engagement:['Engagementrate','Wie häufig aus einer Einblendung eine Interaktion wurde, z.B. ein Like, Kommentar oder Teilen.','Interaktionen ÷ Impressionen × 100. In dieser Demo zählen alle drei organischen Social-Kanäle zusammen.','Die Definition kann zwischen Plattformen variieren. Eine höhere Rate ist kein automatischer Beleg für mehr Verkäufe. Änderungen zeigen wir in Prozentpunkten.'],
    sessions:['Website-Sitzungen','Besuche auf der Website, die hier den organischen Social-Posts zugeordnet werden. Ein Mensch kann mehrfach zu Besuch kommen.','Die erfassten Sitzungen aus diesen Social-Kanälen addieren.','Sitzungen sind weder Personen noch Käufe. Interessant ist, ob daraus passende Leads oder Kunden entstehen.'],
    conversion:['Lead → Abschluss','Der Anteil der ursprünglichen Leads, aus denen bis zum Stichtag gewonnene Deals wurden.','Gewonnene Deals ÷ ursprüngliche Leads × 100. Hier18 ÷ 1.200 = 1,5 %.','Die Zeit bis zum Abschluss zählt. Vergleiche möglichst gleich alte Kohorten; frische Leads hatten noch weniger Zeit.'],
    cohort:['Lead-Kohorte','Eine feste Gruppe von Kontakten: hier alle 1.200 Leads, die im Juli 2026 neu hinzukamen.','Wir verfolgen dieselben Kontakte bis zum angegebenen Stichtag weiter.','Diese Ansicht ist bewusst unabhängig vom Wochen-/Monatsumschalter. Die Entwicklung zeigt Monatsendstände derselben Gruppe.'],
    mql:['MQL','Marketing Qualified Lead: Ein Kontakt, den das Marketing nach festgelegten Kriterien für passend und interessiert hält.','Alle Leads zählen, die die vereinbarten Marketing-Kriterien erfüllt haben.','Die Kriterien sind von Unternehmen zu Unternehmen verschieden. Ein Download allein muss noch keine Kaufabsicht bedeuten.'],
    sql:['SQL','Sales Qualified Lead: Ein Kontakt, der vom Vertrieb als passende Verkaufschance weiterverfolgt werden soll.','Alle Kontakte zählen, die die vereinbarten Vertriebskriterien erfüllt haben.','Wichtig sind gemeinsame Regeln von Marketing und Vertrieb, damit die Übergabe wirklich funktioniert.'],
    opportunity:['Opportunity','Eine konkrete Verkaufschance, z.B. nach einem qualifizierten Gespräch oder einem Angebot.','Die erfassten Verkaufschancen zählen; ihr möglicher Wert bildet die Pipeline.','Eine Opportunity ist noch kein gewonnener Auftrag. Offene Chancen sind auch noch nicht verloren.'],
    won:['Gewonnene Deals','Verkaufschancen, die bis zum Stichtag erfolgreich abgeschlossen wurden.','Erfolgreich abgeschlossene Deals derselben Kohorte zählen.','Der Abschluss liegt oft Wochen oder Monate nach dem ersten Marketingkontakt.'],
    attribution:['Last-Touch-Zuordnung','Der letzte erfasste Marketingkontakt vor dem Abschluss erhält die Umsatzzuordnung.','Jeden Neukundenumsatz genau einem letzten erfassten Kanal zuordnen.','Frühere Kontakte können ebenfalls wichtig gewesen sein. Ein anderes Zuordnungsmodell kann andere Kanalwerte ergeben.'],
    comparison:['Zeiträume vergleichen','„Letzter Monat“ vergleicht den kompletten Oktober mit September. „Letzte Woche“ vergleicht zwei vollständige 7-Tage-Zeiträume.','Beträge und Anzahlen: (aktuell − vorher) ÷ vorher. Bei Raten zeigen wir die Differenz in Prozentpunkten.','Oktober hat 31 Tage, September 30. Die Tageskurven zeigen Einzelwerte; Monats-KPIs sind Summen. Bei einem Vorwert von 0 zeigen wir „neu“ statt einer irreführenden Prozentzahl.']
  };
  help.cohortLeads=['Leads der Juli-Kohorte','Die feste Ausgangsgruppe von 1.200 Kontakten, die im Juli 2026 neu hinzukamen.','Die eindeutigen neuen Kontakte aus Juli zählen; danach werden keine neuen Kontakte zu dieser Gruppe ergänzt.','Die Anzahl bleibt konstant. Wir beobachten, wie sich diese Menschen und Unternehmen bis zum Stichtag weiterentwickeln.'];
  help.cohortPipeline=['Erzeugte Pipeline der Kohorte','Der mögliche Gesamtwert aller Verkaufschancen, die bis zum Stichtag aus den Juli-Leads entstanden sind.','Die ursprünglichen Werte der bis dahin erzeugten Opportunities dieser Kohorte addieren.','Das ist eine kumulierte Entstehungsgröße, keine aktuelle offene Pipeline. Gewonnene und verlorene Chancen bleiben hier enthalten.'];
  help.cohortRevenue=['Gewonnener Umsatz der Kohorte','Die Summe der bis zum Stichtag gewonnenen Deals aus der festen Juli-Kohorte.','Werte der erfolgreich abgeschlossenen Deals dieser Kontakte addieren.','Der Vergleich zu Ende September zeigt den Fortschritt derselben Gruppe. Er ist kein Vergleich des gesamten Oktober- und Septemberumsatzes.'];
  function info(key,label) {return '<button type="button" class="help-button" data-help="'+key+'" aria-label="'+escape(label||help[key][0])+' erklärt" aria-expanded="false" aria-controls="kpi-help">?</button>';}
  function delta(now,previous,kind,direction='up',context) {
    let change=now-previous,label;
    if(kind==='rate')label=(change>0?'+':'')+f(change*100,Math.abs(change*100)<1?2:1)+' Prozentpunkte';
    else if(kind==='ratio')label=(change>0?'+':'')+f(change,2)+'×';
    else if(previous===0)label=now===0?'Unverändert':'Neu';
    else label=(change>0?'+':'')+f(change/previous*100,1)+' %';
    let tone='neutral';
    if(direction!=='neutral'&&change!==0)tone=(direction==='down'?change<0:change>0)?'positive':'negative';
    return '<span class="kpi-delta '+tone+'">'+(change>0?'↗ ':change<0?'↘ ':'→ ')+label+'</span><span class="kpi-comparison">'+escape(context||('vs. '+periods[state.period].previousShort))+'</span>';
  }
  function card(key,label,now,previous,kind,values,prevValues,direction='up',context,note) {
    return '<article class="mk-stat" data-kpi="'+key+'"><div class="kpi-heading"><span class="mk-label">'+label+'</span>'+info(key,label)+'</div><strong class="mk-number" data-kpi-value>'+fmt(now,kind)+'</strong>'+spark(values,prevValues,label+(prevValues.length?': Verlauf aktuell durchgezogen, Vergleich gestrichelt.':': Monatsendstände derselben Juli-Kohorte von Juli bis Oktober.'))+'<div class="kpi-delta-row">'+delta(now,previous,kind,direction,context)+'</div><span class="kpi-previous">Vorher: '+fmt(previous,kind)+(note?' · '+note:'')+'</span></article>';
  }
  function renderStats() {
    const p=periods[state.period],a=p.nowTotals,b=p.prevTotals;
    $('management-stats').innerHTML=card('revenue','Zugeordneter Umsatz',a.revenue,b.revenue,'money',series('revenue'),series('revenue',true))+card('pipeline','Neue Pipeline',a.pipeline,b.pipeline,'money',series('pipeline'),series('pipeline',true))+card('leads','Neue Leads',a.leads,b.leads,'int',series('leads'),series('leads',true))+card('cost','Marketingausgaben',a.cost,b.cost,'money',series('cost'),series('cost',true),'neutral');
    $('paid-stats').innerHTML=card('spend','Werbeausgaben',a.paid.spend,b.paid.spend,'money',series('paidSpend'),series('paidSpend',true),'neutral')+card('revenue','Zugeordneter Umsatz',a.paid.revenue,b.paid.revenue,'money',series('paidRevenue'),series('paidRevenue',true))+card('roas','ROAS',a.paid.roas,b.paid.roas,'ratio',ratioSeries('paidRevenue','paidSpend'),ratioSeries('paidRevenue','paidSpend',true),'neutral')+card('cpl','Kosten je Lead',a.paid.cpl,b.paid.cpl,'money2',ratioSeries('paidSpend','paidLeads'),ratioSeries('paidSpend','paidLeads',true),'down',null,f(a.paid.leads)+' Leads aktuell');
    $('social-stats').innerHTML=card('impressions','Impressionen',a.social.impressions,b.social.impressions,'int',series('socialImpressions'),series('socialImpressions',true),'neutral')+card('engagement','Engagementrate',a.social.engagement,b.social.engagement,'rate',ratioSeries('socialInteractions','socialImpressions'),ratioSeries('socialInteractions','socialImpressions',true),'neutral',null,f(a.social.interactions)+' Interaktionen aktuell')+card('sessions','Website-Sitzungen',a.social.sessions,b.social.sessions,'int',series('socialSessions'),series('socialSessions',true),'neutral')+card('leads','Gewonnene Leads',a.social.leads,b.social.leads,'int',series('socialLeads'),series('socialLeads',true));
  }
  function cellDelta(now,prev) {return '<small class="table-delta">'+(prev?((now-prev>=0?'+':'')+f((now-prev)/prev*100,1)+' %'):'Neu')+'</small>';}
  function renderManagement() {
    const p=periods[state.period],t=p.nowTotals;
    $('budget-items').innerHTML=[['Marketingbudget',t.cost,p.target.budget,'money'],['Umsatzziel',t.revenue,p.target.revenue,'money'],['Lead-Ziel',t.leads,p.target.leads,'int']].map(row=>'<div class="mk-budgetitem"><div><span>'+row[0]+'</span><strong>'+fmt(row[1],row[3])+' / '+fmt(row[2],row[3])+'</strong></div><div class="mk-track" role="progressbar" aria-label="'+row[0]+' erreicht" aria-valuenow="'+Math.min(100,row[1]/row[2]*100)+'" aria-valuemin="0" aria-valuemax="100"><span style="width:'+Math.min(100,row[1]/row[2]*100)+'%"></span></div><span class="mk-sub">'+f(row[1]/row[2]*100)+' % '+(row[0]==='Marketingbudget'?'eingesetzt':'erreicht')+'</span></div>').join('');
    const rows=[['A','Paid Ads',t.paid.leads,t.paid.revenue],['C','Content & Social',t.social.leads,p.now.socialRevenue],['S','Organic Search',p.now.organic.leads,p.now.organic.revenue],['E','E-Mail & CRM',p.now.crm.leads,p.now.crm.revenue]];
    $('management-channels').innerHTML=rows.map(row=>'<tr><td><span class="mk-channelmark">'+row[0]+'</span>'+row[1]+'</td><td>'+f(row[2])+'</td><td>'+fmt(row[3],'money')+'</td><td><div class="mk-cellbar"><span><i style="width:'+row[3]/t.revenue*100+'%"></i></span>'+f(row[3]/t.revenue*100,1)+' %</div></td></tr>').join('');
    renderChart();
  }
  function renderPaid() {
    const p=periods[state.period],t=p.nowTotals.paid;
    $('paid-channels').innerHTML=p.now.paid.map((row,i)=>'<tr class="'+(state.channel===channelKeys[i]?'mk-row-selected':'')+'"><td><button type="button" class="mk-rowbutton" data-channel="'+channelKeys[i]+'" aria-pressed="'+(state.channel===channelKeys[i])+'"><span class="mk-channelmark">'+['G','M','in'][i]+'</span>'+channelNames[i]+'</button></td><td>'+fmt(row.spend,'money')+'</td><td>'+fmt(row.revenue,'money')+cellDelta(row.revenue,p.prev.paid[i].revenue)+'</td><td><strong>'+fmt(row.revenue/row.spend,'ratio')+'</strong></td><td>'+f(row.leads)+'</td></tr>').join('');
    $('paid-total').innerHTML='<tr><td>Gesamt</td><td>'+fmt(t.spend,'money')+'</td><td>'+fmt(t.revenue,'money')+'</td><td>'+fmt(t.roas,'ratio')+'</td><td>'+f(t.leads)+'</td></tr>';
    const i=channelKeys.indexOf(state.channel),ch=p.now.paid[i],prev=p.prev.paid[i],roas=ch.revenue/ch.spend;
    $('channel-detail').innerHTML='<div class="mk-eyebrow">KANALDETAILS</div><h2>'+channelNames[i]+'</h2><div class="mk-detail-kpi"><strong>'+fmt(roas,'ratio')+'</strong><span>Return on Ad Spend '+info('roas')+'</span></div><div class="kpi-delta-row">'+delta(roas,prev.revenue/prev.spend,'ratio','neutral')+'</div><div class="mk-detail-pairs"><div><span>Kosten je Lead</span><strong>'+fmt(ch.spend/ch.leads,'money2')+'</strong></div><div><span>Anteil an Ausgaben</span><strong>'+fmt(ch.spend/t.spend,'rate')+'</strong></div><div><span>Anteil am Umsatz</span><strong>'+fmt(ch.revenue/t.revenue,'rate')+'</strong></div></div><div class="mk-detail-target"><span>Orientierungsziel: 4,00× ROAS</span><small>Ob rentabel, hängt auch von Marge und weiteren Kosten ab.</small></div>';
    const isRoas=state.efficiency==='roas',values=p.now.paid.map(c=>isRoas?c.revenue/c.spend:c.spend/c.leads),previous=p.prev.paid.map(c=>isRoas?c.revenue/c.spend:c.spend/c.leads),max=Math.max(...values,...previous);
    $('efficiency-caption').textContent=isRoas?'Umsatz je Werbe-Euro · Marge und weitere Kosten mitbewerten':'Werbeausgaben je Lead · Leadqualität mitbewerten';
    $('efficiency-bars').innerHTML=values.map((v,i)=>'<div class="mk-hbar"><span>'+channelNames[i]+'</span><div class="comparison-htrack"><i class="previous-bar" style="width:'+previous[i]/max*100+'%"></i><i class="current-bar" style="width:'+v/max*100+'%"></i></div><strong>'+fmt(v,isRoas?'ratio':'money2')+'<small>vorher '+fmt(previous[i],isRoas?'ratio':'money2')+'</small></strong></div>').join('')+'<div class="mini-legend"><span class="legend-line"></span>Aktuell <span class="legend-line previous"></span>Vergleichszeitraum</div>';
    setPressed('efficiency',state.efficiency);
  }
  function renderSocial() {
    const p=periods[state.period],a=p.nowTotals.social,b=p.prevTotals.social,isLeads=state.social==='leads',key=isLeads?'leads':'impressions',max=Math.max(...p.now.social.map(c=>c[key]),...p.prev.social.map(c=>c[key]));
    $('social-caption').textContent=isLeads?'Zugeordnete Leads · organisch':'Impressionen · organisch';
    $('social-bars').innerHTML=p.now.social.map((ch,i)=>'<div><div class="mk-social-barhead"><span><b class="mk-channelmark">'+['in','ig','yt'][i]+'</b>'+socialNames[i]+'</span><strong>'+f(ch[key])+cellDelta(ch[key],p.prev.social[i][key])+'</strong></div><div class="comparison-htrack social-track"><i class="previous-bar" style="width:'+p.prev.social[i][key]/max*100+'%"></i><i class="current-bar" style="width:'+ch[key]/max*100+'%"></i></div><div class="mk-social-meta"><span>'+fmt(ch.interactions/ch.impressions,'rate')+' Engagement</span><span>'+f(ch.sessions)+' Sitzungen</span></div></div>').join('');
    const titles=['Der B2B-Marketing-Guide','Produktdemo in 3 Minuten','Wie Nordwerk skaliert'],types=['LINKEDIN · DOKUMENT','YOUTUBE · VIDEO','LINKEDIN · CASE STUDY'],thumbs=['GUIDE','DEMO','CASE'];
    $('social-posts').innerHTML=p.now.posts.map((post,i)=>'<article class="mk-post"><div class="mk-post-thumb"><span>'+thumbs[i]+'</span></div><div><span class="mk-eyebrow">'+types[i]+'</span><h3>'+titles[i]+'</h3><span class="mk-sub">'+f(post.impressions)+' Impressionen</span></div><div class="mk-post-result"><strong>'+post.leads+'</strong><span>Leads</span>'+cellDelta(post.leads,p.prev.posts[i].leads)+'</div></article>').join('')+'<div class="mk-post-total"><span>Top 3: '+sum(p.now.posts,'leads')+' von '+a.leads+' Leads</span><strong>'+fmt(sum(p.now.posts,'leads')/a.leads,'rate')+'</strong></div>';
    $('social-journey').innerHTML=[['Impressionen',a.impressions,'impressions'],['Website-Sitzungen',a.sessions,'sessions'],['Leads',a.leads,'leads']].map((r,i)=>(i?'<span class="mk-strip-arrow">→</span>':'')+'<div><span>'+r[0]+' '+info(r[2])+'</span><strong>'+f(r[1])+'</strong></div>').join('');
    setPressed('social',state.social);
  }
  function renderFunnel() {
    const context='vs. 30.09. · gleiche Juli-Kohorte';
    $('funnel-stats').innerHTML=card('cohortLeads','Leads der Kohorte',1200,1200,'int',[1200,1200,1200,1200],[],'neutral',context)+card('cohortPipeline','Erzeugte Pipeline',720000,600000,'money',[180000,360000,600000,720000],[],'up',context)+card('cohortRevenue','Gewonnener Umsatz',180000,110000,'money',[0,40000,110000,180000],[],'up',context)+card('conversion','Lead → Abschluss',18/1200,11/1200,'rate',[0,4/1200,11/1200,18/1200],[],'up',context);
    const stages=[['cohortLeads','Leads',1200,'Alle neuen Kontakte',30,'MQL'],['mql','MQL',360,'Marketingqualifiziert',40,'SQL'],['sql','SQL',144,'Vertriebsqualifiziert',50,'Opportunity'],['opportunity','Opportunities',72,'Verkaufschancen',25,'Gewonnen'],['won','Gewonnen',18,'Abgeschlossene Deals',null,'Umsatz']];
    $('funnel-flow').innerHTML=stages.map((s,i)=>'<div class="mk-funnel-step '+(i===4?'mk-won':'')+'"><div class="mk-step-head"><span>0'+(i+1)+'</span>'+info(s[0],s[1])+'</div><strong>'+f(s[2])+'</strong><h3>'+s[1]+'</h3><span class="mk-sub">'+s[3]+'</span><div class="mk-stage-fill" style="--stage:'+s[2]/ 1200*100+'%"></div><div class="mk-flowrate">'+(s[4]===null?'180.000 €':s[4]+' %')+' <span>'+(s[4]===null?'':'→ ')+s[5]+'</span></div></div>').join('');
    $('funnel-losses').innerHTML=stages.slice(0,4).map((s,i)=>'<div class="mk-hbar"><span>'+s[1]+' → '+s[5]+'</span><div class="mk-htrack"><i style="width:'+(100-s[4])+'%"></i></div><strong>'+(100-s[4])+' %</strong></div>').join('');
    $('cohort-chart').innerHTML='<div class="cohort-bars" role="img" aria-label="Gewonnene Deals der Juli-Kohorte: Ende Juli0, Ende August4, Ende September11, Ende Oktober18.">'+[0,4,11,18].map((v,i)=>'<div><strong>'+v+'</strong><span style="height:'+v/18*110+'px"></span><small>'+['31.07.','31.08.','30.09.','31.10.'][i]+'</small></div>').join('')+'</div>';
  }
  function dateFor(start,index) {const date=new Date(start+'T12:00:00Z');date.setUTCDate(date.getUTCDate()+index);return date.toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',timeZone:'UTC'});}
  let chartData,chartGeometry;
  function renderChart() {
    const p=periods[state.period],isRevenue=state.trend==='revenue',a=series(isRevenue?'revenue':'leads'),b=series(isRevenue?'revenue':'leads',true),el=$('management-chart'),w=Math.max(230,el.clientWidth),h=248,left=54,right=16,top=18,bottom=40,count=Math.max(a.length,b.length),max=Math.max(...a,...b)*1.15;
    chartData={a,b,p,isRevenue,count};chartGeometry={w,h,left,right,top,bottom};
    const x=i=>left+i*(w-left-right)/(count-1),y=v=>h-bottom-v/max*(h-top-bottom);
    const path=values=>values.map((v,i)=>(i?'L':'M')+fRaw(x(i))+','+fRaw(y(v))).join(' ');
    let svg='<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+(isRevenue?'Täglicher Umsatz in Euro':'Tägliche neue Leads')+': '+escape(p.current)+' im Vergleich zu '+escape(p.previous)+'. Durchgezogene Linie aktuell, gestrichelte Linie vorher.">';
    for(let i=0;i<4;i++){const value=max*i/3,yy=y(value);svg+='<line class="chart-grid" x1="'+left+'" x2="'+(w-right)+'" y1="'+yy+'" y2="'+yy+'"></line><text class="chart-axis" x="'+(left-8)+'" y="'+(yy+4)+'" text-anchor="end">'+(isRevenue?f(value/1000,1)+'k':f(value))+'</text>';}
    const ticks=count===7?[0,2,4,6]:[0,7,14,21,count-1];
    ticks.forEach(i=>{svg+='<text class="chart-axis" x="'+x(i)+'" y="'+(h-bottom+20)+'" text-anchor="'+(i===0?'start':i===count-1?'end':'middle')+'">'+(count===7?['Mo','Di','Mi','Do','Fr','Sa','So'][i]:i+1+'.')+'</text>';});
    svg+='<text class="chart-unit" x="'+left+'" y="11">'+(isRevenue?'€ pro Tag':'Leads pro Tag')+'</text><path class="chart-area" d="'+path(a)+' L'+x(a.length-1)+','+(h-bottom)+' L'+left+','+(h-bottom)+' Z"></path><path class="chart-previous" d="'+path(b)+'"></path><path class="chart-current" d="'+path(a)+'"></path><line id="chart-guide" class="chart-guide" x1="'+left+'" x2="'+left+'" y1="'+top+'" y2="'+(h-bottom)+'"></line><circle id="chart-now-dot" class="chart-now-dot" r="4"></circle><circle id="chart-prev-dot" class="chart-prev-dot" r="4"></circle><rect id="chart-hit" x="'+left+'" y="'+top+'" width="'+(w-left-right)+'" height="'+(h-top-bottom)+'" fill="transparent"></rect></svg>';
    el.innerHTML=svg;
    $('trend-caption').textContent=count===7?'Zwei vollständige Wochen · Werte je Wochentag':'Volle Monate · Werte je Kalendertag (31 bzw. 30 Tage)';
    $('trend-legend').innerHTML='<span><i class="legend-line"></i>'+p.short+'</span><span><i class="legend-line previous"></i>'+p.previousShort+'</span>';
    $('chart-day').max=count;state.day=Math.max(1,Math.min(count,state.day));$('chart-day').value=state.day;
    setPressed('trend',state.trend);
    $('chart-hit').addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;const box=event.currentTarget.ownerSVGElement.getBoundingClientRect();const px=(event.clientX-box.left)*w/box.width;state.day=Math.max(1,Math.min(count,Math.round((px-left)/(w-left-right)*(count-1))+1));updateChartDay(false);});
    $('chart-hit').addEventListener('pointerdown',event=>{const box=event.currentTarget.ownerSVGElement.getBoundingClientRect();const px=(event.clientX-box.left)*w/box.width;state.day=Math.max(1,Math.min(count,Math.round((px-left)/(w-left-right)*(count-1))+1));updateChartDay(true);});
    updateChartDay(true);
  }
  function updateChartDay(announce) {
    if(!chartData)return;
    const {a,b,p,isRevenue,count}=chartData,{w,h,left,right,top,bottom}=chartGeometry,i=state.day-1,max=Math.max(...a,...b)*1.15,x=left+i*(w-left-right)/(count-1),y=v=>h-bottom-v/max*(h-top-bottom);
    $('chart-day').value=state.day;$('chart-day-label').textContent=state.day+'.';
    ['x1','x2'].forEach(attr=>$('chart-guide').setAttribute(attr,x));
    [['chart-now-dot',a[i]],['chart-prev-dot',b[i]]].forEach(([id,value])=>{const dot=$(id);dot.style.display=value===undefined?'none':'';dot.setAttribute('cx',x);if(value!==undefined)dot.setAttribute('cy',y(value));});
    const detail=$('chart-detail');detail.setAttribute('aria-live',announce?'polite':'off');
    detail.innerHTML='<span><i class="legend-line"></i>'+dateFor(p.start,i)+' <strong>'+(a[i]===undefined?'–':fmt(a[i],isRevenue?'money':'int'))+'</strong></span><span><i class="legend-line previous"></i>'+(i<b.length?dateFor(p.prevStart,i):'Kein 31. Tag im September')+' <strong>'+(b[i]===undefined?'–':fmt(b[i],isRevenue?'money':'int'))+'</strong></span>';
  }
  function setPressed(key,value) {document.querySelectorAll('[data-'+key+']').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset[key]===value)));}
  function renderPeriod() {
    const p=periods[state.period];
    $('period-current').textContent=p.current;$('period-previous').textContent='im Vergleich zu '+p.previous;
    document.querySelectorAll('[data-period-label]').forEach(el=>el.textContent=p.short);
    document.querySelectorAll('[data-report-period]').forEach(el=>el.textContent=p.current);
    setPressed('period',state.period);renderStats();renderManagement();renderPaid();renderSocial();
  }
  function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch(_){}}
  try{const saved=JSON.parse(localStorage.getItem(storageKey)||'null');if(saved&&typeof saved==='object'){['period','trend','channel','efficiency','social'].forEach(key=>{const valid={period:['month','week'],trend:['revenue','leads'],channel:channelKeys,efficiency:['roas','cpl'],social:['impressions','leads']};if(valid[key].includes(saved[key]))state[key]=saved[key];});}}catch(_){}
  function showView(){const slug=location.hash.slice(1),selected=Object.hasOwn(names,slug)?slug:'management';document.querySelectorAll('[data-view]').forEach(panel=>panel.hidden=panel.dataset.view!==selected);document.querySelectorAll('[data-view-link]').forEach(link=>{if(link.dataset.viewLink===selected)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});$('period-controls').hidden=selected==='b2b-funnel';$('cohort-context').hidden=selected!=='b2b-funnel';document.title=names[selected]+' | Pulse Marketing-Dashboards';closeHelp(false);if(selected==='management')requestAnimationFrame(renderChart);}
  document.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.period){state.period=button.dataset.period;state.day=1;closeHelp(false);renderPeriod();save();}if(button.dataset.trend){state.trend=button.dataset.trend;renderChart();save();}if(button.dataset.channel){state.channel=button.dataset.channel;renderPaid();save();}if(button.dataset.efficiency){state.efficiency=button.dataset.efficiency;renderPaid();save();}if(button.dataset.social){state.social=button.dataset.social;renderSocial();save();}});
  $('chart-day').addEventListener('input',event=>{state.day=Number(event.target.value);updateChartDay(true);});
  let helpAnchor=null,pinned=false,helpTimer,suppressHelpFocus=false;
  const popover=$('kpi-help');
  function positionHelp(){if(!helpAnchor||popover.hidden)return;const anchor=helpAnchor.getBoundingClientRect(),width=popover.offsetWidth,height=popover.offsetHeight;const left=Math.max(10,Math.min(window.innerWidth-width-10,anchor.left+anchor.width/2-width/2));let top=anchor.bottom+9;if(top+height>window.innerHeight-10)top=Math.max(10,anchor.top-height-9);popover.style.left=left+'px';popover.style.top=top+'px';}
  function openHelp(button,pin=false){clearTimeout(helpTimer);const entry=help[button.dataset.help];if(!entry)return;if(helpAnchor&&helpAnchor!==button)helpAnchor.setAttribute('aria-expanded','false');helpAnchor=button;pinned=pin;button.setAttribute('aria-expanded','true');$('help-title').textContent=entry[0];$('help-meaning').textContent=entry[1];$('help-formula').textContent=entry[2];$('help-reading').textContent=entry[3];popover.hidden=false;positionHelp();}
  function closeHelp(returnFocus=false){clearTimeout(helpTimer);const previous=helpAnchor;if(previous)previous.setAttribute('aria-expanded','false');popover.hidden=true;helpAnchor=null;pinned=false;if(returnFocus&&previous){suppressHelpFocus=true;previous.focus();queueMicrotask(()=>{suppressHelpFocus=false;});}}
  document.addEventListener('pointerover',event=>{const button=event.target.closest('[data-help]');if(button&&event.pointerType!=='touch'&&!pinned)openHelp(button);});
  document.addEventListener('pointerout',event=>{const button=event.target.closest('[data-help]');if(button===helpAnchor&&!pinned&&!popover.contains(event.relatedTarget))helpTimer=setTimeout(()=>closeHelp(false),180);});
  document.addEventListener('focusin',event=>{const button=event.target.closest('[data-help]');if(button&&!pinned&&!suppressHelpFocus)openHelp(button);});
  document.addEventListener('focusout',event=>{if(!pinned&&event.target===helpAnchor&&!popover.contains(event.relatedTarget))helpTimer=setTimeout(()=>closeHelp(false),150);});
  document.addEventListener('click',event=>{const button=event.target.closest('[data-help]');if(button){const wasPinned=helpAnchor===button&&pinned;if(wasPinned)closeHelp(false);else openHelp(button,true);}else if(!popover.contains(event.target))closeHelp(false);});
  popover.addEventListener('pointerenter',()=>clearTimeout(helpTimer));popover.addEventListener('pointerleave',()=>{if(!pinned)helpTimer=setTimeout(()=>closeHelp(false),150);});
  $('help-close').addEventListener('click',()=>closeHelp(true));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!popover.hidden){event.preventDefault();closeHelp(pinned);}});
  window.addEventListener('scroll',()=>{if(!popover.hidden)positionHelp();},true);
  window.addEventListener('resize',positionHelp);
  window.addEventListener('hashchange',showView);
  let resizeTimer;new ResizeObserver(()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{if(!$('view-management').hidden)renderChart();},100);}).observe($('management-chart'));
  let shareTimer;
  $('share-view').addEventListener('click',async()=>{const address=new URL(location.href);if(!Object.hasOwn(names,address.hash.slice(1)))address.hash='management';try{await navigator.clipboard.writeText(address.href);$('share-status').textContent='Link zur Ansicht kopiert';}catch(_){const field=$('share-address');field.value=address.href;field.hidden=false;field.focus();field.select();$('share-status').textContent='Link auswählen und kopieren';}clearTimeout(shareTimer);shareTimer=setTimeout(()=>$('share-status').textContent='',4000);});
  renderFunnel();renderPeriod();showView();
})();
