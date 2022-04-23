const path = require("path");
const fs = require("fs");
var mic = require("mic");

module.exports =  class Mic {
    #SAMPLE_RATE = 16000;
    #RECORDINGS_PATH = "../recordings";
    #SILENCE_SECONDS = 1;
    #endRecordingTrigger = null;
    #currentInstance = null;
    #currentInput = null;
    #currentOutput = null;

    constructor(endRecordingTrigger) {
        this.#endRecordingTrigger = endRecordingTrigger;
        fs.mkdirSync(this.#RECORDINGS_PATH, {recursive:true});
    }

    get recordingsPath() {
        return this.#RECORDINGS_PATH;
    }

    startRecording() {
        this.#currentInstance = mic({
            rate: String(this.#SAMPLE_RATE),
            channels: '1',
            debug: false,
            exitOnSilence: this.#SILENCE_SECONDS,
        });

        this.#currentInput = this.#currentInstance.getAudioStream();
        this.#currentOutput = path.join(this.#RECORDINGS_PATH, `${new Date().getTime()}.raw`);
        const outputFileStream = fs.WriteStream(this.#currentOutput);

        this.#currentInput.pipe(outputFileStream);
        this.#currentInput.on("silence", () => this.endRecording());
        this.#currentInstance.start();
    }

    endRecording() {
        this.#currentInstance.stop();
        this.#endRecordingTrigger(this.#currentOutput);
        this.startRecording();
    }
}