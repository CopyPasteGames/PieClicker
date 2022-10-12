function ka(auth){
	if(auth!="jdskga16"){return}
	if(document.body.clientWidth<=500){var isMobile=true}else{var isMobile=false}
	if(localStorage.getItem('ka_id')==null){localStorage.setItem('ka_id',([1e7]+-4e3+-8e3).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)))}
	if(localStorage.getItem(`ka_fv_${location.host}`)==null){var firstVisit=true}else{var firstVisit=false}
	var lang=window.navigator.language||window.navigator.userLanguage||"Unknown"
	var browserName=((agent)=>{switch(true){case agent.indexOf("edge")>-1:return "Edge";case agent.indexOf("edg")>-1:return "Edge | Chromium";case agent.indexOf("opr")>-1&&!!window.opr:return "Opera";case agent.indexOf("chrome")>-1&&!!window.chrome:return "Chrome";case agent.indexOf("trident")>-1:return "IE";case agent.indexOf("firefox")>-1:return "Firefox";case agent.indexOf("safari")>-1:return "Safari";default:return "Unknown"}})(window.navigator.userAgent.toLowerCase())
	var os=((agent)=>{switch(true){case agent.indexOf("Win")!=-1:return "Windows";case agent.indexOf("Mac")!=-1:return "Macintosh";case agent.indexOf("Linux")!=-1:return "Linux";case agent.indexOf("Android")!=-1:return "Android";case agent.indexOf("like Mac")!=-1:return "iOS";default:return "Unknown";}})(window.navigator.userAgent)
	let xhr=new XMLHttpRequest()
	xhr.open("POST","https://rainydais.com/update.php",true)
	xhr.setRequestHeader("Content-Type","application/json")
	xhr.onreadystatechange=()=>{if(xhr.readyState==4&&xhr.status==200){localStorage.setItem(`ka_fv_${location.host}`,'1')}}
	let data=JSON.stringify({"auth":auth,"firstVisit":firstVisit,"siteName":location.host,"ipAddress":"resolveOnRequest","pageTitle":document.title,"pageUrl":location.pathname,"userID":localStorage.getItem('ka_id'),"isMobile":isMobile,"lang":lang,"browser":browserName,"os":os})
	xhr.send(data)
}
window.onload=()=>{ka("jdskga16")}
