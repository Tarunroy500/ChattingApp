var socket = io();
var name;
// do{
//     name = prompt('please enter your name: ')
// }while(!name);
var txt= document.querySelector("#name")
document.querySelector(".button-3").addEventListener("click",()=>{
    name=txt.value;
    document.querySelector(".fixed").style.display="none";
    var usernameDiv = document.querySelector(".card-header");
    usernameDiv.innerHTML=`<h5 class="mb-0">${name}</h5>`;
})
let textarea = document.querySelector("#textarea")
let messageArea = document.querySelector(".messageArea")
textarea.addEventListener("keyup",function(e){
    if(e.key === "Enter" && textarea.value.trim() != ""){
        sendMsg(textarea.value.trim())
        textarea.value=""
    }
    
})

function sendMsg(msg){
    let data = {
        user:name,
        message:msg,
    }
    appendMsg(data,'outgoing');
    socket.emit('message',data)
}

function appendMsg(data,type){
    var Div = document.createElement('div')
    let className=type;
    Div.classList.add(className,"message")
    if(className === "incoming"){
        Div.innerHTML=`
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
        alt="avatar 1" style="width: 45px; height: 100%;">
        <p class = "small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${data.message}</p>
        `;
    }else{
        Div.innerHTML=`<p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${data.message}</p>`;
    }
    messageArea.appendChild(Div);
    
}





//recieve
socket.on("message",(data)=>{
    appendMsg(data,"incoming");
})