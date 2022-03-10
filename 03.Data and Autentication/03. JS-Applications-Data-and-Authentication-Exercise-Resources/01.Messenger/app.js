
    let sendBtn = document.getElementById('submit');
    sendBtn.addEventListener('click', createMessage);
    let refreshBtn = document.getElementById('refresh');
    refreshBtn.addEventListener('click', getAllMessages);

    async function getAllMessages(){
        try{
            let url = 'http://localhost:3030/jsonstore/messenger';

            let getMessageResult = await fetch(url);
            let messages = await getMessageResult.json();
            console.log(messages);
    
            let textArea = document.getElementById('messages')
    
            let messagesStr = Object.values(messages)
            .map(m => `${m.author}: ${m.content}`).join('\n');
            textArea.value = messagesStr;
        }catch(err){
            console.log(err)
        }
        }
       

       async function createMessage(){
           try{
            let authorInput = document.getElementById('author');
        let contendInput = document.getElementById('content');

        let url = 'http://localhost:3030/jsonstore/messenger';

        let newMessage = {
            author: authorInput.value,
            content: contendInput.value
        };
            let createResponse = await fetch(url,
                {
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    method: 'Post',
                    body:JSON.stringify(newMessage)
                });
                let createResult = await createResponse.json();


            }catch(err){       
                console.log(err);
            }
           }
        
