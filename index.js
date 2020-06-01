const fs = require('fs');
var SoxCommand = require('sox-audio');
var through = require('through');
/* Streaming examples */

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

var genThroughStreamCounter = function () {
  var dataCounter = 0;
  var throughStream = through(
    function write(data) {
      dataCounter += data.length;
      console.log("ThroughStreamCounter: Writing through data ", data.length);
      this.queue(data);
    },
    function end() {
      console.log("ThroughStreamCounter: END. Wrote through data ", dataCounter);
      this.queue(null);
    });
  return throughStream;
};

/* Transcodes a wav input stream from 41k to 16k, streaming out a 16k wav file
to outputPipe. Optionally pass useThrough = true to insert a through stream
between the wavInputStream and the SoxCommand to count and print the bytes of data */
var transcodeWavStream = function (wavInputStream, outputSampleRate, outputPipe, useThrough) {
  useThrough = useThrough || false;
  var inputStream = wavInputStream;

  if (useThrough) {
    var throughStreamCounter = genThroughStreamCounter();
    wavInputStream.pipe(throughStreamCounter);
    inputStream = throughStreamCounter;
  }

  var command = SoxCommand();
  command.input(inputStream)
    .inputEncoding('signed')
    .inputChannels(1)
    .inputFileType('wav')
    .output(outputPipe)
    .outputFileType('wav')
    .outputSampleRate(outputSampleRate);

  addStandardListeners(command);
  command.run();
};

// Load a wav file buffer as a WaveFile object
var wavInputStream = fs.createReadStream('example_audio/source4.wav');
var outputFileStream = fs.createWriteStream('example_audio/out.wav');

transcodeWavStream(wavInputStream, 8000, outputFileStream);
