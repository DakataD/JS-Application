import { html,render } from './node_modules/lit-html/lit-html.js';

const root = document.querySelector('#root');
let form = document.querySelector('form');
form.addEventListener('submit',onSubmit);

function onSubmit(event) {
    event.preventDefault();
   const towns= document.getElementById('towns').value.split(',').map(t => t.trim());
  const result =listTemplate(towns);
  render(result,root)
};

const listTemplate = (towns) => html`
<ul>
    ${towns.map(town => html`<li>${town}</li>`)}
</ul>
`;

