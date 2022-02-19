pies=0
piesPerClick=1
piesPerSecond=0
settingsMute=false
pieClickAnimationId=0

$(document).ready(()=>{
	loadGame()
	refreshGame()
})

$("#pie").click((e)=>{
	$("#pie").stop(true,false)
	$("#pie").css({"width":"90%","left":"5%","top":"15%"})
	pieClickAnimationId=pieClickAnimationId+1;
	$("body").append('<div id="pieInd' + pieClickAnimationId + '" hidden style="pointer-events:none;">+' + piesPerClick + '</div>');
	$("#pieInd" + pieClickAnimationId).css("top", (e.pageY + getRndInteger(-8,8)) + "px");
	$("#pieInd" + pieClickAnimationId).css("left", (e.pageX + getRndInteger(-8,8)) + "px");
	$("#pieInd" + pieClickAnimationId).css("position", "absolute");
	$("#pieInd" + pieClickAnimationId).css("font-size", "20px");
	$("#pieInd" + pieClickAnimationId).css("color", "white");
	$("#pieInd" + pieClickAnimationId).css("animation", "GoUp 2s forwards linear");
	$("#pieInd" + pieClickAnimationId).show();
	pies=pies+piesPerClick
	saveGame()
	refreshGame()
	$("#pie").animate({"width":"95%","left":"2.5%","top":"14%"},50)
	$("#pie").animate({"width":"90%","left":"5%","top":"15%"},100)
})

function getRndInteger(min,max){
	return Math.floor(Math.random()*(max-min+1))+min
}

function saveGame(){
	localStorage.setItem("pies",pies);
	localStorage.setItem("piesPerClick",piesPerClick);
	localStorage.setItem("piesPerSecond",piesPerSecond);
	localStorage.setItem("IsGameSaved?","1")
}

function loadGame(){
	if(localStorage.getItem("IsGameSaved?")*1==1){
		pies=localStorage.getItem("pies")*1
		piesPerClick=localStorage.getItem("piesPerClick")*1
		piesPerSecond=localStorage.getItem("piesPerSecond")*1
	}
}

function refreshGame(){
	$("#pieCount").html("Pies: " + pies)
	$("#pieGRate").html("Pies/Sec: " + piesPerSecond)
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
}
