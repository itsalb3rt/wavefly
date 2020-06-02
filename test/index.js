const wavefly = require('../src/index');

// test
const inputFilePath = './test/example_audio/source6.flac';
const outputFilePath = './test/example_audio/out_audio/out.wav';

wavefly(inputFilePath, outputFilePath);