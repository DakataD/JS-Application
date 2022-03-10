function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', getAllPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost);
        
}

attachEvents();

async function displayPost(){
    let selectId = document.getElementById('posts').value;

    let titleElement =  document.getElementById('post-title');
    let bodyElement =  document.getElementById('post-body');
    let ul = document.getElementById('post-comments');

    titleElement.textContent = 'Loading...';
    bodyElement.textContent ='';
    ul.replaceChildren();


   let[post, comments] = await Promise.all([
        getPostId(selectId),
        getCommants(selectId)
    ]);

    titleElement.textContent = post.title;
    bodyElement.textContent = post.body;

   comments.forEach(c =>{
       let li = document.createElement('li');
       li.textContent = c.text;
       ul.appendChild(li);
   })
}

async function getAllPosts(){
    let url = `http://localhost:3030/jsonstore/blog/posts`;

    let res = await fetch(url);
    let data = await res.json();

    let select = document.getElementById('posts');
    Object.values(data).forEach(p =>{
        let optionElement = document.createElement('option');
        optionElement.textContent = p.title;
        optionElement.value = p.id;

        select.appendChild(optionElement);
    }) 
}

async function getPostId(postId){
    let url = `http://localhost:3030/jsonstore/blog/posts/`+ postId;

    let res = await fetch(url);
    let data = await res.json();

    return data;
}

async function getCommants(postId){
    let url = `http://localhost:3030/jsonstore/blog/comments`;

    let res = await fetch(url);
    let data = await res.json();

    let comments = Object.values(data).filter(c => c.postId == postId);
    return comments;
}