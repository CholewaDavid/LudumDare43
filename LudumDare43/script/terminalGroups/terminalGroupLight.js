function TerminalGroupLight(game){
	TerminalGroup.call(this, game);
	
	this.btn_light = new TerminalElementButton(document.getElementById("terminal_light_btn"), "Toggle light in the room");
	this.light_light = new TerminalElementLight(document.getElementById("terminal_light_btn_light"), "grey", "Lights up in darkness to make it easier to find the button");
	
	this.setEvents();
}

TerminalGroupLight.prototype = Object.create(TerminalGroup.prototype);

TerminalGroupLight.prototype.toggleLight = function(){
	
}

TerminalGroupLight.prototype.turnOffLight = function(){
	
}

TerminalGroupLight.prototype.setEvents = function(){
	this.btn_light.element.onclick = function(){
		if(game.tutorial_on){
		
		}
		if(game.terminal_group_light.btn_light.eventHelpState())
			return;
		game.terminal_group_light.toggleLight();
	};
	this.light_light.element.onclick = function(){
		game.terminal_group_light.light_light.eventHelpState();
	};
}