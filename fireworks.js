fireworkId=0

function clickFireworks(parent,zIndex){
    let s=`<canvas
        id="FireWorksDisplayBtn${fireworkId}"
        style="position:absolute;
        width:100%;
        height:100%;
        left:0%;
        top:0%;
		pointer-events:none;
        z-index:${zIndex};
        background-color:transparent;">
        </canvas>`
    $(parent).append(s)
    let canvasEl=$(`#FireWorksDisplayBtn${fireworkId}`).get(0)
	fireworkId=fireworkId+1
    let ctx=canvasEl.getContext('2d')
    let numberOfParticles=25
    let colors=['#fc496dff','#fff','#03a9f4']

    let setParticleDirection=function(p){
        let angle=anime.random(0,360)*Math.PI/180
        let value=anime.random(canvasEl.height/2-10,canvasEl.height/2)
        let radius=[-1,1][anime.random(0,1)]*value
        return{
            x:p.x+radius*Math.cos(angle),
            y:p.y+radius*Math.sin(angle)
        }
    }

    let createParticle=function(x,y){
        let p={}
        p.x=x
        p.y=y
        p.color=colors[anime.random(0,colors.length-1)]
        p.radius=anime.random(5,10)
        p.endPos=setParticleDirection(p)
        p.draw=function(){
            ctx.beginPath()
            ctx.arc(p.x,p.y,p.radius,0,2*Math.PI)
            ctx.fillStyle=p.color
            ctx.fill()
        }
        return p
    }

    let createCircle=function(x,y){
        let p={}
        p.x=x
        p.y=y
        p.color='#FFF'
        p.radius=0.1
        p.alpha=.1
        p.lineWidth=3
        p.draw=function(){
            ctx.globalAlpha=p.alpha
            ctx.beginPath()
            ctx.arc(p.x,p.y,p.radius,0,2*Math.PI,true)
            ctx.lineWidth=p.lineWidth
            ctx.strokeStyle=p.color
            ctx.stroke()
            ctx.globalAlpha=1
        }
        return p
    }

    let renderParticle=function(anim){
        for(let i=0;i<anim.animatables.length;i++){
            anim.animatables[i].target.draw()
        }
    }

    let animateParticles=function(x,y){
        let circle=createCircle(x,y)
        let particles=[]
        for(let i=0;i<numberOfParticles;i++){
            particles.push(createParticle(x,y))
        }
        anime.timeline().add({
            targets:particles,
            x:function(p){
                return p.endPos.x;
            },
            y:function(p){
                return p.endPos.y
            },
            radius:0.05,
            duration:2000,
            easing:'easeOutExpo',
            update:renderParticle
        })
            .add({
                targets:circle,
                radius:anime.random(1,2),
                lineWidth:0,
                alpha:{
                    value:0,
                    easing:'linear',
                    duration:300,
                },
                duration:2000,
                easing:'easeOutExpo',
                update:renderParticle,
                offset:0
            })
    }

    let render=anime({
        duration:300,
        update:function(){
            ctx.clearRect(0,0,canvasEl.width,canvasEl.height)
        },
        complete:function(){
            canvasEl.remove()
        }
    })

    render.play()
    animateParticles(canvasEl.width/4.5,canvasEl.height/2)
}
