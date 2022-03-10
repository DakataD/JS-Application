
 import { showHome } from "./home.js";
 import {showLogin} from "./login.js";
 import {showRegister} from "./register.js"


 let views = {
     'homeLink' : showHome,
     'loginBtn' : showLogin,
     'registerLink' : showRegister,
 }
 let nav = document.querySelector('nav');
 document.getElementById('logoutBtn').addEventListener('click', onLogout);
 nav.addEventListener('click', (event) => {
     if(event.target.tagName == 'A'){
        let view = views[event.target.id];
        if(typeof view == 'function') {
            event.preventDefault();
            view();
        }
     }
 } );



 updateNav();
 showHome();

 export function updateNav() {
     let userData = JSON.parse(sessionStorage.getItem('userData'));
     if(userData != null) {
         nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');

     }else{
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
     }
 }

 async function onLogout(event) {
     event.preventDefault();
     event.stopImmediatePropagation();
     
     let {token} = JSON.parse(sessionStorage.getItem('userData'));

     await fetch('http://localhost:3030/users/logout', {
         headers: {
             'X-Authorization': token
         }
     });

     sessionStorage.removeItem('userData');
     updateNav();
     showLogin();

 }
