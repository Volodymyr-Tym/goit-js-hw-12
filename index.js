import{a as g,S as b,i as o}from"./assets/vendor-CRwkH7JT.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const f=t=>`
        <li class="gallery-item">
          <a class="item-link" href="${t.largeImageURL}">
            <img class="item-img"
            src="${t.webformatURL}"
            alt="${t.tags}"/>
          </a>
    
          <ul class="item-info-list">
            <li class="item-info">
              Likes <span class="quantity">${t.likes}</span> 
            </li>
    
            <li class="item-info">
              Views <span class="quantity">${t.views}</span>
            </li>
    
            <li class="item-info">
              Comments <span class="quantity">${t.comments}</span>
            </li>
    
            <li class="item-info">
              Downloads <span class="quantity">${t.downloads}</span>
            </li>
          </ul>
        </li>
      `;g.defaults.baseURL="https://pixabay.com";const y=(t,s)=>{const a={params:{key:"45502477-f90d28a95f79ee2acbc927104",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}};return g.get("/api/",a)},h=document.querySelector("form.js-form"),c=document.querySelector("ul.js-gallery"),l=document.querySelector("span.js-loader"),u=document.querySelector(".load-more-js");let n=1,d=0,m="",L=0;const S=new b("ul.gallery a",{captionsData:"alt",captionDelay:250}),v=async t=>{try{if(t.preventDefault(),c.innerHTML="",u.classList.add("is-hidden"),l.classList.remove("is-hidden"),m=h.search.value.trim(),n=1,m===""){o.info({message:"Searching field is empty",messageSize:"16",position:"topRight"}),l.classList.add("is-hidden"),t.target.reset();return}const{data:s}=await y(m,n);if(d=Math.ceil(s.totalHits/15),s.hits.length===0){o.error({title:"Sorry,",message:"there are no images matching your search query. Please try again!",messageSize:"16",position:"topRight"}),t.target.reset();return}const a=s.hits.map(e=>f(e)).join("");c.insertAdjacentHTML("beforeend",a),L=c.querySelector("li").getBoundingClientRect().height,console.log(d),d>1&&u.classList.remove("is-hidden"),S.refresh(),t.target.reset()}catch({response:s}){o.error({title:"Ooops",titleSize:"18",message:s.data,messageSize:"18",position:"center",timeout:!1,progressBar:!1,overlay:!0,overlayColor:"rgba(0, 0, 0, 0.5)"})}finally{l.classList.add("is-hidden")}},q=async t=>{l.classList.remove("is-hidden");try{n++;const{data:s}=await y(m,n),a=s.hits.map(i=>f(i)).join("");if(c.insertAdjacentHTML("beforeend",a),S.refresh(),scrollBy({top:L*2,behavior:"smooth"}),n===d){u.classList.add("is-hidden"),o.info({message:"We're sorry, but you've reached the end of search results.",messageSize:"16",position:"topRight",timeout:!1});return}}catch({response:s}){o.error({title:"Ooops",titleSize:"18",message:s.data,messageSize:"18",position:"center",timeout:!1,progressBar:!1,overlay:!0,overlayColor:"rgba(0, 0, 0, 0.5)"})}finally{l.classList.add("is-hidden")}};h.addEventListener("submit",v);u.addEventListener("click",q);
//# sourceMappingURL=index.js.map
