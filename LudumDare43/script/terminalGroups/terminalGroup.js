function TerminalGroup(game){
	this.game = game;
	this.controls = [];
}

TerminalGroup.prototype.breakSomething = function(max_amount){
	for(var i = 0; i < this.controls.length; i++){
		if(Math.floor(Math.random() * 2) == 1)
			this.controls[i].lowerHealth(Math.floor(Math.random() * max_amount));
	}
}

TerminalGroup.prototype.checkLights = function(){
	
}

TerminalGroup.prototype.setLight = function(light){
	for(var i = 0; i < this.controls.length; i++){
		if(light)
			this.controls[i].element.classList.remove("darkness");
		else
			this.controls[i].element.classList.add("darkness");
	}
}