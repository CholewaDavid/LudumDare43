function TerminalGroupLight(game){
	TerminalGroup.call(this, game);
	
	this.btn_light = new TerminalElementButton(document.getElementById("terminal_light_btn"), "Toggle light in the room");
	this.light_light = new TerminalElementLight(document.getElementById("terminal_light_btn_light"), "grey", "Lights up in darkness to make it easier to find the button");
	
	this.controls.push(this.btn_light, this.light_light);
	this.light_on = true;
	
	this.setEvents();
}

TerminalGroupLight.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupLight.prototype.toggleLight = function(){
	if(this.light_on)
		this.turnOffLight();
	else
		this.turnOnLight();
}

TerminalGroupLight.prototype.turnOffLight = function(){
	this.game.setLight(false);
	this.light_on = false;
	this.checkLights(true);
}

TerminalGroupLight.prototype.turnOnLight = function(){
	this.game.setLight(true);
	this.light_on = true;
	this.checkLights(true);
}

TerminalGroupLight.prototype.checkLights = function(damage){
	if(this.light_light.isDestroyed())
		return;
	var change = false;
	if(this.light_on)
		change = this.light_light.setColor("grey");
	else
		change = this.light_light.setColor("yellow");
	if(damage && change)
		this.light_light.lowerHealth(this.game.control_use_damage);
}

TerminalGroupLight.prototype.setEvents = function(){
	this.btn_light.element.onclick = function(){
		if(!game.game_on)
			return;
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_light.btn_light.eventHelpState())
			return;
		game.terminal_group_light.toggleLight();
	};
	this.light_light.element.onclick = function(){
		if(!game.game_on)
			return;
		game.terminal_group_light.light_light.eventHelpState();
		game.terminal_group_light.checkLights(false);
	};
}