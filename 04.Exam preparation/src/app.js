import {page, render} from "./lib.js"
import { getUserData } from "./util.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import {logout} from "./api/data.js"
import { registerPage } from "./views/register.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";
import { detailsPage } from "./views/details.js";
import { catalogPage } from "./views/catalog.js";


const root = document.getElementById("main-content");
document.getElementById('logoutBtn').addEventListener('click', onLogout)


page(decorateContext);
page('/', homePage)
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/catalog', catalogPage);


page.start();
updateUserNav();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNav = updateUserNav;

    next();
}



 function updateUserNav() {
    const userData = getUserData();

    document.getElementById('catalog').style.display = 'block';
    document.getElementById('search').style.display = 'block';

    
    if(userData) {
        document.getElementById('create').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        
        
    }else{
        document.getElementById('create').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'block';

    }
}




function onLogout() {
    logout();
     updateUserNav();
     page.redirect('/')
 }