isPlayingMusic=false

function musicTick(){
    if(!settingsMute&&getRndInteger(1,10)==getRndInteger(1,10)&&!isPlayingMusic){
        var songPick=getRndInteger(1,2)
        if(songPick==1&&!isPlayingMusic){
            isPlayingMusic=true
            $('#whatIsPlayingTrack').html('PieClicker')
            playSong("piclkr1.mp3")
            setTimeout(()=>{
                $('#whatIsPlayingContainer').fadeIn(250)
                setTimeout(()=>{
                    $('#whatIsPlayingContainer').fadeOut(250)
                },5500)
            },2000)
        }else if(songPick==2&&!isPlayingMusic&&getRndInteger(1,2)==1){
            isPlayingMusic=true
            $('#whatIsPlayingTrack').html('B-Side')
            playSong("bside.mp3")
            setTimeout(()=>{
                $('#whatIsPlayingContainer').fadeIn(250)
                setTimeout(()=>{
                    $('#whatIsPlayingContainer').fadeOut(250)
                },5500)
            },5000)
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
        setTimeout(()=>{isPlayingMusic=false},10*60*1000)
    })
}
 