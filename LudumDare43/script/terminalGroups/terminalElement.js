function TerminalElement(element, help_text){
	this.element = element;
	this.health = 100;
	this.help_text = help_text;
}

TerminalElement.prototype.eventHelpState = function(){
	if(game.terminal_group_reports.active_help){
		game.terminal_group_claw.grab_light.lowerHealth(game.control_use_damage);
		game.terminal_group_reports.writeHelp(this.help_text);
		return true;
	}
	if(game.terminal_group_reports.active_state){
		game.terminal_group_claw.grab_light.lowerHealth(game.control_use_damage);
		game.terminal_group_reports.writeState(this.health);
		return true;
	}
	if(this.isDestroyed()){
		if(game.tool_manager.tool_pliers.active)
			game.tool_manager.tool_pliers.use(this);
		return true;
	}
	if(game.tool_manager.tool_pliers.active){
		game.tool_manager.tool_pliers.use(this);
		return true;
	}
	this.lowerHealth(game.control_use_damage);
	return false;
}

TerminalElement.prototype.lowerHealth = function(amount){
	this.element.classList.remove("damaged_1");
	this.element.classList.remove("damaged_2");
	this.health -= amount;
	if(this.health <= 0)
		this.destroyElement();
	else if(this.health <= 33)
		this.setDamageClass(2);
	else if(this.health <= 66)
		this.setDamageClass(1);
}

TerminalElement.prototype.setDamageClass = function(tier){
	switch(tier){
		case 1:
			this.element.classList.add("damaged_1");
			break;
		case 2:
			this.element.classList.add("damaged_2");
			break;
	}
}

TerminalElement.prototype.destroyElement = function(){
	this.health = 0;
	this.element.classList.add("destroyed");
	this.element.innerHTML = "";
	this.destroyLight();
}

TerminalElement.prototype.isDestroyed = function(){
	return this.health <= 0;
}

TerminalElement.prototype.repairDestroyed = function(){
	this.element.classList.remove("destroyed");
}

TerminalElement.prototype.destroyLight = function(){}