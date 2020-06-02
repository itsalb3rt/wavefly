const fs = require('fs');
var SoxCommand = require('sox-audio');
const musicMetadata = require('music-metadata');

/**
 * Debug stuff
 * @param {*} command 
 */
var addStandardListeners = function (command) {
  command.on('prepare', function (args) {
    console.log('Preparing sox command with args ' + args.join(' '));
  });

  command.on('start', function (commandLine) {
    console.log('Spawned sox with command ' + commandLine);
  });

  command.on('progress', function (progress) {
    console.log('Processing progress: ', progress);
  });

  command.on('error', function (err, stdout, stderr) {
    console.log('Cannot process audio: ' + err.message);
    console.log('Sox Command Stdout: ', stdout);
    console.log('Sox Command Stderr: ', stderr)
  });

  command.on('end', function () {
    console.log('Sox command succeeded!');
  });
};

/* 
* Transcodes a wav input stream
*/
var transcodeWavStream = function (wavInputStream, inputFileType, outputSampleRate, channels, outputPipe) {
  var inputStream = wavInputStream;

  var command = SoxCommand();
  command.input(inputStream)
    .inputEncoding('signed')
    .inputChannels(channels)
    .inputFileType(inputFileType)
    .output(outputPipe)
    .outputFileType('wav')
    .outputSampleRate(outputSampleRate);

  addStandardListeners(command);
  command.run();
};

const getFormat = (container) => {
  const formats = [
    {type:'WAVE',value:'wav'},
    { type:'MPEG',value:'mp3'},
  ]
  let result = formats.find(format => format.type === container);
  return result.value;
}

// Load a wav file buffer as a WaveFile object
const inputFilePath = 'example_audio/source2.mp3';
let wavInputStream = fs.createReadStream(inputFilePath);
let outputFileStream = fs.createWriteStream('example_audio/out_audio/out.wav');

musicMetadata.parseFile(inputFilePath)
  .then(metadata => {
    let inputFileType = getFormat(metadata.format.container);
    transcodeWavStream(wavInputStream, inputFileType, 8000, 1, outputFileStream);
  })
  .catch(err => {
    console.error(err.message);
  });
