var test = sessionStorage.getItem("passed");
if(test != "yes"){
    window.location.replace("login.html");
}

const ws = new WebSocket("ws://localhost:8082");
const messages = [];

function sendMsg(){
    var data = document.getElementById("msgBox").value;
    document.getElementById("msgBox").value = null;
    var msg = sessionStorage.getItem("name")+ ": " + data;
    var enc = window.btoa(msg);
    ws.send(enc);
}

ws.onmessage = (event) => {
    var msgString = event.data;
    var msgCheck = msgString.substring(msgString.length - 3);
    if(msgCheck == "+ID"){
        var id = parseInt(msgString.substring(0, 1));
        console.log(id);
    }else{
        var dec = window.atob(msgString);
        messages.push(dec);
    }
    var messageString = "";
    messages.forEach(message => {
        messageString += message+"<br>";
    });
    document.getElementById("msgs").innerHTML = messageString;
};