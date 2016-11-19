/**
*@file This module is for the UI
*<p> Assumptions
* <ul style="list-style: none;">
*  <li>User h browser can fun javascript
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
    socket.on('update-songs', (sendData) => {													//updates the new songs

        var data = sendData.choices,
            albumPaths = sendData.albumPaths

        // Clear all current songs
        $('#list-div').empty()

        // For each new song, create a list element and append it
        $.each(data, function (i) {
            /**
             * @member {any}
             *
             * Create a div that contains elements for one song:
             * a button and a vote total display
             */
            var container = $('<div />')
                .addClass('list-item-div')
            /**
             * @member {jQuery}
             *
             * Create a button
             */
            var button = $('<button  />')
                .addClass('list-group-item list-group-item-action')
                .appendTo(container) // Append to the song list
                .text(data[i]) // Song title
                .click(function () { // Click function to emit a vote event to the server
                    socket.emit('vote', {
                        'id': Cookies.get('id'),
                        'song': data[i]
                    })
                })
            /**
             * @member {any}
             *
             * Creates a line break
             */
            var brk = $('<br />')
                .appendTo(container)
            /**
             * @var {any}
             *
             * Create a <p> that holds the current vote total for this song
             */

            var count = $('<p />')
                .text('0')
                .addClass('vote-count')
                .appendTo(container)

            var albumart = $('<img>')
                .attr('src', albumPaths [i])
                .attr('height', 80)
                .attr('width', 80)
                .addClass('artwork')
                .appendTo(container)

            // Append the div to the list1
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
