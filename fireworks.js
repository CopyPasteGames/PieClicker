fireworkId=0

function clickFireworks(parent,zIndex,goldenPie=false){
	if(goldenPie){
		t='200'
		i='-50'
	}else{
		t='100'
		i='0'
	}
    let s=`<canvas
        id="FireWorksDisplayBtn${fireworkId}"
        style="position:absolute;
        width:${t}%;
        height:100%;
        left:${i}%;
        top:0%;
		pointer-events:none;
        z-index:${zIndex};
        background-color:transparent;">
        </canvas>`
    $(parent).append(s)
    let canvasEl=$(`#FireWorksDisplayBtn${fireworkId}`).get(0)
	hvar=canvasEl.height/2-$(parent).height()*0.02
	fireworkId=fireworkId+1
    let ctx=canvasEl.getContext('2d')
	if(goldenPie){
		numberOfParticles=20
	}else{
		numberOfParticles=25
	}
	let colors=['#fc496dff','#fff','#03a9f4']
    let setParticleDirection=function(p){
        let angle=anime.random(0,360)*Math.PI/180
		let value=canvasEl.height/1.75
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
		if(goldenPie){
			p.radius=anime.random(50,60)
		}else{
			p.radius=anime.random(8,12)
		}
        p.endPos=setParticleDirection(p)
        p.draw=function(){
			if(goldenPie){
				let img=document.getElementById("upgradeParticalAsset")
            	ctx.drawImage(img,p.x,p.y,p.radius,p.radius)
			}else{
				ctx.beginPath()
				ctx.arc(p.x,p.y,p.radius,0,2*Math.PI)
				ctx.fillStyle=p.color
				ctx.fill()
			}
        }
        return p
    }
    let renderParticle=function(anim){
        for(let i=0;i<anim.animatables.length;i++){
            anim.animatables[i].target.draw()
        }
    }
    let animateParticles=function(x,y){
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
            easing:'easeOutCirc',
            update:renderParticle
        })
    }
    let render=anime({
        duration:350,
        update:function(){
            ctx.clearRect(0,0,canvasEl.width,canvasEl.height)
        },
        complete:function(){
            canvasEl.remove()
        }
    })
    render.play()
	if(goldenPie){
		animateParticles(canvasEl.width/2,canvasEl.height/2)
	}else{
		animateParticles(canvasEl.width/4.8,hvar)
	}
}
