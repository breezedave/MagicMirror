const vosk = require('vosk');
const udp = require("dgram");
const { spawn } = require("child_process");
const fs = require("fs");
const {udpPort, udpAddress} = require("../../config.json");
const path = require('path');

module.exports = class Vosk {
    #MODEL_PATH = path.join(__dirname, "../model");
    #SAMPLE_RATE = 16000;
    #BUFFER_SIZE = 4000;
    #model = null;
    #rec = null;
    #server = null;
    #portNumber = udpPort;
    #address = udpAddress;

    constructor() {
        this.#server = udp.createSocket("udp4");
        this.#model = new vosk.Model(this.#MODEL_PATH);
        this.#rec = new vosk.Recognizer({model: this.#model, sampleRate: this.#SAMPLE_RATE});

        if (!fs.existsSync(this.#MODEL_PATH)) {
            console.log(`Please download the model from https://alphacephei.com/vosk/models and unpack as ${this.#MODEL_PATH} in the current folder.`);
            process.exit();
        }
    }

    translate(filepath) {
        const ffmpeg_run = spawn('ffmpeg', ['-loglevel', 'quiet', '-i', filepath,
        '-ar', String(this.#SAMPLE_RATE) , '-ac', '1',
        '-f', 's16le', '-bufsize', String(this.#BUFFER_SIZE) , '-']);

        ffmpeg_run.stdout.on('data', (stdout) => {
            if (this.#rec.acceptWaveform(stdout)) {
                const result = this.#rec.result().text;
                if(!result.length) return;
                this.#server.send(result, this.#portNumber, this.#address, (error) => {
                    if(error) console.log(error);
                });
            }
        });
    }    
};