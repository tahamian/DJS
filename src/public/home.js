/**
*@file This module is for the UI
*<p> Assumptions
* <ul style="list-style: none;">
*  <li>
*  <li>
* </ul>
 * @module home
 * @version 1.0
 * @summary A concise summary.
 */

$(function() {
/**
*@member {String} id - is the value of the user id that will be used to store cookie information
*/
var id = Cookies.get('id')

    var socket = io.connect()

  if (!id) {
    socket.emit('connect-request', null)
  } else {
    socket.emit('connect-request', id)
  }

    /**
     * @function socket.on()
     *Finalize the connection by setting the ID cookie
     *@param {String} 'connect-response' - String that is used by socket.on that updates the the cookies when a user clicks
     *@param {Array} data - an array of the song titles
     */
  socket.on('connect-response', (data) => {
      Cookies.remove('id')
      Cookies.set('id', data)
  })

  /**
   * @function socket.on()
   *Update the UI to include the new songs
   *@param {String} 'update-songs' - String that is used by socket.on that updates the song list
   *@param {Array} data - an array of the song titles
  */
  socket.on('update-songs', (data) => {
    console.log('Updating the songs:\n' + data)															//updates the new songs

    // Clear all current songs
    $('#list-div').empty()

    // For each new song, create a list element and append it
    $.each(data, function(i) {

            var container = $('<div />')
                    .addClass('list-item-div')
        /**
         * @member {jQuery} - varaible to hold the number of votes
         *This is a state varaible, when a user clicks the number of votes go up
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
      var brk = $('<br />')
          .appendTo(container)
        /**
         * @var {any}
         */
            var count = $('<p />')
                    .text('0')
                    .appendTo(container)

            container.appendTo($('#list-div'))

    })

  })
    /**
     * @function socket.on()
    * socket library is used to update songs
    *@param {String} 'update-votes' - String that is used by socket.on that updates the votes
    *@param {Array} data - an array of the song titles
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
