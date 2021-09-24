document.addEventListener("DOMContentLoaded",()=>{const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),e=(document.documentElement.style,null!=navigator.userAgent.match(/iPhone/i)),o=null!=navigator.userAgent.match(/iPad/i),n=null!=navigator.userAgent.match(/iPod/i),s=window.matchMedia("(max-width: 992px)"),i=document.querySelector(".body"),l=document.querySelector(".header"),a=document.querySelector(".burger"),c=document.querySelector(".header__nav"),d=new class{constructor(t,s){this.btn=t,this.list=s,this.opened=!1,this.isIphone=e||o||n,this.btnDisabled=!1}open(){this.disableBtn(),this.isIphone?r():i.classList.add("lock"),this.btn.classList.add("burger--active"),this.btn.setAttribute("aria-expanded",!0),this.list.classList.add("header__nav--active"),this.list.setAttribute("aria-hidden",!1)}close(){this.disableBtn(),this.isIphone?u():i.classList.remove("lock"),this.btn.classList.remove("burger--active"),this.btn.setAttribute("aria-expanded",!1),this.list.classList.remove("header__nav--active"),this.list.setAttribute("aria-hidden",!0)}toggle(){this.btn.classList.contains("burger--active")?this.close():this.open()}disableBtn(){this.btn.disabled=!0,this.list.addEventListener("transitionend",()=>{this.btn.disabled=!1})}}(a,c);let r=()=>{let t=window.scrollY;document.querySelector("html").style.scrollBehavior="auto",document.body.classList.add("ios-lock"),document.body.dataset.position=t,document.body.style.top=-t+"px"},u=()=>{let t=parseInt(document.body.dataset.position,10);document.body.style.top="auto",document.body.classList.remove("ios-lock"),window.scroll({top:t,left:0}),document.querySelector("html").removeAttribute("style"),document.body.removeAttribute("data-position")};const h=document.querySelectorAll(".animate-item");if(t)h.forEach(t=>{t.classList.add("animated")});else{const t=(t,e,o,n=0)=>{let s=t.getBoundingClientRect();t.dataset.delay&&(n=t.dataset.delay),s.top+s.height-s.height*o>0&&window.innerHeight-s.top-s.height*e>0?(t.classList.add("animated"),t.style.transitionDelay=n+"s"):t.hasAttribute("data-animation-once")||t.classList.remove("animated")};0!=h.length&&(h.forEach(e=>{t(e,.5,.5)}),document.addEventListener("scroll",()=>{h.forEach(e=>{t(e,.5,.5)})}))}const m=document.querySelectorAll(".modal-btn"),p=document.querySelectorAll(".fixed-padding"),g=document.querySelectorAll(".close-modal");let y,b,f,v=!0,L=!1;if(m.length>0)for(let t=0;t<m.length;t++){const e=m[t];e.addEventListener("click",(function(t){const o=e.dataset.path,n=document.getElementById(o);null!=n?(E(n),setTimeout(()=>{g.forEach(t=>{t.focus()})},100),t.preventDefault()):console.log("Модальное окно не существует! "+n)}))}if(g.length>0)for(let t=0;t<g.length;t++){const e=g[t];y=e,e.addEventListener("click",(function(t){w(e.closest(".modal")),t.preventDefault()}))}function E(t){if(t&&v){f=document.activeElement;const s=document.querySelector(".modal.open");s?w(s,!1):function(){const t=window.innerWidth-i.offsetWidth+"px";if(p.length>0)for(let e=0;e<p.length;e++){p[e].style.paddingRight=t}i.style.paddingRight=t,i.classList.contains("lock")?b=!1:(b=!0,e||o||n?r():i.classList.add("lock"));v=!1,setTimeout((function(){v=!0}),800)}(),t.classList.add("open"),t.addEventListener("mousedown",(function(t){!1===L?(t.target.closest(".modal__content")||w(t.target.closest(".modal")),L=!0):setTimeout(()=>{L=!1},800)}))}}function w(t,s=!0){v&&(t.classList.remove("open"),s&&setTimeout((function(){if(p.length>0)for(let t=0;t<p.length;t++)p[t].style.paddingRight="0px";i.style.paddingRight="0px",1==b&&(e||o||n?u():i.classList.remove("lock"))}),800)),setTimeout((function(){f.focus()}),800)}document.addEventListener("keydown",(function(t){if(document.querySelector(".modal.open")&&27===t.which){w(document.querySelector(".modal.open"))}})),Element.prototype.closest||(Element.prototype.closest=function(t){for(var e=this;e;){if(e.matches(t))return e;e=e.parentElement}return null}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector);l.addEventListener("click",t=>{switch(t.target){case t.target.closest(".burger"):d.toggle();break;case t.target.closest(".header__link"):s.matches&&setTimeout(()=>{d.close()},200)}})});
//# sourceMappingURL=main.js.map