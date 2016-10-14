$(function() {
  var id = Cookies.get('id')
  var socket = io.connect()

  if (!id) {
    socket.emit('connect-request', null)
  } else {
    socket.emit('connect-request', id)
  }

  socket.on('connect-response', (data) => {
      Cookies.remove('id')
      Cookies.set('id', data)
  })
})
