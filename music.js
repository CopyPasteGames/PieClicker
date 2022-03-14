isPlayingMusic=false

function musicTick(){
    if(!settingsMute&&getRndInteger(1,9)==getRndInteger(1,9)&&!isPlayingMusic){
        var songPick=getRndInteger(1,3)
        if(songPick==1&&!isPlayingMusic&&getRndInteger(1,2)==1){
            isPlayingMusic=true
            $('#whatIsPlayingTrack').html('PieClicker')
			$('#whatIsPlayingCoverAsset').attr({"src":"./assets/Record.png"})
            playSong("piclkr1.mp3")
            setTimeout(()=>{
                $('#whatIsPlayingContainer').fadeIn(250)
                setTimeout(()=>{
                    $('#whatIsPlayingContainer').fadeOut(250)
                },5500)
            },2000)
        }else if(songPick==2&&!isPlayingMusic&&getRndInteger(1,3)==1){
            isPlayingMusic=true
            $('#whatIsPlayingTrack').html('B-Side')

			// Replace This With Corrupted Record Later
			$('#whatIsPlayingCoverAsset').attr({"src":"./assets/RecordBSide.png"})

            playSong("bside.mp3")
            setTimeout(()=>{
                $('#whatIsPlayingContainer').fadeIn(250)
                setTimeout(()=>{
                    $('#whatIsPlayingContainer').fadeOut(250)
                },5500)
            },5000)
        }else if(songPick==3&&!isPlayingMusic){
            isPlayingMusic=true
            $('#whatIsPlayingTrack').html('Sunny')
			$('#whatIsPlayingCoverAsset').attr({"src":"./assets/RecordYellow.png"})
            playSong("sunny.mp3")
            setTimeout(()=>{
                $('#whatIsPlayingContainer').fadeIn(250)
                setTimeout(()=>{
                    $('#whatIsPlayingContainer').fadeOut(250)
                },5500)
            },2000)
        }
    }
    setTimeout(()=>{musicTick()},5000)
}

function playSong(file){
    isPlayingMusic=true
    $('body').append(`
        <audio src="./assets/${file}" id="musicPlayer" autoplay style="position:fixed;left:1000%;top:1000%;"></audio>
    `)
    $("#musicPlayer").bind("ended",()=>{
        $("#musicPlayer").remove()
        setTimeout(()=>{isPlayingMusic=false},8*60*1000)
    })
}
