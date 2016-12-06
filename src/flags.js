/**
* @file flags.js
* Provides options for command line arguments
* @module flags
* @version 1.0
*/

/**
 * @member options {Object} Array of flag options <br><br>
 * -m : Select a custom music directory <br>
 * &emsp; Usage: node server.js -m path/to/music/folder <br><br>
 * -v : Run server with verbose logging. Useful for debugging errors or seeing
 *      activity <br>
 * &emsp; Usage: node server.js -v
*/
const options = [
    // -m flag to select a custom music directory
    { name: 'musicDir', alias: 'm', type:String, defaultOption: null },
    // -v flag enables verbose console logging
    { name: 'verbose',   alias: 'v', type:String}
]

/**
*@exports home
*/
exports.options = options
