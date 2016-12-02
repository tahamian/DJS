var expect = require('chai').expect,
    library = require('../library.js')

describe('Read songs from music folder', function() {

    it('Correctly reads the songs from the music folder', () => {
        var correct =  ["Drake.mp3","song-1.mp3","song-2.mp3","song-3.mp3","song-4.mp3"]

        var result = library.getSongs(__dirname + '/music')

        expect(JSON.stringify(correct)).to.equal(JSON.stringify(result))
    })

})
