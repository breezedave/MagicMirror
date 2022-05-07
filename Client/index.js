import React from "react";
import ReactDOM from "react-dom/client";
import { Socket } from "./utils/Socket";
import {App} from "./components/App";

window.socket = new Socket();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App store={window.socket} />
);