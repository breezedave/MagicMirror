const Mic = require("./Mic");
const Vosk = require ("./Vosk");
const Cleanup = require("./Cleanup");

const vosk = new Vosk();
const mic = new Mic(vosk.translate.bind(vosk));
const cleanup = new Cleanup(mic.recordingsPath);

mic.startRecording();
cleanup.start();