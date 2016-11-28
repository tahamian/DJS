/**
 * @module args
 * @version 1.0
 *
 * Options for command line arguments
 */

/**
	* @function options
	* Creates the command line flags
    *
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
