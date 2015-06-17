var result;
var member;
var screenValue;
var remememberedMember;
var digits=document.getElementsByClassName('digitBtn');
var operators=document.getElementsByClassName('operatorBtn');
var deletes=document.getElementsByClassName('delete');
var currOperator;
var nextOperator;

//document.getElementById("b1").addEventListener("click", function(){ changeScreenValue(document.getElementById("b1").innerText); });
//document.getElementById("b2").addEventListener("click", function(){ changeScreenValue(document.getElementById("b2").innerText); });
//document.getElementById("b3").addEventListener("click", function(){ changeScreenValue(document.getElementById("b3").innerText); });
//document.getElementById("b4").addEventListener("click", function(){ changeScreenValue(document.getElementById("b4").innerText); });
//document.getElementById("b5").addEventListener("click", function(){ changeScreenValue(document.getElementById("b5").innerText); });
//document.getElementById("b6").addEventListener("click", function(){ changeScreenValue(document.getElementById("b6").innerText); });
//document.getElementById("b7").addEventListener("click", function(){ changeScreenValue(document.getElementById("b7").innerText); });
//document.getElementById("b8").addEventListener("click", function(){ changeScreenValue(document.getElementById("b8").innerText); });
//document.getElementById("b9").addEventListener("click", function(){ changeScreenValue(document.getElementById("b9").innerText); });
//document.getElementById("b0").addEventListener("click", function(){ changeScreenValue(document.getElementById("b0").innerText); });

//document.getElementById("bplus").addEventListener("click", function(){ getOperator(document.getElementById("bplus").innerText); });
//document.getElementById("bminus").addEventListener("click", function(){ getOperator(document.getElementById("bminus").innerText); });
//document.getElementById("bmultiply").addEventListener("click", function(){ getOperator(document.getElementById("bmultiply").innerText); });
//document.getElementById("bdivide").addEventListener("click", function(){ getOperator(document.getElementById("bdivide").innerText); });

for (i = 0; i < digits.length; i++) { 
	(function(){
		var id = i;
		digits[i].addEventListener("click", function(){changeScreenValue(digits[id].innerText); }, false);	
		digits[i].addEventListener("click", function(){addToLog(digits[id].innerText); }, false);
	}())
}

for (i = 0; i < operators.length; i++) { 
	(function(){
		var id = i;
		operators[i].addEventListener("click", function(){getOperator(operators[id].innerText); }, false);	
		operators[i].addEventListener("click", function(){addToLog(operators[id].innerText); }, false);	
	}())
}
for (i = 0; i < deletes.length; i++) { 
	(function(){
		var id = i;
		deletes[i].addEventListener("click", function(){deleteObject(this); }, false);
	}())
}
var addDigit = (function (numToAdd) {
    screenValue = 0;
        return {
		getRes:function () {
			
			if(numToAdd=='reset'){
				if(remememberedMember !== undefined&&remememberedMember !== "unset"){
					return screenValue;
				}
				else{					
					return screenValue=parseFloat(member);
				}
			}
			
			return screenValue==0 ? screenValue=numToAdd : screenValue+=numToAdd;
		},
		setRes: function(digit) {
		numToAdd = digit;
        }
	}
})();

function changeScreenValue(digit){
	addDigit.setRes(digit);
    document.getElementById("screen").innerHTML = addDigit.getRes();
	member=parseFloat(document.getElementById("screen").innerHTML);
	return member;
}
function getOperator(operator){
	if(remememberedMember === undefined&&remememberedMember === "unset"){
		remememberedMember=member;
		nextOperator=operator;
	}
	else{		
		currOperator=nextOperator;
		nextOperator=operator;
	switch (currOperator) {
    case "+":
        member+=remememberedMember;	
        break;
    case "-":
        member=remememberedMember-member;	
        break;
    case "/":
        member=remememberedMember/member;	
        break;
	case "*":
		member=remememberedMember*member;	
		break;
	}
	remememberedMember="unset";
	}
	resetScreen();
	remememberedMember=member;
	member=0;
	screenValue=0;
}
var resetScreen = function(){
	changeScreenValue('reset');
}
Parse.initialize("Eb6W51QvPcyrUyuGHk6b3LjM1wZXnW3NOYhkLT4K", "TLXRT0s7foHmYJT7osc4moKjcFFrknpSElmvnSBL");
var TestObject = Parse.Object.extend("TestObject");

var addToLog = function(input){
	//Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY");
	var testObject = new TestObject();

	  testObject.save({operationType: input}, {
	  success: function(object) {
		$(".success").show();
		showLog(object.id);
	  },
	  error: function(model, error) {
		$(".error").show();
	  }
	});	
}

var showLog=function(objectId){	
	var query = new Parse.Query(TestObject);
	query.get(objectId, {
	  success: function(testObject) {
			var row = document.createElement("tr");
			var time = document.createElement("td");			
			var textnode = document.createTextNode((testObject.createdAt).toLocaleTimeString());			
			time.appendChild(textnode);
			var opType=document.createElement("td");
			var opTypeNode = document.createTextNode(testObject.attributes.operationType);			
			opType.appendChild(opTypeNode);
			var del = document.createElement("td");			
			var delnode = document.createElement("div");		
			delnode.setAttribute("class", "delete");
			delnode.setAttribute("id", objectId);
			delnode.setAttribute("onclick", "deleteObject(this)");
			del.appendChild(delnode);
			document.getElementById("logs").appendChild(row).appendChild(time);
			document.getElementById("logs").lastChild.appendChild(opType);
			document.getElementById("logs").lastChild.appendChild(del);
		console.log(testObject.attributes.operationType);
		var timeOptions={
		hour: "2-digit", minute: "2-digit"
		};
		console.log((testObject.createdAt).toLocaleTimeString());
	  },
	  error: function(testObject, error) {
		// The object was not retrieved successfully.
		// error is a Parse.Error with an error code and message.
	  }
	});
}

var deleteObject=function(entry){
var query = new Parse.Query(TestObject);
query.get(entry.id, {
  success: function(myObj) {
    myObj.destroy({});
	var el = document.getElementById(entry.id);
	var par=el.parentNode.parentNode;
	
	par.parentNode.removeChild(par);
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
  }
});
	
}