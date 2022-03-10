import { showView } from "./dom.js";

let section = document.getElementById('edit-movie');
section.remove();

export function showEdit() {
    showView(section);
}