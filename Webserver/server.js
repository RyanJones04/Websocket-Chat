const WebSocket = require("ws");
const ryjj18 = require("./ryjj18");

const wss = new WebSocket.Server({ port: 8082 });
var webSockets = {};
var userCount = 0;

var readline = require("readline-sync");

var pword = readline.question("What would you like the chat password to be: ");

var pwordH = ryjj18.ryjj18(pword+"+pass", 5);

wss.broadcast = function broadcast(data){
    wss.clients.forEach(function each(client){
        client.send(data);
    });
};

wss.on("connection", function(ws) {
    if(userCount <= 1){
        webSockets[userCount] = ws;
        console.log("Conected User: " + userCount);
        userCount++;
    }
    else{
        ws.close();
    }

    ws.send(userCount.toString() + "+ID");

    ws.on("message", function incomming(msg){
        var msgString = msg.toString();
        var passCheck = msgString.substring(msgString.length - 5);
        var idCheck = msgString.substring(msgString.length - 3);
        if(passCheck == "+pass"){
            if(hash(msgString)){
                ws.send("C");
            }
        }else{
            wss.broadcast(msgString);
        }
    });

    ws.on("close", () => {
        userCount--;
        console.log("Client has disconected!");
    });
});

function hash(pass){
    pass = ryjj18.ryjj18(pass, 5);
    return pass == parseInt(pwordH);
}