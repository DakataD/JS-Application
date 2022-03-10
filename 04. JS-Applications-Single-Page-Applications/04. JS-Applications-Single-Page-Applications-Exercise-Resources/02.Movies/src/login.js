import { updateNav } from "./app.js";
import { showView } from "./dom.js";
import { showHome } from "./home.js";

let section = document.getElementById('form-login');
let form = section.querySelector('form');
form.addEventListener('submit', onLogin);

section.remove();

export function showLogin() {
    showView(section);
}

async function onLogin(event) {
    event.preventDefault();

    let formData = new FormData(form);

    let email = formData.get('email').trim();
    let password = formData.get('password').trim();

    try{
        let res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email, password}) 
        });

        if (res.ok == false ){
            let error = await res.json();
            throw new Error(error.message);
        }
        let data = await res.json();
        sessionStorage.setItem('userData', JSON.stringify({
            email: data.email,
            id: data._id,
            token: data.accessToken
        }));

        form.reset();
        updateNav();
        showHome();
    }catch(err){
        alert(err.message)
    }
}