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

      var div = $('<div />')
          .addClass('song-div')
          .appendTo($('#list-div'))
          .text(data[i])
          .click(function() {
            socket.emit('vote', {
              'ID': Cookies.get('id'),
              'song': data[i]
            })
          })
    })
  })
})
