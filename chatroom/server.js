const express = require("express");
const path =require("path");

const app = express();
const server = require("http").createServer(app);
const io= require("socket.io")(server);
app.use(express.static(path.join(__dirname+"/public")));
server.listen(5000);
io.on("connection", function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update",username+"Joined the conversation");
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update",username+"left the conversation");
    });
    socket.on("message",function(username){
        socket.broadcast.emit("chat",message);
    });
})