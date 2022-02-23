pies=0
piesPerClick=1
piesPerSecond=0
pieClickAnimationId=0
pieClickMultiplier=1
pieClickUpgradePrice=500
pieClickOvenPrice=15
pieUpgradeTier=0
pieRotationDeg=0
assistantChefAmount=0
assistantChefMultiplier=1
assistantChefPrice=10
masterChefPrice=10000
masterChefUnlocked=false
rollingPinsPrice=250
revampKitchenPrice=10000
nukePiePrice=10000000000000
hasSeenCreditsThisSession=false
settingsMute=false
ticksUntilMSGFades=0

$(document).ready(()=>{
	loadGame()
	a=localStorage.getItem("lastLogTime")
	if(a!=null&&a!=undefined&&a!=NaN){
		a=Date.parse(a)
		b=Date.parse(new Date())
		c=((assistantChefAmount*assistantChefMultiplier)+piesPerSecond)*((b-a)/1000)
		pies=pies+c
		if(isNaN(pies)||pies==undefined||pies==null){
			messageGame("Error Detected. Resetting Game In 5 Seconds")
			ticksUntilMSGFades=2
			resetGameInMS(5000)
		}else{
			messageGame("Made "+piesToNumber(c)+" Pies While Gone")
		}
	}
	$('[data-toggle="tooltip"]').tooltip()
	tickGame()
})

$(window).bind("load",()=>{
	$("#creditsOverlay").fadeOut(750)
})

$("#pie").click((e)=>{
	$("#pie").stop(true,false)
	$("#pie").css({"width":"90%","left":"5%","top":"15%","transform":"rotate("+pieRotationDeg+"deg)"})
	pieClickAnimationId=pieClickAnimationId+1
	$("body").append('<div id="pieInd'+pieClickAnimationId+'" style="pointer-events:none;">+'+piesPerClick*pieClickMultiplier+'</div>')
	$("#pieInd"+pieClickAnimationId).css("top",(e.pageY+getRndInteger(-10,10))+"px")
	$("#pieInd"+pieClickAnimationId).css("left",(e.pageX+getRndInteger(-10,10))+"px")
	$("#pieInd"+pieClickAnimationId).css("position","absolute")
	$("#pieInd"+pieClickAnimationId).css("color","white")
	$("#pieInd"+pieClickAnimationId).css("font-weight","700")
	$("#pieInd"+pieClickAnimationId).css("font-size","25px")
	$("#pieInd"+pieClickAnimationId).css("animation","GoUp 2s forwards linear")
	$("#pieInd"+pieClickAnimationId).show()
	pies=pies+piesPerClick*pieClickMultiplier
	refreshGame()
	$("#pie").animate({"width":"95%","left":"2.5%","top":"14%"},40)
	$("#pie").animate({"width":"90%","left":"5%","top":"15%"},100)
	removeElem("#pieInd"+pieClickAnimationId)
})

function round(number){return Math.round(number)}
document.addEventListener("contextmenu",(e)=>{e.preventDefault()})
function removeElem(animID){setTimeout(()=>{$(animID).remove()},2250)}
function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
function getRndInteger(min,max){return Math.floor(Math.random()*(max-min+1))+min}

function saveGame(){
	localStorage.setItem("pies",pies)
	localStorage.setItem("piesPerClick",piesPerClick)
	localStorage.setItem("piesPerSecond",piesPerSecond)
	localStorage.setItem("pieUpgradeTier",pieUpgradeTier)
	localStorage.setItem("pieClickMultiplier",pieClickMultiplier)
	localStorage.setItem("pieClickUpgradePrice",pieClickUpgradePrice)
	localStorage.setItem("pieClickOvenPrice",pieClickOvenPrice)
	localStorage.setItem("assistantChefPrice",assistantChefPrice)
	localStorage.setItem("lastLogTime",new Date())
	localStorage.setItem("assistantChefAmount",assistantChefAmount)
	localStorage.setItem("assistantChefMultiplier",assistantChefMultiplier)
	localStorage.setItem("masterChefPrice",masterChefPrice)
	localStorage.setItem("masterChefUnlocked",masterChefUnlocked)
	localStorage.setItem("rollingPinsPrice",rollingPinsPrice)
	localStorage.setItem("revampKitchenPrice",revampKitchenPrice)
	localStorage.setItem("nukePiePrice",nukePiePrice)
}

function loadGame(){
	if(lsExists("pies"))pies=localStorage.getItem("pies")*1
	if(lsExists("piesPerClick"))piesPerClick=localStorage.getItem("piesPerClick")*1
	if(lsExists("piesPerSecond"))piesPerSecond=localStorage.getItem("piesPerSecond")*1
	if(lsExists("pieUpgradeTier"))pieUpgradeTier=localStorage.getItem("pieUpgradeTier")*1
	if(lsExists("pieClickMultiplier"))pieClickMultiplier=localStorage.getItem("pieClickMultiplier")*1
	if(lsExists("pieClickUpgradePrice"))pieClickUpgradePrice=localStorage.getItem("pieClickUpgradePrice")*1
	if(lsExists("pieClickOvenPrice"))pieClickOvenPrice=localStorage.getItem("pieClickOvenPrice")*1
	if(lsExists("assistantChefPrice"))assistantChefPrice=localStorage.getItem("assistantChefPrice")*1
	if(lsExists("assistantChefAmount"))assistantChefAmount=localStorage.getItem("assistantChefAmount")*1
	if(lsExists("assistantChefMultiplier"))assistantChefMultiplier=localStorage.getItem("assistantChefMultiplier")*1
	if(lsExists("masterChefPrice"))masterChefPrice=localStorage.getItem("masterChefPrice")*1
	if(lsExists("masterChefUnlocked"))masterChefUnlocked=localStorage.getItem("masterChefUnlocked").StringToBool()
	if(lsExists("rollingPinsPrice"))rollingPinsPrice=localStorage.getItem("rollingPinsPrice")*1
	if(lsExists("revampKitchenPrice"))revampKitchenPrice=localStorage.getItem("revampKitchenPrice")*1
	if(lsExists("nukePiePrice"))nukePiePrice=localStorage.getItem("nukePiePrice")*1
}

function refreshGame(){
	$("#pieCountReal").html("Pies: "+piesToNumber(pies))
	$("#pieGRateReal").html("Pies/Sec: "+piesToNumber((assistantChefAmount*assistantChefMultiplier)+piesPerSecond))
	/* pieUpgradeTier Mapping:
	0 - Normal Pie   |  Pumpkin Pie Upgrade
	1 - Pumpkin Pie  |  Apple Pie Upgrade
	2 - Apple Pie    |  Cheesecake Upgrade
	3 - Cheesecake   |  Oreo Pie?
	4 - Oero Pie     |  No Upgrade
	*/
	if(pieUpgradeTier==0){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonPumpkinPie.png")
		$("#pieBtn").attr("src","./assets/Pie.png")
	}else if(pieUpgradeTier==1){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonApplePie.png")
		$("#pieBtn").attr("src","./assets/PiePumpkin.png")
	}else if(pieUpgradeTier==2){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonCheesecake.png")
		$("#pieBtn").attr("src","./assets/PieApple.png")
	}else if(pieUpgradeTier==3){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonOreoCheesecake.png")
		$("#pieBtn").attr("src","./assets/PieCheesecake.png")
	}else if(pieUpgradeTier==4){
		$("#InitialUpgrade").css({"display":"none"})
		$("#pieBtn").attr("src","./assets/PieOreoCheesecake.png")
	}if(masterChefUnlocked){
		$("#MasterChefContainer").css({"display":"none"})
	}
	if(canAfford(pieClickOvenPrice))$("#OvenUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#OvenUpgradeContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(pieClickUpgradePrice)&&pieUpgradeTier!=4)$("#InitialUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#InitialUpgradeContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(assistantChefPrice))$("#AssistantChefContainer").css({"filter":"brightness(1)"})
	else $("#AssistantChefContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(masterChefPrice))$("#MasterChefContainer").css({"filter":"brightness(1)"})
	else $("#MasterChefContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(rollingPinsPrice))$("#RollingPinsContainer").css({"filter":"brightness(1)"})
	else $("#RollingPinsContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(revampKitchenPrice))$("#RevampKitchenContainer").css({"filter":"brightness(1)"})
	else $("#RevampKitchenContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(nukePiePrice))$("#NukePieContainer").css({"filter":"brightness(1)"})
	else $("#NukePieContainer").css({"filter":"brightness(0.5)"})
}

function startClickUpgrade(elem){
	if(canAfford(pieClickUpgradePrice)){
		charge(pieClickUpgradePrice)
		pieClickUpgradePrice=round(pieClickUpgradePrice*5)
		pieUpgradeTier=pieUpgradeTier+1
		if(pieUpgradeTier==1){
			clickFireworks($(elem),50)
			pieClickMultiplier=2
		}else if(pieUpgradeTier==2){
			clickFireworks($(elem),50)
			pieClickMultiplier=3
		}else if(pieUpgradeTier==3){
			clickFireworks($(elem),50)
			pieClickMultiplier=5
		}else if(pieUpgradeTier==4){
			pieClickMultiplier=7
		}
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(pieClickUpgradePrice)+")")
	}
}

async function PleasePlayTheCredits(){
	settingsMute=true
	$("#creditsOverlay").fadeIn(1000)
	await sleep(500)
	$("#creditsName").html("kgsensei")
	$("#creditsTitle").html("Lead Programmer")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(3000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Azuriah Jerez")
	$("#creditsTitle").html("Graphic Designer")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(3000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Caleb Rhinehart")
	$("#creditsTitle").html("Creative Director")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(3000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Kylea Reed")
	$("#creditsTitle").html("Project Manager")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(3000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Lucient Chapin")
	$("#creditsTitle").html("Test Player")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(3000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("CopyPaste Games")
	$("#creditsTitle").html("Copyright &copy; 2022")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(3000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(750)
	$("#creditsOverlay").fadeOut(1000)
	settingsMute=false
	await sleep(250)
	if(hasSeenCreditsThisSession==false){
		x=getRndInteger(250,1000)
		messageGame("Thanks For Watching The Credits (+"+x+" Pies)")
		pies=pies+x
	}
	hasSeenCreditsThisSession=true
	refreshGame()
}

function canAfford(itemPrice){
	if(pies>=itemPrice)return true
	else return false
}

function debugMenu(){
	alert("Get Trolled")
}

async function messageGame(message){
	ticksUntilMSGFades=ticksUntilMSGFades+2
	$("#messageBar").stop(true,true)
	$("#messageBarText").html(message)
	$("#messageBar").fadeIn(100)
}

function charge(amount){
	pies=pies-amount
	refreshGame()
}

function purchaseOven(elem){
	if(canAfford(pieClickOvenPrice)){
		clickFireworks($(elem),50)
		piesPerClick=piesPerClick+1
		charge(pieClickOvenPrice)
		pieClickOvenPrice=round(pieClickOvenPrice*1.15)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(pieClickOvenPrice)+")")
	}
}

function purchaseChef(elem){
	if(canAfford(assistantChefPrice)){
		clickFireworks($(elem),50)
		assistantChefAmount=assistantChefAmount+1
		charge(assistantChefPrice)
		assistantChefPrice=round(assistantChefPrice*1.15)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(assistantChefPrice)+")")
	}
}

function purchaseMasterChef(elem){
	if(canAfford(masterChefPrice)){
		assistantChefMultiplier=2
		charge(masterChefPrice)
		masterChefUnlocked=true
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(masterChefPrice)+")")
	}
}

function purchaseUpgradeRollingPins(elem){
	if(canAfford(rollingPinsPrice)){
		clickFireworks($(elem),50)
		piesPerSecond=piesPerSecond+25
		charge(rollingPinsPrice)
		rollingPinsPrice=round(rollingPinsPrice*1.5)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(rollingPinsPrice)+")")
	}
}

function purchaseRevampKitchen(elem){
	if(canAfford(revampKitchenPrice)){
		clickFireworks($(elem),50)
		piesPerSecond=piesPerSecond+round(piesPerSecond*0.1)
		piesPerClick=piesPerClick+round(piesPerClick*0.1)
		charge(revampKitchenPrice)
		revampKitchenPrice=round(revampKitchenPrice*2.5)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(revampKitchenPrice)+")")
	}
}

function nuclearPieReactor(elem){
	if(canAfford(nukePiePrice)){
		clickFireworks($(elem),50)
		piesPerSecond=round(piesPerSecond*100)
		charge(nukePiePrice)
		nukePiePrice=round(nukePiePrice*5)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(nukePiePrice)+")")
	}
}

function piesToNumber(value){
	// 21 Zeroes for Septillion
	return Math.abs(Number(value))>=1.0e+24
    ?(Math.abs(Number(value))/1.0e+24).toFixed(2)+"S"
	// 21 Zeroes for Sextillion
	:Math.abs(Number(value))>=1.0e+21
    ?(Math.abs(Number(value))/1.0e+21).toFixed(2)+"s"
	// 18 Zeroes for Quintillion
	:Math.abs(Number(value))>=1.0e+18
    ?(Math.abs(Number(value))/1.0e+18).toFixed(2)+"Q"
	// 15 Zeroes for Quadrillion
    :Math.abs(Number(value))>=1.0e+15
    ?(Math.abs(Number(value))/1.0e+15).toFixed(2)+"q"
	// 12 Zeroes for Trillions
	:Math.abs(Number(value))>=1.0e+12
    ?(Math.abs(Number(value))/1.0e+12).toFixed(2)+"t"
    // 9 Zeroes for Billions
    :Math.abs(Number(value))>=1.0e+9
    ?(Math.abs(Number(value))/1.0e+9).toFixed(2)+"B"
    // 6 Zeroes for Millions 
    :Math.abs(Number(value))>=1.0e+6
    ?(Math.abs(Number(value))/1.0e+6).toFixed(2)+"M"
    // 3 Zeroes for Thousands
    :Math.abs(Number(value))>=1.0e+3
    ?(Math.abs(Number(value))/1.0e+3).toFixed(2)+"K"
    :Math.abs(Number(value))
}

function tickGame(){
	pies=pies+(assistantChefAmount*assistantChefMultiplier)+piesPerSecond
	if(getRndInteger(1,150)==1){goldenPie()}
	saveGame()
	refreshGame()
	ticksUntilMSGFades=ticksUntilMSGFades-1
	if(ticksUntilMSGFades<0)ticksUntilMSGFades=0
	if(ticksUntilMSGFades>=2)ticksUntilMSGFades=1
	if(ticksUntilMSGFades==0)$("#messageBar").fadeOut(100)
	setTimeout(()=>{tickGame()},1000)
}

async function resetGameInMS(ms){
	await sleep(ms)
	localStorage.clear()
	window.location.reload()
}

function lsExists(key){
	x=localStorage.getItem(key)
	if(x==null||x==undefined||x==NaN)return false
	else return true
}

String.prototype.StringToBool=function(){
	if(this=='true')return true
	else return false
}

async function goldenPie(){
	if(!$('#goldenPie').length){
		$('#goldenPie').remove()
		a=$(document).width()-$(document).height()*0.05
		b=$(document).height()-$(document).height()*0.05
		c=0
		x=getRndInteger(0,a)
		y=getRndInteger(0,b)
		z=`<div id="goldenPie" style="position:fixed;left:${x}px;top:${y}px;height:5%;width:auto;display:none;" onclick="goldenPieFunc()">
			<img src="./assets/GoldenPie.png" style="width:100%;height:100%;">
		</div>`
		$('body').append(z)
		for(i=0;i<501;i++){
			if(i==0)$('#goldenPie').fadeIn(500)
			$('#goldenPie').css({"transform":"rotate("+c+"deg)"})
			await sleep(10)
			c=c+1
			if(i==350)$('#goldenPie').fadeOut(1000)
		}
		await sleep(500)
		$('#goldenPie').remove()
	}
}

async function goldenPieFunc(){
	$('#goldenPie').fadeOut(100)
	await sleep(100)
	$('#goldenPie').remove()
	w=getRndInteger(round(pies/4),round(pies/2))
	pies=pies+w
	messageGame("Lucky! +"+piesToNumber(w)+" pies!")
}
