pies=0
piesPerClick=1
piesPerSecond=0
pieClickAnimationId=0
pieClickMultiplier=1
pieClickUpgradePrice=500
pieClickOvenPrice=5
pieUpgradeTier=0
hasSeenCreditsThisSession=false
settingsMute=false

$(document).ready(()=>{
	loadGame()
	refreshGame()
})

$(window).bind("load",()=>{
	$("#creditsOverlay").fadeOut(750)
	messageGame("!!THIS GAME IS STILL UNDER DEVELOPMENT!!")
})

$("#pie").click((e)=>{
	$("#pie").stop(true,false)
	$("#pie").css({"width":"90%","left":"5%","top":"15%"})
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
	saveGame()
	refreshGame()
	$("#pie").animate({"width":"95%","left":"2.5%","top":"14%"},40)
	$("#pie").animate({"width":"90%","left":"5%","top":"15%"},100)
	removeElem("#pieInd"+pieClickAnimationId)
})

function removeElem(animID){setTimeout(()=>{$(animID).remove()},2250)}
function getRndInteger(min,max){return Math.floor(Math.random()*(max-min+1))+min}

function saveGame(){
	localStorage.setItem("pies",pies);
	localStorage.setItem("piesPerClick",piesPerClick);
	localStorage.setItem("piesPerSecond",piesPerSecond);
	localStorage.setItem("pieUpgradeTier",pieUpgradeTier);
	localStorage.setItem("pieClickMultiplier",pieClickMultiplier);
	localStorage.setItem("pieClickUpgradePrice",pieClickUpgradePrice);
	localStorage.setItem("pieClickOvenPrice",pieClickOvenPrice);
	localStorage.setItem("IsGameSaved?","1")
}

function loadGame(){
	if(localStorage.getItem("IsGameSaved?")*1==1){
		pies=localStorage.getItem("pies")*1
		piesPerClick=localStorage.getItem("piesPerClick")*1
		piesPerSecond=localStorage.getItem("piesPerSecond")*1
		pieUpgradeTier=localStorage.getItem("pieUpgradeTier")*1
		pieClickMultiplier=localStorage.getItem("pieClickMultiplier")*1
		pieClickUpgradePrice=localStorage.getItem("pieClickUpgradePrice")*1
		pieClickOvenPrice=localStorage.getItem("pieClickOvenPrice")*1
	}
}

function refreshGame(){
	$("#pieCountReal").html("Pies: "+piesToNumber(pies))
	$("#pieGRateReal").html("Pies/Sec: "+piesToNumber(piesPerSecond))
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
	}
	if(canAfford(pieClickOvenPrice))$("#OvenUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#OvenUpgradeContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(pieClickUpgradePrice)&&pieUpgradeTier!=4)$("#InitialUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#InitialUpgradeContainer").css({"filter":"brightness(0.5)"})
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
		saveGame()
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+pieClickUpgradePrice+")")
	}
}

function sleep(ms){
	return new Promise(resolve=>setTimeout(resolve,ms))
}

async function PleasePlayTheCredits(){
	settingsMute=true
	hasSeenCreditsThisSession=true
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
	await sleep(100)
	x=getRndInteger(50,500)
	messageGame("Thanks For Watching The Credits (+"+x+" Pies)")
	pies=pies+x
	saveGame()
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
Pie.CanAffordUpgrade?: "+canAfford(pieClickUpgradePrice))
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
		messageGame("You Can\'t Afford This (Price: "+pieClickOvenPrice+")")
	}
}

function piesToNumber(value){
    // Nine Zeroes for Billions
    return Math.abs(Number(value))>=1.0e+9
    ?(Math.abs(Number(value))/1.0e+9).toFixed(2)+"B"
    // Six Zeroes for Millions 
    :Math.abs(Number(value))>=1.0e+6
    ?(Math.abs(Number(value))/1.0e+6).toFixed(2)+"M"
    // Three Zeroes for Thousands
    :Math.abs(Number(value))>=1.0e+3
    ?(Math.abs(Number(value))/1.0e+3).toFixed(2)+"K"
    :Math.abs(Number(value))
}
