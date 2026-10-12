(function(){
var b=document.body,sc=document.getElementById('scrim'),veil=document.getElementById('veil');
requestAnimationFrame(function(){veil.classList.remove('go')});
/* scrim: first viewport stays clear, deeper content gets a darker backdrop for readability */
function sp(){var p=Math.min(1,Math.max(0,(scrollY-innerHeight*.15)/(innerHeight*.7)));sc.style.opacity=(p*.66).toFixed(3)}
addEventListener('scroll',sp,{passive:true});sp();
/* page transitions */
document.addEventListener('click',function(e){var a=e.target.closest('a[href]');if(!a||a.target||e.metaKey||e.ctrlKey)return;var u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname)return;e.preventDefault();veil.classList.add('go');b.classList.add('leaving');setTimeout(function(){location.href=a.href},680)});
addEventListener('pageshow',function(e){if(e.persisted){veil.classList.remove('go');b.classList.remove('leaving')}});
/* mobile menu */
var bg=document.querySelector('.burger'),ov=document.querySelector('.overlay'),mm=document.getElementById('mmenu');
function menu(o){bg.setAttribute('aria-expanded',o);ov.hidden=!o;mm.hidden=!o;b.classList.toggle('menu-open',o)}
bg.addEventListener('click',function(){menu(bg.getAttribute('aria-expanded')!=='true')});
ov.addEventListener('click',function(){menu(false)});
mm.addEventListener('click',function(e){if(e.target.closest('a'))menu(false)});
addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
addEventListener('resize',function(){if(innerWidth>1024)menu(false)});
/* scroll reveal, staggered inside grids */
document.querySelectorAll('.grid,.circ').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){if(c.classList.contains('rv'))c.style.transitionDelay=(i*90)+'ms'})});
var rio=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){var t=x.target;t.classList.add('in');rio.unobserve(t);setTimeout(function(){t.style.transitionDelay=''},1500)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){rio.observe(el)});
/* stat count-up */
var vals=document.querySelectorAll('.stat-value');
if(vals.length){var sio=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;sio.disconnect();vals.forEach(function(el,i){run(el,i)})})},{threshold:.25});sio.observe(document.querySelector('.stats'))}
function run(el,i){var t=parseFloat(el.dataset.target),d=+el.dataset.dec||0,suf=el.dataset.suffix||'',dur=1500+i*80,st=null;
if(matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=t.toFixed(d)+suf;return}
setTimeout(function(){requestAnimationFrame(function f(ts){if(!st)st=ts;var p=Math.min(1,(ts-st)/dur),e=1-Math.pow(1-p,3);el.textContent=(t*e).toFixed(d)+suf;if(p<1)requestAnimationFrame(f)})},480+i*90)}
/* hero recedes, sheet and sections rise from behind */
var hero=document.querySelector('.hero'),hd=document.querySelector('.header'),secs=document.querySelectorAll('.sheet section'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches,tk=false;
function frame(){tk=false;hd.classList.toggle('scrolled',scrollY>40);if(rm)return;var p=Math.min(1,scrollY/(innerHeight*.8));hero.style.transform='translateY('+(-p*60).toFixed(1)+'px) scale('+(1-p*.1).toFixed(4)+')';hero.style.opacity=Math.max(0,1-p*1.15).toFixed(3);hero.style.filter=p>.01?'blur('+(p*10).toFixed(1)+'px)':'none';
var vh=innerHeight;secs.forEach(function(s){var r=s.getBoundingClientRect();if(r.bottom<-200)return;var q=Math.min(1,Math.max(0,(vh-r.top)/(vh*.5))),e=1-Math.pow(1-q,3);s.style.transform=e>=.999?'none':'translateY('+((1-e)*70).toFixed(1)+'px) scale('+(.94+.06*e).toFixed(4)+')';s.style.opacity=(.2+.8*e).toFixed(3)})}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(frame)}},{passive:true});addEventListener('resize',frame);frame();
/* sliding nav highlight */
var np=document.querySelector('.nav-pill');
if(np){var gl=document.createElement('span');gl.className='nav-glow';np.insertBefore(gl,np.firstChild);var act=np.querySelector('a.active');
function mv(a){if(!a){gl.style.opacity=0;return}gl.style.opacity=1;gl.style.width=a.offsetWidth+'px';gl.style.transform='translateX('+a.offsetLeft+'px)'}
np.querySelectorAll('a:not(.nc)').forEach(function(a){a.addEventListener('mouseenter',function(){mv(a)})});np.addEventListener('mouseleave',function(){mv(act)});
addEventListener('load',function(){mv(act)});addEventListener('resize',function(){mv(act)});mv(act)}
})();
