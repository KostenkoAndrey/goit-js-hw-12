'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createMarkup, setupImageLoadHandlers } from "./js/render-functions";
import { fetchData, per_page } from "./js/pixabay-api";

const form = document.querySelector(".form");
const container = document.querySelector(".gallery");
const loadMore = document.querySelector(".btn-add-more")
let lightbox = null; 
let page = 1;

form.addEventListener("submit", handleSearch);

async function handleSearch(event) {
    event.preventDefault();
    const { textRow } = event.target.elements;
    localStorage.setItem("searchItem", JSON.stringify(textRow.value));

    if (textRow.value.trim() === "") {
        iziToast.warning({
            title: 'Caution',
            message: "The search field cannot be empty.",
            color: "red",
            position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            maxWidth: "300",
        });
        return;
    }

try {
    const { data } = await fetchData(textRow.value);
    
    if (!data.hits.length) {
    iziToast.warning({
    title: 'Caution',
    message: '"Sorry, there are no images matching your search query. Please try again!"',
    color: "yellow",
    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    maxWidth: "300",
});
} else {
    container.innerHTML = createMarkup(data.hits);
    loadMore.classList.add("js-vissible");
    setupImageLoadHandlers(container);

    if (lightbox) {
        lightbox.refresh();
    } else {
    lightbox = new SimpleLightbox('.gallery .galleries a', {
    captionsData: 'alt',
    captionDelay: 250,
});
}}
} catch (error) {
    console.log(error.message);
}
form.reset();
}


loadMore.addEventListener("click",  () => {
loadMore.disabled = true;
const item = JSON.parse(localStorage.getItem("searchItem"));
page += 1;

fetchData(item, page)
    .then(item => {
        const totalHits = item.data.totalHits;
        const total = Math.ceil(totalHits / per_page);
        
        if (page >= total){
            loadMore.classList.replace("js-vissible", "js-hidden");
            iziToast.warning({
                title: 'Caution',
                message: "We're sorry, but you've reached the end of search results.",
                color: "yellow",
                position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
                maxWidth: "300",
            });
        }
        container.insertAdjacentHTML("beforeend", createMarkup(item.data.hits));
        const card = document.querySelector(".galleries");
        const cardHeight = card.getBoundingClientRect().height; 
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: "smooth",
        });
        lightbox.refresh();
        return  setupImageLoadHandlers(container)})
    .catch(error => console.log(error.message))
    .finally(() => loadMore.disabled = false);
});

