var expressionItems=[];
var nextExpressionItem;
var nextOperand;
var isFirstDigitAfterOperand=0;
var result;
function printOnScreen(entry) {
	if(document.getElementById("screen").innerText==0){
	document.getElementById("screen").innerText = entry.toString();
	}else{
		if(nextOperand&&isFirstDigitAfterOperand==1){
				document.getElementById("screen").innerText=entry.toString();
				isFirstDigitAfterOperand=0;
			}
		else(
			
				document.getElementById("screen").innerText=
				document.getElementById("screen").innerText +
				entry.toString()
			
		)
	}
	addMember(document.getElementById("screen").innerText);
}
function addMember(midOutput){	
	 nextExpressionItem=parseFloat(midOutput);
}
function passOperand(operand){
	nextOperand=operand;
	expressionItems=[nextExpressionItem];
	nextExpressionItem='';
	isFirstDigitAfterOperand=1;
}
