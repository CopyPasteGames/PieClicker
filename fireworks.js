fireworkId = 0

function clickFireworks(parent, zIndex) {
	var t = '100'
	var i = '0'

    var s = `<canvas
        id = "FireWorksDisplayBtn${fireworkId}"
        style = "
			background-color: transparent;
			pointer-events: none;
			position: absolute;
			z-index: ${zIndex};
        	width: ${t}%;
        	height: 100%;
        	left: ${i}%;
        	top: 0%;
        "</canvas>`

    $(parent).append(s)

    var canvasEl = $(`#FireWorksDisplayBtn${fireworkId}`).get(0)
	var hvar     = canvasEl.height / 2 - $(parent).height() * 0.02

	fireworkId = fireworkId + 1

    var ctx               = canvasEl.getContext('2d')
	var numberOfParticles = 25
	var colors            = ['#fc496dff', '#fff', '#03a9f4']

    var setParticleDirection = (p) => {
        var angle  = anime.random(0, 360) * Math.PI / 180
		var value  = canvasEl.height / 1.75
        var radius = [-1, 1][anime.random(0, 1)] * value
        return {
            x: p.x + radius * Math.cos(angle),
            y: p.y + radius * Math.sin(angle)
        }
    }

    var createParticle = (x, y) => {
        var p = {}
        p.x = x
        p.y = y
		p.color  = colors[anime.random(0, colors.length - 1)]
		p.radius = anime.random(8, 12)
        p.endPos = setParticleDirection(p)
        p.draw   = () => {
			ctx.beginPath()
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI)
			ctx.fillStyle = p.color
			ctx.fill()
        }
        return p
    }

    var renderParticle = (anim) => {for(let i = 0; i < anim.animatables.length; i++) {anim.animatables[i].target.draw()}}

    var animateParticles = (x,y) => {
        let particles = []
        for(let i = 0; i < numberOfParticles; i++) {particles.push(createParticle(x, y))}
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

    var render = anime({
        duration: 350,
        update: () => {ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)},
        complete: () => {canvasEl.remove()}
    })
    render.play()
	animateParticles(canvasEl.width / 4.8, hvar)
}
