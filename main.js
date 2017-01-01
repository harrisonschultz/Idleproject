var wood = 0;
var food = 0;
var stone = 0;
var lumberjacks = 0;
var farmers = 0;
var miners = 0;
var foodMultiplier = 1;
var woodMultiplier = 1;
var stoneMultiplier = 1;
var researchPoints = 0;
var researchInterval;
var currentUpgrade = "";
var finishedUpgrades;
var huts = 0;
var totalPop = 2;
var currentPop = 2;
var employed = 0;
var unemployed = 2;
var settlerCounter = 300;


var save = {
			wood: wood,
			food: food,
			stone: stone,
			lumberjacks: lumberjacks,
			farmers: farmers,
			miners: miners,
			foodMultiplier: foodMultiplier,
			woodMultiplier: woodMultiplier,
			stoneMultiplier: stoneMultiplier,
			finishedUpgrades: finishedUpgrades,
			totalPop:  totalPop,
			currentPop: currentPop,
			employed: employed,
			unemployed: unemployed,
			huts: huts
};


function woodClick(number){
    wood = wood + number;
    document.getElementById("wood").innerHTML = wood;
};
function foodClick(number){
    food = food + number;
    document.getElementById("food").innerHTML = food;
};
function stoneClick(number){
    stone = stone + number;
    document.getElementById("stone").innerHTML = stone;
};



function buyLumberjack(){
    var lumberjackCost = Math.floor(10 * Math.pow(1.1,lumberjacks));   
    if(food >= lumberjackCost && unemployed >= 1){ 
		unemployed--;
		employed++	;
        lumberjacks = lumberjacks + 1;                                 
    	food = food - lumberjackCost;           
		document.getElementById('lumberjacks').innerHTML = lumberjacks;  
		document.getElementById("food").innerHTML = food;  
		var nextCost = Math.floor(10 * Math.pow(1.1,lumberjacks));     
    document.getElementById('lumberjackCost').innerHTML = nextCost; 
	document.getElementById('currentPopEmployed').innerHTML = employed;
	document.getElementById('currentPopUnemployed').innerHTML = unemployed;
	
    };
};
function buyFarmer(){
    var farmerCost = Math.floor(10 * Math.pow(1.1,farmers));     
    if(food >= farmerCost && unemployed >= 1){      
		unemployed--;
		employed++	;
        farmers = farmers + 1;                                   
    	food = food - farmerCost;                         
        document.getElementById('farmers').innerHTML = farmers; 
        document.getElementById('food').innerHTML = food; 
 var nextCost = Math.floor(10 * Math.pow(1.1,farmers));     
    document.getElementById("farmerCost").innerHTML = nextCost;  
	document.getElementById('currentPopEmployed').innerHTML = employed;
	document.getElementById('currentPopUnemployed').innerHTML = unemployed;
    };
   
};
function buyMiner(){
    var minerCost = Math.floor(10 * Math.pow(1.1,miners));   
    if(food >= minerCost && unemployed >= 1){ 
		unemployed--;
		employed++;
        miners = miners + 1;                                 
    	food = food - minerCost;                       
        document.getElementById('miners').innerHTML = miners; 
        document.getElementById('food').innerHTML = food;  
		  var nextCost = Math.floor(10 * Math.pow(1.1,miners));       
    document.getElementById('minerCost').innerHTML = nextCost; 
	document.getElementById('currentPopEmployed').innerHTML = employed;
	document.getElementById('currentPopUnemployed').innerHTML = unemployed;
	
    };
  
};

function buyPlough(){
	var upgradeCost = 100;
	if(wood >= upgradeCost && stone >= upgradeCost){
		wood = wood - upgradeCost;
		stone = stone - upgradeCost;
		currentUpgrade = "plough";
		upgradeHandler();
		document.getElementById("plough").setAttribute("hidden", 0);	
	};
			
};
function buyStoneAxes(){
	var upgradeCost = 100;
	if(wood >= upgradeCost && stone >= upgradeCost){
		wood = wood - upgradeCost;
		stone = stone - upgradeCost;
		currentUpgrade = "stoneAxes";
		upgradeHandler();
		document.getElementById("stoneAxes").setAttribute("hidden", 0);	
	};
};
	
	function buyStonePicks(){
	var upgradeCost = 100;
	if(wood >= upgradeCost && stone >= upgradeCost){
		wood = wood - upgradeCost;
		stone = stone - upgradeCost;
		currentUpgrade = "stonePicks";
		upgradeHandler();
		document.getElementById("stonePicks").setAttribute("hidden", 0);	
	};

};
	function buildHut(){
		var hutCost = Math.floor(100 * Math.pow(1.1,huts)); 
		if (wood >= hutCost && stone >= (hutCost/2)){
			huts = huts + 1;
			wood = wood - hutCost;
			stone = stone - (hutCost/2);
			totalPop = totalPop + 2;
			var nextCost = Math.floor(100 * Math.pow(1.1,huts));     
			document.getElementById('hutCostWood').innerHTML = nextCost; 
			document.getElementById('hutCostStone').innerHTML = (nextCost/2); 
			
			var totalPopNodeList = document.getElementsByClassName("totalPop");
			for (i = 0; i <	totalPopNodeList.length; i++) {
				totalPopNodeList[i].innerHTML = totalPop;
			}
	}
	}

	function upgradeHandler(){
		document.getElementById("currentResearchCaption").removeAttribute("hidden");	
		document.getElementById("researchBar").removeAttribute("hidden");
		var i;
		var upgradeButtonsNodeList = document.getElementsByClassName("upgradeButtons");
		console.log(JSON.stringify(upgradeButtonsNodeList));
		console.log(upgradeButtonsNodeList.length);
		for (i = 0; i <	upgradeButtonsNodeList.length; i++) {
			upgradeButtonsNodeList[i].setAttribute("disabled", 0);
		}
		researchInterval = window.setInterval(researchUpgrade, 500);
	}
	
	function upgradeComplete(){
		document.getElementById("currentResearchCaption").setAttribute("hidden", 0);
		document.getElementById("researchBar").setAttribute("hidden", 0);
		var upgradeButtonsNodeList = document.getElementsByClassName("upgradeButtons");
		for (i = 0; i <	upgradeButtonsNodeList.length; i++) {
			upgradeButtonsNodeList[i].removeAttribute("disabled");
		}
		if (currentUpgrade == "plough"){
			console.log("Plough Complete");
			finishedUpgrades.push("plough");
			foodMultiplier = foodMultiplier + 0.25;
				
		}
		else if (currentUpgrade == "stoneAxes"){
			console.log("Stone Axes Complete");
			finishedUpgrades.push("stoneAxes");
			woodMultiplier = woodMultiplier + 0.25;
		
		}
		else if (currentUpgrade == "stonePicks"){
			console.log("Stone Picks Complete");
			finishedUpgrades.push("stonePicks");
			stoneMultiplier = stoneMultiplier + 0.25;
		
		}
	}

	function researchUpgrade(){
		document.getElementById("researchProgress").style.width = "" + researchPoints + "%";
			researchPoints = researchPoints + 0.5;
		if (researchPoints >= 100){
			researchPoints = 0;
			document.getElementById("currentResearchCaption").removeAttribute("hidden");	
			document.getElementById("researchBar").removeAttribute("hidden");
			upgradeComplete();
			clearInterval(researchInterval);
			};
	};
	
	function saveIt(){
		save = {
			wood: wood,
			food: food,
			stone: stone,
			lumberjacks: lumberjacks,
			farmers: farmers,
			miners: miners,
			foodMultiplier: foodMultiplier,
			woodMultiplier: woodMultiplier,
			stoneMultiplier: stoneMultiplier,
			finishedUpgrades: finishedUpgrades,
			totalPop:  totalPop,
			currentPop: currentPop,
			employed: employed,
			unemployed: unemployed,
			huts: huts
		}
		localStorage.setItem("save",JSON.stringify(save));
		
	}
	function load(){
		var savegame = JSON.parse(localStorage.getItem("save"));
		if (typeof savegame.food !== "undefined")food = savegame.food;
		if (typeof savegame.wood !== "undefined")wood = savegame.wood;
		if (typeof savegame.stone !== "undefined") stone = savegame.stone;
		if (typeof savegame.farmers!== "undefined") farmers = savegame.farmers;
		if (typeof savegame.lumberjacks !== "undefined") lumberjacks = savegame.lumberjacks;
		if (typeof savegame.miners!== "undefined")  miners = savegame.miners;
		if (typeof savegame.foodMultiplier!== "undefined") foodMultiplier = savegame.foodMultiplier;
		if (typeof savegame.woodMultiplier!== "undefined") woodMultiplier = savegame.woodMultiplier;
		if (typeof savegame.stoneMultiplier!== "undefined") stoneMultiplier = savegame.stoneMultiplier;
		if (typeof savegame.finishedUpgrades!== "undefined") finishedUpgrades = savegame.finishedUpgrades;
		if (typeof savegame.totalPop!== "undefined") totalPop = savegame.totalPop;
		if (typeof savegame.currentPop!== "undefined") currentPop = savegame.currentPop;
		if (typeof savegame.employed!== "undefined") employed = savegame.employed;
		if (typeof savegame.unemployed!== "undefined") unemployed = savegame.unemployed;
		if (typeof savegame.huts!== "undefined") huts = savegame.huts;
		
		document.getElementById('farmers').innerHTML = farmers; 
        document.getElementById('food').innerHTML = food; 
		document.getElementById('miners').innerHTML = miners; 
        document.getElementById('stone').innerHTML = stone; 
		document.getElementById('lumberjacks').innerHTML = lumberjacks; 
        document.getElementById('wood').innerHTML = wood; 
		document.getElementById('currentPop').innerHTML = currentPop;
		document.getElementById('currentPopEmployed').innerHTML = employed;
		document.getElementById('currentPopUnemployed').innerHTML = unemployed;
		var totalPopNodeList = document.getElementsByClassName("totalPop");
		for (i = 0; i <	totalPopNodeList.length; i++){
				totalPopNodeList[i].innerHTML = totalPop;
		}
	}
	function settlerArrival(){a
		var settlersArrived = (Math.ceil(Math.random() * 1.25));
		console.log(settlersArrived);
		
		if(settlersArrived + currentPop >= totalPop){
			currentPop = totalPop;
			unemployed = totalPop;
		}
		else{
			currentPop = currentPop + settlersArrived;
			unemployed = unemployed + settlersArrived;
		}
		
		document.getElementById('currentPop').innerHTML = currentPop;
		document.getElementById('currentPopUnemployed').innerHTML = unemployed;
	}
    
    //Tooltip
	function toolTip(){
        
        document.createElement
	}
	
window.setInterval(function(){
	
	woodClick(lumberjacks*woodMultiplier);
	foodClick(farmers*foodMultiplier);
	stoneClick(miners*stoneMultiplier);
	
	settlerCounter--;
	document.getElementById('minutes').innerHTML = (Math.floor(settlerCounter/60));	
	if (Math.floor(settlerCounter%60) < 10){
		document.getElementById('seconds').innerHTML = "0" +(Math.floor(settlerCounter%60));}
	else{
		document.getElementById('seconds').innerHTML = (Math.floor(settlerCounter%60));}
	if (settlerCounter == 0){
		settlerArrival();
		settlerCounter = 60;
	}
	
}, 1000);
