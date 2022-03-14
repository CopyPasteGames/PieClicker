String.prototype.toBool=function(){
	if(this.toLowerCase()=='true')return true
	else if(this.toLowerCase()=='false')return false
}

String.prototype.toPrice=function(){
    var string=this
    if(string[0]!='$')string='$'+string
	if(string.indexOf('.')==-1)string=string+'.00'
	if(string.split('.')[1].length==1)string=string+'0'
	return string
}

String.prototype.toFloat=function(){
    return this*1
}

String.prototype.toInt=function(){
    return this*1
}

String.prototype.isUpperCase=function(){
    if(this.toUpperCase()==this)return true
    else return false
}

String.prototype.isLowerCase=function(){
    if(this.toLowerCase()==this)return true
    else return false
}

String.prototype.invertCase=function(){
    var string=this
    var endRes=""
    for(i=0;i<string.length;i++){
        if(string[i].isUpperCase())endRes=endRes+string[i].toLowerCase()
        else endRes=endRes+string[i].toUpperCase()
    }
    return endRes
}

String.prototype.isEmpty=function(){
    var string=this
    if(string.replaceAll(/ /g,'')=='')return true
    else return false
}

String.prototype.corrupt=function(amount){
	var string=this
	var replaceCharacters=["!","~","@","#","$","%","&","+","=","-",";",":","[","{","]","}","<",">","/","?","|"]
	var endRes=""
	for(i=0;i<string.length;i++){
		var number=Math.floor(Math.random()*((100*amount)/100-0+1))
		if(number==1){
			endRes=endRes+replaceCharacters[Math.floor(Math.random()*replaceCharacters.length)]
		}else{
			endRes=endRes+string[i]
		}
	}
	return endRes
}
