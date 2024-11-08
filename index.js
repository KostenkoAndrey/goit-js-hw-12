import{i as l,S as p}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();function f(n){return n.map(({webformatURL:o,largeImageURL:t,tags:a,likes:e=0,views:r=0,comments:s="",downloads:u=0})=>`
            <div class="galleries">
                <div class="loader" style="display: block;"></div> 
                <a href="${t}">
                    <img src="${o}" alt="${a}" />
                </a>
                <div class="content">
                    <div><p>Likes</p><span>${e}</span></div>
                    <div><p>Views</p><span>${r}</span></div>
                    <div><p>Comments</p><span>${s}</span></div>
                    <div><p>Downloads</p><span>${u}</span></div>
                </div>
            </div>`).join("")}function m(n){n.querySelectorAll(".galleries img").forEach(t=>{const a=t.parentElement.previousElementSibling;t.onload=()=>{a.style.display="none"},t.onerror=()=>{a.style.display="none"}})}const h="46815109-801c3b1dec2424a02adace61a",g="https://pixabay.com/api/";function y(n){const o=new URLSearchParams({key:h,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${g}?${o}`).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()})}const d=document.querySelector(".form"),c=document.querySelector(".gallery");let i=null;d.addEventListener("submit",v);function v(n){n.preventDefault();const{textRow:o}=n.target.elements;if(o.value.trim()===""){l.warning({title:"Caution",message:"The search field cannot be empty.",color:"red"});return}y(o.value).then(t=>{t.hits.length===0?l.warning({title:"Caution",message:'"Sorry, there are no images matching your search query. Please try again!"',color:"yellow"}):(c.innerHTML=f(t.hits),m(c),i?i.refresh():i=new p(".gallery .galleries a",{captionsData:"alt",captionDelay:250}))}).catch(t=>{console.error("Fetch error:",t)}),d.reset()}
//# sourceMappingURL=index.js.map
