var test = sessionStorage.getItem("passed");
if(test != "yes"){
    window.location.replace("login.html");
}

const addr = "localhost"
const port = "8082"
const ws = new WebSocket("ws://"+addr+":"+port);
const messages = [];

function sendMsg(){
    var data = document.getElementById("msgBox").value;
    if(data){
        document.getElementById("msgBox").value = null;
        var msg = sessionStorage.getItem("name")+ ": " + data;
        var enc = window.btoa(msg);
        ws.send(enc);
    }
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
    var i = 0;
    messages.forEach(message => {
        i++;
        if(i == messages.length){
            messageString += message;
        }else{
            messageString += message+"\n";
        }
    });
    document.getElementById("chat-box").innerHTML = messageString;
    document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight
};