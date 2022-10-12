pcS.mute = false
songs = [
    {"name": "PieClicker", "song": "piclkr1.mp3", "asset": "Record.png", "author": "Ian Paris-Wright"},
    {"name": "B-Side", "song": "bside.mp3", "asset": "RecordBSide.png", "author": "Ian Paris-Wright"},
    {"name": "Sunny", "song": "sunny.mp3", "asset": "RecordYellow.png", "author": "Ian Paris-Wright"}
]

function musicTick() {
    if(!pcS.mute && randInt(1, 9) == randInt(1 ,9) && !pcG.isPlayingMusic) {
        var id = randInt(0, 2)
        pcG.isPlayingMusic = true
        $('#whatIsPlayingTrack').html(songs[id].name)
        $('#whatIsPlayingArtist').html(songs[id].author)
        $('#whatIsPlayingCoverAsset').attr({"src": `./assets/${songs[id].asset}`})
        playSong(songs[id].song)
        setTimeout(() => {
            $('#whatIsPlayingContainer').fadeIn(250)
            setTimeout(() => {$('#whatIsPlayingContainer').fadeOut(250)}, 5500)
        }, 2000)
    }
}

function playSong(file) {
    pcG.isPlayingMusic = true
    $('body').append(`<audio src="./assets/${file}" id="musicPlayer" autoplay style="position:fixed;left:1000%;top:1000%;"></audio>`)
    $("#musicPlayer").bind("ended", () => {
        $("#musicPlayer").remove()
        setTimeout(() => {pcG.isPlayingMusic = false}, 8 * 60 * 1000)
    })
}
