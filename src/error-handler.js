function errorCallback(err) {
	//if (err == 'Error: listen EADDRINUSE :::' + port) {
	if (String(err).indexOf('EADDRINUSE') != -1) {
		console.log('Uh oh! Node.JS is already running in another process.' +
				    'Kill all node processes and then restart the server.')
	}
}

exports.errorCallback = errorCallback