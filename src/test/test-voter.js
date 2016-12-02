var expect = require('chai').expect,
    voter = require('../voter.js')

describe('tallyVotes()', function() {
    it('Returns the highest voted item #1', () => {
        var choices = {},
            votes   = {}

        var result = voter.tallyVotes(choices, votes)

        expect(result).to.equal()
    })
    it('Correctly handles an empty choices array', () => {
        var choices = {},
            votes   = {}

        var result = voter.tallyVotes(choices, votes)

        expect(result).to.equal()
    })
    it('Correctly handles an empty votes array', () => {
        var choices = {},
            votes   = {}

        var result = voter.tallyVotes(choices, votes)

        expect(result).to.equal()
    })
})
