function TerminalElement(element, help_text){
	this.element = element;
	this.health = 100;
	this.max_health = 100;
	this.help_text = help_text;
	this.is_rubber = false;
	this.is_lightbulb = false;
}

TerminalElement.prototype.eventHelpState = function(){
	if(game.tool_manager.tool_repair_kit.active){
		game.tool_manager.tool_repair_kit.use(this);
		return true;
	}
	if(game.terminal_group_reports.active_help && !this.is_lightbulb){
		game.terminal_group_claw.grab_light.lowerHealth(game.control_use_damage);
		game.terminal_group_reports.writeHelp(this.help_text);
		return true;
	}
	if(game.terminal_group_reports.active_state && !this.is_lightbulb){
		game.terminal_group_claw.grab_light.lowerHealth(game.control_use_damage);
		game.terminal_group_reports.writeState(this.health);
		return true;
	}
	if(this.isDestroyed()){
		if(game.tool_manager.tool_pliers.active)
			game.tool_manager.tool_pliers.use(this);
		if(game.tool_manager.tool_rubber_button.active)
			game.tool_manager.tool_rubber_button.use(this);
		if(game.tool_manager.tool_light_bulb.active)
			game.tool_manager.tool_light_bulb.use(this);
		return true;
	}
	if(game.tool_manager.tool_pliers.active){
		game.tool_manager.tool_pliers.use(this);
		return true;
	}
	if(game.tool_manager.tool_rubber_button.active){
		game.tool_manager.tool_rubber_button.use(this);
		return true;
	}
	if(game.tool_manager.tool_light_bulb.active){
		game.tool_manager.tool_light_bulb.use(this);
		return true;
	}
	if(this.is_lightbulb)
		return true;

	this.lowerHealth(game.control_use_damage);
	return false;
}

TerminalElement.prototype.lowerHealth = function(amount){
	if(this.is_rubber){
		if(Math.floor(Math.random() * 10) == 0){
			this.removeRubber();
		}
		return;
	}
	if(this.is_lightbulb)
		return;
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

TerminalElement.prototype.removeRubber = function(){
	this.is_rubber = false;
	this.element.classList.remove("rubber_button");
	this.destroyElement();
	game.tool_manager.tool_rubber_button.addButton();
}

TerminalElement.prototype.removeLightbulb = function(){
	this.is_lightbulb = false;
	this.element.classList.remove("lightbulb");
	this.destroyElement();
	game.tool_manager.tool_rubber_button.addButton();
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
	this.max_health = 100;
}

TerminalElement.prototype.destroyLight = function(){}