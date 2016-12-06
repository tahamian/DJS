/**
 * @file error-handler.js
 * Handles errors
 * @module error-handler
*/

/**
 * Function that is called when Node.JS experiences an error.
 * @function errorCallback
 * @param err {Error} Node.JS error
*/
function errorCallback(err) {

	if (String(err).indexOf('EADDRINUSE') != -1) {
		console.log('ERROR: Node.JS is already running in another process.' +
				    'Kill all node processes and then restart the server.')
	}

	if(String(err).indexOf('ENOENT' != -1)) {
		console.log('ERROR: COuld not find or open the music directory.' +
					'Ensure that the directory exists and can be accessed.' +
				    'Administrative priviledges may be needed.')
	}

}

exports.errorCallback = errorCallback
