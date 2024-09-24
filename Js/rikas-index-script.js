function openchat(){
    console.log("clicked")
    document.getElementById("rikas-chat-intrfc").style.display='flex'
}
function closechat(){

}

function callSendMessage(event){
    if(event.key==='Enter'){
        sendMessage();
    }
}

function sendMessage(){
    
    var text = document.getElementById("rikas-chat-interface-input").value
    if(text!=""){
    console.log(text);
    document.getElementById("rikas-chat-interface-input").value = ""
    var divChatEle = document.createElement("div")
    divChatEle.classList.add("rikas-chat-visitor-interface")
    divChatEle.innerText=text
    document.getElementById("rikas-chat-box-div").appendChild(divChatEle);
    }
}