let fid = 0

function clickFireworks(parent) {
    fid += 1
    $(parent).append(`<video autoplay class="fireworks_vid" src="./assets/anim${randInt(0, 7)}.webm" id="fid${fid}">`)
    removeElem("fid" + fid, 300)
}
