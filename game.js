// PieClicker Version Variables
pcV = {
	version: 2,
	currentVersion: 2
}
// PieClicker Game Variables
pcG = {
	AFK: false,
	awayPies: 0,
	sortType: 'all',
	saveTick: false,
	doSaveGame: true,
	hasInteracted: false,
	MSGtick: 0,
	pieAnimID: 0,
	inDev: true,
	isPlayingMusic: false
}
// PieClicker Remember Game Variables
pcZ = {
	kitchenBackground: 0,
	hasSeenCredits: false
}
// PieClicker Remember Upgrade Variables
pcR = [
	{
		"id": 0,
		"qnty": 0,
		"cost": 500,
		"tier": 0,
		"show": true
	},
	{
		"id": 1,
		"qnty": 0,
		"cost": 15,
		"tier": 0,
		"show": true
	},
	{
		"id": 2,
        "qnty": 0,
        "cost": 10,
        "tier": 0,
        "show": true
	},
	{
		"id": 3,
        "qnty": 0,
        "cost": 10000,
        "tier": 0,
        "show": true
	},
	{
		"id": 4,
        "qnty": 0,
        "cost": 2500,
        "tier": 0,
        "show": true
	},
	{
		"id": 5,
        "qnty": 0,
        "cost": 2500,
        "tier": 0,
        "show": true
	},
	{
		"id": 6,
        "qnty": 0,
        "cost": 5000,
        "tier": 0,
        "show": true
	},
	{
		"id": 7,
        "qnty": 0,
        "cost": 10000,
        "tier": 0,
        "show": true
	},
	{
		"id": 8,
        "qnty": 0,
        "cost": 100000000000,
        "tier": 0,
        "show": true
	},
	{
		"id": 9,
        "qnty": 0,
        "cost": 10000000,
        "tier": 0,
        "show": true
	},
	{
		"id": 10,
        "qnty": 0,
        "cost": 100000000,
        "tier": 0,
        "show": true
	},
	{
		"id": 11,
        "qnty": 0,
        "cost": 10000000000,
        "tier": 0,
        "show": true
	}
]
// PieClicker Upgrade Variables
pcU = [
	{
        "id": 0,                 // Upgrade ID, this is honestly just for keeping track, it isn't used
        "name": "Pie Upgrade",   // Upgrade Name
        "ccmc": 5,               // CCMC (Current Cost Multiplier Change); Change in cost on purchase
        "prts": 0,               // PRTS (Pies Required To Show); Pies required for user to see upgrade
        "show": true,            // To Show Upgrade or Not
        "sort": "ALL MISC",      // ALL, PPS, PPC, MISC; Different sort types, can use multiple or all
        "assets": [              // All Upgrade Assets, If only one tier use one asset, max tier is final asset
			"UpgradeButtonPumpkinPie.png",
			"UpgradeButtonApplePie.png",
			"UpgradeButtonCheesecake.png",
			"UpgradeButtonOreoCheesecake.png",
			"UpgradeButtonLemonMeringuePie.png",
			"UpgradeButtonKeyLimePie.png",
			"UpgradeButtonChocolateCreamPie.png",
			"UpgradeButtonStrawberryPie.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)

			if(pcR[i].tier != pcU[i].assets.length) pcR[i].tier = pcR[i].tier + 1
			let asset = pcU[i].assets[pcR[i].tier]
			if(asset != undefined) $(elem).children()[0].src = `./assets/${asset}`
			else $(elem).css("display", "none")
			
			pcP.ppcMult = pcP.ppcMult + 1
			// UPDATE THIS WITH THE pieClickMultiplier VARIABLES FROM old_game.js

			boughtItem(i)
			reloadStats()
		}
    },
	{
        "id": 1,
        "name": "Oven Upgrade",
        "ccmc": 1.075,
        "prts": 0,
        "show": true,
        "sort": "ALL MISC",
        "assets": [
            "UpgradeButtonOven.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcP.ppc = pcP.ppc + 1

			boughtItem(i)
			reloadStats()
		}
    },
	{
        "id": 2,
        "name": "Assistant Chef",
        "ccmc": 1.075,
        "prts": 0,
        "show": true,
        "sort": "ALL MISC",
        "assets": [
            "UpgradeButtonAssistantChef.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcP.pps = pcP.pps + 1

			boughtItem(i)
			reloadStats()
		}
    },
	{
		"id": 3,
        "name": "Master Chef",
        "ccmc": 3,
        "prts": 0,
        "show": true,
        "sort": "ALL MISC",
        "assets": [
			"UpgradeButtonApprenticeChef.png",
            "UpgradeButtonAdvancedChef.png",
			"UpgradeButtonExpertChef.png",
			"UpgradeButtonMasterChef.png",
			"UpgradeButtonGrandmasterChef.png",
			"UpgradeButtonGMChefPlatinumI.png",
			"UpgradeButtonGMChefPlatinumII.png",
			"UpgradeButtonGMChefPlatinumIII.png",
			"UpgradeButtonGMChefPlatinumIV.png",
			"UpgradeButtonGMChefPlatinumV.png"
		],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			if(pcR[i].tier != pcU[i].assets.length) pcR[i].tier = pcR[i].tier + 1
			let asset = pcU[i].assets[pcR[i].tier]
			if(asset != undefined) $(elem).children()[0].src = `./assets/${asset}`
			else $(elem).css("display", "none")

			pcP.ppcMult = pcP.ppcMult + 1
			// UPDATE THIS WITH THE assistantChefMultiplier VARIABLES FROM old_game.js

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 4,
        "name": "Flyers",
        "ccmc": 2.5,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS",
        "assets": [
            "UpgradeFlyers.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)

			let gained = randInt(5, 15)
			pcP.pps = pcP.pps + gained
			messageGame(`You got +${gained} new assistant chefs!`)

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 5,
        "name": "Large Ovens",
        "ccmc": 1.075,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS",
        "assets": [
            "UpgradeButtonLargeOvenUpgrade.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)

			pcP.ppc = pcP.ppc + randInt(5, 15)

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 6,
        "name": "Rolling Pins",
        "ccmc": 1.1,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS",
        "assets": [
            "UpgradeButtonRollingPin.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcP.pps = pcP.pps + 25

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 7,
        "name": "Revamp Kitchen",
        "ccmc": 3.5,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS",
        "assets": [
            "UpgradeButtonRevampKitchen.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcP.ppc = pcP.ppc + round(pcP.ppc * 0.1)
			pcP.pps = pcP.pps + round(pcP.pps * 0.1)
			pcZ.kitchenBackground = randInt(0, 2)

			backgroundRefresh()
			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 8,
        "name": "Nuke Pie",
        "ccmc": 1000,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS",
        "assets": [
            "UpgradeButtonNuclearPieReactor.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcP.pps = pcP.pps * 100

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 9,
        "name": "New Bakery",
        "ccmc": 5,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS PPC",
        "assets": [
            "UpgradeButtonBakery.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcP.ppc = pcP.ppc * 2
			pcP.pps = pcP.pps * 2

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 10,
        "name": "Headquarters",
        "ccmc": 10000000,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS PPC",
        "assets": [
            "UpgradeButtonHeadquarters.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcP.ppc = pcP.ppc + 200
			pcP.pps = pcP.pps + 200

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 11,
        "name": "Pie Empire",
        "ccmc": 2,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS PPC",
        "assets": [
			"UpgradeButtonExpandEmpire.png",
			"UpgradeButtonBodyArmor.png",
			"UpgradeButtonArmy.png",
			"UpgradeButtonCitizens.png",
			"UpgradeButtonEmpire.png",
			"UpgradeButtonNavy",
            "UpgradeButtonSoldiers.png",
			"UpgradeButtonSoldiersTierIII.png",
			"UpgradeButtonSpheresOfInfluence.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			if(pcR[i].tier != pcU[i].assets.length) pcR[i].tier = pcR[i].tier + 1
			let asset = pcU[i].assets[pcR[i].tier]
			if(asset != undefined) $(elem).children()[0].src = `./assets/${asset}`
			else $(elem).css("display", "none")

			pcP.ppcMult = pcP.ppcMult + 1
			// UPDATE THIS WITH THE pps VARIABLES FROM old_game.js

			boughtItem(i)
			reloadStats()
		}
	}
]
// PieClicker Settings Variables
pcS = {
	mute: true,
	clickAnim: true,
	purchaseAnim: true,
	abbreviateInts: true
}
// PieClicker Player Variables
pcP = {
	pies: 0,
	ppc: 1,
	pps: 0,
	ppcMult: 1,
	ppsMult: 1
}

for(let i = 0; i < pcU.length; i++) {
    $('#upgradesContainer').append(`
        <div class="pieUpgrade sort${pcU[i].sort.replace(/ /g, ' sort')}" onclick="pcU[${i}].buy(this, ${i})">
			<img src="./assets/${pcU[i].assets[pcR[i].tier]}" id="pcu${pcU[i].id}" style="width:100%;height:100%;" draggable="false">
        </div>
    `)
}

$(document).ready(() => {
	var a = localStorage.getItem("lastLogTime")
	if(a != undefined) {
		var a = Date.parse(a)
		var b = Date.parse(new Date())
		var timeDiff = ((b - a) / 1000)
		if(timeDiff > 2) {
			var timeDiffCount = ((assistantChefAmount * assistantChefMultiplier) + pcP.pps) * timeDiff
			pies = pies + timeDiffCount
			waitThenMessageGame("Made " + p2n(timeDiffCount) + " Pies While Gone!", 2000, 3)
		}
	} else {
		$('#updateBarThingy').delay(1750).fadeIn(500)
	}

	// Reset Game If On Wrong Version
	if(lsExists("gameVersion") && pcV.version != pcV.currentVersion) {
		pcG.doSaveGame = false
		localStorage.clear()
		setTimeout(() => {
			window.location.reload()
		}, 100)
	} else {
		localStorage.setItem("gameVersion", pcV.currentVersion)
		pcV.version = pcV.currentVersion
	}

	$('#idVer').html('Version:' + pcV.version + (pcG.inDev ? '[Dev]' : ''))

	refreshAll()
})

function refreshAll() {
	chefsRefresh()
	backgroundRefresh()
	empireRefresh()
	piesRefresh()
	reloadStats()
}

function saveGame() {
	localStorage.setItem("pcS", JSON.stringify(pcS))
	localStorage.setItem("pcP", JSON.stringify(pcP))
	localStorage.setItem("pcR", JSON.stringify(pcR))
	localStorage.setItem("pcZ", JSON.stringify(pcZ))
}

function loadGame() {
	if(lsExists("pcP")) pcP = JSON.parse(localStorage.getItem("pcP"))
	if(lsExists("pcS")) pcS = JSON.parse(localStorage.getItem("pcS"))
	if(lsExists("pcR")) pcR = JSON.parse(localStorage.getItem("pcR"))
	if(lsExists("pcZ")) pcZ = JSON.parse(localStorage.getItem("pcZ"))
	refreshAll()
}

async function waitThenMessageGame(message, ms, time=2) {
	await sleep(ms)
	messageGame(message, time)
}

// Show loading screen logo
$(window).bind("load", () => {
	loadGame()
	setInterval(() => {tickGame()}, 1000)
	$('#copyPasteLogo').delay(200).fadeIn(250)
	$('#copyPasteLogo').delay(775).fadeOut(250)
	$("#introScreen").delay(1500).fadeOut(750)
})

// When the user clicks on the pie
$("#pie").click((e) => {
	$("#pie").stop(true, false)
	var clickAmount = pcP.ppc * pcP.ppcMult
	pcG.pieAnimID = pcG.pieAnimID + 1
	$("body").append(`<div id="pieInd${pcG.pieAnimID}">+${p2n(clickAmount)}</div>`)
	$('#pieInd' + pcG.pieAnimID).css({
		"position": "absolute",
		"top": (e.pageY + randInt(-10, 10)) + "px",
		"left": (e.pageX + randInt(-10, 10)) + "px",
		"color": "white",
		"font-weight": "800",
		"font-size": "29px",
		"pointer-events": "none",
		// Chaned this from 'linear' to 'ease-in' be sure to test each use case.
		"animation": "GoUp 1250ms forwards ease-in"
	})
	$("#pieInd" + pcG.pieAnimID).show()
	$("#pie").animate({"width": "95%", "left": "2.5%", "top": "14%"}, 40)
	$("#pie").animate({"width": "90%", "left": "5%", "top": "15%"}, 100)
	removeElem("#pieInd" + pcG.pieAnimID)
	if(!pcG.hasInteracted) {
		pcG.hasInteracted = true
		setInterval(() => {musicTick()}, 10000)
	}
	pcP.pies = pcP.pies + clickAmount
	reloadStats()
})

// Disable Annoyances if not in dev mode
if(!pcG.inDev) {
	document.addEventListener("contextmenu", (e) => {
		e.preventDefault()
	})
	document.onkeydown = function(e) {
		e = e || window.event
		if(!e.ctrlKey) return
		var code = e.which || e.keyCode
		switch(code) {
			case 83: 
				e.preventDefault()
			case 73: 
				e.preventDefault()
		}
	}
}

function boughtItem(i) {
	pcR[i].cost = round(pcR[i].cost * pcU[i].ccmc)
	pcR[i].qnty = pcR[i].qnty + 1
}

function round(number) {return Math.round(number)}
function removeElem(animID) {setTimeout(() => {$(animID).remove()}, 2250)}
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms))}
function CLog(msg) {console.log("[game.js " + new Date().getTime() + "] " + msg)}
function randInt(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min}

function reloadStats() {
	$("#pies").html(p2n(pcP.pies))
	$("#pps").html(p2n(pcP.pps))
	$("#ppc").html(p2n(pcP.ppc))
}

function empireRefresh() {
	let i = 11, asset = pcU[i].assets[pcR[i].tier]
	if(asset != undefined) $(`#pcu${i}`).attr("src", `./assets/${asset}`)
	else $(`#pcu${i}`).parent().css("display", "none")
}

function piesRefresh() {
	let i = 0, asset = pcU[i].assets[pcR[i].tier]
	if(asset != undefined) $(`#pcu${i}`).attr("src", `./assets/${asset}`)
	else $(`#pcu${i}`).parent().css("display", "none")
}

function settingsRefresh() {
	$("#settingsMuteGame").attr("src", `./assets/CheckBox${pcS.mute ? 'Checked' : 'Empty'}.png`)
	$("#settingsDoClickAnimations").attr("src", `./assets/CheckBox${pcS.clickAnim ? 'Checked' : 'Empty'}.png`)
	$("#settingsDoPurchaseAnimations").attr("src", `./assets/CheckBox${pcS.purchaseAnim ? 'Checked' : 'Empty'}.png`)
	$("#settingAbbreviateNumbers").attr("src", `./assets/CheckBox${pcS.abbreviateInts ? 'Checked' : 'Empty'}.png`)
	if(pcG.doSaveGame) saveGame()
}

function chefsRefresh() {
	let i = 3, asset = pcU[i].assets[pcR[i].tier]
	if(asset != undefined) $(`#pcu${i}`).attr("src", `./assets/${asset}`)
	else $(`#pcu${i}`).parent().css("display", "none")
}

function backgroundRefresh() {
	let bgImgs = ['KitchenBackgroundBlue', 'KitchenBackgroundPink', 'KitchenBackgroundWhite']
	$("#pieChild").attr("src", `./assets/${bgImgs[pcZ.kitchenBackground]}.png`)
}

async function PleasePlayTheCredits() {
	var credPeople = [
		{"name": "kgsensei", "title": "Lead Programmer"},
		{"name": "Azalea Jerez", "title": "Graphic Designer"},
		{"name": "Ian Paris-Wright", "title": "Music Artist"},
		{"name": "Lucient Chapin", "title": "Creative Director"},
		{"name": "Caleb Rhinehart", "title": "Concept Builder"},
		{"name": "Kylea Reed", "title": "Concept Builder"},
		{"name": "CopyPaste Games", "title": "Copyright &copy; 2022"},
		{"name": "Thank You", "title": "For Playing PieClicker!"}
	]
	$("#creditsOverlay").fadeIn(1000)
	await sleep(500)
<<<<<<< Updated upstream
	$("#creditsName").html("kgsensei")
	$("#creditsTitle").html("Lead Programmer")
	$("#creditsName").fadeIn(500)
	$("#creditsTitle").fadeIn(500)
	await sleep(2000)
	$("#creditsName").fadeOut(500)
	$("#creditsTitle").fadeOut(500)
	await sleep(500)
	$("#creditsName").html("Azalea Jerez")
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
=======
	for(let i = 0; i < credPeople.length; i++) {
		$("#creditsName").html(credPeople[i].name)
		$("#creditsTitle").html(credPeople[i].title)
		$("#creditsName").fadeIn(500)
		$("#creditsTitle").fadeIn(500)
		await sleep(2000)
		$("#creditsName").fadeOut(500)
		$("#creditsTitle").fadeOut(500)
		await sleep(500)
	}
>>>>>>> Stashed changes
	$("#creditsOverlay").fadeOut(1000)
	await sleep(300)
	if(!pcZ.hasSeenCredits && pcP.pies >= 500) {
		let x = randInt(round(pcP.pies / 8), round(pcP.pies / 10))
		messageGame(`Thanks For Watching The Credits (+${p2n(x)} Pies)`)
		pcZ.hasSeenCredits = true
		pcP.pies = pcP.pies + x
	}
}

function charge(itemPrice) {
	if(pcP.pies >= itemPrice) {
		pcP.pies = pcP.pies - itemPrice
		return true
	} else {
		messageGame("You Can\'t Afford This (Price:  "+p2n(itemPrice)+")")
		return false
	}
}

async function messageGame(message, time = 3) {
	pcG.MSGtick = pcG.MSGtick + time
	$("#messageBar").stop(true, true)
	$("#messageBarText").html(message)
	$("#messageBar").fadeIn(100)
}

function p2n(value) {
	// 66 Zeros for Unvigintillion
    return Math.abs(Number(value)) >= 1.0e+66 ? (Math.abs(Number(value)) / 1.0e+66).toFixed(6) + "c"// 63 Zeros for Vigintillion
    : Math.abs(Number(value)) >= 1.0e+63 ? (Math.abs(Number(value)) / 1.0e+63).toFixed(6) + "v"// 60 Zeros for Novemdecillion
    : Math.abs(Number(value)) >= 1.0e+60 ? (Math.abs(Number(value)) / 1.0e+60).toFixed(6) + "N"// 57 Zeros for Octodecillion
    : Math.abs(Number(value)) >= 1.0e+57 ? (Math.abs(Number(value)) / 1.0e+57).toFixed(5) + "O"// 54 Zeros for Septendecillion
    : Math.abs(Number(value)) >= 1.0e+54 ? (Math.abs(Number(value)) / 1.0e+54).toFixed(5) + "St"// 51 Zeros for Sexdecillion
    : Math.abs(Number(value)) >= 1.0e+51 ? (Math.abs(Number(value)) / 1.0e+51).toFixed(5) + "Sd"// 48 Zeros for Quindecillion
    : Math.abs(Number(value)) >= 1.0e+48 ? (Math.abs(Number(value)) / 1.0e+48).toFixed(5) + "Qd"// 45 Zeros for Quattuordecillion
    : Math.abs(Number(value)) >= 1.0e+45 ? (Math.abs(Number(value)) / 1.0e+45).toFixed(5) + "Qt"// 42 Zeros for Tredecillion
    : Math.abs(Number(value)) >= 1.0e+42 ? (Math.abs(Number(value)) / 1.0e+42).toFixed(4) + "T"// 39 Zeros for Duodecillion
    : Math.abs(Number(value)) >= 1.0e+39 ? (Math.abs(Number(value)) / 1.0e+39).toFixed(4) + "D"// 36 Zeros for Undecillion
    : Math.abs(Number(value)) >= 1.0e+36 ? (Math.abs(Number(value)) / 1.0e+36).toFixed(4) + "U"// 33 Zeros for Decillion
    : Math.abs(Number(value)) >= 1.0e+33 ? (Math.abs(Number(value)) / 1.0e+33).toFixed(4) + "d"// 30 Zeros for Nonillion
    : Math.abs(Number(value)) >= 1.0e+30 ? (Math.abs(Number(value)) / 1.0e+30).toFixed(4) + "n"// 27 Zeros for Octillion
    : Math.abs(Number(value)) >= 1.0e+27 ? (Math.abs(Number(value)) / 1.0e+27).toFixed(3) + "o"// 24 Zeroes for Septillion
    : Math.abs(Number(value)) >= 1.0e+24 ? (Math.abs(Number(value)) / 1.0e+24).toFixed(3) + "S"// 21 Zeroes for Sextillion
    : Math.abs(Number(value)) >= 1.0e+21 ? (Math.abs(Number(value)) / 1.0e+21).toFixed(3) + "s"// 18 Zeroes for Quintillion
    : Math.abs(Number(value)) >= 1.0e+18 ? (Math.abs(Number(value)) / 1.0e+18).toFixed(3) + "Q"// 15 Zeroes for Quadrillion
    : Math.abs(Number(value)) >= 1.0e+15 ? (Math.abs(Number(value)) / 1.0e+15).toFixed(2) + "q"// 12 Zeroes for Trillions
    : Math.abs(Number(value)) >= 1.0e+12 ? (Math.abs(Number(value)) / 1.0e+12).toFixed(2) + "t"// 9 Zeroes for Billions
    : Math.abs(Number(value)) >= 1.0e+9 ? (Math.abs(Number(value)) / 1.0e+9).toFixed(2) + "B"// 6 Zeroes for Millions 
    : Math.abs(Number(value)) >= 1.0e+6 ? (Math.abs(Number(value)) / 1.0e+6).toFixed(1) + "M"// 3 Zeroes for Thousands
    : Math.abs(Number(value)) >= 1.0e+3 ? (Math.abs(Number(value)) / 1.0e+3).toFixed(1) + "K" : Math.abs(Number(value))
}

function tickGame() {
	var piesGained = pcP.pps * pcP.ppsMult
	pcP.pies = pcP.pies + piesGained
	if(pcG.doSaveGame && pcG.saveTick) saveGame()
	pcG.saveTick = !pcG.saveTick

	pcG.MSGtick = pcG.MSGtick - 1
	if(pcG.MSGtick < 0) pcG.MSGtick = 0
	if(pcG.MSGtick > 6) pcG.MSGtick = 4
	if(pcG.MSGtick == 0) $("#messageBar").fadeOut(100)

	if(pcG.AFK) pcG.awayPies = pcG.awayPies + piesGained

	if(pcP.pies == Infinity || pcP.pps == Infinity || pcP.ppc == Infinity) {
		messageGame("FREAK ACCIDENT:  PIES,  PPS & PPC CUT IN HALF!", 4)
		pcP.pies = pcP.pies / 2
		pcP.ppc = pcP.ppc / 2
		pcP.pps = pcP.pps / 2
	}

	reloadStats()
}

function lsExists(key) {
	x = localStorage.getItem(key)
	if(x == undefined) return false
	else return true
}

function devMode() {
	pcG.inDev = true
	pcG.doSaveGame = false
	alert("*Dev Mode Enabled*\n\nWill not save progress.\nReload to disable dev mode.")
	pcP.pies = 10 ** 30
	pcP.ppc = 10 ** 10
	pcP.pps = 10 ** 10
	pcZ.kitchenBackground = 0
	pcZ.hasSeenCredits = false
	refreshAll()
	$('#idVer').html('Version:' + pcV.version + (pcG.inDev ? '[Dev]' : ''))
	messageGame("Dev Mode Enabled - Will Not Save Game", 3)
}

function confirmationBox(text, btn1, btn2, btn1func, btn2func) {
	$('#pm_text').html(text)
	$('#pm_btn1_real').html(btn1)
	$('#pm_btn2_real').html(btn2)
	$('#pm_btn1').attr("onclick", btn1func)
	$('#pm_btn2').attr("onclick", btn2func)
	$('#popupMenu').fadeIn(500)
}

function resetGame() {
	confirmationBox("Reset Game?", "Yes", "No", "pcReset()", "$('#popupMenu').fadeOut(500)")
}

function pcReset() {
	pcG.doSaveGame = false
	localStorage.clear()
	window.location.reload()
}

window.addEventListener("blur", () => {
	pcG.AFK = true
	pcG.awayPies = 0
})

window.addEventListener("focus", () => {
	pcG.AFK = false
	if(pcG.awayPies > 0) {
		messageGame(`While Gone You Made +${p2n(pcG.awayPies)} Pies!`, 3)
	}
})

function sortUpgrades(stLocal) {
	hideAllUpgrades()
	var collection = document.getElementsByClassName('sort' + stLocal.toUpperCase())
	for(let i = 0; i < collection.length; i++) {
		collection[i].style.display = 'block'
	}
	refreshAll()
}

function hideAllUpgrades() {
	var collection = document.getElementsByClassName('pieUpgrade')
	for(let i = 0; i < collection.length; i++) {
		collection[i].style.display = 'none'
	}
}
