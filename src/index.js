const fs = require('fs');
const musicMetadata = require('music-metadata');
const transcodeStream = require('./Modules/TranscodeStream');
const getInputAudioFormat = require('./Modules/getInputAudioFormat');

/**
 * Transcode any audio file in wav (by default)
 * 
 * @param {*} inputFilePath: path of input audio ./src/example_audio/source6.flac
 * @param {*} outputFilePath: path of output audio ./src/example_audio/out_audio/out.wav
 * @param {*} outputFileType: by default 'wav'
 * @param {*} outputSampleRate Set the sample rate in Hz (or kHz if appended with a 'k')
 * @param {*} outputChannels by default in 1 (mono)
 */
function wavefly(inputFilePath, outputFilePath, outputFileType = 'wav', outputSampleRate = 8000, outputChannels = 1) {
  // Load a wav file buffer as a WaveFile object

  let wavInputStream = fs.createReadStream(inputFilePath);
  outputFileStream = fs.createWriteStream(outputFilePath);

  return musicMetadata.parseFile(inputFilePath)
    .then(metadata => {
      let inputFileType = getInputAudioFormat(metadata.format.container);
      return transcodeStream(wavInputStream, inputFileType, outputSampleRate, outputChannels, outputFileStream, outputFileType);
    })
    .catch(err => {
      console.log('wavefly -> err', err)
    });
}

module.exports = wavefly;
