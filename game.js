pies=0
piesPerClick=1
piesPerSecond=0

$(document).ready(()=>{
	loadGame()
	refreshGame()
})

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

function pieClick(){
	pies=pies+piesPerClick
	saveGame()
	refreshGame()
}
