const colors = ['#fc496dff', '#fff', '#03a9f4']
let fid = 0

function clickFireworks(parent, zIndex) {
    $(parent).append(`<canvas
        id = "FireWorksDisplayBtn${fid}"
        style = "
            background-color: transparent;
            pointer-events: none;
            position: absolute;
            z-index: ${zIndex};
            width: 100%;
            height: 100%;
            left: 0%;
            top: 0%;
        "</canvas>`)

    let canvasEl = $(`#FireWorksDisplayBtn${fid}`).get(0)
    startRecording(canvasEl)
	fid = fid + 1
    let ctx = canvasEl.getContext('2d')

    function setParticleDirection(p) {
        let angle  = anime.random(0, 360) * Math.PI / 180
		let value  = canvasEl.height / 1.75
        let radius = [-1, 1][anime.random(0, 1)] * value
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        }
    }

    function createParticle(x, y) {
        let p = {}
        p.x = x
        p.y = y
		p.color = colors[anime.random(0, colors.length - 1)]
		p.radius = anime.random(8, 12)
        p.endPos = setParticleDirection(p)
        p.draw = () => {
			ctx.beginPath()
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI)
			ctx.fillStyle = p.color
			ctx.fill()
        }
        return p
    }

    function renderParticle(anim) {
        for(let i = 0; i < anim.animatables.length; i++) {
            anim.animatables[i].target.draw()
        }
    }

    function animateParticles(x,y) {
        let particles = []
        for(let i = 0; i < 20; i++) {
            particles.push(createParticle(x, y))
        }
        anime.timeline().add({
            targets: particles,
            x: (p) => {return p.endPos.x;},
            y: (p) => {return p.endPos.y},
            radius: 0.05,
            duration: 2000,
            easing: 'easeOutCirc',
            update: renderParticle
        })
    }

    let render = anime({
        duration: 250,
        update: () => {ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)},
        complete: () => {canvasEl.remove()}
    })
    render.play()
	animateParticles(canvasEl.width / 4.8, canvasEl.height / 2 - $(parent).height() * 0.02)
}
