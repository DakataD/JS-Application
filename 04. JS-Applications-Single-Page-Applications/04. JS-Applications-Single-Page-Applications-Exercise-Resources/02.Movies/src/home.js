import { e, showView } from "./dom.js";
import {showCreate} from "./create.js";
import {showDetails} from "./details.js";

let moviesCashe = null;
let lastLoaded = null;
let maxAge = 60000;


let section = document.getElementById('home-page');
let catalog = section.querySelector('.card-deck.d-flex.justify-content-center');
section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate();

});
catalog.addEventListener('click', (event) =>{
    event.preventDefault();
    
    let target = event.target;
    if(target.tagName == 'BUTTON') {
        target = target.parentElement;
    }
    if(target.tagName == 'A'){
        let id = target.dataset.id;
        showDetails(id);
    }
})
section.remove();

export function showHome() {
    showView(section);

    getMovies();
}

 async function getMovies() {
    catalog.replaceChildren(e('p', {}, 'Loading...'));

    let now = Date.now();

    if(moviesCashe == null || (now - lastLoaded) > maxAge){
        lastLoaded = now;

     let res = await fetch('http://localhost:3030/data/movies');
     let data = await res.json();
     moviesCashe = data;
    }
    catalog.replaceChildren(...moviesCashe.map(createMovieCard));

 }
function createMovieCard(movie) {
    let element = e('div', {className: 'card mb-4'});
    element.innerHTML = `<img class="card-img-top" src="${movie.img}"
    alt="Card image cap" width="400">
    <div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
    <a data-id =${movie._id}href="#">
       <button type="button" class="btn btn-info">Details</button>
    </a>
    </div>`

    return element;
}
