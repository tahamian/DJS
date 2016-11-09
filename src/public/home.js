$(function() {
  var id = Cookies.get('id')
  var socket = io.connect()

  if (!id) {
    socket.emit('connect-request', null)
  } else {
    socket.emit('connect-request', id)
  }

  /*
    Finalize the connection by setting the ID cookie
  */
  socket.on('connect-response', (data) => {
      Cookies.remove('id')
      Cookies.set('id', data)
  })

  /*
    Update the UI to include the new songs

    @param data - a list of song Strings
  */
  socket.on('update-songs', (data) => {
    console.log('Updating the songs:\n' + data)

    // Clear all current songs
    $('#list-div').empty()

    // For each new song, create a list element and append it
    $.each(data, function(i) {

			var container = $('<div />')
					.addClass('list-item-div')
					
      var button = $('<button  />')
          .addClass('list-group-item list-group-item-action')
          .appendTo(container)
					.text(data[i])
					.click(function() {
						socket.emit('vote', {
							'id': Cookies.get('id'),
							'song': data[i]
						})
					})

      var brk = $('<br />')
          .appendTo(container)

			var count = $('<p />')
					.text('0')
					.appendTo(container)

			container.appendTo($('#list-div'))

    })

  })

  socket.on('update-votes', (data) => {

		var listItems = document.getElementById('list-div').childNodes

		for (var i = 0; i < listItems.length; i++) {
			listItems[i].childNodes[2].innerHTML = '0'
		}

		for(var i = 0; i < data.length; i++) {
			var currentSong = data[i]

			for (var j = 0; j < listItems.length; j++) {
				if (listItems[j].childNodes[0].innerHTML == data[i]) {
					listItems[j].childNodes[2].innerHTML = parseInt(listItems[j].childNodes[2].innerHTML) + 1
				}
			}
		}

  })
})
