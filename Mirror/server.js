const path = require("path");
const Koa = require('koa');
const IO = require('koa-socket-2');
const serve = require('koa-static');
const udp = require('dgram');
const {udpPort, udpAddress, serverPort} = require("../config.json");
const udpClient = udp.createSocket("udp4");
const processMessage = require("./processMessage.js");
 
const app = new Koa();
const io = new IO();
 
app.use(serve(path.join(__dirname, "public")));
 
io.attach(app);

io.on("connection", (socket) => {
    udpClient.on("message", (msg, info) => {
        const message = processMessage(msg, info);
        socket.emit("message", message);
    })
})


app.listen(serverPort);
udpClient.bind(udpPort, udpAddress);