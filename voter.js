function tallyVotes(choices, votes) {
	var tallies = []
	for (var i = 0; i < choices.length; i++) {
		tallies.push({
			'song': choices[i],
			'votes': 0
		})
	}
	
	for (var i = 0; i < votes.length; i++) {
		var song = votes[i].song
		
		for (var j = 0; j < tallies.length; j++) {
			if (tallies[j].song == song){
				tallies[j].votes++
			}
		}
	}

	var maxTally = -1
	var maxSong
	for (var i = 0; i < tallies.length; i++) {
		if (tallies[i].votes > maxTally) {
			maxSong = tallies[i].song
			maxTally = tallies[i].votes
		}
	}

	return maxSong
}

exports.tallyVotes = tallyVotes