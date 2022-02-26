pies                       = 0
piesPerClick               = 1
piesPerSecond              = 0
pieClickAnimationId        = 0
pieClickMultiplier         = 1
pieClickUpgradePrice       = 500
pieClickOvenPrice          = 15
pieUpgradeTier             = 0
chefUpgradeTier            = 0
chefUpgradePrice           = 5000
pieRotationDeg             = 0
assistantChefAmount        = 0
assistantChefMultiplier    = 1
assistantChefPrice         = 10
hangFlyersPrice            = 2500
masterChefPrice            = 10000
masterChefUnlocked         = false
rollingPinsPrice           = 250
revampKitchenPrice         = 10000
kitchenBackgroundImage     = 0
nukePiePrice               = 1000000000000
hasSeenCreditsThisSession  = false
ticksUntilMSGFades         = 0
doSaveGame                 = true
/*     Anticheat Variables    */
oldPiex                    = -1
oldPiey                    = -1
initalPageWidth            = $(document).width()
last20clickTimestamps      = []
isClickedRecent            = 0
/*     Settings Variables     */
settingsMute               = false
settingsClickAnimations    = true
settingsPurchaseAnimations = true
settingsAbbreviateNumbers  = true

$(document).ready(()=>{
	loadGame()
	a=localStorage.getItem("lastLogTime")
	if(a!=null&&a!=undefined&&a!=NaN){
		a=Date.parse(a)
		b=Date.parse(new Date())
		c=((assistantChefAmount*assistantChefMultiplier)+piesPerSecond)*((b-a)/1000)
		pies=pies+c
		waitThenMessageGame("Made "+piesToNumber(c)+" Pies While Gone",1000)
	}
	$('[data-toggle="tooltip"]').tooltip()
	tickGame()
})

async function waitThenMessageGame(message,ms){
	await sleep(ms)
	messageGame(message)
}

$(window).bind("load",()=>{
	$('#copyPasteLogo').delay(200).fadeIn(250)
	$('#copyPasteLogo').delay(775).fadeOut(250)
	$("#introScreen").delay(1500).fadeOut(750)
})

$("#pie").click((e)=>{
	$("#pie").stop(true,false)
	Anticheat.hasClicked=true
	Anticheat.clicks=Anticheat.clicks+1
	if(isClickedRecent<=5)isClickedRecent=isClickedRecent+1
	if(oldPiex==e.pageX&&oldPiey==e.pageY){Anticheat.samePosition=Anticheat.samePosition+1}
	else{Anticheat.samePosition=0}
	oldPiex=e.pageX
	oldPiey=e.pageY
	last20clickTimestamps.append(Date.now())
	if(last20clickTimestamps.length>20)last20clickTimestamps.shift()
	if(settingsClickAnimations){
		$("#pie").css({"width":"90%","left":"5%","top":"15%","transform":"rotate("+pieRotationDeg+"deg)"})
		pieClickAnimationId=pieClickAnimationId+1
		$("body").append('<div id="pieInd'+pieClickAnimationId+'" style="pointer-events:none;">+'+piesToNumber(piesPerClick*pieClickMultiplier)+'</div>')
		$("#pieInd"+pieClickAnimationId).css("top",(e.pageY+getRndInteger(-10,10))+"px")
		$("#pieInd"+pieClickAnimationId).css("left",(e.pageX+getRndInteger(-10,10))+"px")
		$("#pieInd"+pieClickAnimationId).css("position","absolute")
		$("#pieInd"+pieClickAnimationId).css("color","white")
		$("#pieInd"+pieClickAnimationId).css("font-weight","700")
		$("#pieInd"+pieClickAnimationId).css("font-size","25px")
		$("#pieInd"+pieClickAnimationId).css("animation","GoUp 2s forwards linear")
		$("#pieInd"+pieClickAnimationId).show()
		$("#pie").animate({"width":"95%","left":"2.5%","top":"14%"},40)
		$("#pie").animate({"width":"90%","left":"5%","top":"15%"},100)
		removeElem("#pieInd"+pieClickAnimationId)
	}
	pies=pies+piesPerClick*pieClickMultiplier
	refreshGame()
})

function round(number){return Math.round(number)}
document.addEventListener("contextmenu",(e)=>{e.preventDefault()})
function removeElem(animID){setTimeout(()=>{$(animID).remove()},2250)}
function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
function CLog(msg){console.log("[game.js "+new Date().getTime()+"] "+msg)}
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
	localStorage.setItem("chefUpgradeTier",chefUpgradeTier)
	localStorage.setItem("chefUpgradePrice",chefUpgradePrice)
	localStorage.setItem("kitchenBackgroundImage",kitchenBackgroundImage)
	// Settings Are Saved Below
	localStorage.setItem("settingsMute",settingsMute)
	localStorage.setItem("settingsClickAnimations",settingsClickAnimations)
	localStorage.setItem("settingsPurchaseAnimations",settingsPurchaseAnimations)
	localStorage.setItem("settingsAbbreviateNumbers",settingsAbbreviateNumbers)
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
	if(lsExists("masterChefUnlocked"))masterChefUnlocked=localStorage.getItem("masterChefUnlocked").stringToBool()
	if(lsExists("rollingPinsPrice"))rollingPinsPrice=localStorage.getItem("rollingPinsPrice")*1
	if(lsExists("revampKitchenPrice"))revampKitchenPrice=localStorage.getItem("revampKitchenPrice")*1
	if(lsExists("nukePiePrice"))nukePiePrice=localStorage.getItem("nukePiePrice")*1
	if(lsExists("chefUpgradeTier"))chefUpgradeTier=localStorage.getItem("chefUpgradeTier")*1
	if(lsExists("chefUpgradePrice"))chefUpgradePrice=localStorage.getItem("chefUpgradePrice")*1
	if(lsExists("kitchenBackgroundImage"))kitchenBackgroundImage=localStorage.getItem("kitchenBackgroundImage")*1
	// Settings Are Loaded Below
	if(lsExists("settingsMute"))settingsMute=localStorage.getItem("settingsMute").stringToBool()
	if(lsExists("settingsClickAnimations"))settingsClickAnimations=localStorage.getItem("settingsClickAnimations").stringToBool()
	if(lsExists("settingsPurchaseAnimations"))settingsPurchaseAnimations=localStorage.getItem("settingsPurchaseAnimations").stringToBool()
	if(lsExists("settingsAbbreviateNumbers"))settingsAbbreviateNumbers=localStorage.getItem("settingsAbbreviateNumbers").stringToBool()
}

function refreshGame(){
	$("#pieCountReal").html("Pies: "+piesToNumber(pies))
	$("#pieGRateReal").html("Pies/Sec: "+piesToNumber((assistantChefAmount*assistantChefMultiplier)+piesPerSecond))
	/* pieUpgradeTier Mapping:
	0 = Normal Pie      |  Pumpkin Pie Upgrade
	1 = Pumpkin Pie     |  Apple Pie Upgrade
	2 = Apple Pie       |  Cheesecake Upgrade
	3 = Cheesecake      |  Oreo Pie Upgrade
	4 = Oero Pie        |  Lemon Meringue Upgrade
	5 = Lemon Meringue  |  Key Lime Upgrade
	6 = Key Lime        |  Chocolate Cream Upgrade
	7 = Chocolate Cream |  Strawberry Pie Upgrade
	8 = Strawberry Pie  |  No Upgrade
	*/
	if(pieUpgradeTier==0&&$("#pieBtn").attr("src")!="./assets/Pie.png"){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonPumpkinPie.png")
		$("#pieBtn").attr("src","./assets/Pie.png")
	}else if(pieUpgradeTier==1&&$("#pieBtn").attr("src")!="./assets/PiePumpkin.png"){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonApplePie.png")
		$("#pieBtn").attr("src","./assets/PiePumpkin.png")
	}else if(pieUpgradeTier==2&&$("#pieBtn").attr("src")!="./assets/PieApple.png"){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonCheesecake.png")
		$("#pieBtn").attr("src","./assets/PieApple.png")
	}else if(pieUpgradeTier==3&&$("#pieBtn").attr("src")!="./assets/PieCheesecake.png"){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonOreoCheesecake.png")
		$("#pieBtn").attr("src","./assets/PieCheesecake.png")
	}else if(pieUpgradeTier==4&&$("#pieBtn").attr("src")!="./assets/PieOreoCheesecake.png"){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonLemonMeringuePie.png")
		$("#pieBtn").attr("src","./assets/PieOreoCheesecake.png")
	}else if(pieUpgradeTier==5&&$("#pieBtn").attr("src")!="./assets/PieLemonMeringue.png"){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonKeyLimePie.png")
		$("#pieBtn").attr("src","./assets/PieLemonMeringue.png")
	}else if(pieUpgradeTier==6&&$("#pieBtn").attr("src")!="./assets/PieKeyLime.png"){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonChocolateCreamPie.png")
		$("#pieBtn").attr("src","./assets/PieKeyLime.png")
	}else if(pieUpgradeTier==7&&$("#pieBtn").attr("src")!="./assets/PieChocolateCream.png"){
		$("#InitialUpgrade").attr("src","./assets/UpgradeButtonStrawberryPie.png")
		$("#pieBtn").attr("src","./assets/PieChocolateCream.png")
	}else if(pieUpgradeTier==8&&$("#pieBtn").attr("src")!="./assets/PieStrawberry.png"){
		$("#InitialUpgradeContainer").css({"display":"none"})
		$("#pieBtn").attr("src","./assets/PieStrawberry.png")
	}
	/* Chef Tier Mapping
	0 = No Chef Upgrade
	1 = Apprentice Chef Upgrade
	2 = Advanced Chef Upgrade
	3 = Expert Chef Upgrade
	4 = Master Chef Upgrade
	5 = Grand Master Chef Upgrade
	6 = GM Chef I
	7 = GM Chef II
	8 = GM Chef III
	9 = GM Chef IV
	*/
	if(chefUpgradeTier==0&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonApprenticeChef.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonApprenticeChef.png")
	}else if(chefUpgradeTier==1&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonAdvancedChef.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonAdvancedChef.png")
	}else if(chefUpgradeTier==2&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonExpertChef.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonExpertChef.png")
	}else if(chefUpgradeTier==3&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonMasterChef.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonMasterChef.png")
	}else if(chefUpgradeTier==4&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonGrandmasterChef.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonGrandmasterChef.png")
	}else if(chefUpgradeTier==5&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonGMChefPlatinumI.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonGMChefPlatinumI.png")
	}else if(chefUpgradeTier==6&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonGMChefPlatinumII.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonGMChefPlatinumII.png")
	}else if(chefUpgradeTier==7&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonGMChefPlatinumIII.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonGMChefPlatinumIII.png")
	}else if(chefUpgradeTier==8&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonGMChefPlatinumIV.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonGMChefPlatinumIV.png")
	}else if(chefUpgradeTier==9){
		$("#MasterChefContainer").css({"display":"none"})
	}
	if(chefUpgradeTier>=3){
		$("#UpgradeFlyersContainer").css({"display":"block"})
	}else{
		$("#UpgradeFlyersContainer").css({"display":"none"})
	}
	/* Background Image Mapping
	0 = Blue Background
	1 = Pink Background
	2 = White Background
	*/
	if(kitchenBackgroundImage==0&&$("#pieChild").attr("src")!="./assets/KitchenBackgroundBlue.png"){
		$('#pieChild').attr("src","./assets/KitchenBackgroundBlue.png")
	}else if(kitchenBackgroundImage==1&&$("#pieChild").attr("src")!="./assets/KitchenBackgroundPink.png"){
		$('#pieChild').attr("src","./assets/KitchenBackgroundPink.png")
	}else if(kitchenBackgroundImage==2&&$("#pieChild").attr("src")!="./assets/KitchenBackgroundWhite.png"){
		$('#pieChild').attr("src","./assets/KitchenBackgroundWhite.png")
	}
	// This is just to make the brightness change if you can afford something
	if(canAfford(pieClickOvenPrice))$("#OvenUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#OvenUpgradeContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(pieClickUpgradePrice))$("#InitialUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#InitialUpgradeContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(assistantChefPrice))$("#AssistantChefContainer").css({"filter":"brightness(1)"})
	else $("#AssistantChefContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(chefUpgradePrice))$("#MasterChefContainer").css({"filter":"brightness(1)"})
	else $("#MasterChefContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(rollingPinsPrice))$("#RollingPinsContainer").css({"filter":"brightness(1)"})
	else $("#RollingPinsContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(revampKitchenPrice))$("#RevampKitchenContainer").css({"filter":"brightness(1)"})
	else $("#RevampKitchenContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(nukePiePrice))$("#NukePieContainer").css({"filter":"brightness(1)"})
	else $("#NukePieContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(hangFlyersPrice))$("#UpgradeFlyersContainer").css({"filter":"brightness(1)"})
	else $("#UpgradeFlyersContainer").css({"filter":"brightness(0.5)"})
}

function settingsRefresh(){
	/*
	#settingsMuteGame
	#settingsDoClickAnimations
	#settingsDoPurchaseAnimations
	#settingAbbreviateNumbers
	*/
	if(settingsMute){
		$("#settingsMuteGame").attr("src","./assets/CheckBoxChecked.png")
	}else{
		$("#settingsMuteGame").attr("src","./assets/CheckBoxEmpty.png")
	}
	if(settingsClickAnimations){
		$("#settingsDoClickAnimations").attr("src","./assets/CheckBoxChecked.png")
	}
	else{
		$("#settingsDoClickAnimations").attr("src","./assets/CheckBoxEmpty.png")
	}
	if(settingsPurchaseAnimations){
		$("#settingsDoPurchaseAnimations").attr("src","./assets/CheckBoxChecked.png")
	}else{
		$("#settingsDoPurchaseAnimations").attr("src","./assets/CheckBoxEmpty.png")
	}
	if(settingsAbbreviateNumbers){
		$("#settingAbbreviateNumbers").attr("src","./assets/CheckBoxChecked.png")
	}
	else{
		$("#settingAbbreviateNumbers").attr("src","./assets/CheckBoxEmpty.png")
	}
	if(doSaveGame)saveGame()
}

function startClickUpgrade(elem){
	if(canAfford(pieClickUpgradePrice)){
		charge(pieClickUpgradePrice)
		pieClickUpgradePrice=round(pieClickUpgradePrice*5)
		pieUpgradeTier=pieUpgradeTier+1
		if(pieUpgradeTier==1){
			pieClickMultiplier=2
		}else if(pieUpgradeTier==2){
			pieClickMultiplier=3
		}else if(pieUpgradeTier==3){
			pieClickMultiplier=5
		}else if(pieUpgradeTier==4){
			pieClickMultiplier=7
		}else if(pieUpgradeTier==5){
			pieClickMultiplier=10
		}else if(pieUpgradeTier==6){
			pieClickMultiplier=15
		}else if(pieUpgradeTier==7){
			pieClickMultiplier=25
		}else if(pieUpgradeTier==8){
			pieClickMultiplier=35
		}
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(pieClickUpgradePrice)+")")
	}
}

function purchaseMasterChef(elem){
	/*
	Apprentice Chef
	Advanced Chef
	Expert Chef
	Master Chef
	Grandmaster Chef
	GM Chef I
	GM Chef II
	GM Chef III
	GM Chef IV
	*/
	if(canAfford(chefUpgradePrice)){
		charge(chefUpgradePrice)
		chefUpgradeTier=chefUpgradeTier+1
		if(chefUpgradeTier==1){
			chefUpgradePrice=round(chefUpgradePrice*3)
			assistantChefMultiplier=2
		}else if(chefUpgradeTier==2){
			chefUpgradePrice=round(chefUpgradePrice*3)
			assistantChefMultiplier=3
		}else if(chefUpgradeTier==3){
			chefUpgradePrice=round(chefUpgradePrice*3)
			assistantChefMultiplier=4
		}else if(chefUpgradeTier==4){
			chefUpgradePrice=round(chefUpgradePrice*3)
			assistantChefMultiplier=5
		}else if(chefUpgradeTier==5){
			chefUpgradePrice=round(chefUpgradePrice*5)
			assistantChefMultiplier=8
		}else if(chefUpgradeTier==6){
			chefUpgradePrice=round(chefUpgradePrice*5)
			assistantChefMultiplier=15
		}else if(chefUpgradeTier==7){
			chefUpgradePrice=round(chefUpgradePrice*5)
			assistantChefMultiplier=20
		}else if(chefUpgradeTier==8){
			chefUpgradePrice=round(chefUpgradePrice*5)
			assistantChefMultiplier=30
		}else if(chefUpgradeTier==9){
			assistantChefMultiplier=50
		}
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(chefUpgradePrice)+")")
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
	await sleep(2000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Azuriah Jerez")
	$("#creditsTitle").html("Graphic Designer")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(2000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Ian Paris-Wright")
	$("#creditsTitle").html("Music Artist")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(2000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Lucient Chapin")
	$("#creditsTitle").html("Creative Director")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(2000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Caleb Rhinehart")
	$("#creditsTitle").html("Creative Director")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(2000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Kylea Reed")
	$("#creditsTitle").html("Project Manager")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(2000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("CopyPaste Games")
	$("#creditsTitle").html("Copyright &copy; 2022")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(2000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(750)
	$("#creditsOverlay").fadeOut(1000)
	settingsMute=false
	await sleep(300)
	if(!hasSeenCreditsThisSession&&pies>=500){
		x=getRndInteger(round(pies/8),round(pies/10))
		messageGame("Thanks For Watching The Credits (+"+piesToNumber(x)+" Pies)")
		pies=pies+x
	}
	hasSeenCreditsThisSession=true
	refreshGame()
}

function canAfford(itemPrice){
	if(pies>=itemPrice)return true
	else return false
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
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
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
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		assistantChefAmount=assistantChefAmount+1
		charge(assistantChefPrice)
		assistantChefPrice=round(assistantChefPrice*1.2)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(assistantChefPrice)+")")
	}
}

function purchaseUpgradeRollingPins(elem){
	if(canAfford(rollingPinsPrice)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		piesPerSecond=piesPerSecond+25
		charge(rollingPinsPrice)
		rollingPinsPrice=round(rollingPinsPrice*2)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(rollingPinsPrice)+")")
	}
}

function purchaseRevampKitchen(elem){
	if(canAfford(revampKitchenPrice)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		piesPerSecond=piesPerSecond+round(piesPerSecond*0.1)
		piesPerClick=piesPerClick+round(piesPerClick*0.1)
		assistantChefAmount=assistantChefAmount+round(assistantChefAmount*0.1)
		charge(revampKitchenPrice)
		revampKitchenPrice=round(revampKitchenPrice*2.5)
		kitchenBackgroundIMOld=kitchenBackgroundImage
		kitchenBackgroundImage=getRndInteger(0,2)
		if(kitchenBackgroundImage==kitchenBackgroundIMOld){
			if(kitchenBackgroundImage==2||kitchenBackgroundImage==0){
				kitchenBackgroundImage=1
			}else if(kitchenBackgroundImage==1){kitchenBackgroundImage=2}
		}
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(revampKitchenPrice)+")")
	}
}

function nuclearPieReactor(elem){
	if(canAfford(nukePiePrice)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		piesPerSecond=round(piesPerSecond*100)
		charge(nukePiePrice)
		nukePiePrice=round(nukePiePrice*100)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(nukePiePrice)+")")
	}
}

function purchaseUpgradeFlyers(elem){
	if(canAfford(hangFlyersPrice)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		charge(hangFlyersPrice)
		hangFlyersPrice=round(hangFlyersPrice*2.5)
		amountGained=getRndInteger(5,15)
		assistantChefAmount=assistantChefAmount+amountGained
		messageGame("You got +"+amountGained+" new assistant chefs!")
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(hangFlyersPrice)+")")
	}
}

function piesToNumber(value){
	if(settingsAbbreviateNumbers){
		// 42 Zeros for Tredecillion
		return Math.abs(Number(value))>=1.0e+42
		?(Math.abs(Number(value))/1.0e+42).toFixed(1)+"T"
		// 39 Zeros for Duodecillion
		:Math.abs(Number(value))>=1.0e+39
		?(Math.abs(Number(value))/1.0e+39).toFixed(1)+"D"
		// 36 Zeros for Undecillion
		:Math.abs(Number(value))>=1.0e+36
		?(Math.abs(Number(value))/1.0e+36).toFixed(1)+"U"
		// 33 Zeros for Decillion
		:Math.abs(Number(value))>=1.0e+33
		?(Math.abs(Number(value))/1.0e+33).toFixed(1)+"d"
		// 30 Zeros for Nonillion
		:Math.abs(Number(value))>=1.0e+30
		?(Math.abs(Number(value))/1.0e+30).toFixed(1)+"n"
		// 27 Zeros for Octillion
		:Math.abs(Number(value))>=1.0e+27
		?(Math.abs(Number(value))/1.0e+27).toFixed(1)+"o"
		// 24 Zeroes for Septillion
		:Math.abs(Number(value))>=1.0e+24
		?(Math.abs(Number(value))/1.0e+24).toFixed(1)+"S"
		// 21 Zeroes for Sextillion
		:Math.abs(Number(value))>=1.0e+21
		?(Math.abs(Number(value))/1.0e+21).toFixed(1)+"s"
		// 18 Zeroes for Quintillion
		:Math.abs(Number(value))>=1.0e+18
		?(Math.abs(Number(value))/1.0e+18).toFixed(1)+"Q"
		// 15 Zeroes for Quadrillion
		:Math.abs(Number(value))>=1.0e+15
		?(Math.abs(Number(value))/1.0e+15).toFixed(1)+"q"
		// 12 Zeroes for Trillions
		:Math.abs(Number(value))>=1.0e+12
		?(Math.abs(Number(value))/1.0e+12).toFixed(1)+"t"
		// 9 Zeroes for Billions
		:Math.abs(Number(value))>=1.0e+9
		?(Math.abs(Number(value))/1.0e+9).toFixed(1)+"B"
		// 6 Zeroes for Millions 
		:Math.abs(Number(value))>=1.0e+6
		?(Math.abs(Number(value))/1.0e+6).toFixed(1)+"M"
		// 3 Zeroes for Thousands
		:Math.abs(Number(value))>=1.0e+3
		?(Math.abs(Number(value))/1.0e+3).toFixed(1)+"K"
		:Math.abs(Number(value))
	}else{
		return value
	}
}

function tickGame(){
	pies=pies+(assistantChefAmount*assistantChefMultiplier)+piesPerSecond
	if(getRndInteger(1,150)==1){goldenPie()}
	if(doSaveGame)saveGame()
	refreshGame()
	ticksUntilMSGFades=ticksUntilMSGFades-1
	if(ticksUntilMSGFades<0)ticksUntilMSGFades=0
	if(ticksUntilMSGFades>6)ticksUntilMSGFades=1
	if(ticksUntilMSGFades==0)$("#messageBar").fadeOut(100)
	Anticheat.tick()
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

async function goldenPie(){
	if(!$('#goldenPie').length&&pies>=50){
		$('#goldenPie').remove()
		a=$(document).width()-$(document).width()*0.1
		b=$(document).height()-$(document).height()*0.1
		c=0
		d=getRndInteger(3,10)
		x=getRndInteger(0,a)
		y=getRndInteger(0,b)
		z=`<div id="goldenPie" style="position:fixed;left:${x}px;top:${y}px;height:${d}%;width:auto;display:none;cursor:pointer;" onclick="goldenPieFunc()">
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

function devMode(){
	doSaveGame=false
	alert("*Dev Mode Enabled*\n\nWill not save progress.\nsReload to disable dev mode.")
	pies=10**30
	piesPerClick=10**10
	piesPerSecond=10**10
	pieUpgradeTier=0
	chefUpgradeTier=0
	kitchenBackgroundImage=0
	hasSeenCreditsThisSession=false
	refreshGame()
	messageGame("Dev Mode Enabled")
	$('#MasterChefContainer').css({'display':'block'})
	$('#InitialUpgradeContainer').css({'display':'block'})
}

function confirmationBox(text,btn1,btn2,btn1func,btn2func){
	$('#pm_text').html(text)
	$('#pm_btn1_real').html(btn1)
	$('#pm_btn2_real').html(btn2)
	$('#pm_btn1').attr("onclick",btn1func)
	$('#pm_btn2').attr("onclick",btn2func)
	$('#popupMenu').fadeIn(500)
}

function resetGame(){
	confirmationBox("Reset Game?","Yes","No","localStorage.clear();window.location.reload()","$('#popupMenu').fadeOut(500)")
}

window.addEventListener("blur",()=>{Anticheat.pageFocused=0})
window.addEventListener("focus",()=>{Anticheat.pageFocused=1})
window.addEventListener("storage",()=>{Anticheat.storageEditA=1})
window.addEventListener("resize",()=>{if(initalPageWidth!=$(document).width()){Anticheat.isOGWidth=0}else{Anticheat.isOGWidth=1}})

function Anticheat(){CLog("Anticheat Started")}

Anticheat.prototype={
	clicks       : 0,
	samePosition : 0,
	susCount     : 0,
	pageFocused  : 1,
	isOGWidth    : 1,
	storageEditA : 0,
	oldaverage   : 0,
	average      : 0,
	matchingAvIR : 0,
	hasClicked   : false,
	diffData     : [],
	banHammer    : function(){
		$('#copyPasteLogo').attr('src','./assets/antiCheatLogo.png')
		$('#copyPasteLogo').fadeIn(225)
		$('#is_centerV').css({"top":"20%"})
		$('#pieClicker').remove()
		$('#pieUpgrades').remove()
		$('#cheatingText').fadeIn(250)
		$('#introScreen').fadeIn(200)
	},
	tick         : function(){
		this.susCount=0
		this.diffData=(last20clickTimestamps.map((n,i,last20clickTimestamps)=>i?n-last20clickTimestamps[i-1]:0-n))
		this.diffData.shift()
		this.average=0
		for(i=0;i<this.diffData.length;i++){
			this.average=this.average+this.diffData[i]
		}
		this.average=this.average/19
		if(this.oldaverage-5<=this.average&&this.average<=this.oldaverage+5){
			this.matchingAvIR=this.matchingAvIR+1
		}else{this.matchingAvIR=0}
		if(this.matchingAvIR>=15&&isClickedRecent!=0)	{this.susCount=this.susCount+2;this.banLevel3()}
		if(this.clicks>=20)								{this.susCount=this.susCount+1}
		if(this.samePosition>=250)						{this.susCount=this.susCount+1}
		if(this.samePosition>=500)						{this.susCount=this.susCount+1}
		if(this.isOGWidth!=1)							{this.susCount=this.susCount+1}
		if(this.storageEditA==1)						{this.susCount=this.susCount+1}
		if(piesPerSecond>=9**99)						{this.susCount=this.susCount+1}
		if(this.susCount>=2)							{this.banHammer();this.banLevel1()}
		this.oldaverage=this.average
		if(isClickedRecent!=0)isClickedRecent=isClickedRecent-1
		this.clicks=0
	},
	banLevel1    : function(){
		doSaveGame=false
		pies=round(pies/2)
		rollingPinsPrice=round(rollingPinsPrice*1.25)
		assistantChefPrice=round(assistantChefPrice*1.25)
		saveGame()
	},
	banLevel2    : function(){
		doSaveGame=false
		pies=round(pies/4)
		piesPerSecond=round(piesPerSecond/2)
		rollingPinsPrice=round(rollingPinsPrice*1.5)
		assistantChefPrice=round(assistantChefPrice*1.5)
		nukePiePrice=round(nukePiePrice*1.5)
		saveGame()
	},
	banLevel3    : function(){
		doSaveGame=false
		pies=round(pies/8)
		piesPerSecond=round(piesPerSecond/4)
		piesPerClick=round(piesPerClick/2)
		rollingPinsPrice=round(rollingPinsPrice*2)
		assistantChefPrice=round(assistantChefPrice*2)
		nukePiePrice=round(nukePiePrice*2)
		chefUpgradePrice=round(chefUpgradePrice*2)
		pieClickUpgradePrice=round(pieClickUpgradePrice*2)
		saveGame()
	}
}

Anticheat=new Anticheat()
