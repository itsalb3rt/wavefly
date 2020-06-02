/**
 * List of format from music meta data library for get the
 * equivalent in sox
 * @param {*} container 
 */
const getInputAudioFormat = (container) => {
    const formats = [
        { type: 'WAVE', value: 'wav' },
        { type: 'MPEG', value: 'mp3' },
        { type: 'Ogg', value: 'ogg' },
        { type: 'FLAC', value: 'flac' },
    ]
    let result = formats.find(format => format.type === container);
    return (result) ? result.value: container.toString().toLowerCase();
}

module.exports = getInputAudioFormat;