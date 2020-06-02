const fs = require('fs');
const musicMetadata = require('music-metadata');
const transcodeStream = require('./Modules/TranscodeStream');
const getInputAudioFormat = require('./Modules/getInputAudioFormat');

// Load a wav file buffer as a WaveFile object
const inputFilePath = './src/example_audio/source2.mp3';
let wavInputStream = fs.createReadStream(inputFilePath);
let outputFileStream = fs.createWriteStream('./src/example_audio/out_audio/out.wav');
const outputFileType = 'wav';

musicMetadata.parseFile(inputFilePath)
  .then(metadata => {
    let inputFileType = getInputAudioFormat(metadata.format.container);
    transcodeStream(wavInputStream, inputFileType, 8000, 1, outputFileStream, outputFileType);
  })
  .catch(err => {
    console.error(err.message);
  });
