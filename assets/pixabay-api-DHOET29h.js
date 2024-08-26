import{a as l}from"./vendor-CRwkH7JT.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const c=s=>`
        <li class="gallery-item">
          <a class="item-link" href="${s.largeImageURL}">
            <img class="item-img"
            src="${s.webformatURL}"
            alt="${s.tags}"/>
          </a>
    
          <ul class="item-info-list">
            <li class="item-info">
              Likes <span class="quantity">${s.likes}</span> 
            </li>
    
            <li class="item-info">
              Views <span class="quantity">${s.views}</span>
            </li>
    
            <li class="item-info">
              Comments <span class="quantity">${s.comments}</span>
            </li>
    
            <li class="item-info">
              Downloads <span class="quantity">${s.downloads}</span>
            </li>
          </ul>
        </li>
      `;l.defaults.baseURL="https://pixabay.com";const p=async(s,i)=>{const r={params:{key:"45502477-f90d28a95f79ee2acbc927104",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:15}};return l.get("/api/",r)};export{c,p as f};
//# sourceMappingURL=pixabay-api-DHOET29h.js.map
