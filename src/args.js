/**
 * @module args
 * @version 1.0
 * 
 * Options for command line arguments
 */
const options = [
    // -m flag to select a custom music directory
    { name: 'musicDir', alias: 'm', type:String, defaultOption: null }
]
/**
*@exports home
*/
exports.options = options
