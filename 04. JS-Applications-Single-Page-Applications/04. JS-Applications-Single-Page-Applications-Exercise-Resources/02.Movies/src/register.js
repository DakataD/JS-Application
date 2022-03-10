import { showView } from "./dom.js";

let section = document.getElementById('form-sign-up');
section.remove();

export function showRegister() {
    showView(section);
}