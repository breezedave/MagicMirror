import { io } from "socket.io-client";
import {Store} from "../Store";

 export class Socket extends Store {
    constructor() {
        super();
        this._messagesReceived = [];
        this._socket = io();
        this._socket.on("message", this.handleMessage.bind(this))
    }

    handleMessage(msg) {
        this._messagesReceived.push(msg);
        this.fire(this);
    }

    get messagesReceived() { 
        return this._messagesReceived
    }
 }