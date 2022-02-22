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
masterChefPrice=100000
masterChefUnlocked=false
hasSeenCreditsThisSession=false
settingsMute=false

$(document).ready(()=>{
	loadGame()
	a=localStorage.getItem("lastLogTime")
	if(a!=null&&a!=undefined&&a!=NaN){
		a=Date.parse(a)
		b=Date.parse(new Date())
		c=((assistantChefAmount*assistantChefMultiplier)+piesPerSecond)*((b-a)/1000)
		pies=pies+c
		messageGame("Made "+c+" Pies While Gone")
	}
	tickGame()
})

$(window).bind("load",()=>{
	$("#creditsOverlay").fadeOut(750)
})

$("#pie").click((e)=>{
	$("#pie").stop(true,false)
	$("#pie").css({"width":"90%","left":"5%","top":"15%","transform":"rotate("+pieRotationDeg+"deg)"})
	pieClickAnimationId=pieClickAnimationId+1
	$("body").append('<div id="pieInd'+pieClickAnimationId+'" hidden style="pointer-events:none;"><b>+'+piesPerClick*pieClickMultiplier+'</b></div>')
	$("#pieInd" + pieClickAnimationId).css("top",(e.pageY+getRndInteger(-10,10))+"px")
	$("#pieInd" + pieClickAnimationId).css("left",(e.pageX+getRndInteger(-10,10))+"px")
	$("#pieInd" + pieClickAnimationId).css("position","absolute")
	$("#pieInd" + pieClickAnimationId).css("font-size","22.5px")
	$("#pieInd" + pieClickAnimationId).css("color","white")
	$("#pieInd" + pieClickAnimationId).css("animation","GoUp 2s forwards linear")
	$("#pieInd" + pieClickAnimationId).show()
	pies=pies+piesPerClick*pieClickMultiplier
	refreshGame()
	$("#pie").animate({"width":"95%","left":"2.5%","top":"14%"},40)
	$("#pie").animate({"width":"90%","left":"5%","top":"15%"},100)
	removeElem("#pieInd"+pieClickAnimationId)
})

function removeElem(animID){setTimeout(()=>{$(animID).remove()},2250)}
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
}

function startClickUpgrade(){
	if(canAfford(pieClickUpgradePrice)){
		charge(pieClickUpgradePrice)
		pieClickUpgradePrice=Math.round(pieClickUpgradePrice*5)
		pieUpgradeTier=pieUpgradeTier+1
		if(pieUpgradeTier==1){
			pieClickMultiplier=2
		}else if(pieUpgradeTier==2){
			pieClickMultiplier=3
		}else if(pieUpgradeTier==3){
			pieClickMultiplier=5
		}else if(pieUpgradeTier==4){
			pieClickMultiplier=7
		}
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(pieClickUpgradePrice)+")")
	}
}

function sleep(ms){
	return new Promise(resolve=>setTimeout(resolve,ms))
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
	$("#creditsTitle").html("Concept Builder")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(3000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Kylea Reed")
	$("#creditsTitle").html("Concept Builder")
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
	alert("[Debug Variable Menu]\n\nPie.Count?: "+pies+"\nPie.PerSec?: "+piesPerSecond+"\nPie.PerClick?: "+piesPerClick+"\n\
Pie.ClickMult?: "+pieClickMultiplier+"\nPie.UpTier?: "+pieUpgradeTier+"\nPie.AnimID?: "+pieClickAnimationId+"\n\
Settings.Mute?: "+settingsMute+"\nCredits.Seen?: "+hasSeenCreditsThisSession+"\nGame.Saved?: "+(localStorage.getItem("IsGameSaved?")*1?'true':'false')+"\n\
Pie.ClickUpPrice?: "+pieClickUpgradePrice+"\nPie.OvenPrice?: "+pieClickOvenPrice+"\nPie.CanAffordOven?: "+canAfford(pieClickOvenPrice)+"\n\
Pie.CanAffordUpgrade?: "+canAfford(pieClickUpgradePrice)+"\nPie.MasterChefPrice?: "+masterChefPrice+"Pie.MasterChefUnlocked?: "+masterChefUnlocked+"\n\
Pie.AssistantChefMult?: "+assistantChefMultiplier+"Pie.AssistantChefAmount?: "+assistantChefAmount)
}

async function messageGame(message){
	$("#messageBar").stop(true,true)
	$("#messageBarText").html(message)
	$("#messageBar").fadeIn(250)
	await sleep(1500)
	$("#messageBar").fadeOut(250)
}

function charge(amount){
	pies=pies-amount
	refreshGame()
}

function purchaseOven(){
	if(canAfford(pieClickOvenPrice)){
		piesPerClick=piesPerClick+1
		charge(pieClickOvenPrice)
		pieClickOvenPrice=Math.round(pieClickOvenPrice*1.25)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(pieClickOvenPrice)+")")
	}
}

function purchaseChef(){
	if(canAfford(assistantChefPrice)){
		assistantChefAmount=assistantChefAmount+1
		charge(assistantChefPrice)
		assistantChefPrice=Math.round(assistantChefPrice*1.25)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(assistantChefPrice)+")")
	}
}

function purchaseMasterChef(){
	if(canAfford(masterChefPrice)){
		assistantChefMultiplier=2
		charge(masterChefPrice)
		masterChefUnlocked=true
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(masterChefPrice)+")")
	}
}

function piesToNumber(value){
	// Eighteen for Quintillion
	return Math.abs(Number(value))>=1.0e+15
    ?(Math.abs(Number(value))/1.0e+15).toFixed(2)+"Q"
	// Fifteen Zeroes for Quadrillion
    :Math.abs(Number(value))>=1.0e+15
    ?(Math.abs(Number(value))/1.0e+15).toFixed(2)+"q"
	// Twelve Zeroes for Trillions
	:Math.abs(Number(value))>=1.0e+12
    ?(Math.abs(Number(value))/1.0e+12).toFixed(2)+"t"
    // Nine Zeroes for Billions
    :Math.abs(Number(value))>=1.0e+9
    ?(Math.abs(Number(value))/1.0e+9).toFixed(2)+"B"
    // Six Zeroes for Millions 
    :Math.abs(Number(value))>=1.0e+6
    ?(Math.abs(Number(value))/1.0e+6).toFixed(2)+"M"
    // Three Zeroes for Thousands
    :Math.abs(Number(value))>=1.0e+3
    ?(Math.abs(Number(value))/1.0e+3).toFixed(2)+"K"
    :Math.abs(Number(value))
}

function tickGame(){
	pies=pies+(assistantChefAmount*assistantChefMultiplier)+piesPerSecond
	saveGame()
	refreshGame()
	setTimeout(()=>{tickGame()},1000)
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
