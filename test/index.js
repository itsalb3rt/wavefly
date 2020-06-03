const wavefly = require('../src/index');

// test
const inputFilePath = './example_audio/source5.ogg';
const outputFilePath = './example_audio/out_audio/out.wav';

const result = wavefly(inputFilePath, outputFilePath);

result.then(response => {
    console.log('promisse resolved')

    response.on('end', () => {
        console.log('Audio transcoding!')
    })

})