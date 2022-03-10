//make notification(bonus for current app)

const element = document.getElementById('errorBox')
const output = document.querySelector('span');

 export function notify(msg) {
    output.textContent = msg;
    element.style.display = 'block';

    setTimeout(() =>  element.style.display = 'none', 3000)


}
