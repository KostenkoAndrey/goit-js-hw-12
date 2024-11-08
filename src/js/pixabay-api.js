`use strict`
import axios from "axios";

const API_KEY = "46815109-801c3b1dec2424a02adace61a";
const BASE_URL = "https://pixabay.com/api/";
// axios.defaults.headers.common["header-name"] = API_KEY;
export let per_page = 15;
export async function fetchData(textRow, page = 1) {

const data = await axios.get(BASE_URL, {
    params: {
        key: API_KEY,
        q: textRow,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page,
    }});

    return data;
}