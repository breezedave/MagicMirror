const udp = require('dgram');
const {udpPort, udpAddress} = require("../config.json");
const client = udp.createSocket("udp4");

client.on("message", (msg, info) => {
    console.log(msg.toString("utf-8"));
    console.log(info);
});

client.bind(udpPort, udpAddress);