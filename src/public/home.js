/**
 * @module home
 * @version 1.0
 *
 */

$(function() {
/**

*@type {String} id - is the value of the user id that will be used to store cookie information
*/
var id = Cookies.get('id')
    /**
     *@namespace
     */
    var socket = io.connect()

  if (!id) {
    socket.emit('connect-request', null)
  } else {
    socket.emit('connect-request', id)
  }

    /**

     *Finalize the connection by setting the ID cookie
     * @type {boolean}
     * @param {String} 'connect-response' - String input for the socket library, this updates the cookie ID
     * @param {Array} data - a list of song Strings
     */
  socket.on('connect-response', (data) => {
      Cookies.remove('id')
      Cookies.set('id', data)
  })

  /**

   *Update the UI to include the new songs
   * @type {boolean}
   * @param {String} 'update-songs' -
   *@param {Array} data - a list of song Strings
  */
  socket.on('update-songs', (data) => {
    console.log('Updating the songs:\n' + data)															//updates the new songs

    // Clear all current songs
    $('#list-div').empty()

    // For each new song, create a list element and append it
    $.each(data, function(i) {
        /**

         * @type {any}
         */
            var container = $('<div />')
                    .addClass('list-item-div')
        /**

         * @type {jQuery}
         */
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
        /**

         * @type {any}
         */
      var brk = $('<br />')
          .appendTo(container)
        /**

         * @type {any}
         */
            var count = $('<p />')
                    .text('0')
                    .appendTo(container)

            container.appendTo($('#list-div'))

    })

  })
    /**

     * socket library is used to update songs
     * @type {boolean}
     * @param {String} 'update-votes' - String parameter for the socket library that updates the votes
     * @param {Array} data - a list of song Strings
     */
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
