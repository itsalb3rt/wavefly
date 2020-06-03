var SoxCommand = require('sox-audio');
const addStandardListeners = require('./SoxEventListeners');

/* 
* The magic function for transcode all formats types in wav files
*/
const transcodeStream = function (wavInputStream, inputFileType, outputSampleRate, channels, outputPipe, outputFileType) {
    var inputStream = wavInputStream;

    var command = SoxCommand();
    command.input(inputStream)
        .inputEncoding('signed')
        .inputChannels(channels)
        .inputFileType(inputFileType)
        .output(outputPipe)
        .outputFileType(outputFileType)
        .outputSampleRate(outputSampleRate);

    addStandardListeners(command);
    command.run();
    return command;
};

module.exports = transcodeStream;