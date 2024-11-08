`use strict`



export function createMarkup(array) {
    return array.map(({ webformatURL: smallPic, largeImageURL: largePic, tags: alt, likes = 0, views = 0, comments = "", downloads = 0 }) => {
        return `
            <div class="galleries">
                <div class="loader" style="display: block;"></div> 
                <a href="${largePic}">
                    <img src="${smallPic}" alt="${alt}" />
                </a>
                <div class="content">
                    <div><p>Likes</p><span>${likes}</span></div>
                    <div><p>Views</p><span>${views}</span></div>
                    <div><p>Comments</p><span>${comments}</span></div>
                    <div><p>Downloads</p><span>${downloads}</span></div>
                </div>
            </div>`;
    }).join("");
}

export function setupImageLoadHandlers(container) {
    const images = container.querySelectorAll('.galleries img');
    images.forEach((img) => {
        const loader = img.parentElement.previousElementSibling; // Получаем loader
        img.onload = () => {
            loader.style.display = 'none'; // Скрываем индикатор загрузки при успешной загрузке
        };
        img.onerror = () => {
            loader.style.display = 'none'; // Скрываем индикатор загрузки при ошибке загрузки
        };
    });
}
