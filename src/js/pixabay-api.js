`use strict`

const API_KEY = "46815109-801c3b1dec2424a02adace61a";
const BASE_URL = "https://pixabay.com/api/";
export function fetchData(textRow) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: textRow,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });

    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}