# Websocket-Chat
This is a basic two person chat application build using the node Web sockets module. It also includes my own hashing algorithm for the passwords and end to end encryption on every message.

To use the application, run the command "node Webserver/server.js" and set a password for the server. Then open the login.html file in a browser.

!!!Make sure your address and port in login.js and chat.js match the server machines address and port it is running on!!!

As of right now the application works on localhost on port 8082, to change this edit the addr and port constants in login.js and chat.js and change the portNum constant in Webserver/server.js