//All functions for requests (zaqvki);


import { notify } from "../notify.js";
import { getUserData,setUserData,clearUserData } from "../util.js";

const hostName = 'http://localhost:3030';
async function request (url, options) {

    try{
    const responce = await fetch(hostName + url, options);

    if(responce.ok == false) {
       const error = await responce.json();
       throw new Error(error.message);
    }
    /*if (responce.status == 204) {
        return responce;
    }else{
        return responce.json();
    }*/
    try{
        return await responce.json();
    }catch(err){
        return responce;
    }
}catch(err) {
    //alert(err.message);
    notify(err.message)
    throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    if(data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    }

    const userData = getUserData();
    if(userData) {
        options.headers['X-Authorization'] = userData.token;
    }
    return options;
}

export async function get (url) {
 return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}
export async function put(url, data) {
    return request(url, createOptions('put', data));
}
export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(email, password) {
    const result = await post('/users/login', {email,password} );

    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        gender: result.gender,
        token: result.accessToken
    };
    setUserData(userData);

    return result;
}

export async function register(username,email, password, gender) {
    const result = await post('/users/register', {username,email, password, gender} );

    const userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        gender: result.gender,
        token: result.accessToken
    };
    setUserData(userData);

    return result;
}

export async function logout() {
    await get('/users/logout');
    clearUserData();
}