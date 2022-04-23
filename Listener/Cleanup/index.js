const fs = require("fs");
const path = require("path");

module.exports = class Cleanup {
    #TIMEOUT_MS = 2000;
    #RETENTION_MS = 10000;
    #RECORDINGS_PATH = null;

    constructor(recordingsPath) {
        this.#RECORDINGS_PATH = recordingsPath;
    }
    
    start() {
        const cutoffTime = new Date().getTime() - this.#RETENTION_MS;
        const files = fs.readdirSync(this.#RECORDINGS_PATH);

        files.forEach(file => {
            if(+file.replace(".raw","") < cutoffTime) fs.unlinkSync(path.join(this.#RECORDINGS_PATH, file));
        })

        setTimeout(() => this.start(), this.#TIMEOUT_MS);
    }

}