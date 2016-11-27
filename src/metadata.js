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

    save(list, data, 0 , list.length, done)
}

function save(list, data, start, end, done) {

    if (start < end) {
        var readableStream = fs.createReadStream(__dirname + '/music/' + list[start])
        var parser = mm(readableStream, (err, metadata) => {
            if (err) throw err

            data.push({
                title: metadata.title,
                album: metadata.album,
                artist: metadata.artist,
                // Add the artwork. If the file doesn't have artwork, use the default
                picture: metadata.picture [0].data ? metadata.picture [0].data : DEFAULT_PICTURE,
                // File format of the artwork
                format: metadata.picture [0].format ? metadata.picture [0].format : DEFAULT_FORMAT,
                fileName: list [start]
            })

            readableStream.close()

            save(list, data, start + 1, end, done)
        })
    } else done(data)

}

exports.getMetaData = getMetaData