import { io } from "socket.io-client";
import {Store} from "../Store";
import {colors} from "./colors";
import {pictureDisplayPeriod} from "../../../config.json"
import {
    azure_maps_api_key,
    azure_maps_endpoint,
    azure_lat_lng_endpoint,
    bing_search_endpoint, 
    bing_api_key,
} from "../../../secrets.json";

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

export class Socket extends Store {
    constructor() {
        super();
        this._displayCurrent = null;
        this._images = null;
        this._socket = io();
        this._PICTURE_DISPLAY_LAG_MS = pictureDisplayPeriod;
        this._socket.on("message", this.handleMessage.bind(this))
    }

    async handleMessage(msg) {
        if(!msg) return;
        if(msg.message === "color") return this.changeColor(msg.value);
        if(msg.message === "picture") return await this.getPictures(msg.value);
        if(msg.message === "map") return this.getMap(msg.value);
    }

    setDisplayCurrent(val) {
        this._displayCurrent = val;
        this.fire(this);
    }

    get images() {
        return this._images;
    }

    get displayCurrent() {
        return this._displayCurrent;
    }

    changeColor(fgColor) {
        const color = fgColor.replace(/\s/gim, "").toProperCase();
        
        if(!(colors.find((val) => val.toLowerCase() === color.toLowerCase()))) return;


        if(!document.querySelector("#dss")) {
            const dss = document.createElement("style");
            dss.id = "dss";
            document.head.appendChild(dss);
        }
        const dss = document.querySelector("#dss");

        dss.innerHTML = `#body{--primary-fg: ${color};}`
        this.fire(this)
    }

    async getLatLng(val) {
        const resp = await fetch(`${azure_lat_lng_endpoint}&subscription-key=${azure_maps_api_key}&query=${val}`)
        const value = await resp.json();
        const {lat, lon} = value.results[0].position;

        return [lon,lat];
    }

    async getMap(val) {
        clearTimeout(this._timeout );
        const [lon, lat] = await this.getLatLng(val);

        const resp = await fetch(`${azure_maps_endpoint}&subscription-key=${azure_maps_api_key}&center=${lon},${lat}`)
        const blob = await resp.blob();
        const imageObjectUrl = URL.createObjectURL(blob)

        this._images = [{src: imageObjectUrl}];
        this.setDisplayCurrent("map");
        
        this._timeout = setTimeout(() => this.setDisplayCurrent(null), this._PICTURE_DISPLAY_LAG_MS)
    }

    async getPictures(val) {
        clearTimeout(this._timeout );
        const resp = await fetch(bing_search_endpoint + val, {
            headers: {
                "Ocp-Apim-Subscription-Key": bing_api_key
            }
        })
        const value = await resp.json();
        this._images = value.value.map(_ => ({
            src: _.contentUrl,
        }));
        this.setDisplayCurrent("images");
        
        this._timeout = setTimeout(() => this.setDisplayCurrent(null), this._PICTURE_DISPLAY_LAG_MS)
    }
 }