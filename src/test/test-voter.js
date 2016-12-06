var expect = require('chai').expect,
    voter = require('../voter.js')

describe('tallyVotes()', function() {
    it('Returns the highest voted item #1', () => {
        var choices = ['song-1', 'song-2', 'song-3', 'song-4']
        var votes   = [{song: 'song-2'},
                       {song: 'song-4'},
                       {song: 'song-3'},
                       {song: 'song-2'}]

        var result = voter.tallyVotes(choices, votes)
        console.log(result)
        expect(result).to.equal('song-2')
    })
    it('Correctly handles an empty choices array', () => {
        var choices = {}
        var votes   = [{song: 'song-2'},
                       {song: 'song-4'},
                       {song: 'song-3'},
                       {song: 'song-2'}]

        var result = voter.tallyVotes(choices, votes)

        expect(result).to.equal(undefined)
    })
    it('Correctly handles an empty votes array', () => {
        var choices = ['song-1', 'song-2', 'song-3', 'song-4']
        var votes   = {}

        var result = voter.tallyVotes(choices, votes)

        expect(result).to.equal(undefined)
    })
})
