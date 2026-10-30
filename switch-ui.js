/* The Switch | Next Level · accessible mobile menu and local browser audio */
(()=>{'use strict';
const de=document.documentElement.lang==='de';const primary=document.querySelector('header nav.switch-primary');
if(primary){const b=document.createElement('button');b.className='switch-menu-toggle';b.type='button';b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','switch-primary-menu');b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>'+(de?'Menü':'Menu')+'</span>';primary.id='switch-primary-menu';primary.parentNode.insertBefore(b,primary);b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));primary.classList.toggle('is-open',open);});primary.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{primary.classList.remove('is-open');b.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){primary.classList.remove('is-open');b.setAttribute('aria-expanded','false');}});}
const root=document.getElementById('guided-orientation');if(!root)return;
const synth=('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window)?window.speechSynthesis:null;
const prompts=de?['Worum geht es dir konkret?','Was möchtest du besser verstehen?','Welche Perspektive fehlt dir noch?','Was könnte dein nächster Schritt sein?']:['What matters to you?','What would you like to understand better?','Whose perspective might be missing?','What could your next step be?'];
const output=root.querySelector('#switch-audio-status');const fields=[...root.querySelectorAll('textarea')];
const stop=()=>{if(synth)synth.cancel()};
const speak=i=>{if(!synth){output.textContent=de?'Vorlesen wird von diesem Gerät oder Browser nicht unterstützt.':'Speech playback is unavailable on this device or browser.';return;}stop();const u=new SpeechSynthesisUtterance(prompts[i]);u.lang=de?'de-DE':'en-GB';u.rate=.94;u.onerror=()=>{output.textContent=de?'Vorlesen konnte nicht gestartet werden.':'Unable to start speech playback.'};output.textContent=de?'Frage wird vorgelesen.':'Reading the question.';synth.speak(u)};
root.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>speak(Number(b.dataset.prompt))));
root.querySelector('#switch-stop-audio').addEventListener('click',()=>{stop();output.textContent=''});
root.querySelector('#switch-clear-reflection').addEventListener('click',()=>{stop();fields.forEach(f=>f.value='');output.textContent='';fields[0]?.focus()});
window.addEventListener('pagehide',stop);
})();

/* v1.1 progressive disclosure, preserving browser-local responses */
(()=>{'use strict';
 const region=document.getElementById('guided-orientation');if(!region)return;
 const cards=[...region.querySelectorAll('.switch-reflect-card')];if(cards.length!==4)return;
 const de=document.documentElement.lang==='de';let active=0;
 const grid=region.querySelector('.switch-reflect-grid');
 const progress=document.createElement('p');progress.className='switch-reflect-progress';progress.setAttribute('role','status');
 grid.before(progress);
 const nav=document.createElement('div');nav.className='switch-reflect-nav';
 const back=document.createElement('button');back.type='button';back.textContent=de?'Zurück':'Back';
 const next=document.createElement('button');next.type='button';
 nav.append(back,next);grid.after(nav);
 const draw=()=>{cards.forEach((c,i)=>{c.hidden=i!==active});progress.textContent=(de?'Frage ':'Question ')+(active+1)+(de?' von ':' of ')+cards.length;back.disabled=active===0;next.textContent=active===cards.length-1?(de?'Zur Auswertung':'View next steps'):(de?'Weiter':'Next');};
 back.addEventListener('click',()=>{if(active>0){active--;draw();cards[active].querySelector('textarea')?.focus()}});
 next.addEventListener('click',()=>{if(active<cards.length-1){active++;draw();cards[active].querySelector('textarea')?.focus()}else{(region.querySelector('.switch-controls')||region.querySelector('#switch-audio-status'))?.scrollIntoView({block:'nearest'});}});
 draw();
 document.querySelectorAll('.compare-table').forEach(table=>{const heads=[...table.querySelectorAll('thead th')].map(th=>th.textContent.trim());table.querySelectorAll('tbody tr').forEach(row=>[...row.children].forEach((cell,i)=>{if(heads[i])cell.setAttribute('data-label',heads[i])}));});
})();
