/**
* @file home.js:
* Script for client-side HTML page - handles socket connections, cookie
* management, and updating UI elements
* @module home
* @version 1.0
*/

/**
 * JQuery function that runs when the page is loaded
 * @function $
*/
$(function() {
	var id = Cookies.get('id')

	var socket = io.connect()

	if (!id) {
		socket.emit('connect-request', null)
	} else {
		socket.emit('connect-request', id)
	}

	/**
	 * Response socket when establishing a connection to the server. Sets the
	 * ID cookie
	 * @function on
	 * @param event {String} connect-response
	 * @param callback {callback} callback function
	 * @param data {String} User ID
	*/
	socket.on('connect-response', (data) => {
		Cookies.remove('id')
		Cookies.set('id', data)
	})

	/**
	 * Update the UI with new song data
	 * @function on
	 * @param event {String} update-songs
	 * @param callback {callback} callback function
	 * @param sendData String of song data elements
	*/
	socket.on('update-songs', (sendData) => { //updates the new songs

		var data = sendData.choices
		var albumPaths = sendData.albumPaths

		// Clear all current songs
		$('#list-div').empty()

		// For each new song, create a list element and append it
		$.each(data, function (i) {

			// Container div for a song element
			var container = $('<div />')
				.addClass('list-item-div')

			// Button
			var button = $('<button  />')
				.addClass('list-group-item')
				.addClass('list-group-item-action')
				.addClass('vote-button')
				.appendTo(container) // Append to the song list
				.text(data[i]) // Song title
				.click(function () { // Click function to emit a vote event to the server
					socket.emit('vote', {
						'id': Cookies.get('id'),
						'song': data[i]
					})
				})

			// Line break
			var brk = $('<br />')
				.appendTo(container)

			// Vote count
			var count = $('<p />')
				.text('0')
				.addClass('vote-count')
				.appendTo(container)

			// Artwork
			var albumart = $('<img>')
				.attr('src', albumPaths[i])
				.attr('height', 80)
				.attr('width', 80)
				.addClass('artwork')
				.appendTo(container)

			// Append the div to the list1
			container.appendTo($('#list-div'))

		})

	})

	/**
	 * Update the vote counts. Called whenever the server recieves a new vote
	 * @function on
	 * @param event {String} update-votes
	 * @param callback {callback} callback function
	 * @param data Array of vote items
	*/
	socket.on('update-votes', (data) => {

		// List of all the container items
		var listItems = document.getElementById('list-div').childNodes

		// Reset all current vote counts to 0
		for (var i = 0; i < listItems.length; i++) {
			listItems[i].childNodes[2].innerHTML = '0'
		}

		// For each vote item
		for (var i = 0; i < data.length; i++) {
			var currentSong = data[i]

			// Find the correct html element and update the DOM
			for (var j = 0; j < listItems.length; j++) {
				if (listItems[j].childNodes[0].innerHTML == data[i]) {
					listItems[j].childNodes[2].innerHTML = parseInt(listItems[j].childNodes[2].innerHTML) + 1
				}
			}
		}

	})
})
