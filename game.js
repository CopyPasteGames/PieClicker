// PieClicker Version Variables
pcV = {
	version: 3,
	currentVersion: 3
}
// PieClicker Game Variables
pcG = {
	AFK: false,
	awayPies: 0,
	sortType: 'all',
	saveTick: 0,
	doSaveGame: true,
	hasInteracted: false,
	MSGtick: 0,
	pieAnimID: 0,
	inDev: false,
	isPlayingMusic: false
}
// PieClicker Remember Game Variables
pcZ = {
	kitchenBackground: 0,
	hasSeenCredits: false,
	tickSpeed: 1
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
		"misc": [
			"1|Pie.png",
			"2|PiePumpkin.png",
			"3|PieApple.png",
			"5|PieCheesecake.png",
			"7|PieOreoCheesecake.png",
			"10|PieLemonMeringue.png",
			"15|PieKeyLime.png",
			"25|PieChocolateCream.png",
			"35|PieStrawberry.png"
		],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)

			if(pcR[i].tier != pcU[i].assets.length) pcR[i].tier = pcR[i].tier + 1
			let asset = pcU[i].assets[pcR[i].tier]
			if(asset != undefined) $(elem).children()[0].src = `${r[13]}${asset}`
			else $(elem).css(r[10], r[9])
			let asseta = pcU[i].misc[pcR[i].tier].split('|')
			if(asseta != undefined) $("#pieBtn").attr("src", `${r[13]}${asseta[1]}`)

			pcP.ppcMult += asseta[0] * 1
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
			
			pcP.ppc += 1

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
			
			pcP.pps += 1

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
		"misc": [
			0, 2, 3, 4, 5, 8, 15, 20, 30, 50, 75
		],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			if(pcR[i].tier != pcU[i].assets.length) pcR[i].tier = pcR[i].tier + 1
			let asset = pcU[i].assets[pcR[i].tier]
			if(asset != undefined) $(elem).children()[0].src = `${r[13]}${asset}`
			else $(elem).css(r[10], r[9])

			pcP.ppcMult += pcU[i].misc[pcR[i].tier]

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 4,
        "name": "Flyers",
        "ccmc": 2,
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
			pcP.pps += gained
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

			let gained = randInt(5, 15)
			pcP.ppc += gained
			messageGame(`You got +${gained} new oven upgrades!`)

			boughtItem(i)
			reloadStats()
		}
	},
	{
		"id": 6,
        "name": "Rolling Pins",
        "ccmc": 1.025,
        "prts": 0,
        "show": true,
        "sort": "ALL PPS",
        "assets": [
            "UpgradeButtonRollingPin.png"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcP.pps += 25

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
			
			pcP.ppc += round(pcP.ppc * 0.1)
			pcP.pps += round(pcP.pps * 0.1)
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

			pcP.ppc += 200
			pcP.pps += 200

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
			"UpgradeButtonEmpire.png",
			"UpgradeButtonExpandEmpire.png",
			"UpgradeButtonBodyArmor.png",
			"UpgradeButtonArmy.png",
			"UpgradeButtonCitizens.png",
			"UpgradeButtonNavy.png",
            "UpgradeButtonSoldiers.png",
			"UpgradeButtonSoldiersTierIII.png",
			"UpgradeButtonSpheresOfInfluence.png"
        ],
		"misc": [
			() => {
				pcP.pps += 100000
			},
			() => {
				pcP.ppsMult += 50
				pcP.ppcMult += 50
				pcP.pps += 100000000
			},
			() => {
				pcP.ppcMult = pcP.ppcMult * 3
			},
			() => {
				pcP.ppsMult = pcP.ppsMult * 5
			},
			() => {
				pcP.pps += 75
			},
			() => {
				pcP.ppsMult = pcP.ppsMult * 10
			},
			() => {
				pcP.ppc += 10000
			},
			() => {
				pcP.ppc += 50000
			},
			() => {
				pcP.pps = pcP.pps * 10
			}
		],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks($(elem), 50)
			
			pcU[i].misc[pcR[i].tier]()

			if(pcR[i].tier != pcU[i].assets.length) pcR[i].tier = pcR[i].tier + 1
			let asset = pcU[i].assets[pcR[i].tier]
			if(asset != undefined) $(elem).children()[0].src = `${r[13]}${asset}`
			else $(elem).css(r[10], r[9])

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

const r = [
	'Version:',
	'gameVersion',
	'#pie',
	'#idVer',
	'#copyPasteLogo',
	'#creditsName',
	'#creditsTitle',
	'#messageBar',
	'[Dev]',
	'none',
	'display',
	'Checked',
	'Empty',
	'./assets/'
]

function hoverEnter(elem, i) {
	if(!canAfford(pcR[i].cost)) {
		$(`#pcu${i}`).css("filter", "brightness(0.25)")
		$(elem).append(`
			<div class="afford_cover" id="afrdcovr">
				<div class="centerText">
					<h1>Too Expensive</h1>
					<h3>[${p2n(pcR[i].cost)} Pies]</h3>
				</div>
			</div>
		`)
	}
}

function hoverLeave(elem, i) {
	$(`#pcu${i}`).css("filter", "")
	$("#afrdcovr").remove()
}

for(let i = 0; i < pcU.length; i++) {
    $('#upgradesContainer').append(`
        <div 	class="pieUpgrade sort${pcU[i].sort.replace(/ /g, ' sort')}" 
				onclick="pcU[${i}].buy(this, ${i})"
				onmouseenter="hoverEnter(this, ${i})"
				onmouseleave="hoverLeave(this, ${i})"
					>
			<img src="${r[13]}${pcU[i].assets[pcR[i].tier]}" id="pcu${pcU[i].id}" style="width:100%;height:100%;" draggable="false">
        </div>
    `)
}

$(document).ready(() => {
	var a = localStorage.getItem("lastLogTime")
	if(a != undefined) {
		var a = Date.parse(a)
		var b = Date.parse(new Date())
		var d = ((b - a) / 1000)
		if(d > 5) {
			var c = (pcP.pps * pcP.ppsMult) * d
			pies = pies + c
			waitThenMessageGame("Made " + p2n(c) + " Pies While Gone!", 2000, 3)
		}
	} else {
		$('#updateBarThingy').delay(1750).fadeIn(500)
	}

	// Reset Game If On Wrong Version
	if(lsExists(r[1]) && pcV.version != pcV.currentVersion) {
		pcG.doSaveGame = false
		localStorage.clear()
		setTimeout(() => {
			window.location.reload()
		}, 100)
	} else {
		localStorage.setItem(r[1], pcV.currentVersion)
		pcV.version = pcV.currentVersion
	}

	$(r[3]).html(r[0] + pcV.version + (pcG.inDev ? r[8] : ''))

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
	localStorage.setItem("lastLogTime", new Date())
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

async function waitThenMessageGame(m, s, t = 2) {
	await sleep(s)
	messageGame(m, t)
}

// Show loading screen logo
$(window).bind("load", () => {
	loadGame()
	pcTick=setInterval(()=>{tickGame()},pcZ.tickSpeed*1000)
	$(r[4]).delay(200).fadeIn(250)
	$(r[4]).delay(775).fadeOut(250)
	$("#introScreen").delay(1500).fadeOut(750)
	$("#adScreen").delay(1500).fadeIn(750)
})

// When the user clicks on the pie
$(r[2]).click((e) => {
	$(r[2]).stop(true, false)
	var c = pcP.ppc * pcP.ppcMult
	pcG.pieAnimID = pcG.pieAnimID + 1
	$("body").append(`<div id="pieInd${pcG.pieAnimID}">+${p2n(c)}</div>`)
	$('#pieInd' + pcG.pieAnimID).css({
		"position": "absolute",
		"top": (e.pageY + randInt(-10, 10)) + "px",
		"left": (e.pageX + randInt(-10, 10)) + "px",
		"color": "white",
		"font-weight": "800",
		"font-size": "29px",
		"pointer-events": r[9],
		// Chaned this from 'linear' to 'ease-in' be sure to test each use case.
		"animation": "GoUp 1250ms forwards ease-in"
	})
	$("#pieInd" + pcG.pieAnimID).show()
	$(r[2]).animate({"width": "95%", "left": "2.5%", "top": "14%"}, 40)
	$(r[2]).animate({"width": "90%", "left": "5%", "top": "15%"}, 100)
	removeElem("#pieInd" + pcG.pieAnimID)
	if(!pcG.hasInteracted) {
		pcG.hasInteracted = true
		setInterval(() => {musicTick()}, 10000)
	}
	pcP.pies += c
	reloadStats()
})

// Disable Annoyances if not in dev mode
if(!pcG.inDev) {
	document.addEventListener("contextmenu", (e) => {e.preventDefault()})
	document.onkeydown = function(e) {
		e = e || window.event
		if(!e.ctrlKey) return
		var c = e.which || e.keyCode
		switch(c) {
			case 83: e.preventDefault()
			case 73: e.preventDefault()
		}
	}
}

function boughtItem(i) {
	pcR[i].cost = round(pcR[i].cost * pcU[i].ccmc)
	pcR[i].qnty += 1
}

function round(n) {return Math.round(n)}
function removeElem(a) {setTimeout(() => {$(a).remove()}, 2250)}
function sleep(m) {return new Promise(r => setTimeout(r, m))}
function CLog(m) {console.log("[game.js " + new Date().getTime() + "] " + m)}
function randInt(n, x) {return Math.floor(Math.random() * (x - n + 1)) + n}

function reloadStats() {
	$("#pies").html(p2n(pcP.pies))
	$("#pps").html(p2n(pcP.pps))
	$("#ppc").html(p2n(pcP.ppc))
}

function empireRefresh() {
	let i = 11, a = pcU[i].assets[pcR[i].tier]
	if(a != undefined) $(`#pcu${i}`).attr("src", `${r[13]}${a}`)
	else $(`#pcu${i}`).parent().css(r[10], r[9])
}

function piesRefresh() {
	let i = 0, a = pcU[i].assets[pcR[i].tier], b = pcU[i].misc[pcR[i].tier].split('|')
	if(a != undefined) $(`#pcu${i}`).attr("src", `${r[13]}${a}`)
	else $(`#pcu${i}`).parent().css(r[10], r[9])
	if(b != undefined) $("#pieBtn").attr("src", `${r[13]}${b[1]}`)
}

function settingsRefresh() {
	let f = `${r[13]}CheckBox`
	$("#settingsMuteGame").attr("src", `${f}${pcS.mute ? r[11] : r[12]}.png`)
	$("#settingsDoClickAnimations").attr("src", `${f}${pcS.clickAnim ? r[11] : r[12]}.png`)
	$("#settingsDoPurchaseAnimations").attr("src", `${f}${pcS.purchaseAnim ? r[11] : r[12]}.png`)
	$("#settingAbbreviateNumbers").attr("src", `${f}${pcS.abbreviateInts ? r[11] : r[12]}.png`)
	if(pcG.doSaveGame) saveGame()
}

function chefsRefresh() {
	let i = 3, a = pcU[i].assets[pcR[i].tier]
	if(a != undefined) $(`#pcu${i}`).attr("src", `${r[13]}${a}`)
	else $(`#pcu${i}`).parent().css(r[10], r[9])
}

function backgroundRefresh() {
	let b = ['KitchenBackgroundBlue', 'KitchenBackgroundPink', 'KitchenBackgroundWhite']
	$("#pieChild").attr("src", `${r[13]}${b[pcZ.kitchenBackground]}.png`)
}

async function PleasePlayTheCredits() {
	var y = [
		{"n": "kgsensei", "t": "Lead Programmer"},
		{"n": "Azalea Jerez", "t": "Graphic Designer"},
		{"n": "Ian Paris-Wright", "t": "Music Artist"},
		{"n": "Lucient Chapin", "t": "Creative Director"},
		{"n": "Caleb Rhinehart", "t": "Concept Builder"},
		{"n": "Kylea Reed", "t": "Concept Builder"},
		{"n": "CopyPaste Games", "t": "Copyright &copy; 2022"},
		{"n": "Thank You", "t": "For Playing PieClicker!"}
	]
	$("#creditsOverlay").fadeIn(1000)
	await sleep(500)
	for(let i = 0; i < y.length; i++) {
		$(r[5]).html(y[i].n)
		$(r[6]).html(y[i].t)
		$(r[5]).fadeIn(500)
		$(r[6]).fadeIn(500)
		await sleep(2000)
		$(r[5]).fadeOut(500)
		$(r[6]).fadeOut(500)
		await sleep(500)
	}
	$("#creditsOverlay").fadeOut(1000)
	await sleep(300)
	if(!pcZ.hasSeenCredits && pcP.pies >= 500) {
		let x = randInt(round(pcP.pies / 4), round(pcP.pies / 6))
		messageGame(`Thanks For Watching The Credits (+${p2n(x)} Pies)`)
		pcZ.hasSeenCredits = true
		pcP.pies += x
	}
}

function canAfford(i) {return pcP.pies >= i}

function charge(i) {
	if(pcP.pies >= i) {
		pcP.pies -= i
		return true
	}
	messageGame("You Can\'t Afford This (Price:  "+p2n(i)+")")
	return false
}

async function messageGame(m, t = 3) {
	pcG.MSGtick += t
	$(r[7]).stop(true, true)
	$("#messageBarText").html(m)
	$(r[7]).fadeIn(100)
}

function p2n(v) {
	// 66 Zeros for Unvigintillion
    return Math.abs(Number(v)) >= 1.0e+66 ? (Math.abs(Number(v)) / 1.0e+66).toFixed(6) + "c"// 63 Zeros for Vigintillion
    : Math.abs(Number(v)) >= 1.0e+63 ? (Math.abs(Number(v)) / 1.0e+63).toFixed(6) + "v"// 60 Zeros for Novemdecillion
    : Math.abs(Number(v)) >= 1.0e+60 ? (Math.abs(Number(v)) / 1.0e+60).toFixed(6) + "N"// 57 Zeros for Octodecillion
    : Math.abs(Number(v)) >= 1.0e+57 ? (Math.abs(Number(v)) / 1.0e+57).toFixed(5) + "O"// 54 Zeros for Septendecillion
    : Math.abs(Number(v)) >= 1.0e+54 ? (Math.abs(Number(v)) / 1.0e+54).toFixed(5) + "St"// 51 Zeros for Sexdecillion
    : Math.abs(Number(v)) >= 1.0e+51 ? (Math.abs(Number(v)) / 1.0e+51).toFixed(5) + "Sd"// 48 Zeros for Quindecillion
    : Math.abs(Number(v)) >= 1.0e+48 ? (Math.abs(Number(v)) / 1.0e+48).toFixed(5) + "Qd"// 45 Zeros for Quattuordecillion
    : Math.abs(Number(v)) >= 1.0e+45 ? (Math.abs(Number(v)) / 1.0e+45).toFixed(5) + "Qt"// 42 Zeros for Tredecillion
    : Math.abs(Number(v)) >= 1.0e+42 ? (Math.abs(Number(v)) / 1.0e+42).toFixed(4) + "T"// 39 Zeros for Duodecillion
    : Math.abs(Number(v)) >= 1.0e+39 ? (Math.abs(Number(v)) / 1.0e+39).toFixed(4) + "D"// 36 Zeros for Undecillion
    : Math.abs(Number(v)) >= 1.0e+36 ? (Math.abs(Number(v)) / 1.0e+36).toFixed(4) + "U"// 33 Zeros for Decillion
    : Math.abs(Number(v)) >= 1.0e+33 ? (Math.abs(Number(v)) / 1.0e+33).toFixed(4) + "d"// 30 Zeros for Nonillion
    : Math.abs(Number(v)) >= 1.0e+30 ? (Math.abs(Number(v)) / 1.0e+30).toFixed(4) + "n"// 27 Zeros for Octillion
    : Math.abs(Number(v)) >= 1.0e+27 ? (Math.abs(Number(v)) / 1.0e+27).toFixed(3) + "o"// 24 Zeroes for Septillion
    : Math.abs(Number(v)) >= 1.0e+24 ? (Math.abs(Number(v)) / 1.0e+24).toFixed(3) + "S"// 21 Zeroes for Sextillion
    : Math.abs(Number(v)) >= 1.0e+21 ? (Math.abs(Number(v)) / 1.0e+21).toFixed(3) + "s"// 18 Zeroes for Quintillion
    : Math.abs(Number(v)) >= 1.0e+18 ? (Math.abs(Number(v)) / 1.0e+18).toFixed(3) + "Q"// 15 Zeroes for Quadrillion
    : Math.abs(Number(v)) >= 1.0e+15 ? (Math.abs(Number(v)) / 1.0e+15).toFixed(2) + "q"// 12 Zeroes for Trillions
    : Math.abs(Number(v)) >= 1.0e+12 ? (Math.abs(Number(v)) / 1.0e+12).toFixed(2) + "t"// 9 Zeroes for Billions
    : Math.abs(Number(v)) >= 1.0e+9 ? (Math.abs(Number(v)) / 1.0e+9).toFixed(2) + "B"// 6 Zeroes for Millions 
    : Math.abs(Number(v)) >= 1.0e+6 ? (Math.abs(Number(v)) / 1.0e+6).toFixed(1) + "M"// 3 Zeroes for Thousands
    : Math.abs(Number(v)) >= 1.0e+3 ? (Math.abs(Number(v)) / 1.0e+3).toFixed(1) + "K" : Math.abs(Number(v))
}

function tickGame() {
	var g = (pcP.pps * pcP.ppsMult) * pcZ.tickSpeed
	pcP.pies += g
	if(pcG.doSaveGame && pcG.saveTick == 10) {
		saveGame()
		pcG.saveTick = 0
	}
	pcG.saveTick += 1

	pcG.MSGtick -= 1
	if(pcG.MSGtick < 0) pcG.MSGtick = 0
	if(pcG.MSGtick > 6) pcG.MSGtick = 4
	if(pcG.MSGtick == 0) $(r[7]).fadeOut(100)

	if(pcG.AFK) pcG.awayPies += g

	if(pcP.pies == Infinity || pcP.pps == Infinity || pcP.ppc == Infinity) {
		messageGame("FREAK ACCIDENT:  PIES, PPS & PPC DESTROYED!", 4)
		pcP.pies = 5 * 10 ** 9
		pcP.pps  = 5 * 10 ** 8
		pcP.ppc  = 5 * 10 ** 7
	}

	reloadStats()
}

function lsExists(k) {
	x = localStorage.getItem(k)
	if(x == undefined) return false
	return true
}

function devMode() {
	pcG.inDev = true
	pcG.doSaveGame = false
	alert("*Dev Mode Enabled*\n\nWill not save progress.\nReload to disable dev mode.")
	pcP.pies = 10 ** 30
	pcP.ppc  = 10 ** 10
	pcP.pps  = 10 ** 10
	pcZ.kitchenBackground = 0
	pcZ.hasSeenCredits = false
	refreshAll()
	$(r[3]).html(r[0] + pcV.version + (pcG.inDev ? r[8] : ''))
	messageGame("Dev Mode Enabled - Will Not Save Game", 3)
}

function confirmationBox(t, b1, b2, bf, bg) {
	$('#pm_text').html(t)
	$('#pm_btn1_real').html(b1)
	$('#pm_btn2_real').html(b2)
	$('#pm_btn1').attr("onclick", bf)
	$('#pm_btn2').attr("onclick", bg)
	$('#popupMenu').fadeIn(500)
}

function resetGame() {confirmationBox("Reset Game?", "Yes", "No", "pcReset()", "$('#popupMenu').fadeOut(500)")}

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

function sortUpgrades(l) {
	haUp()
	var c = document.getElementsByClassName('sort' + l.toUpperCase())
	for(let i = 0; i < c.length; i++) {
		c[i].style.display = 'block'
	}
	refreshAll()
}

function haUp() {
	var c = document.getElementsByClassName('pieUpgrade')
	for(let i = 0; i < c.length; i++) {
		c[i].style.display = r[9]
	}
}

function updateTickSpeed(t) {
	clearInterval(pcTick)
	pcZ.tickSpeed = t
	pcTick = setInterval(() => {tickGame()}, t * 1000)
}
