var fs = require('fs')
    mm = require('musicmetadata')

/**
 * @function getMetaData
 * Returns an array of metadata elements that each contain:
 * title, artist, album, albumart
 * @param list {[String]} - array of music file paths
 * @param done(metadata) { function } callback that contains the result
 * 
 * Returns metadata in the callback with the following form:
 * [
 *     { title, album, artist, picture, format }
 * ]
 * format: File extension of the albumart
 * picture: Raw bin64 picture data
 */
function getMetaData(list, done) {
    var data = []

    for (let i = 0; i < list.length; i++) {

        var readableStream = fs.createReadStream(__dirname + '/music/' + list [i]),
            parser = mm(readableStream, (err, metadata) => {
            if (err) throw err

            data.push({
                title: metadata.title,
                album: metadata.album,
                artist: metadata.artist,
                picture: metadata.picture [0].data,
                format: metadata.picture [0].format,
                fileName: list [i]
            })

            readableStream.close()

            check(i)

        })
    }

    function check(i) {
        if (i == list.length - 1) done(data)
    }

}

exports.getMetaData = getMetaData