# Wavefly

<div style="text-align:center">
<a href="https://github.com/itsalb3rt/wavefly">
<img src="https://img.shields.io/github/stars/itsalb3rt/wavefly"/>
</a>
<a href="https://github.com/itsalb3rt/wavefly">
<img src="https://img.shields.io/github/license/itsalb3rt/wavefly"/>
</a>
</div>

Transcode any audio file to wav with minimal effort. This library is an abstraction to facilitate the use of sox with node.

### Get started

*From this point I will assume that you are using linux*

**Install SOX comand line utility**

```bash
$ sudo apt update
$ sudo apt install sox
# support all formats like mp3, ogg, flac
$ sudo apt install libsox-fmt-all
```

### Basic use

```bash
$ npm i @itsalb3rt/wavefly
```

**Example**

```javascript
const wavefly = require('@itsalb3rt/wavefly');

// test
const inputFilePath = './example_audio/source6.flac';
const outputFilePath = './example_audio/out_audio/out.wav';

const result = wavefly(inputFilePath, outputFilePath);

result.then(response => {
    console.log('promisse resolved')

    response.on('end', () => {
        console.log('Audio transcoding!')
    })

})
```

**Wait for file transcode using promises**

```javascript
const wavefly = require('@itsalb3rt/wavefly');

const inputFilePath = './example_audio/source6.flac';
const outputFilePath = './example_audio/out_audio/out.wav';

const result = wavefly(inputFilePath, outputFilePath);

const audioTranscode = result.then(response=>{
    return new Promise((resolve) => {
        response.on('end', () => resolve(true));
        response.on('error', () => resolve(false));
    });
}).catch(error => {
    console.log(error)
})

// ...

audioTranscode
.then(response=>{
    //Watever you want do here after file processing
}).catch(error => {
    console.log(error)
})
```

:warning: Note that the promise resolution does not indicate that the file has already been processed, for this you must use the `response`, an event called `end`

**More options**

Optionally you can specify the following parameters;

```javascript
/**
 * @param {string} inputFilePath: path of input audio ./src/example_audio/source6.flac
 * @param {string} outputFilePath: path of output audio ./src/example_audio/out_audio/out.wav
 * @param {string} outputFileType: by default 'wav'
 * @param {Integer} outputSampleRate Set the sample rate in Hz (or kHz if appended with a 'k')
 * @param {Integer} outputChannels by default in 1 (mono)
 */
function wavefly(inputFilePath, outputFilePath, outputFileType = 'wav', outputSampleRate = 8000, outputChannels = 1 ){}

```

### Help Links

* [Sox Docs](http://sox.sourceforge.net/soxformat.html)
* [music-metadata](https://github.com/borewit/music-metadata#readme)
* [sox-audio](https://github.com/psaylor/sox-audio)