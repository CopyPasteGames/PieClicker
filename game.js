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
		"id": 6,
        "qnty": 0,
        "cost": 5000,
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
			"UpgradeButtonPumpkinPie.webp",
			"UpgradeButtonApplePie.webp",
			"UpgradeButtonCheesecake.webp"
        ],
		"misc": [
			"1|Pie.webp",
			"2|PiePumpkin.webp",
			"3|PieApple.webp",
			"5|PieCheesecake.webp"
		],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks(elem)

			if(pcR[i].tier != pcU[i].assets.length) pcR[i].tier = pcR[i].tier + 1
			let asset = pcU[i].assets[pcR[i].tier]
			if(asset != undefined) $(elem).children()[0].src = `${r[13]}${asset}`
			else $(elem).css(r[10], r[9])
			let asseta = pcU[i].misc[pcR[i].tier].split('|')
			if(asseta != undefined) $("#pieBtn").attr("src", `${r[13]}${asseta[1]}`)

			pcP.ppcMult += asseta[0] * 1
			// UPDATE THIS WITH THE pieClickMultiplier VARIABLES FROM old_game.js

			boughtItem(i)
			hoverEnter(elem, i)
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
            "UpgradeButtonOven.webp"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks(elem)
			
			pcP.ppc += 1

			boughtItem(i)
			hoverEnter(elem, i)
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
            "UpgradeButtonAssistantChef.webp"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks(elem)
			
			pcP.pps += 1

			boughtItem(i)
			hoverEnter(elem, i)
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
            "UpgradeButtonRollingPin.webp"
        ],
		"buy": (elem, i) => {
			if(!charge(pcR[i].cost)) return false
			clickFireworks(elem)
			
			pcP.pps += 25

			boughtItem(i)
			hoverEnter(elem, i)
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
precomp = {
	ca: 0,
	cad: 0,
	pps: 0,
	ppc: 0,
	tick: 0
}

const r = [
	'Version:',
	'gameVersion',
	'#pie',
	'idVer',
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

function gid(x) {return document.getElementById(x)}

function hoverEnter(elem, i) {
	if(!canAfford(pcR[i].cost)) {
		$('#pcu'+i).css("filter", "brightness(0.25)")
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
	$('#pcu'+i).css("filter", "")
	$("#afrdcovr").remove()
}

for(let i = 0; i < pcU.length; i++) {
    gid('upgradesContainer').innerHTML += `
        <div 	class="pieUpgrade sort${pcU[i].sort.replace(/ /g, ' sort')}" 
				onclick="pcU[${i}].buy(this, ${i})"
				onmouseenter="hoverEnter(this, ${i})"
				onmouseleave="hoverLeave(this, ${i})">
			<img loading="lazy" src="${r[13]}${pcU[i].assets[pcR[i].tier]}" id="pcu${pcU[i].id}" style="width:100%;height:100%;" draggable="false" alt="Update ${pcU[i].name}">
        </div>
    `
}

function startGame() {
	let a = localStorage.getItem("lastLogTime")
	if(a != undefined) {
		let llt = Date.parse(a)
		let b = Date.parse(new Date())
		let d = ((b - llt) / 1000)
		if(d > 5) {
			let c = (pcP.pps * pcP.ppsMult) * d
			pcP.pies += c
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

	gid(r[3]).innerHTML = "Version:DEMO"

	refreshAll()
}

function refreshAll() {
	precompute()
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
})

// When the user clicks on the pie
$(r[2]).click((e) => {
	$(r[2]).stop(true, false)
	pcG.pieAnimID = pcG.pieAnimID + 1
	$("body").append(`<div id="pieInd${pcG.pieAnimID}" class="ccc">+${precomp.cad}</div>`)
	$('#pieInd' + pcG.pieAnimID).css({
		"top": (e.pageY + randInt(-12, 12)) + "px",
		"left": (e.pageX + randInt(-12, 12)) + "px"
	})
	$(r[2]).animate({"width": "95%", "left": "2.5%", "top": "14%"}, 40)
	$(r[2]).animate({"width": "90%", "left": "5%", "top": "15%"}, 100)
	removeElem("pieInd" + pcG.pieAnimID, 750)
	if(!pcG.hasInteracted) {
		pcG.hasInteracted = true
		setInterval(() => {musicTick()}, 10000)
	}
	pcP.pies += precomp.ca
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
	precompute()
	pcR[i].cost = round(pcR[i].cost * pcU[i].ccmc)
	pcR[i].qnty += 1
}

function round(n) {return Math.round(n)}
function removeElem(a, w) {setTimeout(() => {gid(a).remove()}, w)}
function sleep(m) {return new Promise(r => setTimeout(r, m))}
function CLog(m) {console.log("[game.js " + new Date().getTime() + "] " + m)}
function randInt(n, x) {return Math.floor(Math.random() * (x - n + 1)) + n}

function reloadStats() {
	$("#pies").html(p2n(pcP.pies))
	$("#pps").html(precomp.pps)
	$("#ppc").html(precomp.ppc)
}

function piesRefresh() {
	let i = 0, a = pcU[i].assets[pcR[i].tier], b = pcU[i].misc[pcR[i].tier].split('|')
	if(a != undefined) $(`#pcu${i}`).attr("src", `${r[13]}${a}`)
	else $(`#pcu${i}`).parent().css(r[10], r[9])
	if(b != undefined) $("#pieBtn").attr("src", `${r[13]}${b[1]}`)
}

function settingsRefresh() {
	let f = `${r[13]}CheckBox`
	$("#settingsMuteGame").attr("src", `${f}${pcS.mute ? r[11] : r[12]}.webp`)
	$("#settingsDoClickAnimations").attr("src", `${f}${pcS.clickAnim ? r[11] : r[12]}.webp`)
	$("#settingsDoPurchaseAnimations").attr("src", `${f}${pcS.purchaseAnim ? r[11] : r[12]}.webp`)
	$("#settingAbbreviateNumbers").attr("src", `${f}${pcS.abbreviateInts ? r[11] : r[12]}.webp`)
	if(pcG.doSaveGame) saveGame()
}

async function PleasePlayTheCredits() {
	let y = [
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

function canAfford(i) {
	return pcP.pies >= i
}

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
	return Intl.NumberFormat('en-US', {
		notation: "compact",
		maximumFractionDigits: 1
	}).format(v)
}

function precompute() {
	precomp.ca = pcP.ppc * pcP.ppcMult
	precomp.cad = p2n(precomp.ca)
	precomp.pps = p2n(pcP.pps)
	precomp.ppc = p2n(pcP.ppc)
	precomp.tick = (pcP.pps * pcP.ppsMult) * pcZ.tickSpeed
}

function tickGame() {
	pcP.pies += precomp.tick
	if(pcG.doSaveGame && pcG.saveTick == 30) {
		saveGame()
		pcG.saveTick = 0
	}
	pcG.saveTick += 1

	pcG.MSGtick -= 1
	if(pcG.MSGtick < 0) pcG.MSGtick = 0
	if(pcG.MSGtick > 6) pcG.MSGtick = 4
	if(pcG.MSGtick == 0) $(r[7]).fadeOut(100)

	if(pcG.AFK) pcG.awayPies += precomp.tick

	if(pcP.pies == Infinity || pcP.pps == Infinity || pcP.ppc == Infinity) {
		messageGame("FREAK ACCIDENT:  PIES, PPS & PPC DESTROYED!", 4)
		pcP.pies = 5 * 10 ** 9
		pcP.pps  = 5 * 10 ** 8
		pcP.ppc  = 5 * 10 ** 7
	}

	reloadStats()
}

function lsExists(k) {
	if(localStorage.getItem(k) == null) return false
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
	gid(r[3]).innerHTML = r[0] + pcV.version + (pcG.inDev ? r[8] : '')
	messageGame("Dev Mode Enabled - Will Not Save Game", 3)
}

function confirmationBox(t, b1, b2, bf, bg) {
	gid('pm_text').innerHTML = t
	gid('pm_btn1_real').innerHTML = b1
	gid('pm_btn2_real').innerHTML = b2
	$('#pm_btn1').attr("onclick", bf)
	$('#pm_btn2').attr("onclick", bg)
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
