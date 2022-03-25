inDevMode                  = false
/*     Game Variables         */
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
hangFlyrsPriceN            = 2500
largeOvenUpgrade           = 2500
masterChefPrice            = 10000
masterChefUnlocked         = false
rollingPinsPriceNew        = 5000
revampKitchenPrice         = 10000
kitchenBackgroundImage     = 0
nukePiePrice               = 1000000000
hasSeenCreditsThisSession  = false
ticksUntilMSGFades         = 0
doSaveGame                 = true
hasPageInteracted          = false
goldenPieID                = 0
totalGoldenPieRarity       = 250
moreGoldPrice              = 50000
newBakeryPrice             = 10000000
HQunlocked                 = false
purchaseEmpirePrice        = 10000000000
purchaseEmpireTeir         = 0
bakeryCount                = 0
saveThisTick               = false
gameVersion                = 1
currentGameVersion         = 2
flashbangPlaying           = false
glitchTextPlaying          = false
empirePiesPerClick         = 0
empirePiesPerClickMult     = 1
sortType                   = 'all'
cursedModeActive           = false
AFK                        = false
awayPieCount               = 0
/*     Anticheat Variables    */
oldPiex                    = -1
oldPiey                    = -1
initalPageWidth            = $(document).width()
last20clickTimestamps      = []
isClickedRecent            = 0
/*     Settings Variables     */
settingsMute               = true
settingsClickAnimations    = true
settingsPurchaseAnimations = true
settingsAbbreviateNumbers  = true

$(document).ready(()=>{
	loadGame()
	var a=localStorage.getItem("lastLogTime")
	if(a!=null&&a!=undefined&&a!=NaN){
		var a=Date.parse(a)
		var b=Date.parse(new Date())
		var timeDiff=((b-a)/1000)
		if(timeDiff>2){
			var timeDiffCount=((assistantChefAmount*assistantChefMultiplier)+piesPerSecond)*timeDiff
			pies=pies+timeDiffCount
			waitThenMessageGame("Made "+piesToNumber(timeDiffCount)+" Pies While Gone!",2000,3)
		}
	}else{
		$('#updateBarThingy').delay(1750).fadeIn(500)
	}

	//$('[data-toggle="tooltip"]').tooltip()

	// Reset Game If On Wrong Version
	if(lsExists("gameVersion")&&gameVersion!=currentGameVersion){
		doSaveGame=false
		localStorage.clear()
		setTimeout(()=>{
			localStorage.setItem("gameVersion",currentGameVersion)
			window.location.reload()
		},100)
	}else{
		localStorage.setItem("gameVersion",currentGameVersion)
		gameVersion=currentGameVersion
	}
	$('#idVer').html('Version: '+gameVersion+(inDevMode?' [Dev]':''))
	chefsRefresh()
	backgroundRefresh()
	refreshEmpireUpgradeTrack()
	refreshInitialUpgradeTrack()
	setTimeout(()=>{tickGame()},1000)
})

async function waitThenMessageGame(message,ms,time=2){
	await sleep(ms)
	messageGame(message,time)
}

$(window).bind("load",()=>{
	$('#copyPasteLogo').delay(200).fadeIn(250)
	$('#copyPasteLogo').delay(775).fadeOut(250)
	$("#introScreen").delay(1500).fadeOut(750)
})

$("#pie").click((e)=>{
	$("#pie").stop(true,false)
	if(settingsClickAnimations){
		$("#pie").css({
			"width":"90%",
			"left":"5%",
			"top":"15%",
			"transform":"rotate("+pieRotationDeg+"deg)",
		})
		var clickAmountComputed=(piesPerClick*pieClickMultiplier)+(empirePiesPerClick*empirePiesPerClickMult)
		pieClickAnimationId=pieClickAnimationId+1
		$("body").append(`<div id="pieInd${pieClickAnimationId}">+${piesToNumber(clickAmountComputed)}</div>`)
		$('#pieInd'+pieClickAnimationId).css({
			"position":"absolute",
			"top":(e.pageY+getRndInteger(-10,10))+"px",
			"left":(e.pageX+getRndInteger(-10,10))+"px",
			"color":"white",
			"font-weight":"800",
			"font-size":"29px",
			"pointer-events":"none",
			// Chaned this from 'linear' to 'ease-in' be sure to test each use case.
			"animation":"GoUp 1250ms forwards ease-in"
		})
		$("#pieInd"+pieClickAnimationId).show()
		$("#pie").animate({"width":"95%","left":"2.5%","top":"14%"},40)
		$("#pie").animate({"width":"90%","left":"5%","top":"15%"},100)
		removeElem("#pieInd"+pieClickAnimationId)
	}
	if(!hasPageInteracted){
		hasPageInteracted=true
		musicTick()
	}
	pies=pies+clickAmountComputed
	refreshGame()
})

// Disable Annoyances if not in dev mode
if(!inDevMode){
	document.addEventListener("contextmenu",(e)=>{
		e.preventDefault()
	})
	document.onkeydown=function(e){
		e=e||window.event
		if(!e.ctrlKey)return
		var code=e.which||e.keyCode
		switch(code){
			case 83:
				e.preventDefault()
			case 73:
				e.preventDefault()
		}
	}
}

function round(number){return Math.round(number)}
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
	localStorage.setItem("rollingPinsPriceNew",rollingPinsPriceNew)
	localStorage.setItem("revampKitchenPrice",revampKitchenPrice)
	localStorage.setItem("nukePiePrice",nukePiePrice)
	localStorage.setItem("chefUpgradeTier",chefUpgradeTier)
	localStorage.setItem("chefUpgradePrice",chefUpgradePrice)
	localStorage.setItem("kitchenBackgroundImage",kitchenBackgroundImage)
	localStorage.setItem("hangFlyrsPriceN",hangFlyrsPriceN)
	localStorage.setItem("hasSeenCreditsThisSession",hasSeenCreditsThisSession)
	localStorage.setItem("largeOvenUpgrade",largeOvenUpgrade)
	localStorage.setItem("totalGoldenPieRarity",totalGoldenPieRarity)
	localStorage.setItem("gameVersion",gameVersion)
	localStorage.setItem("moreGoldPrice",moreGoldPrice)
	localStorage.setItem("newBakeryPrice",newBakeryPrice)
	localStorage.setItem("HQunlocked",HQunlocked)
	localStorage.setItem("bakeryCount",bakeryCount)
	localStorage.setItem("purchaseEmpirePrice",purchaseEmpirePrice)
	localStorage.setItem("purchaseEmpireTeir",purchaseEmpireTeir)
	localStorage.setItem("empirePiesPerClick",empirePiesPerClick)
	localStorage.setItem("empirePiesPerClickMult",empirePiesPerClickMult)
	// Settings Are Saved Below
	localStorage.setItem("settingsMute",settingsMute)
	localStorage.setItem("settingsClickAnimations",settingsClickAnimations)
	localStorage.setItem("settingsPurchaseAnimations",settingsPurchaseAnimations)
	localStorage.setItem("settingsAbbreviateNumbers",settingsAbbreviateNumbers)
}

function loadGame(){
	if(lsExists("pies"))pies=localStorage.getItem("pies").toInt()
	if(lsExists("piesPerClick"))piesPerClick=localStorage.getItem("piesPerClick").toInt()
	if(lsExists("piesPerSecond"))piesPerSecond=localStorage.getItem("piesPerSecond").toInt()
	if(lsExists("pieUpgradeTier"))pieUpgradeTier=localStorage.getItem("pieUpgradeTier").toInt()
	if(lsExists("pieClickMultiplier"))pieClickMultiplier=localStorage.getItem("pieClickMultiplier").toInt()
	if(lsExists("pieClickUpgradePrice"))pieClickUpgradePrice=localStorage.getItem("pieClickUpgradePrice").toInt()
	if(lsExists("pieClickOvenPrice"))pieClickOvenPrice=localStorage.getItem("pieClickOvenPrice").toInt()
	if(lsExists("assistantChefPrice"))assistantChefPrice=localStorage.getItem("assistantChefPrice").toInt()
	if(lsExists("assistantChefAmount"))assistantChefAmount=localStorage.getItem("assistantChefAmount").toInt()
	if(lsExists("assistantChefMultiplier"))assistantChefMultiplier=localStorage.getItem("assistantChefMultiplier").toInt()
	if(lsExists("masterChefPrice"))masterChefPrice=localStorage.getItem("masterChefPrice").toInt()
	if(lsExists("masterChefUnlocked"))masterChefUnlocked=localStorage.getItem("masterChefUnlocked").toBool()
	if(lsExists("rollingPinsPriceNew"))rollingPinsPriceNew=localStorage.getItem("rollingPinsPriceNew").toInt()
	if(lsExists("revampKitchenPrice"))revampKitchenPrice=localStorage.getItem("revampKitchenPrice").toInt()
	if(lsExists("nukePiePrice"))nukePiePrice=localStorage.getItem("nukePiePrice").toInt()
	if(lsExists("chefUpgradeTier"))chefUpgradeTier=localStorage.getItem("chefUpgradeTier").toInt()
	if(lsExists("chefUpgradePrice"))chefUpgradePrice=localStorage.getItem("chefUpgradePrice").toInt()
	if(lsExists("kitchenBackgroundImage"))kitchenBackgroundImage=localStorage.getItem("kitchenBackgroundImage").toInt()
	if(lsExists("hangFlyrsPriceN"))hangFlyrsPriceN=localStorage.getItem("hangFlyrsPriceN").toInt()
	if(lsExists("hasSeenCreditsThisSession"))hasSeenCreditsThisSession=localStorage.getItem("hasSeenCreditsThisSession").toBool()
	if(lsExists("largeOvenUpgrade"))largeOvenUpgrade=localStorage.getItem("largeOvenUpgrade").toInt()
	if(lsExists("totalGoldenPieRarity"))totalGoldenPieRarity=localStorage.getItem("totalGoldenPieRarity").toInt()
	if(lsExists("gameVersion"))gameVersion=localStorage.getItem("gameVersion").toInt()
	if(lsExists("moreGoldPrice"))moreGoldPrice=localStorage.getItem("moreGoldPrice").toInt()
	if(lsExists("newBakeryPrice"))newBakeryPrice=localStorage.getItem("newBakeryPrice").toInt()
	if(lsExists("HQunlocked"))HQunlocked=localStorage.getItem("HQunlocked").toBool()
	if(lsExists("bakeryCount"))bakeryCount=localStorage.getItem("bakeryCount").toInt()
	if(lsExists("purchaseEmpirePrice"))purchaseEmpirePrice=localStorage.getItem("purchaseEmpirePrice").toInt()
	if(lsExists("purchaseEmpireTeir"))purchaseEmpireTeir=localStorage.getItem("purchaseEmpireTeir").toInt()
	if(lsExists("empirePiesPerClick"))empirePiesPerClick=localStorage.getItem("empirePiesPerClick").toInt()
	if(lsExists("empirePiesPerClickMult"))empirePiesPerClickMult=localStorage.getItem("empirePiesPerClickMult").toInt()
	// Settings Are Loaded Below
	if(lsExists("settingsMute"))settingsMute=localStorage.getItem("settingsMute").toBool()
	if(lsExists("settingsClickAnimations"))settingsClickAnimations=localStorage.getItem("settingsClickAnimations").toBool()
	if(lsExists("settingsPurchaseAnimations"))settingsPurchaseAnimations=localStorage.getItem("settingsPurchaseAnimations").toBool()
	if(lsExists("settingsAbbreviateNumbers"))settingsAbbreviateNumbers=localStorage.getItem("settingsAbbreviateNumbers").toBool()
}

function refreshGame(){
	$("#pieCountReal").html("Pies: "+piesToNumber(pies))
	var totalppscalculated=(assistantChefAmount*assistantChefMultiplier)+piesPerSecond
	$("#pieGRateReal").html("Pies/Sec: "+piesToNumber(totalppscalculated))
	// This is just to make the brightness change if you can afford something
	if(canAfford(pieClickOvenPrice))$("#OvenUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#OvenUpgradeContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(pieClickUpgradePrice))$("#InitialUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#InitialUpgradeContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(assistantChefPrice))$("#AssistantChefContainer").css({"filter":"brightness(1)"})
	else $("#AssistantChefContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(chefUpgradePrice))$("#MasterChefContainer").css({"filter":"brightness(1)"})
	else $("#MasterChefContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(rollingPinsPriceNew))$("#RollingPinsContainer").css({"filter":"brightness(1)"})
	else $("#RollingPinsContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(revampKitchenPrice))$("#RevampKitchenContainer").css({"filter":"brightness(1)"})
	else $("#RevampKitchenContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(nukePiePrice))$("#NukePieContainer").css({"filter":"brightness(1)"})
	else $("#NukePieContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(hangFlyrsPriceN))$("#UpgradeFlyersContainer").css({"filter":"brightness(1)"})
	else $("#UpgradeFlyersContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(largeOvenUpgrade))$("#LargeUpgradeContainer").css({"filter":"brightness(1)"})
	else $("#LargeUpgradeContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(moreGoldPrice))$("#MoreGoldContainer").css({"filter":"brightness(1)"})
	else $("#MoreGoldContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(newBakeryPrice))$("#NewBakeryContainer").css({"filter":"brightness(1)"})
	else $("#NewBakeryContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(100000000)&&bakeryCount>=5)$("#pieHQContainer").css({"filter":"brightness(1)"})
	else $("#pieHQContainer").css({"filter":"brightness(0.5)"})
	if(canAfford(purchaseEmpirePrice)&&bakeryCount>=8&&HQunlocked)$("#pieEmpireContainer").css({"filter":"brightness(1)"})
	else $("#pieEmpireContainer").css({"filter":"brightness(0.5)"})
	// Check if the HQ is already collected
	if(HQunlocked&&$('#pieHQContainer').css("display")!='none')$('#pieHQContainer').css({"display":"none"})
	else if(!HQunlocked&&$('#pieHQContainer').css("display")!='block')$('#pieHQContainer').css({"display":"block"})
	/*

		This section must be at the bottom of all the refresh game [tick]
		logic. This is because this whole section of code is for correcting
		any different mode of sorting upgrades. It basically fixes bugs.

	*/
	// Check if it can even be displayed at this time
	if(sortType=='pps'||sortType=='ppc'){
		if($('#MoreGoldContainer').css("display")!='none')$('#MoreGoldContainer').css({"display":"none"})
	}else{
		// Hide this upgrade if it can't help anymore
		if(totalGoldenPieRarity<10&&$('#MoreGoldContainer').css("display")!='none')$('#MoreGoldContainer').css({"display":"none"})
		else if(totalGoldenPieRarity>10&&$('#MoreGoldContainer').css("display")!='block')$('#MoreGoldContainer').css({"display":"block"})
	}
	// Check if it can even be displayed at this time
	if(sortType=='misc'){
		if($('#LargeUpgradeContainer').css("display")!='none')$('#LargeUpgradeContainer').css({"display":"none"})
		if($('#UpgradeFlyersContainer').css("display")!='none')$('#UpgradeFlyersContainer').css({"display":"none"})
	}
	// Check if it can even be displayed at this time
	if(sortType=='pps'){
		if($('#LargeUpgradeContainer').css("display")!='none')$('#LargeUpgradeContainer').css({"display":"none"})
	}
	// Check if it can even be displayed at this time
	if(sortType=='ppc'){
		if($('#UpgradeFlyersContainer').css("display")!='none')$('#UpgradeFlyersContainer').css({"display":"none"})
	}
	// Check if it can even be displayed at this time
	if(pieUpgradeTier>=8){
		$("#InitialUpgradeContainer").css({"display":"none"})
	}
}

function refreshEmpireUpgradeTrack(){
	if(purchaseEmpireTeir==0&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonEmpire.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonEmpire.png")
	}else if(purchaseEmpireTeir==1&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonCitizens.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonCitizens.png")
	}else if(purchaseEmpireTeir==2&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonSoldiers.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonSoldiers.png")
	}else if(purchaseEmpireTeir==3&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonBodyArmor.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonBodyArmor.png")
	}else if(purchaseEmpireTeir==4&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonImprovedHelmets.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonImprovedHelmets.png")
	}else if(purchaseEmpireTeir==5&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonSoldiersTierIII.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonSoldiersTierIII.png")
	}else if(purchaseEmpireTeir==6&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonNavy.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonNavy.png")
	}else if(purchaseEmpireTeir==7&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonArmy.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonArmy.png")
	}else if(purchaseEmpireTeir==8&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonSpheresOfInfluence.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonSpheresOfInfluence.png")
	}else if(purchaseEmpireTeir==9&&$("#pieEmpire").attr("src")!="./assets/UpgradeButtonExpandEmpire.png"){
		$("#pieEmpire").attr("src","./assets/UpgradeButtonExpandEmpire.png")
	}else if(purchaseEmpireTeir>9){
		$("#pieEmpireContainer").css({"display":"none"})
	}
}

function refreshInitialUpgradeTrack(){
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
	// Large Oven Display Check
	if(pieUpgradeTier<3){
		$("#LargeUpgradeContainer").css({"display":"none"})
	}else{
		$("#LargeUpgradeContainer").css({"display":"block"})
	}
}

function purchaseMoreGold(elem){
	if(canAfford(moreGoldPrice)){
		charge(moreGoldPrice)
		moreGoldPrice=round(moreGoldPrice*1.5)
		totalGoldenPieRarity=totalGoldenPieRarity-5
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(moreGoldPrice)+")")
	}
}

function PurchaselargeOvenUpgrade(elem){
	if(canAfford(largeOvenUpgrade)){
		charge(largeOvenUpgrade)
		largeOvenUpgrade=round(largeOvenUpgrade*1.125)
		var x=getRndInteger(5,15)
		piesPerClick=piesPerClick+x
		messageGame("You got +"+x+" PPC, Nice!")
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(largeOvenUpgrade)+")")
	}
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

function chefsRefresh(){
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
	}else if(chefUpgradeTier==9&&$("#MasterChef").attr("src")!="./assets/UpgradeButtonGMChefPlatinumV.png"){
		$("#MasterChef").attr("src","./assets/UpgradeButtonGMChefPlatinumV.png")
	}else if(chefUpgradeTier==10){
		$("#MasterChefContainer").css({"display":"none"})
	}
	if(chefUpgradeTier>=3){
		$("#UpgradeFlyersContainer").css({"display":"block"})
	}else{
		$("#UpgradeFlyersContainer").css({"display":"none"})
	}
}

function backgroundRefresh(){
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
		refreshInitialUpgradeTrack()
		refreshGame()
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
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
			chefUpgradePrice=round(chefUpgradePrice*8)
			assistantChefMultiplier=50
		}else if(chefUpgradeTier==10){
			chefUpgradePrice=round(chefUpgradePrice*8)
			assistantChefMultiplier=75
		}
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		chefsRefresh()
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
	$("#creditsName").html("Caleb Rhinehart")
	$("#creditsTitle").html("Concept Builder")
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
	$("#creditsName").html("Kylea Reed")
	$("#creditsTitle").html("Concept Builder")
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
	await sleep(500)
	$("#creditsName").html("Thank You")
	$("#creditsTitle").html("For Playing PieClicker!")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(500)
	glitchText($('#creditsTitle'),"It\'s Not Just A Game",6,20)
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
		hasSeenCreditsThisSession=true
		pies=pies+x
	}
	refreshGame()
}

function canAfford(itemPrice){
	if(pies>=itemPrice)return true
	else return false
}

async function messageGame(message,time=2){
	ticksUntilMSGFades=ticksUntilMSGFades+time
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
		pieClickOvenPrice=round(pieClickOvenPrice*1.075)
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
		assistantChefPrice=round(assistantChefPrice*1.075)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(assistantChefPrice)+")")
	}
}

function purchaseUpgradeRollingPins(elem){
	if(canAfford(rollingPinsPriceNew)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		piesPerSecond=piesPerSecond+25
		charge(rollingPinsPriceNew)
		rollingPinsPriceNew=round(rollingPinsPriceNew*1.1)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(rollingPinsPriceNew)+")")
	}
}

function purchaseRevampKitchen(elem){
	if(canAfford(revampKitchenPrice)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		piesPerSecond=piesPerSecond+round(piesPerSecond*0.1)
		piesPerClick=piesPerClick+round(piesPerClick*0.1)
		assistantChefAmount=assistantChefAmount+round(assistantChefAmount*0.1)
		charge(revampKitchenPrice)
		revampKitchenPrice=round(revampKitchenPrice*3.5)
		kitchenBackgroundIMOld=kitchenBackgroundImage
		kitchenBackgroundImage=getRndInteger(0,2)
		if(kitchenBackgroundImage==kitchenBackgroundIMOld){
			if(kitchenBackgroundImage==2||kitchenBackgroundImage==0){
				kitchenBackgroundImage=1
			}else if(kitchenBackgroundImage==1){kitchenBackgroundImage=2}
		}
		refreshGame()
		backgroundRefresh()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(revampKitchenPrice)+")")
	}
}

function nuclearPieReactor(elem){
	if(canAfford(nukePiePrice)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		piesPerSecond=piesPerSecond*100
		charge(nukePiePrice)
		nukePiePrice=round(nukePiePrice*300)
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(nukePiePrice)+")")
	}
}

function purchaseUpgradeFlyers(elem){
	if(canAfford(hangFlyrsPriceN)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		charge(hangFlyrsPriceN)
		hangFlyrsPriceN=round(hangFlyrsPriceN*2.5)
		amountGained=getRndInteger(5,15)
		assistantChefAmount=assistantChefAmount+amountGained
		messageGame("You got +"+amountGained+" new assistant chefs!")
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(hangFlyrsPriceN)+")")
	}
}

function purchaseNewBakery(elem){
	if(canAfford(newBakeryPrice)){
		if(settingsPurchaseAnimations)clickFireworks($(elem),50)
		charge(newBakeryPrice)
		newBakeryPrice=round(newBakeryPrice*5)
		piesPerSecond=round(piesPerSecond*2)
		piesPerClick=round(piesPerClick*2)
		bakeryCount=bakeryCount+1
		refreshGame()
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(newBakeryPrice)+")")
	}
}

function purchaseHQ(elem){
	// Requires At Least 3 Bakeries
	if(canAfford(100000000)){
		if(bakeryCount>=3){
			if(settingsPurchaseAnimations)clickFireworks($(elem),50)
			charge(100000000)
			HQunlocked=true
			piesPerSecond=piesPerSecond+200
			piesPerClick=piesPerClick+200
			refreshGame()
		}else{
			messageGame("You need at least 3 Bakeries (You have: "+bakeryCount+")")
		}
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(100000000)+")")
	}
}

function purchaseEmpire(elem){
	// Requires HQ & 5 Bakeries
	if(canAfford(purchaseEmpirePrice)){
		if(HQunlocked){
			if(bakeryCount>=5){
				if(settingsPurchaseAnimations)clickFireworks($(elem),50)
				purchaseEmpireTeir=purchaseEmpireTeir+1
				if(purchaseEmpireTeir==1){
					piesPerSecond=piesPerSecond+100000
					purchaseEmpirePrice=round(purchaseEmpirePrice*0.1)
				}if(purchaseEmpireTeir==2){
					piesPerSecond=piesPerSecond+75
					purchaseEmpirePrice=round(purchaseEmpirePrice*0.5)
				}if(purchaseEmpireTeir==3){
					empirePiesPerClick=empirePiesPerClick+10000
					purchaseEmpirePrice=round(purchaseEmpirePrice*1.1)
				}if(purchaseEmpireTeir==4){
					empirePiesPerClickMult=3
					purchaseEmpirePrice=round(purchaseEmpirePrice*1.1)
				}if(purchaseEmpireTeir==5){
					empirePiesPerClick=empirePiesPerClick+25000
					purchaseEmpirePrice=round(purchaseEmpirePrice*1.1)
				}if(purchaseEmpireTeir==6){
					empirePiesPerClick=empirePiesPerClick+50000
					purchaseEmpirePrice=round(purchaseEmpirePrice*1.1)
				}if(purchaseEmpireTeir==7){
					empirePiesPerClickMult=empirePiesPerClickMult+10
					purchaseEmpirePrice=round(purchaseEmpirePrice*1.1)
				}if(purchaseEmpireTeir==8){
					empirePiesPerClick=empirePiesPerClick*500
					purchaseEmpirePrice=round(purchaseEmpirePrice*1.1)
				}if(purchaseEmpireTeir==9){
					piesPerSecond=piesPerSecond*10
					purchaseEmpirePrice=round(purchaseEmpirePrice*1.1)
				}if(purchaseEmpireTeir==10){
					piesPerClick=piesPerClick*50
					piesPerSecond=piesPerSecond*50
					piesPerSecond=piesPerSecond+100000000
					purchaseEmpirePrice=round(purchaseEmpirePrice*1.1)
				}
				refreshGame()
				refreshEmpireUpgradeTrack()
			}else{
				messageGame("You need at least 5 Bakeries (You have: "+bakeryCount+")")
			}
		}else{
			messageGame("You must have the Pie Headquarters unlocked")
		}
	}else{
		messageGame("You Can\'t Afford This (Price: "+piesToNumber(purchaseEmpirePrice)+")")
	}
}

function piesToNumber(value){
	if(settingsAbbreviateNumbers&&value!=Infinity){
		// 66 Zeros for Unvigintillion
		return Math.abs(Number(value))>=1.0e+66
		?(Math.abs(Number(value))/1.0e+66).toFixed(6)+"c"
		// 63 Zeros for Vigintillion
		:Math.abs(Number(value))>=1.0e+63
		?(Math.abs(Number(value))/1.0e+63).toFixed(6)+"v"
		// 60 Zeros for Novemdecillion
		:Math.abs(Number(value))>=1.0e+60
		?(Math.abs(Number(value))/1.0e+60).toFixed(6)+"N"
		// 57 Zeros for Octodecillion
		:Math.abs(Number(value))>=1.0e+57
		?(Math.abs(Number(value))/1.0e+57).toFixed(5)+"O"
		// 54 Zeros for Septendecillion
		:Math.abs(Number(value))>=1.0e+54
		?(Math.abs(Number(value))/1.0e+54).toFixed(5)+"St"
		// 51 Zeros for Sexdecillion
		:Math.abs(Number(value))>=1.0e+51
		?(Math.abs(Number(value))/1.0e+51).toFixed(5)+"Sd"
		// 48 Zeros for Quindecillion
		:Math.abs(Number(value))>=1.0e+48
		?(Math.abs(Number(value))/1.0e+48).toFixed(5)+"Qd"
		// 45 Zeros for Quattuordecillion
		:Math.abs(Number(value))>=1.0e+45
		?(Math.abs(Number(value))/1.0e+45).toFixed(5)+"Qt"
		// 42 Zeros for Tredecillion
		:Math.abs(Number(value))>=1.0e+42
		?(Math.abs(Number(value))/1.0e+42).toFixed(4)+"T"
		// 39 Zeros for Duodecillion
		:Math.abs(Number(value))>=1.0e+39
		?(Math.abs(Number(value))/1.0e+39).toFixed(4)+"D"
		// 36 Zeros for Undecillion
		:Math.abs(Number(value))>=1.0e+36
		?(Math.abs(Number(value))/1.0e+36).toFixed(4)+"U"
		// 33 Zeros for Decillion
		:Math.abs(Number(value))>=1.0e+33
		?(Math.abs(Number(value))/1.0e+33).toFixed(4)+"d"
		// 30 Zeros for Nonillion
		:Math.abs(Number(value))>=1.0e+30
		?(Math.abs(Number(value))/1.0e+30).toFixed(4)+"n"
		// 27 Zeros for Octillion
		:Math.abs(Number(value))>=1.0e+27
		?(Math.abs(Number(value))/1.0e+27).toFixed(3)+"o"
		// 24 Zeroes for Septillion
		:Math.abs(Number(value))>=1.0e+24
		?(Math.abs(Number(value))/1.0e+24).toFixed(3)+"S"
		// 21 Zeroes for Sextillion
		:Math.abs(Number(value))>=1.0e+21
		?(Math.abs(Number(value))/1.0e+21).toFixed(3)+"s"
		// 18 Zeroes for Quintillion
		:Math.abs(Number(value))>=1.0e+18
		?(Math.abs(Number(value))/1.0e+18).toFixed(3)+"Q"
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
	var piesGainedCount=(assistantChefAmount*assistantChefMultiplier)+piesPerSecond
	pies=pies+piesGainedCount
	if(doSaveGame&&saveThisTick)saveGame()
	saveThisTick=!saveThisTick
	refreshGame()
	randomGameValues()
	ticksUntilMSGFades=ticksUntilMSGFades-1
	if(ticksUntilMSGFades<0)ticksUntilMSGFades=0
	if(ticksUntilMSGFades>6)ticksUntilMSGFades=4
	if(ticksUntilMSGFades==0)$("#messageBar").fadeOut(100)
	if(AFK)awayPieCount=awayPieCount+piesGainedCount
	if(pies==Infinity||piesPerSecond==Infinity||piesPerClick==Infinity||pies==NaN){
		messageGame("FREAK ACCIDENT: PIES, PPS & PPC CUT IN HALF!",4)
		pies=pies/2
		piesPerClick=piesPerClick/2
		piesPerSecond=piesPerSecond/2
		refreshGame()
	}
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

function goldenPie(){
	if(pies>=50){
		var a=$(document).width()-$(document).width()*0.1
		var b=$(document).height()-$(document).height()*0.1
		var d=getRndInteger(6,8)
		var x=getRndInteger(0,a)
		var y=getRndInteger(0,b)
		var z=`<div id="goldenPie${goldenPieID}" style="position:fixed;left:${x}px;top:${y}px;height:${d}%;width:auto;display:none;cursor:pointer;" onclick="goldenPieFunc(this);">
			<img src="./assets/GoldenPie.png" style="width:100%;height:100%;" draggable="false">
		</div>`
		$('body').append(z)
		var gp=$('#goldenPie'+goldenPieID)
		gp.fadeIn(150)
		goldenPieID=goldenPieID+1
		goldenPieSpin(gp)
		goldenPieDestroy(gp)
	}
}

async function goldenPieDestroy(elem){
	var fadeoutdelay=getRndInteger(600,900)
	await sleep(getRndInteger(1500,3000))
	elem.fadeOut(fadeoutdelay)
	await sleep(fadeoutdelay)
	elem.remove()
}

async function goldenPieSpin(elem){
	var rotatedeg=0
	var forwards=getRndInteger(0,1)
	for(let i=0;i<826;i++){
		elem.css({"transform":"rotate("+rotatedeg+"deg)"})
		await sleep(1)
		if(forwards==1)rotatedeg=rotatedeg+1
		else rotatedeg=rotatedeg-1
	}
}

async function goldenPieFunc(elem){
	clickFireworks($(elem),50,true)
	$(elem).attr({"onclick":""})
	$(elem).fadeOut(250)
	await sleep(400)
	$(elem).remove()
	var w=getRndInteger(round(pies/8),round(pies/6))
	pies=pies+w
	messageGame("Lucky! +"+piesToNumber(w)+" pies!")
	if(getRndInteger(1,50)==1)pieFrenzy()
	refreshGame()
}

function devMode(){
	inDevMode=true
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
	chefsRefresh()
	backgroundRefresh()
	refreshInitialUpgradeTrack()
	$('#idVer').html('Version: '+gameVersion+(inDevMode?' [Dev]':''))
	messageGame("Dev Mode Enabled - Will Not Save Game",3)
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
	confirmationBox("Reset Game?","Yes","No","localStorage.clear();setTimeout(()=>{window.location.reload()},100)","$('#popupMenu').fadeOut(500)")
}

window.addEventListener("blur",()=>{
	AFK=true
	awayPieCount=0
})

window.addEventListener("focus",()=>{
	AFK=false
	if(awayPieCount>0){
		messageGame("While Gone You Made +"+piesToNumber(awayPieCount)+" Pies!",3)
	}
})

function banMessage(){
	$('#copyPasteLogo').attr('src','./assets/antiCheatLogo.png')
	$('#copyPasteLogo').fadeIn(225)
	$('#is_centerV').css({"top":"20%"})
	$('#cheatingText').fadeIn(250)
	$('#introScreen').fadeIn(200)
}

async function flashbang(){
	if(!flashbangPlaying){
		flashbangPlaying=true
		$('html').css("animation","flashbang 5s forwards linear")
		await sleep(5500)
		$('html').css("animation","")
		flashbangPlaying=false
	}
}

async function glitchText(target,message,duration,displayLength=50,secondsBeforeAllowReplay){
	if(!glitchTextPlaying){
		glitchTextPlaying=true
		var ogtext=''+target.html()
		var animationLength=300
		var introLength=90+(100-displayLength)
		for(let i=0;i<(animationLength+1);i++){
			if(i<=introLength){
				target.html(ogtext.corrupt(i/introLength))
			}else if(i>introLength&&i<(displayLength+introLength)){
				target.html(message.corrupt((introLength-i)/introLength))
			}else if(i>=(displayLength+introLength)){
				target.html(ogtext.corrupt(Math.abs(((displayLength+introLength)-i)/introLength)))
			}
			await sleep(duration/animationLength)
		}
		target.html(ogtext)
		await sleep(secondsBeforeAllowReplay)
		glitchTextPlaying=false
	}
}

async function pieFrenzy(){
	var pieCount=getRndInteger(25,100)
	for(let i=0;i<pieCount+1;i++){
		goldenPie()
		await sleep(getRndInteger(1,75))
	}
}

function randomGameValues(){
	if(getRndInteger(1,totalGoldenPieRarity)==1)goldenPie()
	if(getRndInteger(1,5)==1)glitchText($('#notASecretMessageAtAllIPromise'),'Find Lore.',1,20,10)
}

function sortUpgrades(stLocal){
	sortType=stLocal
	if(sortType=='all'){
		var collection=document.getElementsByClassName('sortAll')
		for(let i=0;i<collection.length;i++){
			collection[i].style.display='block'
		}
	}
	if(sortType=='pps'){
		hideAllUpgrades()
		var collection=document.getElementsByClassName('sortPPS')
		for(let i=0;i<collection.length;i++){
			collection[i].style.display='block'
		}
	}
	if(sortType=='ppc'){
		hideAllUpgrades()
		var collection=document.getElementsByClassName('sortPPC')
		for(let i=0;i<collection.length;i++){
			collection[i].style.display='block'
		}
	}
	if(sortType=='misc'){
		hideAllUpgrades()
		var collection=document.getElementsByClassName('sortMisc')
		for(let i=0;i<collection.length;i++){
			collection[i].style.display='block'
		}
	}
	refreshInitialUpgradeTrack()
	refreshEmpireUpgradeTrack()
	chefsRefresh()
	refreshGame()
}

function hideAllUpgrades(){
	var collection=document.getElementsByClassName('sortAll')
	for(let i=0;i<collection.length;i++){
		collection[i].style.display='none'
	}
}

function toggleCursedMode(){
	if(cursedModeActive==false){
		cursedModeActive=true
		$('html').css({"filter":"invert(1)"})
	}else{
		cursedModeActive=false
		$('html').css({"filter":""})
	}
}

async function lsdMode(){
	var deg=1
	var addSpeedAmount=0.001
	while(true){
		await sleep(1)
		var index=0.1
		$('div').each(function(){
			$(this).css({"filter":"hue-rotate("+deg*index+"deg)"})
			index=index+0.025
		})
		deg=deg+addSpeedAmount
		if(addSpeedAmount<1)addSpeedAmount=addSpeedAmount+0.0005
	}
}
