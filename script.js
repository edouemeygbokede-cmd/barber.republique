/* Retour en haut uniquement dans l'aperçu (iframe) : sur le vrai site, aucun script ne touche à la navigation ni aux liens d'appel */
(function(){var inFrame=false;try{inFrame=window.self!==window.top}catch(e){inFrame=true}if(!inFrame)return;
function toTop(){if(!location.hash)window.scrollTo(0,0)}toTop();window.addEventListener('load',toTop);})();
const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');menu?.addEventListener('click',()=>{let o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(o));menu.textContent=o?'✕':'☰'});const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));document.querySelectorAll('.contact-form form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const d=new FormData(f);const note=document.querySelector('#form-note');
const msg=`Bonjour Barber République, je suis ${d.get('nom')} (${d.get('telephone')}${d.get('email')?', '+d.get('email'):''}). Prestation : ${d.get('service')}. ${d.get('message')}`;
const mobile=window.matchMedia('(pointer:coarse)').matches;
if(mobile){window.location.href='sms:+33626668169?&body='+encodeURIComponent(msg);note.textContent='Votre application SMS va s’ouvrir avec le message prêt : il ne reste plus qu’à appuyer sur Envoyer.';}
else{try{navigator.clipboard&&navigator.clipboard.writeText(msg).catch(()=>{})}catch(err){}note.innerHTML='Message copié. Envoyez-le par SMS au <a href="tel:+33626668169">06 26 66 81 69</a>, ou appelez directement le salon.';}
}));

/* Verrou anti double-tap sur les liens d'appel (1,5 s) */
let telLock = false;
document.addEventListener('click', (e) => {
  const telLink = e.target.closest('a[href^="tel:"]');
  if (!telLink) return;
  if (telLock) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return;
  }
  telLock = true;
  setTimeout(() => { telLock = false; }, 1500);
}, true);
