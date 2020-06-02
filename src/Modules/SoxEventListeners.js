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

module.exports = addStandardListeners;