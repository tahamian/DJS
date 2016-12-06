var expect = require('chai').expect,
    md = require('../metadata.js')

const SONGNAME = [__dirname + '/music/Drake.mp3']
const PREDICTION = {
    artist: 'Drake',
    album: '4PM In Calabasa - Single',
    title: '4PM In Calabasas',
    format: 'png'
}

describe('Read MetaData()', function(done) {
    it('Reads the metadata for Drake.mp3', () => {

        md.getMetaData(SONGNAME, (metadata) => {
            expect(metadata [0]).to.equal(PREDICTION)
            done()
        })

    })
})
