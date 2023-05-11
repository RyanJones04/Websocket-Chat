const addr = "localhost"
const port = "8082"
const ws = new WebSocket("ws://"+addr+":"+port);

sessionStorage.setItem("passed", "no");

function sendPass(){
    var nameData = document.getElementById("name").value;
    sessionStorage.setItem("name", nameData);
    var passData = document.getElementById("pass").value;
    document.getElementById("pass").value = null;
    passData += "+pass"
    ws.send(passData);
}

ws.onmessage = (event) => {
    console.log(event.data);
    var msgString = event.data;
    var msgCheck = msgString.substring(msgString.length - 3);
    if(msgCheck == "+ID"){
        sessionStorage.setItem("ID", msgString)
    }else if(msgString == "C"){
        sessionStorage.setItem("passed", "yes");
        window.location.replace("chat.html");
    }
};

ws.onclose = (event) => {
    window.location.replace("full.html");
};

document.getElementById("pass").addEventListener("keyup", function(event) {
    if(event.keyCode === 13){
        event.preventDefault();
        document.getElementById("sendBtn").click();
    }
});