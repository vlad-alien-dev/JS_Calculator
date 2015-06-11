function printOnScreen(entry) {
	if(document.getElementById("screen").innerText==0){
	document.getElementById("screen").innerText = entry.toString();
	}else{
		document.getElementById("screen").innerText=
		document.getElementById("screen").innerText +
		entry.toString();
	}
}

