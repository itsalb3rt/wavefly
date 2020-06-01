const fs = require('fs');
var SoxCommand = require('sox-audio');
var through = require('through');

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
Transcodes a wav input stream
*/
var transcodeWavStream = function (wavInputStream, outputSampleRate, channels, outputPipe) {
  var inputStream = wavInputStream;

  var command = SoxCommand();
  command.input(inputStream)
    .inputEncoding('signed')
    .inputChannels(channels)
    .inputFileType('wav')
    .output(outputPipe)
    .outputFileType('wav')
    .outputSampleRate(outputSampleRate);

  addStandardListeners(command);
  command.run();
};

// Load a wav file buffer as a WaveFile object
var wavInputStream = fs.createReadStream('example_audio/source4.wav');
var outputFileStream = fs.createWriteStream('example_audio/out_audio/out.wav');

transcodeWavStream(wavInputStream, 8000, 1, outputFileStream);
