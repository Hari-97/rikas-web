let chatProperty = "";
let visitorName = "";
let contactNumber = "";
let emailId="";

function openchat(){
    console.log("clicked")
    document.getElementById("rikas-chat-intrfc").style.display='flex'
    document.getElementById("rikas-metatools-div").style.display='block'
    document.getElementById("rikas-chat-interface-input").disabled=true;
    document.getElementById("rikas-chat-button").style.display='none';
    
}
function closeChat(){
    document.getElementById("rikas-chat-intrfc").style.display='none'
    document.getElementById("rikas-metatools-div").style.display='none'
    document.getElementById("rikas-chat-button").style.display='block';
}

function callSendMessage(event){
    if(event.key==='Enter'){
        sendMessage();
    }
}

function typeAnimation(){

}

function sayYes(){
    document.getElementById("rikas-chat-interface-input").value = "Yes";
    sendMessage();
    document.getElementById("rikas-chat-interface-input").disabled=false;
    document.getElementById("rikas-chat-options").style.display='none';
    //appendSpeakerMessage("May I know your name please?!");
    setTimeout(callAppendSpeakerMessage,1000);
    //chatProperty="name";
}

function callAppendSpeakerMessage(){
    if(chatProperty===""){
        appendSpeakerMessage("May I Know your name please?!");
        chatProperty="name";
    }
}

function appendSpeakerMessage(message){
    var speakerChatElement = document.createElement("div");
    speakerChatElement.classList.add("rikas-chat-interface-render");
    var founderImg = document.createElement("img")
    founderImg.classList.add("rikas-chat-image");
    founderImg.src="./resources/Founder1.jpg";
    var innerChatElement = document.createElement("div");
    innerChatElement.classList.add("rikas-chat-speaker-interface");
    var messageElement = document.createElement("div")
    messageElement.classList.add("rikas-greet-message");

    innerChatElement.appendChild(messageElement);
    speakerChatElement.appendChild(founderImg);
    speakerChatElement.appendChild(innerChatElement);
    messageElement.innerText=message;

    //console.log(speakerChatElement.innerText);
    //speakerChatElement.innerText = "May I know your name please?!";
    document.getElementById("rikas-chat-box-div").appendChild(speakerChatElement).scrollIntoView(true);
}

function appendSpeakerMessage(message){
    var speakerChatElement = document.createElement("div");
    speakerChatElement.classList.add("rikas-chat-interface-render");
    var founderImg = document.createElement("img")
    founderImg.classList.add("rikas-chat-image");
    founderImg.src="./resources/Founder1.jpg";
    var innerChatElement = document.createElement("div");
    innerChatElement.classList.add("rikas-chat-speaker-interface");
    var messageElement = document.createElement("div")
    messageElement.classList.add("rikas-greet-message");

    innerChatElement.appendChild(messageElement);
    speakerChatElement.appendChild(founderImg);
    speakerChatElement.appendChild(innerChatElement);
    messageElement.innerText=message;

    //console.log(speakerChatElement.innerText);
    //speakerChatElement.innerText = "May I know your name please?!";
    document.getElementById("rikas-chat-box-div").appendChild(speakerChatElement).scrollIntoView(true);
    




}

function sendMessage(){
    
    var text = document.getElementById("rikas-chat-interface-input").value
    if(text!=""){
    console.log(text);
    document.getElementById("rikas-chat-interface-input").value = ""
    var divChatEle = document.createElement("span")
    //divChatEle.style.display=block;
    divChatEle.classList.add("rikas-chat-visitor-interface")
    divChatEle.innerText=text
    document.getElementById("rikas-chat-box-div").appendChild(divChatEle).scrollIntoView(true);
    if(chatProperty==="name"){
        visitorName=text;
        setTimeout(()=>{appendSpeakerMessage("Hi "+visitorName+", Can you please share your contact number?!")},1000);
        chatProperty="contactNumber";
    }
    else if(chatProperty==="contactNumber"){
        if(validateContact(text)){
        contactNumber=text;
        setTimeout(()=>{appendSpeakerMessage("Kindly share your E-Mail Id to receive our offer updates")},1000);
        chatProperty="emailId";
        }
        else{
            setTimeout(()=>{appendSpeakerMessage("Contact Number Invalid! Please share us a valid Contact Number")},1000);
        }
    }
    else if(chatProperty==="emailId"){
        console.log(validateEmail(text));
        if(validateEmail(text)){
        emailId=text;
        setTimeout(()=>{appendSpeakerMessage("Thanks for reaching out to us, "+visitorName+". We will get back to you soon!")},1000);
        setTimeout(()=>{appendSpeakerMessage("Have a nice day!")},500);
        setTimeout(()=>{
        document.getElementById("rikas-chat-interface-input").disabled=true;
        document.getElementById("rikas-chat-close-btn").style.backgroundColor='red';
        document.getElementById("rikas-chat-close-btn").style.boxShadow='0 6px 22px 0 rgba(0, 0, 0, 0.4)';
        document.getElementById("rikas-chat-intrfc").style.opacity='60%';
        sendEmail();
        },2000);
        }
        else{
            setTimeout(()=>{appendSpeakerMessage("Please share us a valid Email Address...")},1000); 
        }
    }
    }
}

function validateEmail(emailId){
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(emailId);
}

function validateContact(contact){
    const mobPattern = /^[1-9]{1}[0-9]{9}$/;
    return mobPattern.test(contact);
}

function submitform(event){
    console.log("hi")
    console.log(event)
    console.log(event.data)
    return false;
}


function sendEmailOld() {

    let clientDetails = {"name":visitorName,
        "mobileNumber":contactNumber,
        "emailId":emailId
    }

    Email.send({
        Host: "smtp.gmail.com",
        Username: "harri06k@gmail.com",
        Password: "Fortune@7991",
        To: '97h.krish@gmail.com',
        From: "harri06k@gmail.com",
        Subject: "Testing sending Email using javascript",
        Body: JSON.stringify(clientDetails),
    })
        .then(function (message) {
            alert("mail sent successfully")
        });
}

function sendEmail(){

    let clientDetails = {"name":visitorName,
        "mobileNumber":contactNumber,
        "emailId":emailId
    }
    // Initialize EmailJS
emailjs.init('service_iv9zfdc'); // Get this from EmailJS dashboard

// Send an email
emailjs.send("service_iv9zfdc", "template_v3f61yn", {
  from_name: "harrik06@gmail.com",
  to_name: "97h.krish@gmail.com",
  message: JSON.stringify(clientDetails)
}).then(function(response) {
    console.log('Email sent successfully!', response.status, response.text);
}).catch(function(error) {
    console.error('Failed to send email:', error);
});

}