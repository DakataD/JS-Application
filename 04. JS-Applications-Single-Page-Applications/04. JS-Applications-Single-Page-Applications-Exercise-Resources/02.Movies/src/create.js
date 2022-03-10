import { showView } from "./dom.js";

let section = document.getElementById('add-movie');
section.remove();

export function showCreate() {
    showView(section);
}