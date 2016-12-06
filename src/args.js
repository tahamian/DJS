/**
* @file arg.js
* Provides options for command line arguments
* @module args
* @version 1.0
*/

/**
 * @member options {Object} Array of flag options
 * @return A JSON object that contains the flag options
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
